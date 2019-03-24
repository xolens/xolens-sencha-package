Ext.define('Xolens.view.dialog.form.FormDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.formdialog',
    controller: 'formdialog',
    requires: [
        'Xolens.util.Function',
    ],
    modal: true,
    floating: true,
    closable: true,
    maximizable: true,
    monitorValid: true,
    resizable: true,
    centered: true,
    constrainHeader: true,

    closeAction: 'hide',
    width: '90%',
    height: '90%',

    updateTitle: '[ ? ] Mise à jour des informations',
    createTitle: '[ ? ] Nouvel enregistrement',

    form: null,
    subtitle: '',

    layout: 'fit',
    initComponent: function() {
        var me = this,
            formConfig = me.form,
            items = {
                scrollable: true,
                xtype: 'form',
                width: '100%',
                layout: 'vbox',
                defaultType: 'textfield',
                bodyPadding: 25,
                defaults: {
                    padding: 15,
                    anchor: '100%'
                },
                fieldDefaults: {
                    labelAlign: 'top',
                    margin: '5 10',
                },
                buttons: [Xolens.builder.component.Button.dialogCancelBtn, Xolens.builder.component.Button.formSubmitBtn, Xolens.builder.component.Button.formSimpleSubmitBtn],
            };
        Ext.apply(items, formConfig);

        Ext.apply(me, {
            items: items,
            prefilled: formConfig.prefilled,
            fillables: formConfig.fillables,
            updateTitle: me.updateTitle.replace('?', me.subtitle),
            createTitle: me.createTitle.replace('?', me.subtitle),
        })
        me.form = null;
        this.callParent(arguments);
    },
    xhooks: {
        getForm: function() {
            var form = this.down('form');
            if (form == null) {
                return null;
            }
            return form.getForm();
        },
        displayForCreate: function(parentView, record = null) {
            var me = this,
                formView = me.down('form'),
                form = formView.getForm(),
                fillables = me.fillables || formView.fillables,
                splitSubmitBtn = me.lookupReference('submitsplitbtn'),
                simpleSubmitBtn = me.lookupReference('submitsimplebtn');
            me.setTitle(me.createTitle);
            me.parentView = parentView;
            formView.url = me.createUrl || formView.createUrl;
            form.reset();
            me.resize(parentView);
            if (splitSubmitBtn != null) {
                splitSubmitBtn.show();
            }
            if (simpleSubmitBtn != null) {
                simpleSubmitBtn.hide();
            }
            if (record && record.data) {
                item = record.data;
                for (var index in fillables) {
                    var key = fillables[index];
                    var field = form.findField(key);
                    if (field != null) {
                        field.setValue(item[key]);
                    }
                }
            }
            formView.scrollTo(0, 0, true);
            me.refreshChildren(me);
            me.show();
        },
        refreshChildren: function(me) {
            var refreshables = me.query("[refreshOnShow=true]");
            for (var key in refreshables) {
                refreshables[key].refresh();
            }
        },
        displayForUpdate: function(parentView, record) {
            var me = this,
                item = record.data,
                formView = me.down('form'),
                fillables = me.fillables || formView.fillables,
                form = formView.getForm(),
                splitSubmitBtn = me.lookupReference('submitsplitbtn'),
                simpleSubmitBtn = me.lookupReference('submitsimplebtn');
            me.setTitle(me.updateTitle);
            me.parentView = parentView;
            formView.url = me.updateUrl || formView.updateUrl;


            if (splitSubmitBtn != null) {
                splitSubmitBtn.hide();
            }
            if (simpleSubmitBtn != null) {
                simpleSubmitBtn.show();
            }
            form.reset();
            me.resize(parentView);
            if (item != null) {
                for (var index in fillables) {
                    var key = fillables[index];
                    var field = form.findField(key);
                    if (field != null) {
                        field.setValue(item[key]);
                    }
                }
            }
            formView.scrollTo(0, 0, true);
            me.refreshChildren(me);
            me.show();
        },
        resize: function(parentView) {
            var parentWindow = parentView.isWindow ? parentView : parentView.up('window');
            if (!parentWindow) {
                return;
            }
            var newHeight, newWidth,
                parentHeight = parentWindow.height,
                parentWidth = parentWindow.width;
            parentHeight = parentHeight || '90%';
            parentWidth = parentWidth || '90%';
            newHeight = (parseInt(parentHeight, 10) - 5) + '%';
            newWidth = (parseInt(parentWidth, 10) - 5) + '%';
            this.setWidth(newWidth);
            this.setHeight(newHeight);
        }
    },
});