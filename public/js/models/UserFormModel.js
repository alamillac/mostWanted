/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'models/BaseModel',
    /*No se incluye*/
    'jqueryMd5',
], function ($, _, Backbone,BaseModel) {
    'use strict';

    var UserFormModel = BaseModel.extend({

        url:function(){
            return this.urlBase() + 'api/user';
        },

        validation: {
            name: {
                required: true
            },
            email: {
                required: true,
                pattern: 'email'
            },
            password: {
                minLength: 8
            },
            repeatPassword: {
                equalTo: 'password',
                msg: 'The passwords does not match'
            },
            terms: {
                acceptance: true
            }
        },

        hidePassword:function() {
            var shadowPassword = $.md5(this.get('password'));
            this.set({'password': shadowPassword});
            this.unset('repeatPassword');
        }
    });
    return UserFormModel;
});
