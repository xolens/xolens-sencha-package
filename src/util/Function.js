Ext.define('Xolens.util.Function', {
    singleton: true,

    openInNewTab: function(url, params = {}, method = 'get') {
        var token = Xolens.Storage.getToken();
        var form = document.createElement('form');
        var formField;
        params.token = token;
        for (var key in params) {
            formField = document.createElement('input');
            formField.setAttribute('type', 'text');
            formField.setAttribute('name', key);
            formField.setAttribute('value', params[key]);
            form.appendChild(formField);
        }
        form.setAttribute('method', method);
        form.setAttribute('action', url);
        form.setAttribute('target', '_blank');

        document.body.appendChild(form);
        form.submit();
        form.parentNode.removeChild(form);
        Xolens.util.Function.resetLogoutTimer();
    },

    onAjaxSuccess: function(response, opts) {
        try {
            var store = opts.store,
                jsonResponse = Ext.JSON.decode(response.responseText);
            store.load();
            if (jsonResponse.success) {
                Ext.toast('Opération effectuée avec succes');
            } else {
                Ext.Msg.alert('Echec de l\'opération', jsonResponse.errors);
            }
        } catch (error) {
            this.onAjaxFailure(response, opts);
        }
    },
    onAjaxFailure: function(response, opts) {
        var loadMask = opts.loadMask;
        if (loadMask) {
            loadMask.setVisible(false);
        }
        Ext.Msg.alert('REMOTE EXCEPTION', 'Status code: ' + response.status + '<br/>' + 'Status text: ' + response.statusText);
    },
    clone: function(src) {
        // recurssive implementation
        if (src != null) {
            var clone, me = this;
            if (Ext.isArray(src)) {
                clone = [];
                for (var i = 0; i < src.length; i++) {
                    clone.push(me.clone(src[i]))
                }
            } else if (Ext.isObject(src)) {
                clone = {};
                for (var key in src) {
                    clone[key] = me.clone(src[key]);
                }
            } else {
                clone = src;
            }
            return clone;
        }
        return null;
    },
    formatArrayAsUlist: function(array) {
        var uList = '<ul>';
        for (var i = 0; i < array.length; i++) {
            uList += '<li>' + array[i] + '</li>';
        }
        uList += '</ul>';
        return uList
    },
    showProgressDialog: function() {
        Ext.MessageBox.show({
            title: 'Veillez Patienter',
            msg: 'Mise a jour en cours...',
            progressText: 'Mise a jour...',
            width: 300,
            progress: true,
            closable: false,
            animEl: 'mb6'
        });
    },
    updateProgress: function(val, total) {
        if (val == total) {
            Ext.MessageBox.hide();
        } else {
            var i = val / total;
            Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '% Terminé');
        }
    },
    doConfirmLogout: function() {
        var me = this;
        Ext.MessageBox.show({
            title: 'Deconnexion',
            msg: 'Terminer la session active.',
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function(btn) {
                if (btn == 'ok') {
                    me.doLogout();
                }
            }
        });
    },
    doLogout: function() {
        Ext.Ajax.request({
            async: false,
            url: Xolens.Api.admin.auth.logout.logoutUrl,
        });
        Xolens.Storage.clearStorage();
        location.reload();
    },


    resetLogoutTimer: function() {
        Xolens.Storage.setLogoutTimer(0);
    },

    startTokenAutoRefresh: function() {
        this.refreshToken();
        var descripteur = setInterval(this.refreshToken, Xolens.Config.refreshPeriod * Xolens.Storage.getConfigSessionDuration());
        Xolens.Storage.setLogoutTimerDescriptor(descripteur);
        Xolens.Storage.setLogoutTimer(0);
    },
    isUserConnected: function() {
        return Xolens.Storage.isValidSession();
    },
    isPublicUserConnected: function() {
        return Xolens.Storage.isPublicUserConnected();
    },

    startPublicTokenAutoRefresh: function() {
        this.refreshPublicToken();
        var descripteur = setInterval(this.refreshPublicToken, Xolens.Config.refreshPeriod * Xolens.Storage.getConfigSessionDuration());
        Xolens.Storage.setPublicLogoutTimerDescriptor(descripteur);
        Xolens.Storage.setPublicLogoutTimer(0);
    },
    refreshPublicToken: function() {
        var token = Xolens.Storage.getPublicToken();
        Ext.Ajax.request({
            url: Xolens.Api.util.auth.refreshUrl,
            params: { isRefreshToken: true, public_token: Xolens.Storage.getPublicToken() },
            success: function(response, opts) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    Xolens.Storage.setPublicToken(data.token);
                    Xolens.util.Function.updatePublicLogoutTimer();
                } else {
                    Xolens.util.Function.endPublicUserSession();
                }
            },
            failure: function(response, opts) {
                Xolens.util.Function.endPublicUserSession();
            }
        });
    },
    refreshToken: function() {
        var token = Xolens.Storage.getToken();
        Ext.Ajax.request({
            url: Xolens.Api.admin.auth.token.refreshUrl,
            params: { isRefreshToken: true },
            success: function(response, opts) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    Xolens.Storage.setToken(data.token);
                    Xolens.util.Function.updateLogoutTimer();
                } else {
                    Xolens.util.Function.endUserSession();
                }
            },
            failure: function(response, opts) {
                Xolens.util.Function.endUserSession();
            }
        });
    },
    endUserSession: function() {
        clearInterval(Xolens.Storage.getLogoutTimerDescriptor());
        Xolens.Storage.clearStorage();
        Ext.Msg.show({
            title: 'Votre session a expiré',
            message: 'Veuillez vous connecter a nouveau.',
            buttons: Ext.Msg.OK,
            closable: false,
            icon: Ext.Msg.INFO,
            fn: function(btn) {
                Xolens.util.Function.doLogout();
            }
        });
    },
    endPublicUserSession: function() {
        clearInterval(Xolens.Storage.getPublicLogoutTimerDescriptor());
        Ext.Msg.show({
            title: 'Votre session a expiré',
            message: 'Veuillez vous connecter a nouveau.',
            buttons: Ext.Msg.OK,
            closable: false,
            icon: Ext.Msg.INFO,
            fn: function(btn) {
                Xolens.util.Function.doPublicLogout();
            }
        });
    },
    updatePublicLogoutTimer: function() {
        var currentValue = parseInt(Xolens.Storage.getPublicLogoutTimer());
        if (currentValue == Xolens.Storage.getConfigSessionDuration()) {
            this.endPublicUserSession();
        } else {
            Xolens.Storage.setPublicLogoutTimer(currentValue + 1);
        }
    },
    updateLogoutTimer: function() {
        var currentValue = parseInt(Xolens.Storage.getLogoutTimer());
        if (currentValue == Xolens.Storage.getConfigSessionDuration()) {
            this.endUserSession();
        } else {
            Xolens.Storage.setLogoutTimer(currentValue + 1);
        }
    },
    performPublicLogin: function(resp) {
        var user = resp.response.user;
        Xolens.Storage.setPublicToken(user.token);
        Xolens.Storage.setPublicCategory(user.category);
        Xolens.Storage.setConfigSessionDuration(6);
        Xolens.Storage.setPublicUserPhotoSrc('resources/img/default-user.png');
        location.reload();
    },
    lougoutPublicUser: function() {
        var me = this;
        Ext.MessageBox.show({
            title: 'Deconnexion',
            msg: 'Terminer la session active.',
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function(btn) {
                if (btn == 'ok') {
                    me.doPublicLogout();
                }
            }
        });
    },
    doPublicLogout: function() {
        Ext.Ajax.request({
            async: false,
            params: { public_token: Xolens.Storage.getPublicToken() },
            url: Xolens.Api.util.auth.logoutUrl,
        });
        Xolens.Storage.setPublicToken(null);
        Xolens.Storage.setPublicCategory(null);
        Xolens.Storage.setPublicUserPhotoSrc('resources/img/default-user.png');
        window.location.hash = Xolens.Route.home.base;
        location.reload();
    },
});