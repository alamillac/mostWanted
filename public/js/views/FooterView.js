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

    var FooterView = BaseView.extend({
        template: JST[utils.pathTpl('FooterView.ejs')],

        className:"",


        events: {
            /*'submit #loginForm': 'doLogin'*/
        }

    });

    return FooterView;
});
