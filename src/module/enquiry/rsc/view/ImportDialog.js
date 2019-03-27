Ext.define('Xolens.module.enquiry.rsc.view.ImportDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.xolens-enquery-importdialog',
    controller: 'xolens-enquery-importdialog',

    requires: [
        'Ext.layout.container.Card',
        'Ext.toolbar.Paging',
    ],
    modal: true,
    floating: true,
    closable: true,
    maximizable: true,
    monitorValid: true,
    resizable: true,
    centered: true,
    constrainHeader: true,
    referenceHolder: true,

    closeAction: 'hide',
    width: '90%',
    height: '90%',
    title: 'Importation de données',
    layout: 'card',

    items: [{
        itemId: 'selectSheetCard',
        xtype: 'panel',
        layout: 'fit',
        items: {
            xtype: 'grid',
            scrollable: true,
            store: {
                xtype: 'store',
                data: [
                    { key: 'key1', alias: null },
                    { key: 'key2', alias: null },
                    { key: 'key3', alias: null },
                ]
            },
            plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1
            },
            tbar: [{
                flex: 1,
                hideLabel: true,
                xtype: 'filefield',
                accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
                text: 'Selectionner un fichier',
                tooltip: 'Selectionner le fichier contenant les donnees à importer',
                listeners: {
                    change: 'onImporFileInputChange'
                }
            }],
            columns: [{
                text: 'Clé',
                flex: 1,
                sortable: false,
                dataIndex: 'key'
            }, {
                flex: 1,
                sortable: true,
                text: 'Champ associé',
                dataIndex: 'alias',
                reference: 'columnDataType',
                editor: {
                    xtype: 'combo',
                    typeAhead: true,
                    triggerAction: 'all',
                    emptyText: 'Veuillez sélectionner le champ associé',
                    store: [
                        []
                    ]
                },
            }],
        },
        buttons: [{
            width: 100,
            text: 'Annuler',
            handler: 'onWindowCloseButtonClick',
        }, {
            width: 100,
            text: 'Suivant &raquo;',
            reference: 'goToImportCardButton',
            handler: 'onGoToImportCardButtonClick',
            disabled: true,
        }, {
            width: 100,
            text: 'Importer',
            disabled: true,
        }]
    }, {
        itemId: 'processImportCard',
        xtype: 'panel',
        layout: 'fit',
        items: {
            xtype: 'grid',
            scrollable: true,

            columnLines: true,
            autoLoad: true,
            loadMask: true,
            stateful: true,
            viewModel: true,
            viewConfig: {
                trackOver: false,
                stripeRows: false
            },

            store: {
                // Data structure {key1: val1, key2: val2, key3: val3}
                data: [],
                autoSync: true,
                autoLoad: true,
                pageSize: 100,
                proxy: {
                    type: 'memory',
                    enablePaging: true,
                },
            },
            tbar: [{
                flex: 1,
                hideLabel: true,
                xtype: 'textfield',
                reference: 'disabledTextfield',
                text: 'Selectionner un fichier',
                readOnly: true,
            }],
            columns: [{
                dataIndex: 'id',
                text: 'N°',
            }, {
                text: 'Key 1',
                flex: 1,
                sortable: true,
                dataIndex: 'key1'
            }, {
                text: 'Key 2',
                flex: 1,
                sortable: true,
                dataIndex: 'key2'
            }, {
                text: 'Key 3',
                flex: 1,
                sortable: true,
                dataIndex: 'key3',
            }],
            viewModel: {
                data: {
                    expanded: true
                }
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                displayMsg: 'Displaying topics {0} - {1} of {2}',
                emptyMsg: "No topics to display",
            },
        },
        buttons: [{
            width: 100,
            text: 'Annuler',
            handler: 'onWindowCloseButtonClick',
        }, {
            width: 100,
            text: '&laquo; Précédent',
            handler: 'goToPickSheetFileButtonClick',
        }, {
            width: 100,
            text: 'Importer',
            handler: 'onProcessImportButtonClick'
        }]
    }, {
        id: 'card-2',
        html: '<h1>Congratulations!</h1><p>Step 3 of 3 - Complete</p>'
    }],
})