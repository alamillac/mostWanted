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

    var SideBarView = BaseView.extend({
        template: JST[utils.pathTpl('SideBarView.ejs')],

        tagName:"ul",
        className:"sidebar-nav",

        events: {
            /*'submit #loginForm': 'doLogin'*/
        },

        initialize:function(){

            window.Events.on('Header::toggleSidebar',this.toggleSidebar, this);
        },

        unBindEvents: function () {
            window.Events.off('view::showWaitingModal', this.toggleSidebar, this);
        },

        beforeClose:function(){

            this.unBindEvents();

        },
        toggleSidebar:function(){
            $("#wrapper").toggleClass("toggled");
        }

    });

    return SideBarView;
});
