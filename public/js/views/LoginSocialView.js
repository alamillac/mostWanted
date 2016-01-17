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

    var LoginSocialView = BaseView.extend({
        template: JST[utils.pathTpl('LoginSocialView.ejs')],

        log_referer: 'LoginSocialView',

        events: {
            'click ._login_twitter': 'loginTwitter',
            'click ._login_facebook': 'loginFacebook',
            'click ._login_local': 'loginLocal'
        },

        loginTwitter:function($el){
            $el.preventDefault();
            this.log_debug("Login with Twitter");
            //TODO
        },

        loginFacebook:function($el){
            $el.preventDefault();
            this.log_debug("Login with Facebook");
            //TODO
        },

        loginLocal:function($el){
            $el.preventDefault();
            this.log_debug("Login local");
            window.app.navigate('login_local', {trigger: true});
        }

    });

    return LoginSocialView;
});
