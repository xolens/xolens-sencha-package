Ext.define('Xolens.module.enquiry.rsc.Detail', {
    singleton: true,


    group: {
        subtitle: "GROUP",
        dataProperties: { name: 'Name', description: 'Description', },
        tabitems: [{
            viewtype: 'groupparticipant',
            config: { title: 'GroupParticipant'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.group.groupparticipant.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.group.groupparticipant.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.group.groupparticipant.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.group.groupparticipant.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid',  ]
                }
            },
        },{
            viewtype: 'enquiry',
            config: { title: 'Enquiry'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.group.enquiry.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.group.enquiry.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.group.enquiry.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.group.enquiry.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rname', 'rtitle', 'bdescription', 'rselectXolens.module.enquiry.rsc.Detailform',  ]
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
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rname', 'rtitle', 'bdescription', 'rselectXolens.module.enquiry.rsc.Detailgroup',  ]
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

    field: {
        subtitle: "FIELD",
        dataProperties: { type: 'Type', name: 'Name', display_text: 'DisplayText', required: 'Required', value_list: 'ValueList', description: 'Description', },
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

    participant: {
        subtitle: "PARTICIPANT",
        dataProperties: { name: 'Name', description: 'Description', },
        tabitems: [{
            viewtype: 'participantenquiry',
            config: { title: 'ParticipantEnquiry'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.participant.participantenquiry.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.participant.participantenquiry.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.participant.participantenquiry.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.participant.participantenquiry.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rselectXolens.module.enquiry.rsc.Detailenquiry', 'bstate', 'rcreatetime', 'bupdatetime', 'bvalidationtime',  ]
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

    enquiry: {
        subtitle: "ENQUIRY",
        dataProperties: { name: 'Name', title: 'Title', description: 'Description', },
        tabitems: [{
            viewtype: 'participantenquiry',
            config: { title: 'ParticipantEnquiry'},
            overrides: {
                content: {
                    storeUrl: Xolens.module.enquiry.rsc.Api.enquiry.participantenquiry.storeUrl,
                    deleteUrl: Xolens.module.enquiry.rsc.Api.enquiry.participantenquiry.deleteUrl,
                },
                form: {
                    createUrl: Xolens.module.enquiry.rsc.Api.enquiry.participantenquiry.storeUrl,
                    updateUrl: Xolens.module.enquiry.rsc.Api.enquiry.participantenquiry.singleUrl,
                    fieldTypes: ['hiddentoken', 'hiddenid', 'rselectXolens.module.enquiry.rsc.Detailparticipant', 'bstate', 'rcreatetime', 'bupdatetime', 'bvalidationtime',  ]
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
                    fieldTypes: ['hiddentoken', 'hiddenid',  ]
                }
            },
        },]
    },
})

