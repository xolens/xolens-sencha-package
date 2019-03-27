Ext.define('Xolens.module.enquiry.rsc.Api', {
    singleton: true,

    field: {
        storeUrl: 'api/xolens/pglaraenquiry/field/index',
        singleUrl: 'api/xolens/pglaraenquiry/field/single',
        deleteUrl: 'api/xolens/pglaraenquiry/field/delete',
        tablefield: {
            storeUrl: 'api/xolens/pglaraenquiry/field/{id}/tablefield/index',
            singleUrl: 'api/xolens/pglaraenquiry/field/{id}/tablefield/single',
            deleteUrl: 'api/xolens/pglaraenquiry/field/{id}/tablefield/delete',
        },
        tablecolumn: {
            storeUrl: 'api/xolens/pglaraenquiry/field/{id}/tablecolumn/index',
            singleUrl: 'api/xolens/pglaraenquiry/field/{id}/tablecolumn/single',
            deleteUrl: 'api/xolens/pglaraenquiry/field/{id}/tablecolumn/delete',
        },
        sectionfield: {
            storeUrl: 'api/xolens/pglaraenquiry/field/{id}/sectionfield/index',
            singleUrl: 'api/xolens/pglaraenquiry/field/{id}/sectionfield/single',
            deleteUrl: 'api/xolens/pglaraenquiry/field/{id}/sectionfield/delete',
        },
    },
    section: {
        storeUrl: 'api/xolens/pglaraenquiry/section/index',
        singleUrl: 'api/xolens/pglaraenquiry/section/single',
        deleteUrl: 'api/xolens/pglaraenquiry/section/delete',
        formsection: {
            storeUrl: 'api/xolens/pglaraenquiry/section/{id}/formsection/index',
            singleUrl: 'api/xolens/pglaraenquiry/section/{id}/formsection/single',
            deleteUrl: 'api/xolens/pglaraenquiry/section/{id}/formsection/delete',
        },
        sectionfield: {
            storeUrl: 'api/xolens/pglaraenquiry/section/{id}/sectionfield/index',
            singleUrl: 'api/xolens/pglaraenquiry/section/{id}/sectionfield/single',
            deleteUrl: 'api/xolens/pglaraenquiry/section/{id}/sectionfield/delete',
        },
    },
    form: {
        storeUrl: 'api/xolens/pglaraenquiry/form/index',
        singleUrl: 'api/xolens/pglaraenquiry/form/single',
        deleteUrl: 'api/xolens/pglaraenquiry/form/delete',
        enquiry: {
            storeUrl: 'api/xolens/pglaraenquiry/form/{id}/enquiry/index',
            singleUrl: 'api/xolens/pglaraenquiry/form/{id}/enquiry/single',
            deleteUrl: 'api/xolens/pglaraenquiry/form/{id}/enquiry/delete',
        },
        formsection: {
            storeUrl: 'api/xolens/pglaraenquiry/form/{id}/formsection/index',
            singleUrl: 'api/xolens/pglaraenquiry/form/{id}/formsection/single',
            deleteUrl: 'api/xolens/pglaraenquiry/form/{id}/formsection/delete',
        },
    },
    tablefield: {
        storeUrl: 'api/xolens/pglaraenquiry/tablefield/index',
        singleUrl: 'api/xolens/pglaraenquiry/tablefield/single',
        deleteUrl: 'api/xolens/pglaraenquiry/tablefield/delete',
        tablecolumn: {
            storeUrl: 'api/xolens/pglaraenquiry/tablefield/{id}/tablecolumn/index',
            singleUrl: 'api/xolens/pglaraenquiry/tablefield/{id}/tablecolumn/single',
            deleteUrl: 'api/xolens/pglaraenquiry/tablefield/{id}/tablecolumn/delete',
        },
    },
    enquiry: {
        storeUrl: 'api/xolens/pglaraenquiry/enquiry/index',
        singleUrl: 'api/xolens/pglaraenquiry/enquiry/single',
        deleteUrl: 'api/xolens/pglaraenquiry/enquiry/delete',
        fieldvalue: {
            storeUrl: 'api/xolens/pglaraenquiry/enquiry/{id}/fieldvalue/index',
            singleUrl: 'api/xolens/pglaraenquiry/enquiry/{id}/fieldvalue/single',
            deleteUrl: 'api/xolens/pglaraenquiry/enquiry/{id}/fieldvalue/delete',
        },
    },
    formsection: {
        storeUrl: 'api/xolens/pglaraenquiry/formsection/index',
        singleUrl: 'api/xolens/pglaraenquiry/formsection/single',
        deleteUrl: 'api/xolens/pglaraenquiry/formsection/delete',
    },
    tablecolumn: {
        storeUrl: 'api/xolens/pglaraenquiry/tablecolumn/index',
        singleUrl: 'api/xolens/pglaraenquiry/tablecolumn/single',
        deleteUrl: 'api/xolens/pglaraenquiry/tablecolumn/delete',
    },
    sectionfield: {
        storeUrl: 'api/xolens/pglaraenquiry/sectionfield/index',
        singleUrl: 'api/xolens/pglaraenquiry/sectionfield/single',
        deleteUrl: 'api/xolens/pglaraenquiry/sectionfield/delete',
        fieldvalue: {
            storeUrl: 'api/xolens/pglaraenquiry/sectionfield/{id}/fieldvalue/index',
            singleUrl: 'api/xolens/pglaraenquiry/sectionfield/{id}/fieldvalue/single',
            deleteUrl: 'api/xolens/pglaraenquiry/sectionfield/{id}/fieldvalue/delete',
        },
    },
    fieldvalue: {
        storeUrl: 'api/xolens/pglaraenquiry/fieldvalue/index',
        singleUrl: 'api/xolens/pglaraenquiry/fieldvalue/single',
        deleteUrl: 'api/xolens/pglaraenquiry/fieldvalue/delete',
    },
})

