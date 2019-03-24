Ext.define('Xolens.module.enquiry.rsc.Field', {
    singleton: true,

        hiddenToken: {xtype: 'hiddenfield',name: 'token'},
        hiddenId: {xtype: 'hiddenfield',name: 'id'},
        rName: { fieldType: 'rtextfield', name: 'name', fieldLabel: 'Name'},
        bDescription: { fieldType: 'textfield', name: 'description', fieldLabel: 'Description'},
        rType: { fieldType: 'rcombofield', name: 'type', fieldLabel: 'Type' , storeUrl: Xolens.module.enquiry.rsc.Api.listUrl},
        rDisplayText: { fieldType: 'rtextfield', name: 'display_text', fieldLabel: 'DisplayText'},
        rRequired: { fieldType: 'rcombofield', name: 'required', fieldLabel: 'Required' , storeUrl: Xolens.module.enquiry.rsc.Api.listUrl},
        bValueList: { fieldType: 'textfield', name: 'value_list', fieldLabel: 'ValueList'},
        rSelectGroup: {fieldType: 'select',hiddenField: {name: 'group',},selectField: {name: 'group_id',targetDialog: 'xolens.module.enquiry.rsc.fieldgroup',fieldLabel: 'Group',}},
        rMaxRecords: { fieldType: 'rnumberfield', name: 'max_records', fieldLabel: 'MaxRecords'},
        rSelectField: {fieldType: 'select',hiddenField: {name: 'field',},selectField: {name: 'field_id',targetDialog: 'xolens.module.enquiry.rsc.fieldfield',fieldLabel: 'Field',}},
        rTitle: { fieldType: 'rtextfield', name: 'title', fieldLabel: 'Title'},
        rSelectForm: {fieldType: 'select',hiddenField: {name: 'form',},selectField: {name: 'form_id',targetDialog: 'xolens.module.enquiry.rsc.fieldform',fieldLabel: 'Form',}},
        rSelectSectionField: {fieldType: 'select',hiddenField: {name: 'section_field',},selectField: {name: 'section_field_id',targetDialog: 'xolens.module.enquiry.rsc.fieldsectionField',fieldLabel: 'SectionField',}},
        rPosition: { fieldType: 'rnumberfield', name: 'position', fieldLabel: 'Position'},
        rSelectSection: {fieldType: 'select',hiddenField: {name: 'section',},selectField: {name: 'section_id',targetDialog: 'xolens.module.enquiry.rsc.fieldsection',fieldLabel: 'Section',}},
        rSelectParticipant: {fieldType: 'select',hiddenField: {name: 'participant',},selectField: {name: 'participant_id',targetDialog: 'xolens.module.enquiry.rsc.fieldparticipant',fieldLabel: 'Participant',}},
        rSelectEnquiry: {fieldType: 'select',hiddenField: {name: 'enquiry',},selectField: {name: 'enquiry_id',targetDialog: 'xolens.module.enquiry.rsc.fieldenquiry',fieldLabel: 'Enquiry',}},
        bState: { fieldType: 'combofield', name: 'state', fieldLabel: 'State' , storeUrl: Xolens.module.enquiry.rsc.Api.listUrl},
        rCreateTime: { fieldType: 'rtextfield', name: 'create_time', fieldLabel: 'CreateTime'},
        bUpdateTime: { fieldType: 'textfield', name: 'update_time', fieldLabel: 'UpdateTime'},
        bValidationTime: { fieldType: 'textfield', name: 'validation_time', fieldLabel: 'ValidationTime'},
        rSelectTableField: {fieldType: 'select',hiddenField: {name: 'table_field',},selectField: {name: 'table_field_id',targetDialog: 'xolens.module.enquiry.rsc.fieldtableField',fieldLabel: 'TableField',}},
})
