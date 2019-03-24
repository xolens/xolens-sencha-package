Ext.define('Xolens.builder.component.Column', {
    singleton: true,

    rownumberer: {
        xtype: 'rownumberer'
    },
    datailkey: {
        minWidth: 200,
        flex: 1,
        sortable: true,
        text: 'Propiété',
        dataIndex: 'key',
    },
    datailvalue: {
        minWidth: 200,
        flex: 2,
        sortable: true,
        text: 'Valeur',
        dataIndex: 'value',
    },
    editAction: {
        minWidth: 200,
        text: 'Edit',
        menuText: 'Edit',
        xtype: 'actioncolumn',
        maxWidth: 50,
        minWidth: 50,
        sortable: false,
        menuDisabled: true,
        items: [{
            padding: 5,
            margin: 5,
            iconCls: 'icon-edit',
            tooltip: 'Mettre a jour',
            handler: 'onUpdateButtonClick',
        }]
    },
    updateAction: {
        minWidth: 200,
        text: 'MAJ',
        menuText: 'MAJ',
        xtype: 'actioncolumn',
        maxWidth: 50,
        minWidth: 50,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [{
            iconCls: 'icon-check',
            tooltip: 'Mettre a jour',
            handler: 'commitSingleRecords',
        }]
    },
    deleteAction: {
        minWidth: 200,
        text: 'Supp',
        menuText: 'Supp',
        header: undefined,
        xtype: 'actioncolumn',
        maxWidth: 55,
        minWidth: 50,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [{
            iconCls: 'icon-delete',
            tooltip: 'Supprimer l\'enregistrement',
            handler: 'onDeleteButtonClick',
        }]
    },
    
});