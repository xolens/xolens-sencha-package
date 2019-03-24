Ext.define('Xolens.view.dialog.form.FormDialogController', {
    extend: 'Xolens.view.ContentViewController',
    alias: 'controller.formdialog',

    markMandatoryFields: function(field, options) {
        if (field && field.isFieldLabelable && field.fieldLabel && field.allowBlank == false) {
            field.afterLabelTextTpl = [
                '<span style="color:red;font-weight:bold" data-qtip="Ce champ est obligatoire !">*</span>'
            ]
        }
    },

    init: function() {
        this.control({
            "field": {
                beforerender: this.markMandatoryFields
            }
        });
    },
    displaySelectionDialog: function(source) {
        var view = this.view,
            parentView = view.parentView,
            dialogType = source.targetDialog,
            dialog = parentView.dialogs[dialogType];
        if (!dialog) {
            dialog = parentView.dialogs[dialogType] = Xolens.Maker.createSelectDialog(Xolens.GridContent[dialogType]);
        }
        dialog.close();
        dialog.displaySelect(view, source);
    },

    submitFormAndNext: function(source) {
        this.submitForm(source, { reset: false, continue: true });
    },
    submitFormAndNew: function(source) {
        this.submitForm(source, { reset: true, continue: true });
    },
    submitForm: function(source, options = { reset: true, continue: false }) {
        var view = this.view,
            parentView = view.parentView;
        form = view.down('form');
        if (form.isValid()) {
            form.submit({
                waitMsg: 'Loading...',
                method: 'POST',
                url: form.url,
                submitEmptyText: false,
                success: function(form, action) {
                    var item = null;
                    try {
                        var data = Ext.JSON.decode(action.response.responseText);
                        item = data.item;
                    } catch (error) {}
                    if (options.reset) {
                        form.reset();
                    }
                    if (!options.continue) {
                        view.close();
                    }
                    if (parentView.store) {
                        parentView.store.load();
                    }
                    Ext.toast('Opération effectuée avec succes');
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Echec de l\'opération', action.result ? Xolens.util.Function.formatArrayAsUlist(action.result.errors) : 'Le serveur n\'a pas repondu');
                }
            });
        } else {
            Ext.Msg.alert('Erreur !', 'Certains champs du formulaire sont invalides');
        }
    }
});