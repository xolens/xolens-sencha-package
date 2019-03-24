Ext.define('Xolens.view.tab.CollapsibleDataviewTab', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.collapsibledataviewtab',
    controller: 'collapsibledataviewtab',
    requires: [
        'Ext.layout.container.Card',
        'Xolens.view.tab.CollapsibleDataviewTabController',
    ],

    height: 135,
    headerHeight: 35, // Read only, for internal use
    dataviewConfig: {},
    contentHeight: null, // Read only, for internal use
    tpl: null, // Null value to use default tpl
    itemSelector: null, // Null value to use default itemSelector
    defaults: {
        tabConfig: {
            listeners: {
                click: 'onTabClick'
            }
        }
    },
    initComponent: function() {
        var me = this,
            headerHeight = 35,
            contentHeight = me.height,
            tabItems = me.tabItems,
            items = [],
            defaultConfig = {
                singleSelect: true,
                layout: 'hbox',
                scrollable: 'y',
                itemSelector: 'div.thumb-wrap',
                overItemCls: 'x-view-over',
                overItemCls: 'x-view-over',
                userCls: 'app-mainmenu-dataview',
                tpl: [
                    '<tpl for=".">',
                    '<tpl if="can_access || access_is_public">',
                    '<div class="thumb-wrap">',
                    '<tpl else>',
                    '<div class="thumb-wrap thumb-disabled">',
                    '</tpl>',
                    '<div class="thumb">',
                    '<img class="viewimg" src="resources/images/menu/{thumb}" />',
                    '</div>',
                    '<span><b>{name}</b></span>',
                    '</div>',
                    '</tpl>'
                ],
            };
        Ext.applyIf(defaultConfig, me.dataviewConfig);
        tabItems.forEach(element => {
            var store = Ext.data.StoreManager.lookup(element.storeId);
            if (store.data.length > 0) {

                dataviewElm = {
                    title: element.title,
                    itemId: element.itemId,
                    itemData: element,
                    xtype: 'dataview',
                    //store: Xolens.Maker.makeMenuStore(element.storeUrl),
                    store: element.storeId,
                    listeners: {
                        selectionchange: 'dispatchTabItemSelectionChangeEvent',
                        beforeselect: function(selModel, record) {
                            var data = record.data;
                            return (data.can_access || data.access_is_public);
                        }
                    }
                };
                Ext.apply(dataviewElm, defaultConfig);
                items.push(dataviewElm);
            }
        });
        Ext.apply(me, { bodyPadding: 0 })
        Ext.apply(me, { collapsible: false })
        Ext.apply(me, { floatable: false })
        Ext.apply(me, { split: false })
        Ext.apply(me, { items: items })
        Ext.apply(me, { contentHeight: contentHeight })
        Ext.apply(me, { height: headerHeight + contentHeight })
        Ext.apply(me, { headerHeight: headerHeight })
        this.callParent(arguments);
    },

    tabBar: {
        items: [{
            xtype: 'tbfill',
            listeners: {
                element: 'el',
                dblclick: 'collapse'
            }
        }, {
            xtype: 'tool',
            type: 'up',
            margin: 7,
            reference: 'collapseTool',
            handler: 'collapse'
        }]
    },
    setSelection: function(fieldName, value) {
        this.controller.setSelection(fieldName, value);
    }
});