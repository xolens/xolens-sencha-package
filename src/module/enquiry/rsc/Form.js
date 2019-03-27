Ext.define('Xolens.module.enquiry.rsc.Form', {
    singleton: true,

        field: {
            subtitle: 'FIELDS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'name', 'type', 'display_text', 'required', 'value_list', 'description', ],
            createUrl: Xolens.module.enquiry.rsc.Api.field.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.field.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rName', 'rType', 'rDisplayText', 'rRequired', 'bValueList', 'bDescription', ]
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
        form: {
            subtitle: 'FORMS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'name', 'description', 'primary_section_id', 'primary_section', ],
            createUrl: Xolens.module.enquiry.rsc.Api.form.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.form.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rName', 'bDescription', 'rSelectPrimarySection', ]
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
        enquiry: {
            subtitle: 'ENQUIRYS',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'name', 'title', 'description', 'form_id', 'form', ],
            createUrl: Xolens.module.enquiry.rsc.Api.enquiry.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.enquiry.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rName', 'rTitle', 'bDescription', 'rSelectForm', ]
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
        fieldvalue: {
            subtitle: 'FIELDVALUES',
            iconCls: 'x-fa fa-send',
            prefilled: [],
            fillables: ['id', 'section_field_id', 'section_field', 'enquiry_id', 'enquiry', 'value', ],
            createUrl: Xolens.module.enquiry.rsc.Api.fieldvalue.storeUrl,
            updateUrl: Xolens.module.enquiry.rsc.Api.fieldvalue.singleUrl,
            fieldTypes: ['hiddentoken', 'hiddenid', 'rSelectSectionField', 'rSelectEnquiry', 'bValue', ]
        },
})

