/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'modelBinder',
    'log'

], function ($, _, Backbone) {
    'use strict';

    var BaseView = Backbone.View.extend({

        className : 'row',

        log_referer: 'BaseView',

        _modelBinder:undefined,

        initialize:function(options){
            this.options = options || {};
            this._modelBinder = new Backbone.ModelBinder();
            this.childViews = [];
            this.childCollections = [];

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
        },

        /**
         * General Render
         * @returns {*}
         */
        render:function(){

            var html =this.template();

            this.$el.html(html);

            this.initBindModel();

            return this;
        },
        /**
         * Defined in View.
         */
        afterRender:function(){

        },
        /**
         * Defined in View.
         */
        initBindModel:function(){},
        /**
         * Pinta la vista en elemento a contener.
         * @param contentElemnt
         */
        showView:function (contentElemnt){
            this.contentElement = contentElemnt;
            $(this.contentElement).html(this.render().$el);
            this.afterRender();

        },
        /**
         * Close the View.
         */
        close:function(){
            if(this._modelBinder)
                this._modelBinder.unbind();
            if(this.beforeClose){
                this.beforeClose();
            }

            //ref: http://stackoverflow.com/questions/7379263/disposing-of-view-and-model-objects-in-backbone-js#answer-19074549

            // first loop through childViews[] if defined, in collection views
            //  populate an array property i.e. this.childViews[] = new ControlViews()
            if (this.childViews) {
                _.each(this.childViews, function (child) {
                    child.close();
                });
            }

            // close all child views that are referenced by property, in model views
            //  add a property for reference i.e. this.toolbar = new ToolbarView();
            for (var prop in this) {
                if (this[prop] instanceof Backbone.View) {
                    this[prop].close();
                }
            }

            if (this.childCollections) {
                _.each(this.childCollections, function (child) {
                    child.off(null, null, this);
                });
            }

            // close all child Collections that are referenced by property, in model views
            //  add a property for reference i.e. this.mainCollection = new ItemCollection();
            for (var prop in this) {
                 if (this[prop] instanceof Backbone.Collection) {
                     this[prop].off(null, null, this);
                 }
             }




            this.remove();
            this.undelegateEvents();
        },
        /**
         * Reload the view.
         */
        reloadView:function(){
            this.render();
            this.afterRender();
        },

    });

    return BaseView;
});
