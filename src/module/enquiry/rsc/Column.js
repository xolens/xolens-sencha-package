Ext.define('Xolens.module.enquiry.rsc.Column', {
    singleton: true,

    name: { text: 'Name', dataIndex: 'name', minWidth: 200, flex:1 },
    type: { text: 'Type', dataIndex: 'type', minWidth: 200,  },
    displaytext: { text: 'DisplayText', dataIndex: 'display_text', minWidth: 200,  },
    required: { text: 'Required', dataIndex: 'required', minWidth: 200,  },
    valuelist: { text: 'ValueList', dataIndex: 'value_list', minWidth: 200,  },
    description: { text: 'Description', dataIndex: 'description', minWidth: 200,  },
    primarysection:{ text: 'Informations section' ,columns:[{ text: 'Name', dataIndex: 'section_name', minWidth: 200},]},
    maxrecords: { text: 'MaxRecords', dataIndex: 'max_records', minWidth: 200,  },
    field:{ text: 'Informations field' ,columns:[{ text: 'Name', dataIndex: 'field_name', minWidth: 200},]},
    title: { text: 'Title', dataIndex: 'title', minWidth: 200, flex:1 },
    form:{ text: 'Informations form' ,columns:[{ text: 'Name', dataIndex: 'form_name', minWidth: 200},]},
    position: { text: 'Position', dataIndex: 'position', minWidth: 200,  },
    section:{ text: 'Informations section' ,columns:[{ text: 'Name', dataIndex: 'section_name', minWidth: 200},]},
    tablefield:{ text: 'Informations table field' ,columns:[{ text: 'Name', dataIndex: 'table_field_name', minWidth: 200},]},
    sectionfield:{ text: 'Informations section field' ,columns:[]},
    enquiry:{ text: 'Informations enquiry' ,columns:[{ text: 'Name', dataIndex: 'enquiry_name', minWidth: 200},{ text: 'Title', dataIndex: 'enquiry_title', minWidth: 200},]},
    value: { text: 'Value', dataIndex: 'value', minWidth: 200,  },
})

