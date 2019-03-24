Ext.define('Xolens.module.enquiry.ContentView', {
    extend: 'Xolens.view.ContentView',
    controller: 'enquiry-contentview',

    context:{
        Api: Xolens.module.enquiry.rsc.Api,
        Button: Xolens.module.enquiry.rsc.Button,
        Column: Xolens.module.enquiry.rsc.Column,
        Content: Xolens.module.enquiry.rsc.Content,
        Dialog: Xolens.module.enquiry.rsc.Dialog,
        Field: Xolens.module.enquiry.rsc.Field,
        Form: Xolens.module.enquiry.rsc.Form,
    }
});
