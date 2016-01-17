define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/BaseView',
    'utils'
], function ($, _, Backbone, JST, BaseView, utils) {
    'use strict';

    var MainBoxView = BaseView.extend({

        log_referer: 'MainBoxView',

        template: JST[utils.pathTpl('MainBoxView.ejs')],

        className:'main-box col-xs-12',

        events: {
            'click .entity-box':'clickEntity'
        },

        initialize:function(options){
            this.options = options || {};
            var that = this;
        },

        clickEntity:function(el){
            var $entityBox = $(el.currentTarget);
            this.log_debug("Se ha clieckeado la entidad.");
        }
    });

    return MainBoxView;
});
