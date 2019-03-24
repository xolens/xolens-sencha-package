Ext.define('Xolens.module.enquiry.rsc.Form', {
    singleton: true,

        group: {
            subtitle: 'GROUPS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'name', 'description', ],
            createUrl: Xolens.module.enquiry.rsc.Api.group.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.group.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rName', 'bDescription', ]
        },
        form: {
            subtitle: 'FORMS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'name', 'description', ],
            createUrl: Xolens.module.enquiry.rsc.Api.form.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.form.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rName', 'bDescription', ]
        },
        field: {
            subtitle: 'FIELDS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'type', 'name', 'display_text', 'required', 'value_list', 'description', ],
            createUrl: Xolens.module.enquiry.rsc.Api.field.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.field.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rType', 'rName', 'rDisplayText', 'rRequired', 'bValueList', 'bDescription', ]
        },
        participant: {
            subtitle: 'PARTICIPANTS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'name', 'description', ],
            createUrl: Xolens.module.enquiry.rsc.Api.participant.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.participant.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rName', 'bDescription', ]
        },
        groupparticipant: {
            subtitle: 'GROUPPARTICIPANTS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'group_id', 'group', ],
            createUrl: Xolens.module.enquiry.rsc.Api.groupparticipant.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.groupparticipant.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rSelectGroup', ]
        },
        tablefield: {
            subtitle: 'TABLEFIELDS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'name', 'max_records', 'description', 'field_id', 'field', ],
            createUrl: Xolens.module.enquiry.rsc.Api.tablefield.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.tablefield.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rName', 'rMaxRecords', 'bDescription', 'rSelectField', ]
        },
        section: {
            subtitle: 'SECTIONS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'name', 'description', ],
            createUrl: Xolens.module.enquiry.rsc.Api.section.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.section.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rName', 'bDescription', ]
        },
        enquiry: {
            subtitle: 'ENQUIRYS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'name', 'title', 'description', 'group_id', 'group', 'form_id', 'form', ],
            createUrl: Xolens.module.enquiry.rsc.Api.enquiry.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.enquiry.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rName', 'rTitle', 'bDescription', 'rSelectGroup', 'rSelectForm', ]
        },
        fieldvalue: {
            subtitle: 'FIELDVALUES',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'section_field_id', 'section_field', ],
            createUrl: Xolens.module.enquiry.rsc.Api.fieldvalue.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.fieldvalue.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rSelectSectionField', ]
        },
        formsection: {
            subtitle: 'FORMSECTIONS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'position', 'section_id', 'section', 'form_id', 'form', ],
            createUrl: Xolens.module.enquiry.rsc.Api.formsection.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.formsection.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rPosition', 'rSelectSection', 'rSelectForm', ]
        },
        participantenquiry: {
            subtitle: 'PARTICIPANTENQUIRYS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'participant_id', 'participant', 'enquiry_id', 'enquiry', 'state', 'create_time', 'update_time', 'validation_time', ],
            createUrl: Xolens.module.enquiry.rsc.Api.participantenquiry.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.participantenquiry.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rSelectParticipant', 'rSelectEnquiry', 'bState', 'rCreateTime', 'bUpdateTime', 'bValidationTime', ]
        },
        tablecolumn: {
            subtitle: 'TABLECOLUMNS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'position', 'table_field_id', 'table_field', 'field_id', 'field', ],
            createUrl: Xolens.module.enquiry.rsc.Api.tablecolumn.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.tablecolumn.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rPosition', 'rSelectTableField', 'rSelectField', ]
        },
        sectionfield: {
            subtitle: 'SECTIONFIELDS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'position', 'field_id', 'field', 'section_id', 'section', ],
            createUrl: Xolens.module.enquiry.rsc.Api.sectionfield.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.sectionfield.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rPosition', 'rSelectField', 'rSelectSection', ]
        },
})

