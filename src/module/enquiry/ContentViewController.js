Ext.define('Xolens.module.enquiry.ContentViewController', {
    extend: 'Xolens.view.ContentViewController',
    alias: 'controller.enquiry-contentview',

    enqueryOnImportButtonClick: function(btn){
        var parentView = btn.up('grid')
        var importDialog;
        if(!parentView.dialog){
            parentView.dialog={};
        }
        if(!parentView.dialog.importDialog){
            parentView.dialog.importDialog = Ext.create('Xolens.module.enquiry.rsc.view.ImportDialog',{
                parentView: parentView,
            });
        }
        importDialog = parentView.dialog.importDialog;
        importDialog.show();
    },
});
