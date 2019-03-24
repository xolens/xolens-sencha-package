Ext.define('Xolens.view.ContentViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contentview',


    doSelectionCheck: function(source, q) {
        var doCheck = source.doCheck,
            grid = source.up('grid'),
            selection = grid.getSelectionModel().getSelection();
        Ext.each(selection, function(rec) {
            var item = rec.data;
            if (item.access_readable) {
                rec.set('can_read', doCheck);
            }
            if (item.access_updatable) {
                rec.set('can_update', doCheck);
            }
            if (item.access_deletable) {
                rec.set('can_delete', doCheck);
            }
            if (item.access_trashable) {
                rec.set('can_trash', doCheck);
            }
            if (item.access_restorable) {
                rec.set('can_restore', doCheck);
            }
            if (item.access_importable) {
                rec.set('can_import', doCheck);
            }
            if (item.access_exportable) {
                rec.set('can_export', doCheck);
            }
        });
    },
    onSynchGridChanges: function(source, record = null) {
        var me = this.view,
            grid = source.up('grid'),
            store = grid.store,
            applyToSelection = source.applyToSelection,
            commitChanges = source.commitChanges,
            selection = [];
        if (!this.isStoreModified(store)) {
            Ext.toast('Aucune modification n\'a été effectuée');
            return;
        }
        if (applyToSelection) {
            selection = grid.getSelectionModel().getSelection();
            if (!selection.length) {
                Ext.toast('Aucun élément sélectionné');
                return;
            }
        } else {
            selection = store.getModifiedRecords();
        }
        if (commitChanges) {
            var total = selection.length,
                i = 0;
            Xolens.util.Function.showProgressDialog();
            Ext.each(selection, function(rec) {
                var item = rec.data;
                var jsonResponse = { "success": true };
                if (rec.dirty) {
                    response = Ext.Ajax.request({
                        async: false,
                        url: Xolens.Api.admin.admin.profileaccess.singleUrl,
                        params: {
                            'id': item.id,
                            'can_read': item.can_read,
                            'can_update': item.can_update,
                            'can_delete': item.can_delete,
                            'can_trash': item.can_trash,
                            'can_restore': item.can_restore,
                            'can_import': item.can_import,
                            'can_export': item.can_export,
                        },
                    });
                    jsonResponse = Ext.decode(response.responseText);
                }
                if (jsonResponse.success) {
                    var acces = item.acces || item.creation || item.modification || item.corbeille;
                    rec.set('acces', acces);
                    rec.commit();
                } else {
                    success = false;
                }
                i++;
                Xolens.util.Function.updateProgress(i, total);
            });
        } else {
            Ext.each(selection, function(rec) {
                rec.reject();
            });
            Ext.toast('Les modifications ont bien été annullées');
        }
    },

    isStoreModified: function(store) {
        var modifiedRecords = store.getModifiedRecords();
        return modifiedRecords && modifiedRecords.length && modifiedRecords.length > 0;
    },

    onRefreshGridClick: function(btn) {
        btn.up('grid').store.load();
    },

    onNotificationBroadcast: function(source, record = null) {
        //var centerRegion = this.view.down('panel[region=center]'),
        var me = this.view,
            centerRegion = source.up('grid'),
            filterData = me.filterData,
            broadcastDialog = centerRegion.import,
            targetAll = source.targetAll,
            targetSelection = source.targetSelection,
            targetPending = source.targetPending,
            identifiers = []
        gridSelection = centerRegion.getSelection();
        if (broadcastDialog == null) {
            broadcastDialog = centerRegion.import = Ext.create('Xolens.view.dialog.notification.NotificationDialog');
        }
        broadcastDialog.filterData = filterData;
        broadcastDialog.hide();
        if (source.targetSelection && gridSelection.length > 0) {
            Ext.Array.each(gridSelection, function(item) {
                identifiers.push(item.data.id);
            });
        }
        broadcastDialog.display(centerRegion, filterData, {
            identifiers: identifiers,
            all: targetAll,
            selection: targetSelection,
            pending: targetPending,
        });
    },

    onImportStudentButtonClick: function(source, record = null) {
        //var centerRegion = this.view.down('panel[region=center]'),
        var me = this.view,
            centerRegion = source.up('grid'),
            filterData = me.filterData,
            importDialog = centerRegion.import;
        if (importDialog == null) {
            importDialog = centerRegion.import = Ext.create('Xolens.view.dialog.ImportStudentDialog');
            importDialog.filterData = filterData;
        }
        importDialog.display(centerRegion, { grid: centerRegion });
    },

    onPollShowValuesActionButtonClick: function(source, p2, p3, p4, p5, selected) {
        //var centerRegion = this.view.down('panel[region=center]'),
        var centerRegion = source.up('grid'),
            investigation = centerRegion.investigation,
            valueDialog = null,
            record = null,
            isSelected = source.isToolbtn;
        if (investigation == null) {
            investigation = centerRegion.investigation = {};
        }
        valueDialog = centerRegion.investigation['values'];
        if (valueDialog == null) {
            valueDialog = centerRegion.investigation['values'] = Ext.create('Xolens.view.dialog.dynamic.DynamicGridDialog');
        }
        if (isSelected) {
            record = centerRegion.getSelection()[0];
        } else {
            record = selected;
        }
        centerRegion.setSelection(record);
        var loadMask = new Ext.LoadMask({
            msg: 'Please wait...',
            target: centerRegion.up('app-main')
        });
        var ajaxUrl = Xolens.Api.admin.poll.dynamic.fieldUrl.replace('{id}', record.get('form_id'));
        loadMask.setVisible(true);
        Ext.Ajax.request({
            url: ajaxUrl,
            method: 'GET',
            failure: Xolens.util.Function.onAjaxFailure,
            loadMask: loadMask,
            success: function(response, opts) {
                try {
                    var response = Ext.decode(response.responseText),
                        fields = response.response,
                        fieldColumns = [],
                        fieldColWidth = 0,
                        storeUrl = Xolens.Api.admin.poll.dynamic.valueUrl.replace('{id}', record.get('id')),
                        columns = [];
                    columns.push(Xolens.Column.polluser);
                    if (Ext.isArray(fields) && fields.length > 0) {
                        fields.sort(function(a, b) {
                            if (a.field_position < b.field_position)
                                return -1;
                            if (a.field_position > b.field_position)
                                return 1;
                            return 0;
                        });
                        for (var i = 0; i < fields.length; i++) {
                            fieldColWidth += 200;
                            fieldColumns.push({
                                text: fields[i]['field_display_text'],
                                dataIndex: fields[i]['field_identifier'],
                                minWidth: 200,
                                flex: 1,
                            });
                        }
                        columns.push({
                            text: 'Valeurs du questionnaire',
                            columns: fieldColumns,
                            minWidth: fieldColWidth,
                            flex: 1,
                        });
                    }
                    valueDialog.display(centerRegion, record, {
                        columns: columns,
                        storeUrl: storeUrl,
                        fields: fields,
                    });

                } catch (error) {
                    console.log('JS Exception:', error);
                    Xolens.util.Function.onAjaxFailure(response, opts);
                }
                loadMask.setVisible(false);
            },
        });
    },

    renderStudentPercentage: function(value, metadata, record, rowIndex, colIndex, store, view) {
        metadata.style = "text-align: right;";
        return this.formatPercentage(value, record.data.student_count);
    },
    renderTrainerPercentage: function(value, metadata, record, rowIndex, colIndex, store, view) {
        metadata.style = "text-align: right;";
        return this.formatPercentage(value, record.data.trainer_count);
    },
    formatPercentage: function(value, total) {
        if (value == 0 || total == 0) {
            return '0 ~ <b>0.00%</b>';
        } else {
            return value + ' ~ <b>' + (value * 100 / total).toFixed(2) + ' %</b>';
        }

    },
    onDetailButtonClick: function(source, p2, p3, p4, p5, selected) {
        //var centerRegion = this.view.down('panel[region=center]'),
        var centerRegion = source.up('grid'),
            detailDialog = centerRegion.detail,
            record = null,
            isSelected = source.isToolbtn;
        if (isSelected) {
            record = centerRegion.getSelection()[0];
        } else {
            record = selected;
        }
        detailDialog.displayDetail(centerRegion, record);
    },

    onDialogCancelButtonClick: function() {
        var view = this.view;
        if (!view.isWindow) {
            view = view.up('window');
        }
        view.close();
    },

    onCreateButtonClick: function(source, record = null) {
        //var centerRegion = this.view.down('panel[region=center]'),
        var centerRegion = source.up('grid'),
            formDialog = centerRegion.form;
        formDialog.displayForCreate(centerRegion, record);
    },

    onDuplicateButtonClick: function(source, p2, p3, p4, p5, selected) {
        var centerRegion = source.up('grid'),
            record = null,
            isSelected = source.isToolbtn;
        if (isSelected) {
            record = centerRegion.getSelection()[0];
        } else {
            record = selected;
        }
        this.onCreateButtonClick(source, record);
    },

    onUpdateButtonClick: function(source, p2, p3, p4, p5, selected) {
        //var centerRegion = this.view.down('panel[region=center]'),
        var centerRegion = source.up('grid'),
            formDialog = centerRegion.form,
            record = null,
            isSelected = source.isToolbtn;
        if (isSelected) {
            record = centerRegion.getSelection()[0];
        } else {
            record = selected;
        }
        formDialog.displayForUpdate(centerRegion, record);
    },

    onDeleteButtonClick: function(source, p2, p3, p4, p5, selected) {
        //var centerRegion = this.view.down('panel[region=center]'),
        var centerRegion = source.up('grid'),
            identifiers = [],
            selection = null,
            isSelected = source.isToolbtn,
            contentStore = centerRegion.getStore();
        if (isSelected) {
            selection = centerRegion.getSelection();
        } else {
            selection = [selected];
        }
        for (i = 0; i < selection.length; i++) {
            identifiers.push(selection[i].data.id);
        }

        Ext.MessageBox.show({
            title: 'Suppression de ' + identifiers.length + ' élément(s)',
            msg: 'Confirmer la suppression de tous les éléments sélectionnés:',
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function(btn) {
                if (btn == 'ok') {
                    var encodedIdentifiers = JSON.stringify(identifiers);
                    Ext.Ajax.request({
                        url: centerRegion.deleteUrl,
                        params: { identifiers: encodedIdentifiers },
                        store: contentStore,
                        success: Xolens.util.Function.onAjaxSuccess,
                        failure: Xolens.util.Function.onAjaxFailure,
                    }).then(function(response, opts) {
                        store.load();
                    });
                }
            }
        });

    },

    changeButtonsState: function(buttons, congigAttr) {
        Ext.Array.each(buttons, function(item) {
            var enabledConfig = item.enabledConfig;
            if (enabledConfig) {
                item.setDisabled(!enabledConfig[congigAttr]);
            }
        });
    },
    onGridContentSelectionChange: function(selection, selected, eOpts) {
        var me = this,
            grid = selection.view.grid,
            selectDialog = grid.up('selectdialog'),
            pagingtoolbar = grid.down('pagingtoolbar'),
            toolbar = grid.getDockedItems('toolbar[dock=top]')[0],
            toolbarItems = [],
            selectedCount = selected.length,
            dialogBarItems = [];
        if (toolbar) {
            toolbarItems = toolbar.items.items;
        }
        if (pagingtoolbar) {
            var counttool = pagingtoolbar.lookupReference('counttool');
            if (counttool) {
                counttool.setValue(selectedCount);
            }
        }
        if (selectDialog) {
            dialogBarItems = selectDialog.getDockedItems('toolbar[dock=bottom]')[0].items.items;
        }
        if (selectedCount == 0) {
            me.changeButtonsState(toolbarItems, 'emptySelection');
            me.changeButtonsState(dialogBarItems, 'emptySelection');
        } else if (selectedCount == 1) {
            me.changeButtonsState(toolbarItems, 'singleSelection');
            me.changeButtonsState(dialogBarItems, 'singleSelection');
        } else {
            me.changeButtonsState(toolbarItems, 'multipleSelection');
            me.changeButtonsState(dialogBarItems, 'multipleSelection');
        }
    },

});