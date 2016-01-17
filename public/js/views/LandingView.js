define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/BaseView',
    'views/MainBoxView',
    'utils'
], function ($, _, Backbone, JST, BaseView, MainBoxView, utils) {
    'use strict';

    var LandingView = BaseView.extend({
        template: JST[utils.pathTpl('LandingView.ejs')],

        events: {
            /*'submit #loginForm': 'doLogin'*/
        },

        initialize:function(){

            this.mainBox = new MainBoxView({type:"landing"});

        },

        render:function(){
            var html =this.template({

                mainBox : this.mainBox.render().$el.html()

            });

            this.$el.html(html);

            this.initBindModel();

            return this;
        }
    });

    return LandingView;
});
