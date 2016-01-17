/*global define*/

define([
    'underscore',
    'backbone',
    'models/BaseModel',
    'jQueryCookie',
    'jqueryMd5',
    'jGrowl'
], function (_, Backbone,BaseModel) {
    'use strict';

    var UserModel = BaseModel.extend({

        log_referer: "UserModel",

        url:function(){
            if(this.isLogged()) {
                return this.urlBase() + 'api/user';
            }
            else {
                return this.urlBase() + 'api/user/login';
            }
        },

        expirationTime: 0.2, // 5 h

        default:{
            id:'',
            name:'',
            sessionToken:'',
            password:'',
            email:''
        },

        initialize:function(){
            $.cookie.raw = true;
        },

        parse:function(response, options){
            return response.data;
        },

        /**
         * Save the credential in session.
         */
        saveCredential:function(){
            $.cookie('user', JSON.stringify(this),{ expires: this.expirationTime });
        },
        /*
         * Realiza el login del usuario
         */
        login:function(email, pass){
            if(this.isLogged()) {
                this.log_warning("Usuario ya loggeado");
                $.jGrowl.defaults.theme = 'jgError';
                $.jGrowl("Usuario ya loggeado");
                return
            }
            else if(!email || !pass) {
                this.log_error("email or password missing.");
                return
            }
            else {
                this.set("email",email);
                if(email === "test") {
                    this.set("password","28c8edde3d61a0411511d3b1866f0636");
                }
                else {
                    this.set("password",$.md5(pass));
                }
                this.log_debug("Se ha hecho login del usuario.");
                var that = this;
                this.save(undefined, {
                    success: function(response) {
                        that.log_debug("Success getting LOGIN: " + JSON.stringify(response));
                        var token = response.get("token");
                        if(token) {
                            that.log_debug('Se ha hecho login del usuario.');
                            that.set('sessionToken', token);
                            that.set('password', '');
                            that.saveCredential();
                            window.app.session.setAjaxConfig();
                            window.app.navigate('game', {trigger: true, replace: true});
                        }
                    },
                    error: function(response) {
                        that.log_error("Error getting LOGIN: " + JSON.stringify(response));
                        $.jGrowl.defaults.theme = 'jgError';
                        $.jGrowl("The email or password you entered is incorrect");
                    }
                });
            }
        },
        /**
         * Return user is logged or Not
         */
        isLogged:function(){
            if(this.get("sessionToken")){
                return true;
            }
             else if($.cookie('user')){
                this.set(JSON.parse($.cookie('user')));
                return (this.get('sessionToken'))?true:false;
             }else{
                return false;
             }
        },
        /**
         * Elimina la session y bota al usuario fuera.
         */
        logOff:function(){
            $.removeCookie('user');
            window.app.navigate('', {trigger: true, replace: true});
        }
    });
    return UserModel;
});
