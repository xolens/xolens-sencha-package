Ext.define('Xolens.builder.component.Button', {
    singleton: true,

    searchtool: {
        xtype: 'textfield',
        tooltip: 'Rechercher un enregistrement',
        iconCls: 'framing-buttons-add',
        fieldLabel: 'Rechercher',
    },
    showallbtn: {
        text: 'Tout afficher',
        tooltip: 'Afficher tous les elements',
        iconCls: 'icon-information',
        handler: 'onRemoveSelectionClick',
    },
    refreshGridbtn: {
        text: 'Rafraichir',
        tooltip: 'Mettre à jour les données affichées',
        iconCls: 'icon-refresh',
        handler: 'onRefreshGridClick',
    },
    deletebtn: {
        isToolbtn: true,
        disabled: true,
        text: 'Supprimer',
        tooltip: 'Supprimer les elements selectionnes',
        iconCls: 'icon-delete',
        handler: 'onDeleteButtonClick',
        enabledConfig: {
            singleSelection: true,
            multipleSelection: true,
            emptySelection: false,
        },
    },
    exportmenu: {
        text: 'Exporter',
        disabled: true,
        tooltip: 'Exporter les éléments séléctionnés',
        iconCls: 'icon-base',
        itemId: 'exportBtn',
        menu: [{
                text: 'Exporter au format Excel',
                handler: 'exportExcel',
                iconCls: 'icon-excel',
            },
            {
                text: 'Exporter au format CSV',
                handler: 'exportCsv',
                iconCls: 'icon-csv',
            }
        ],
        enabledConfig: {
            singleSelection: true,
            multipleSelection: true,
            emptySelection: false,
        },

    },
    changesmenu: {
        itemId: 'changesBtn',
        text: 'Modifications',
        tooltip: 'Gérer l\'enregistrement des modifications',
        iconCls: 'icon-base',
        iconCls: 'icon-save-update',
        menu: [{
                itemId: 'commitSelected',
                handler: 'onSynchGridChanges',
                iconCls: 'icon-check',
                applyToSelection: true,
                commitChanges: true,
                text: 'Mettre à jour les éléments sélectionnés',
            }, {
                itemId: 'rollbackSelected',
                handler: 'onSynchGridChanges',
                applyToSelection: true,
                commitChanges: false,
                iconCls: 'icon-close-delete',
                text: 'Annuler les modifications sélectionnées',
            }, '-',
            {
                itemId: 'commitInlineUpdate',
                handler: 'onSynchGridChanges',
                applyToSelection: false,
                commitChanges: true,
                iconCls: 'icon-save',
                text: 'Tout mettre à jour',
            },
            {
                itemId: 'rollbackInlineUpdate',
                handler: 'onSynchGridChanges',
                applyToSelection: false,
                commitChanges: false,
                iconCls: 'icon-revert',
                text: 'Annuler toutes les modifications',
            }
        ]
    },
    checkmenu: {
        itemId: 'selectionButton',
        iconCls: 'icon-save-update',
        text: 'Sélection',
        tooltip: 'Cocher/Décocher plusieurs',
        menu: [{
            iconCls: 'icon-check',
            doCheck: true,
            handler: 'doSelectionCheck',
            text: 'Tout chocher',
            tooltip: 'Cocher tous les éléments sélectioné',
        }, {
            doCheck: false,
            iconCls: 'icon-close-delete',
            handler: 'doSelectionCheck',
            text: 'Tout déchocher',
            tooltip: 'Decocher tous les éléments sélectioné',
        }]
    },
    plusmenu: {
        disabled: true,
        text: 'Plus',
        tooltip: 'Afficher plus d\'actions',
        iconCls: 'icon-help',
        menu: [{
            text: 'Details',
            tooltip: 'Consulter plus d\'informations',
            iconCls: 'icon-check-list',
            handler: 'onDetailButtonClick',
            isToolbtn: true,
        }],
        enabledConfig: {
            singleSelection: true,
            multipleSelection: false,
            emptySelection: false,
        },

    },
    addbtn: {
        text: 'Ajouter',
        itemId: 'createBtn',
        tooltip: 'Creer un nouvel enregistrement',
        iconCls: 'icon-add',
        handler: 'onCreateButtonClick',
        enabledConfig: {
            singleSelection: true,
            multipleSelection: true,
            emptySelection: true,
        },
    },
    importbtn: {
        text: 'Importer',
        itemId: 'importbtn',
        tooltip: 'Importer de nouveau intervenants',
        iconCls: 'icon-docs',
        handler: 'onImportStudentButtonClick',
    },
    importAllbtn: {
        text: 'Tout Importer',
        itemId: 'importAllbtn',
        tooltip: 'Importer tous les éléments de la liste',
        iconCls: 'icon-docs',
        importAll: true,
        handler: 'onProcessImport',
    },
    updatebtn: {
        disabled: true,
        isToolbtn: true,
        xtype: 'splitbutton',
        text: 'Modifier',
        tooltip: 'Modifier l\'element selectionne',
        iconCls: 'icon-edit',
        itemId: 'updateBtn',
        handler: 'onUpdateButtonClick',
        enabledConfig: {
            singleSelection: true,
            multipleSelection: false,
            emptySelection: false,
        },
        menu: [{
            isToolbtn: true,
            text: 'Dupliquer',
            iconCls: 'icon-docs',
            tooltip: 'Creer un nouvel enregistrement à partir de la sélection',
            handler: 'onDuplicateButtonClick',
        }]
    },
    dialogCloseBtn: {
        text: 'Fermer',
        handler: 'onDialogCancelButtonClick'
    },
    dialogCancelBtn: {
        text: 'Annuler',
        handler: 'onDialogCancelButtonClick'
    },
    dialogSelectBtn: {
        text: 'Sélectionner',
        disabled: true,
        handler: 'onSelectButtonClick',
        enabledConfig: {
            singleSelection: true,
            multipleSelection: false,
            emptySelection: false,
        },
    },
    formSimpleSubmitBtn: {
        formBind: true,
        disabled: true,
        text: 'Enregistrer',
        handler: 'submitForm',
        reference: 'submitsimplebtn',
    },
    formSubmitBtn: {
        formBind: true,
        disabled: true,
        xtype: 'splitbutton',
        text: 'Enregistrer',
        handler: 'submitForm',
        reference: 'submitsplitbtn',
        menu: [{
            text: 'Continuer avec un nouveau formulaire',
            handler: 'submitFormAndNew',
        }, {
            text: 'Continuer avec les mêmes données',
            handler: 'submitFormAndNext',
        }]
    }

});