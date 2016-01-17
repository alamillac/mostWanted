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

    var UserFormView = BaseView.extend({
        template: JST[utils.pathTpl('NewUserFormView.ejs')],

        events: {
            'submit #userForm': 'sendForm'
        },

        log_referer: "UserFormView",

        sendForm:function($el){
            this.log_debug("Creating user");
            $el.preventDefault();
            var form_data = this.getFormData($('#userForm').find('input'));
            this.model.set(form_data);
            this.model.hidePassword();
            var that = this;
            this.model.save(null, {
                error: function() {
                    that.log_debug("Error when creating user");
                },
                success: function() {
                    that.log_debug("User created successfuly");
                }
            });
        },
        getFormData:function($form){
            var unindexed_array = $form.serializeArray();
            var indexed_array = {};
            for(var i=0; i <  unindexed_array.length; i++) {
                indexed_array[unindexed_array[i].name] = unindexed_array[i].value;
            }
            return indexed_array;
        },

    });

    return UserFormView;
});
