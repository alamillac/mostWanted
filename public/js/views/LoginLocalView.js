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

    var LoginLocalView = BaseView.extend({
        template: JST[utils.pathTpl('LoginLocalView.ejs')],

        log_referer: 'LoginLocalView',

        events: {
            'submit #loginForm': 'doLogin'
        },

        doLogin:function($el){
            $el.preventDefault();
            this.log_debug("Making Login");
            var email = $('#userName').val();
            var pass = $('#password').val();
            window.app.session.user.login(email, pass);
        }

    });

    return LoginLocalView;
});
