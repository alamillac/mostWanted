/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/BaseView',
    'utils'
], function ($, _, Backbone, JST, BaseView, utils) {
    'use strict';

    var HeaderView = BaseView.extend({
        template: JST[utils.pathTpl('HeaderView.ejs')],

        tagName: "nav",
        className:"navbar navbar-default",

        events: {
            'click #menu-toggle': 'toggleSidebar'
        },

        toggleSidebar:function(event){
            event.preventDefault();
            console.log("Toggle menu");
            window.Events.trigger("Header::toggleSidebar");
        }


    });

    return HeaderView;
});
