Ext.define('Xolens.builder.component.Field', {
    singleton: true,

    textfield: {
        xtype: 'textfield',
        initField: function() {
            this.emptyText = "Veuillez indiquer la valeur du champ '{fieldLabel}'".replace("{fieldLabel}", this.fieldLabel);
            this.callParent(arguments);
        }
    },
    rtextfield: {
        fieldType: 'textfield',
        allowBlank: false,
        blankText: 'Ce champ est obligatoire !',
        initField: function() {
            this.emptyText = "Veuillez indiquer la valeur du champ '{fieldLabel}'".replace("{fieldLabel}", this.fieldLabel);
            this.callParent(arguments);
        }
    },
    areafield: {
        xtype: 'textarea',
        initField: function() {
            this.emptyText = "Veuillez indiquer la valeur du champ '{fieldLabel}'".replace("{fieldLabel}", this.fieldLabel);
            this.callParent(arguments);
        }
    },
    rareafield: {
        fieldType: 'areafield',
        allowBlank: false,
        blankText: 'Ce champ est obligatoire !',
    },
    numberfield: {
        value: 0,
        xtype: 'numberfield',
        initField: function() {
            this.emptyText = "Veuillez indiquer la valeur du champ '{fieldLabel}'".replace("{fieldLabel}", this.fieldLabel);
            this.callParent(arguments);
        }
    },
    rnumberfield: {
        fieldType: 'numberfield',
        allowBlank: false,
        value: 0,
        blankText: 'Ce champ est obligatoire !',
    },
    yearfield: {
        value: new Date().getFullYear(),
        maxValue: 9999,
        minValue: -9999,
        xtype: 'numberfield',
        initField: function() {
            this.emptyText = "Veuillez indiquer la valeur du champ '{fieldLabel}'".replace("{fieldLabel}", this.fieldLabel);
            this.callParent(arguments);
        }
    },
    ryearfield: {
        fieldType: 'yearfield',
        allowBlank: false,
        blankText: 'Ce champ est obligatoire !',
    },
    datefield: {
        maxValue: new Date(),
        xtype: 'datefield',
        format: "d/m/Y",
        submitFormat: "m/d/Y",
        initField: function() {
            this.emptyText = "Veuillez indiquer la valeur du champ '{fieldLabel}'".replace("{fieldLabel}", this.fieldLabel);
            this.callParent(arguments);
        }
    },
    rdatefield: {
        fieldType: 'datefield',
        allowBlank: false,
        blankText: 'Ce champ est obligatoire !',
    },
    emailfield: {
        xtype: 'textfield',
        vtype: 'email',
        emptyText: 'Exemple: exemple@email.com',
        initField: function() {
            this.emptyText = "Veuillez indiquer la valeur du champ '{fieldLabel}'".replace("{fieldLabel}", this.fieldLabel);
            this.callParent(arguments);
        }
    },
    remailfield: {
        fieldType: 'emailfield',
        allowBlank: false,
        xtype: 'textfield',
        emptyText: 'Exemple: exemple@email.com',
        blankText: 'Ce champ est obligatoire !',
    },
    phonefield: {
        xtype: 'textfield',
        emptyText: 'Exemple: (+xxx) xxx xxx xxx',
        regex: /^\s*(\(\s*\+\s*\d\s*(\s*\d\s*)*\s*\)\s*)?(\s*\d\s*){5}(\s*\d\s*)*$/,
        initField: function() {
            this.emptyText = "Veuillez indiquer la valeur du champ '{fieldLabel}'".replace("{fieldLabel}", this.fieldLabel);
            this.callParent(arguments);
        }
    },
    rphonefield: {
        fieldType: 'phonefield',
        allowBlank: false,
        blankText: 'Ce champ est obligatoire !',
    },
    combofield: {
        minChars: 0,
        typeAhead: true,
        autoSelect: true,
        storeUrl: null,
        forceSelection: true,
        fieldType: 'combo',
        triggerAction: 'all',
        valueField: 'name',
        displayField: 'display',
        emptyText: 'Veuillez choisir un element...',
    },
    rcombofield: {
        fieldType: 'combofield',
        allowBlank: false,
        blankText: 'Ce champ est obligatoire !',
    },
});