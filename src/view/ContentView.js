Ext.define('Xolens.view.ContentView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contentview',
    controller: 'contentview',
    
    requires: [
        'Ext.panel.Panel',
        'Ext.layout.container.Border',
        'Ext.toolbar.Paging',
        'Ext.ux.PreviewPlugin',
        'Ext.grid.filters.Filters',
    ],
    layout: 'border',

    defaults: {
        split: true,
        collapsible: true,
        floatable: false,
        scrollable: 'y'
    },
    padding: 3,
    style: 'background-color: #3892d4',
    viewConfig: {}, // 
    height: 400,
    reservedHeight: 0,
    items: [],

    initComponent: function() {
        var me = this,
            viewConfig = me.viewConfig,
            items = [];

        if (viewConfig.center && Ext.isObject(viewConfig.center)) {
            items.push(Xolens.builder.Builder.makeContentView(me.context, viewConfig.center, {
                collapsible: false,
                region: 'center',
            }));
        }
        if (viewConfig.left && Ext.isObject(viewConfig.left)) {
            items.push(Xolens.builder.Builder.makeContentView(me.context, viewConfig.left, {
                region: 'west',
                width: 420,
                minWidth: 100,
            }));
        }
        if (viewConfig.right && Ext.isObject(viewConfig.right)) {
            items.push(Xolens.builder.Builder.makeContentView(me.context, viewConfig.right, {
                region: 'east',
                width: 300,
                minWidth: 100,
            }));
        }
        if (viewConfig.top && Ext.isObject(viewConfig.top)) {
            items.push(Xolens.builder.Builder.makeContentView(me.context, viewConfig.top, {
                region: 'north',
                height: 300,
                minHeight: 50,
            }));
        }
        if (viewConfig.bottom && Ext.isObject(viewConfig.bottom)) {
            items.push(Xolens.builder.Builder.makeContentView(me.context, viewConfig.bottom, {
                region: 'south',
                height: 300,
                minHeight: 50,
            }));
        }
        Ext.apply(me, { items: items })
        this.callParent(arguments);
    },
});