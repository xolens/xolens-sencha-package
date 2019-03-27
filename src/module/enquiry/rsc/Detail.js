Ext.define('Xolens.module.enquiry.rsc.Detail', {
    singleton: true,


    field: {
        subtitle: "FIELD",
        dataProperties: { name: 'Name', type: 'Type', display_text: 'DisplayText', required: 'Required', value_list: 'ValueList', description: 'Description', },
        tabitems: [{
            viewtype: 'tablefield',
            config: { title: 'TableField'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.field.tablefield.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.field.tablefield.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.field.tablefield.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.field.tablefield.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rname', 'rmaxrecords', 'bdescription',  ]
                }
            },
        },{
            viewtype: 'tablecolumn',
            config: { title: 'TableColumn'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.field.tablecolumn.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.field.tablecolumn.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.field.tablecolumn.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.field.tablecolumn.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquiry.rsc.Detailtablefield',  ]
                }
            },
        },{
            viewtype: 'sectionfield',
            config: { title: 'SectionField'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.field.sectionfield.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.field.sectionfield.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.field.sectionfield.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.field.sectionfield.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquiry.rsc.Detailsection',  ]
                }
            },
        },]
    },

    section: {
        subtitle: "SECTION",
        dataProperties: { name: 'Name', description: 'Description', },
        tabitems: [{
            viewtype: 'formsection',
            config: { title: 'FormSection'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.section.formsection.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.section.formsection.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.section.formsection.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.section.formsection.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquiry.rsc.Detailform',  ]
                }
            },
        },{
            viewtype: 'sectionfield',
            config: { title: 'SectionField'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.section.sectionfield.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.section.sectionfield.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.section.sectionfield.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.section.sectionfield.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquiry.rsc.Detailfield',  ]
                }
            },
        },]
    },

    form: {
        subtitle: "FORM",
        dataProperties: { name: 'Name', description: 'Description', },
        tabitems: [{
            viewtype: 'enquiry',
            config: { title: 'Enquiry'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.form.enquiry.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.form.enquiry.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.form.enquiry.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.form.enquiry.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rname', 'rtitle', 'bdescription',  ]
                }
            },
        },{
            viewtype: 'formsection',
            config: { title: 'FormSection'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.form.formsection.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.form.formsection.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.form.formsection.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.form.formsection.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquiry.rsc.Detailsection',  ]
                }
            },
        },]
    },

    tablefield: {
        subtitle: "TABLEFIELD",
        dataProperties: { name: 'Name', max_records: 'MaxRecords', description: 'Description', },
        tabitems: [{
            viewtype: 'tablecolumn',
            config: { title: 'TableColumn'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.tablefield.tablecolumn.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.tablefield.tablecolumn.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.tablefield.tablecolumn.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.tablefield.tablecolumn.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquiry.rsc.Detailfield',  ]
                }
            },
        },]
    },

    enquiry: {
        subtitle: "ENQUIRY",
        dataProperties: { name: 'Name', title: 'Title', description: 'Description', },
        tabitems: [{
            viewtype: 'fieldvalue',
            config: { title: 'FieldValue'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.enquiry.fieldvalue.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.enquiry.fieldvalue.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.enquiry.fieldvalue.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.enquiry.fieldvalue.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rselectXolens.module.enquiry.rsc.Detailsectionfield', 'bvalue',  ]
                }
            },
        },]
    },

    sectionfield: {
        subtitle: "SECTIONFIELD",
        dataProperties: { position: 'Position', },
        tabitems: [{
            viewtype: 'fieldvalue',
            config: { title: 'FieldValue'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.sectionfield.fieldvalue.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.sectionfield.fieldvalue.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.sectionfield.fieldvalue.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.sectionfield.fieldvalue.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rselectXolens.module.enquiry.rsc.Detailenquiry', 'bvalue',  ]
                }
            },
        },]
    },
})

