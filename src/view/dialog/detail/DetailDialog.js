Ext.define('Xolens.view.dialog.detail.DetailDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.detaildialog',
    controller: 'detaildialog',
    requires: [
        'Xolens.util.Function',
        'Ext.layout.container.Border',
        'Ext.layout.container.Card'
    ],
    modal: true,
    floating: true,
    closable: true,
    maximizable: true,
    monitorValid: true,
    resizable: true,
    centered: true,
    constrainHeader: true,

    closeAction: 'hide',
    width: '90%',
    height: '90%',

    detailTitle: '[ ? ] Informations associées',

    data: null,
    dataProperties: null,
    subtitle: '',
    filterData: null,

    layout: 'fit',
    buttons: [Xolens.builder.component.Button.dialogCloseBtn],
    initComponent: function() {
        var me = this,
            items = [],
            tabitems = me.tabitems || [],
            context = me.context;
        items.push(Xolens.builder.Builder.makeContentView(context, {
            columns: ['datailkey', 'datailvalue'],
        }, {
            iconCls: 'x-fa fa-question',
            title: 'Détails',
            xtype: 'grid',
            itemId: 'primaryTab',
            selModel: null,
            store: { xtype: 'store', data: [] },
        }));
        Ext.Array.forEach(tabitems, function(item) {
            var tabItemView = Xolens.builder.Builder.makeContentView(context, item.viewtype, item.config, item.overrides);

            tabItemView.storeUrl = item.overrides.content.storeUrl;
            tabItemView.deleteUrl = item.overrides.content.deleteUrl;
            var form = tabItemView.form;

            if (form && item.overrides && item.overrides.form) {
                form.createUrlTpl = item.overrides.form.createUrl;
                form.updateUrlTpl = item.overrides.form.updateUrl;
            }
            Ext.apply(tabItemView, item.overrides.content.extraConfig);
            items.push(tabItemView);
        });
        Ext.apply(me, {
            items: {
                xtype: 'tabpanel',
                items: items
            },
            title: me.detailTitle.replace('?', me.subtitle),
        })
        this.callParent(arguments);
    },
    xhooks: {
        displayDetail: function(parentView, record) {
            var me = this,
                tabpanel = me.down('tabpanel'),
                primaryTab = tabpanel.getComponent("primaryTab"),
                tabpanelItems = tabpanel.items.items,
                dataProperties = me.dataProperties,
                data = [],
                recordData = record.data,
                id = recordData.id;

            me.filterData = recordData;

            if (parentView.isWindow || parentView.up('window')) {
                me.resize(parentView.height, parentView.width);
            }
            me.data = recordData;
            for (var key in dataProperties) {
                data.push({ key: dataProperties[key], value: recordData[key] });
            }
            for (var i = 0; i < tabpanelItems.length; i++) {
                var tabpanelItem = tabpanelItems[i];
                tabpanelItem.scrollTo(0, 0, true);
                tabpanelItem.setSelection(null);
                me.updateStoreUrl(tabpanelItem, id);
                var form = tabpanelItem.form;
                if (form) {
                    form.createUrl = form.createUrlTpl.replace('{id}', id);
                    form.updateUrl = form.updateUrlTpl.replace('{id}', id);
                }
            }
            tabpanel.setActiveItem(0);
            primaryTab.getStore().loadData(data);
            me.show();
        },
        resize: function(parentHeight, parentWidth) {
            var newHeight, newWidth;
            parentHeight = parentHeight || '90%';
            parentWidth = parentWidth || '90%';
            newHeight = (parseInt(parentHeight, 10) - 5) + '%';
            newWidth = (parseInt(parentWidth, 10) - 5) + '%';
            this.setWidth(newWidth);
            this.setHeight(newHeight);
        },
        updateStoreUrl: function(tabItem, id) {
            var urlPatern = tabItem.storeUrl;
            if (urlPatern) {
                var url = urlPatern.replace('{id}', id);
                tabItem.store.proxy.setUrl(url);
                tabItem.store.clearFilter(true);
                tabItem.store.load();
            }
        },

    },
});