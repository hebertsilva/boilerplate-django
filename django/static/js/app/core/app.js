// App machinary
(function() {
    var root = this, App, undef;

    App = Base.extend({
        constructor: function() {
            this.currentView = undef;
            this.baseView = undef;
            this.views = {};
            this.viewsList = {};

            // init current view
            $($.proxy(this, 'initView'));
        },

        pageView: function(name, o) {
            var id = o.prototype.id;
            this.views[name] = o;
            if ( id ) {
                this.viewsList[id] = name;
            }
        },

        initView: function() {
            var viewName, id;
            id = document.body.id;
            viewName = this.viewsList[id];
            if ( viewName ) {
                console.info('initView: ' + viewName);
                this.currentView = new this.views[viewName]();
            } else if( this.views.BaseView ) {
                console.info('initView: BaseView');
                this.baseView = new this.views.BaseView();
            }
        }
    });

    root.app = new App();
})();
