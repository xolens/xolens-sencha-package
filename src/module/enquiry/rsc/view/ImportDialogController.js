Ext.define('Xolens.module.enquiry.rsc.view.ImportDialogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xolens-enquery-importdialog',

    onImporFileInputChange: function(me, value, eOpts) {
        var files = me.fileInputEl.dom.files,
            reader = new FileReader(),
            dialog = me.up('window'),
            goToImportCardButton = dialog.lookupReference('goToImportCardButton'),
            disabledTextfield = dialog.lookupReference('disabledTextfield');
        Ext.MessageBox.show({
            title: 'Veuillez Patienter',
            msg: 'Traitement de données en cours...',
            progressText: '0%',
            width: 300,
            progress: true,
            closable: false,
            animEl: 'mb6'
        });
        reader.onload = function() {
            var chunk = 1000;

            var arrayBuffer = this.result;
            /* convert data to binary string */
            var data = new Uint8Array(arrayBuffer);
            var arr = new Array();
            var i = 0;
            var index = 0;
            var dataLenght = data.length;

            function doChunk() {
                var cnt = chunk;
                while (cnt-- && i < dataLenght) {
                    arr[i] = String.fromCharCode(data[i]);
                    i++;
                    var val = i / dataLenght;
                    Ext.MessageBox.updateProgress(val, Math.round(100 * val) + '%');
                }
                if (i < dataLenght) {
                    // set Timeout for async iteration
                    setTimeout(doChunk, 1);
                } else {
                    onChunkFinished();
                }
            }

            function onChunkFinished() {
                var bstr = arr.join("");
                //* Call XLSX 
                var workbook = XLSX.read(bstr, {
                    type: "binary"
                });

                var first_sheet_name = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[first_sheet_name];
                var sheetData = XLSX.utils.sheet_to_json(worksheet, {
                    raw: true
                });
                if (sheetData != null && sheetData.length > 0) {
                    var firstRow = sheetData[0];
                    var rowKeys = Object.keys(firstRow);
                    var comboData = [];
                    for (var i in rowKeys) {
                        comboData.push(rowKeys[i]);
                    }
                    dialog.lookupReference('columnDataType').editor.store = comboData;
                    dialog.sheetData = sheetData;
                }
                goToImportCardButton.setDisabled(false);
                disabledTextfield.setValue(value);

                Ext.MessageBox.hide();
            }
            doChunk();

        }
        reader.readAsArrayBuffer(files[0]);
    },

    // -------------------------------------

    convertStoreData: function(keys, data) {

    },


    // -------------------------------------

    onWindowCloseButtonClick: function(btn) {
        this.view.close()
    },

    onGoToImportCardButtonClick: function(btn) {
        var dialog = this.view;
        var processImportCard = dialog.getComponent('processImportCard');
        var selectSheetCardData = dialog.getComponent('selectSheetCard').down('grid').store.data.items;
        var processImportCardData = [];
        var sheetData = dialog.sheetData;
        var rowKeys = [];

        for (var index in selectSheetCardData) {
            rowKeys.push(selectSheetCardData[index].data);
        }

        for (var index in sheetData) {
            item = { id: index + 1 };
            sheetDataItem = sheetData[index];
            for (var i in rowKeys) {
                alias = rowKeys[i].alias;
                key = rowKeys[i].key;
                if (alias != null) {
                    item[key] = sheetDataItem[alias]
                }
            }
            processImportCardData.push(item);
        }
        processImportCard.down('grid').store.getProxy().setData(processImportCardData);
        processImportCard.down('grid').store.load();
        this.navigateToCard('processImportCard');
    },

    goToPickSheetFileButtonClick: function(btn) {
        this.navigateToCard('selectSheetCard');
    },

    onProcessImportButtonClick: function(btn) {

    },

    navigateToCard: function(cardId) {
        var me = this.view;
        var l = me.getLayout();
        var activeCard = me.getComponent(cardId);
        l.setActiveItem(activeCard);
    },

    showNext: function() {
        this.doCardNavigation(1);
    },

    showPrevious: function(btn) {
        this.doCardNavigation(-1);
    },

    doCardNavigation: function(incr) {
        var me = this.view;
        var l = me.getLayout();
        var i = l.activeItem.id.split('card-')[1];
        var next = parseInt(i, 10) + incr;
        l.setActiveItem(next);

        me.down('#card-prev').setDisabled(next === 0);
        me.down('#card-next').setDisabled(next === 2);
    }
})