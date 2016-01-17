/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/BaseView',
    'utils',
    'config'
    //No se incluye
], function ($, _, Backbone, JST, BaseView, utils, config) {
    'use strict';

    var ContenderView = BaseView.extend({

        className : null,

        template: JST[utils.pathTpl('ContenderView.ejs')],

        defaults:{
            id:'',
            name:'',
            images:['']
        },

        img_max_size: 200,

        initialize:function(options){
            this.name = options.contender.name;
            this.images = options.contender.images;
            this.mid = options.contender.mid;
            this.render();
        },

        render:function(){

            var html = this.template({
                name: this.name,
                image: this.images[0].img_id,
                mid: this.mid,
                freebase_key: config._FREEBASE_API_KEY,
                img_max_size: this.img_max_size
            });

            this.$el.html(html);

            this.initBindModel();

            return this;
        }

    });

    return ContenderView;
});
