/*global define*/

define([
    'underscore',
    'backbone',
    'config',
    'log'
], function (_, Backbone, config) {
    'use strict';

    var BaseModel = Backbone.Model.extend({

        log_referer: 'BaseModel',

        defaults: {
        },

        urlBase: function() {
            if(typeof config.URLBASE === 'undefined') {
                return '';
            }
            return config.URLBASE;
        },

        log: function(log_text, log_object) {
            Log.log(Log.INFO, this.log_referer, log_text, log_object);
        },

        log_debug: function(log_text, log_object) {
            Log.log(Log.DEBUG, this.log_referer, log_text, log_object);
        },

        log_warning: function(log_text, log_object) {
            Log.log(Log.WARNING, this.log_referer, log_text, log_object);
        },

        log_error: function(log_text, log_object) {
            Log.log(Log.ERROR, this.log_referer, log_text, log_object);
        }

    });

    return BaseModel;
});
