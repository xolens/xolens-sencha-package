Ext.define('Xolens.view.tab.CollapsibleDataviewTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.collapsibledataviewtab',

    onTabClick: function(tab) {
        var me = this;
        var tabview = this.view;
        if (this.collapsed() || (tab && tab.card == tabview.getActiveTab())) {
            me.collapse();
        }
    },
    collapsed: function() {
        var tabview = this.view;
        return tabview.height == tabview.headerHeight;
    },
    collapse: function(toolElm) {
        var tabview = this.view,
            height = tabview.height,
            headerHeight = tabview.headerHeight,
            fullHeight = headerHeight + tabview.contentHeight;
        var collapseTool = tabview.lookupReference('collapseTool');
        if (height == fullHeight) {
            height = headerHeight;
            collapseTool.setType('down');
        } else {
            collapseTool.setType('up');
            height = fullHeight;
        }
        tabview.setHeight(height);
    },
    dispatchTabItemSelectionChangeEvent: function(elm, selected, eOpts) {
        var currentTab = elm.view;
        this.updateTabSelection(currentTab);
        this.view.fireEvent('tabitemselectionchange', currentTab, selected);
    },
    updateTabSelection: function(currentTab) {
        var tabview = this.view;
        var tabArray = tabview.body.component.items.items;
        for (var index in tabArray) {
            var tab = tabArray[index]
            if (tab.id != currentTab.id) {
                tab.setSelection(null);
            }
        }
    },
    setSelection: function(fieldName, value) {
        var tabview = this.view;
        var tabArray = tabview.body.component.items.items;
        for (var index in tabArray) {
            var tab = tabArray[index]
            var item = tab.store.findRecord(fieldName, value);
            if (item != null) {
                tabview.setActiveTab(tab);
                tab.setSelection(item);
                return item;
            }
        }
        return null;
    }
});