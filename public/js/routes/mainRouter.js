/*global define*/

define([
    'jquery',
    'backbone',
    'views/LandingView',
    'views/UserFormView',
    'views/GameView',
    'views/HeaderView',
    'views/SideBarView',
    'views/FooterView',
    'views/LoginLocalView',
    'views/LoginSocialView',
    'models/UserModel',
    'models/UserFormModel',
    'models/Session',
    'utils'
], function ($, Backbone,LandingView, UserFormView, GameView,HeaderView,SideBarView,FooterView, LoginLocalView, LoginSocialView, UserModel, UserFormModel, Session, utils) {
    'use strict';

    var MainRouter = Backbone.Router.extend({

        initialize:function(){
            this.session = new Session({user:new UserModel()});
        },

        routes: {
            "": "landing",
            "game": "index",
            "login": "login",
            "login_local": "loginLocal",
            "user/new": "newUser",
            "show/:id": "show",
            '*notFound': 'notFound'
        },

        /**
         * Not found Page.
         */
        notFound:function(){
            location.href="404.html";
        },

        /**
         * Muestra el tipo de vista pasada como parametro en el main content
         * @param newView - Vista nueva a renderear
         * @param options - parametros a pasar a la vista ej. var opt = {model:this.model,type:"prueba"}
         */
        showInMainView:function(newView,options){
            this.showView(this.mainView,newView,'.main-content',options);
        },

        /**
         * Muestra una vista de forma general.
         * @param oldView
         * @param newView
         * @param container
         * @param options
         */
        showView:function(oldView,newView,container,options){
            if(oldView)oldView.close();
            options ? oldView = new newView(options): oldView = new newView();
            oldView.showView(container);
        },

        /**
         * Show landing
         */
        landing:function(){
            this.showLayout();
            this.showInMainView(LandingView);
        },

        game:function(){
            this.showLayout();
            this.showInMainView(GameView);
        },

        index:function(){
            if(this.session.user.isLogged()) {
                this.game();
            }
            else {
                this.navigate('login', {trigger: true, replace: true});
            }
        },

        login:function(){
            var loginView = new LoginSocialView();
            this.showLayout();
            loginView.showView('.main-content');
        },

        loginLocal:function(){
            var loginView = new LoginLocalView();
            this.showLayout();
            loginView.showView('.main-content');
        },

        newUser:function(){
            var view = new UserFormView({model: new UserFormModel()});
            view.showView('.main-content');
        },

        _showWaiting:function(zIndex){

            var $modal =  $('#loadingModal');
            utils.consoleDebug('waiting zIndex: '+zIndex);

            this.waitingCount++;
            utils.consoleDebug("Se MOSTRO el waiting:" + this.waitingCount);

            if (this.waitingCount == 1) {
                $modal.modal('show');
            }
            else if (this.waitingCount <= 0) {
                this.waitingCount = 0;
            }
            $modal.parent().css('z-index', zIndex * 10);
        },

        /**
         *  Oculta el waiting
         * */
        _hideWaiting:function(){

            var $modal =  $('#loadingModal');

            console.log("Se OCULTO el waiting:" + this.waitingCount);
            this.waitingCount--;
            if (this.waitingCount === 0) {
                $modal.modal('hide');
            }
            else if (this.waitingCount < 0) {
                console.log("Se ha oculto el Loading mas veces que la que se mostro");
            }
        },

        showLayout:function(){
            this.showView(this.header,HeaderView,'.header',undefined);
            this.showView(this.sidebar,SideBarView,'#sidebar-wrapper',undefined);
            this.showView(this.footer,FooterView,'.footer',undefined);
        }
    });

    return MainRouter;
});
