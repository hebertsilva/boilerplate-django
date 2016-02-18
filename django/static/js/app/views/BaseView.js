app.pageView('BaseView', Base.extend({
    constructor: function() {
        this.body = $('body');
        this.win = $(window);
        this.onAjaxError();
        this.initPlugins();
        this.initEvents();
    },

    initEvents: function() {
    },

    setupPlugin: function(selector, pluginName, options) {
        if ( $.fn[pluginName] ) {
            $(selector)[pluginName]( options );
        } else {
            console.error('jQuery.' + pluginName + ' not found!');
        }
    },

    initPlugins: function() {
        app.applyMasks();
    },

    updateSelect: function() {
        $('select').SelectSkin('update');
    },

    onAjaxError: function () {
        $( document ).ajaxError(function(event, jqxhr) {
            app.modal.error('Ocorreu um erro no servidor<br> Erro:' + jqxhr.status + ' - ' + jqxhr.statusText );
        });
    }
}));
