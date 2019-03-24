Ext.define('Xolens.builder.Builder', {
    singleton: true,

    makeContentView: function(context, contentConfig, extra = {}, overrides = {}){
        if (Ext.isString(contentConfig)) {
            contentConfig = context.Content[contentConfig];
        }
        
        var defaultConfig = {
            title: null,
            type: null,
            xtype: null,
            columns: [],
            storeUrl: null,
            button: null,
            extraConfig: {}
        };
        if (!contentConfig) {
            contentConfig = defaultConfig;
        }
        if (contentConfig.xtype) {
            return contentConfig;
        }
        return this.makeGridView(context, contentConfig, extra, overrides);
    },

    makeGridView: function(context, contentConfig, extra = {}, overrides = {}) {
        var contentConfig = Xolens.util.Function.clone(contentConfig);
        Ext.apply(contentConfig, overrides.content);
        
        if(contentConfig.detail!=null){
            contentConfig.detail.context = context;
        }
        
        var viewColumns = contentConfig.columns,
            viewButtons = contentConfig.buttons,
            viewDialogs = contentConfig.dialogs,
            formConfig = contentConfig.form,
            detailConfig = contentConfig.detail,
            view = {
                columnLines: true,
                autoLoad: true,
                loadMask: true,
                stateful: true,
                forceFit: true,
                viewModel: true,
                deleteUrl: contentConfig.deleteUrl,
                selModel: {
                    type: 'checkboxmodel',
                },
                plugins: [{
                    ptype: 'cellediting',
                    clicksToEdit: 2
                }, { ptype: 'gridfilters' }],
                viewConfig: {
                    trackOver: false,
                    stripeRows: false
                },
                dialogs: {},
                dockedItems: [],
                listeners: {
                    selectionchange: 'onGridContentSelectionChange',
                },
                bodyPadding: 0,
                xtype: 'grid',
                emptyCellText: '//',
                buttonAlign: 'center',
                emptyText: '<div style="text-align:center">Aucun enregistrement a afficher</div>',
                title: contentConfig.title,
                iconCls: contentConfig.iconCls,
                store: this.makeStore(context, contentConfig.storeUrl),
                form: this.createFormDialog(context, formConfig, overrides.form),
                detail: this.createDetailDialog(context, detailConfig),
            };
        if (viewColumns && viewColumns.length > 0) {
            var columns = [];
            for (var k in viewColumns) {
                columns.push(this.makeColumn(context, viewColumns[k]));
            }
            view["columns"] = columns;
        }
       
        if (contentConfig.searchtool || (viewButtons && viewButtons.length > 0)) {
            var buttons = [];
            if (viewButtons && viewButtons.length > 0) {
                for (var k in viewButtons) {
                    buttons.push(this.makeButton(context, viewButtons[k]));
                }
            }
            if (contentConfig.searchtool) {
                buttons.push('->');
                buttons.push(this.makeButton(context, 'searchtool'));
            }
            view["dockedItems"] = [{
                xtype: 'toolbar',
                dock: 'top',
                layout: {
                    overflowHandler: 'Scroller'
                },
                items: buttons
            }];
        }
        if (contentConfig.paging) {
            var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
                displayInfo: true,
                referenceHolder: true,
                displayMsg: 'Eléments de {0} à {1} sur un total de {2} éléments',
                emptyMsg: 'Aucun element a afficher',
                dock: 'bottom',
                layout: {
                    overflowHandler: 'Scroller'
                },
            });
            pagingtoolbar.insert(11, '-');
            pagingtoolbar.insert(12, {
                xtype: 'component',
                reference: 'counttool',
                displayMsg: '? élément(s) sélectionné(s)',
                emptyMsg: 'Aucun élément sélectionné',
                html: 'Aucun élément sélectionné',
                setValue: function(val) {
                    var me = this;
                    if (val == 0) {
                        me.setHtml(me.emptyMsg)
                    } else {
                        me.setHtml(me.displayMsg.replace('?', val))
                    }
                }
            });
            view["dockedItems"].push(pagingtoolbar);
        }
        Ext.apply(view, extra);
        view["dialogs"] = {};
        return view;
    },

    createDetailDialog: function(context, detailConfig) {
        if (detailConfig == null) {
            return null;
        }
        return Ext.create('Xolens.view.dialog.detail.DetailDialog', detailConfig);
    },

    makeSelectField: function(context, config) {
        var mainField = {
                xtype: 'container',
                layout: 'fit',
                items: []
            },
            selectField = {
                xtype: 'textfield',
                allowBlank: false,
                disabled: config.selectField.disabled,
                readOnly: true,
                listeners: {
                    focusenter: 'displaySelectionDialog'
                },
                name: null,
                targetDialog: null,
                fieldLabel: null,
                initField: function() {
                    this.emptyText = "Veuillez indiquer la valeur du champ '{fieldLabel}'".replace("{fieldLabel}", this.fieldLabel);
                    this.callParent(arguments);
                },
                applySelection: function(selection) {
                    if (selection.length > 0) {
                        var item = selection[0].data,
                            form = this.up('form').getForm();
                        form.findField(config.selectField.name).setValue(item.name);
                        form.findField(config.hiddenField.name).setValue(item.id);
                    }
                }
            },
            hiddenField = {
                name: null,
                xtype: 'hiddenfield',
            };
        Ext.apply(mainField, config)
        Ext.apply(hiddenField, config.hiddenField);
        Ext.apply(selectField, config.selectField);
        mainField.select = null;
        mainField.hidden = null;
        mainField.items.push(selectField);
        mainField.items.push(hiddenField);
        return mainField;
    },

    makeDualField: function(context, config, field1Config, field2Config) {
        var mainField = Xolens.util.Function.clone(this.makeSimpleField(context, config.fieldType));
        config.field1 = null;
        config.field2 = null;
        Ext.apply(mainField, config)
        if (field1Config != null) {
            Ext.apply(mainField.items[0], field1Config)
        }
        if (field2Config != null) {
            Ext.apply(mainField.items[1], field2Config)
        }
        return mainField;
    },

    makeComboField: function(context, config) {
        var me = this,
            mainField = {
                xtype: 'combobox',
                anchor: '-15',
                store: {
                    xtype: 'store',
                    autoLoad: true,
                    proxy: {
                        type: 'ajax',
                        url: config.storeUrl,
                        reader: {
                            type: 'json',
                            rootProperty: 'response',
                        }
                    }
                },
            };
        Ext.apply(mainField, config);
        return mainField;
    },

    makeField: function(context, config) {
        var me = this,
            field = null,
            fieldConfig = Xolens.util.Function.clone(config);
        if (Ext.isObject(fieldConfig)) {
            var me = this,
                fieldType = fieldConfig.fieldType;
            if (fieldType) {
                switch (fieldType) {
                    case 'dualfield':
                        return me.makeDualField(context, fieldConfig, me.makeField(context, fieldConfig.field1), me.makeField(context, fieldConfig.field2));
                    case 'combo':
                        return me.makeComboField(context, fieldConfig);
                    case 'select':
                        return me.makeSelectField(context, fieldConfig);
                    default:
                        field = Xolens.util.Function.clone(this.makeSimpleField(context, fieldType));
                        fieldConfig.fieldType = field.fieldType;
                        Ext.apply(field, fieldConfig);
                        if (field.fieldType) {
                            return me.makeField(context, field);
                        }
                        break;
                }
            } else {
                return fieldConfig;
            }
        } else if (Ext.isString(fieldConfig)) {
            return me.makeField(context, this.makeSimpleField(context, fieldConfig));
        }
        return field;
    },

    makeSimpleField: function(context, fieldId) {
        var field;
        if(context!=null&&context.Button!=null){
            field = context.Field[fieldId];
        }
        if(field==null){
            field = Xolens.builder.component.Field[fieldId];
        }
        return field;
    },

    createFormDialog: function(context, config, overrides = {}) {
        if (config == null) {
            return null;
        }
        var me = this,
            formConfig = Xolens.util.Function.clone(config);
        return Ext.create('Xolens.view.dialog.form.FormDialog', {
            xtype: 'formdialog',
            subtitle: formConfig.subtitle,
            iconCls: formConfig.iconCls,
            createUrl: formConfig.createUrl,
            updateUrl: formConfig.updateUrl,
            form: me.makeForm(context, config, overrides)
        });
    },

    makeForm: function(context, config, overrides = {}) {
        if (config == null) {
            return null;
        }
        formConfig = Xolens.util.Function.clone(config);
        Ext.apply(formConfig, overrides);
        var formTtems = [],
            me = this,
            fieldTypes = formConfig.fieldTypes;
        if (fieldTypes) {
            for (var k in fieldTypes) {
                formTtems.push(me.makeField(context, fieldTypes[k]));
            }
        }
        var form = {
            fillables: formConfig.fillables,
            defaultButton: 'submitsimplebtn',
            prefilled: formConfig.prefilled,
            referenceHolder: true,
            items: {
                xtype: 'fieldset',
                title: 'Champs du formulaire',
                width: '99%',
                defaultType: 'textfield',
                style: 'background-color:#efefef;',
                padding: '25 25 50',
                defaults: {
                    anchor: '100%'
                },
                items: formTtems
            }
        };
        if (config.xtype) {
            form.xtype = config.xtype;
        }
        return form;
    },

    makeButton: function(context, buttonId) {
        var button;
        if(context!=null&&context.Button!=null){
            button = context.Button[buttonId];
        }
        if(button==null){
            button = Xolens.builder.component.Button[buttonId];
        }
        return button;
    },

    makeColumn: function(context, colunmId) {
        var column;
        if(context!=null&&context.Column!=null){
            column = context.Column[colunmId];
        }
        if(column==null){
            column = Xolens.builder.component.Column[colunmId];
        }
        return column;
    },

    makeStore: function(context, storeUrl, storeConfig = {}) {
        if (storeUrl == null) {
            return null;
        }
        var store = {
            xtype: 'paginatedstore',
            autoLoad: true,
            sortOnLoad: true,
            remoteSort: true,
            remoteFilter: true,
            autoSync: false,
            proxy: {
                type: 'ajax',
                url: storeUrl,
                reader: {
                    type: 'json',
                    rootProperty: 'response.data',
                    totalProperty: 'response.total',
                },
                listeners: {
                    exception: function(proxy, response, operation) {
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            }
        };
        Ext.apply(store, storeConfig);
        return store;
    },
});