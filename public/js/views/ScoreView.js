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

    var ScoreView = BaseView.extend({
        className : null,

        template: JST[utils.pathTpl('ScoreView.ejs')],

        initialize:function(){
            this.render();
            this.listenTo(this.model, 'change', this.renderBecauseModelChange);  //update the score when the game model change
        },

        renderBecauseModelChange: function() {
            this.log_debug("Game model updated -> score updated");
            this.render();
        },

        render:function(){

            var html = this.template({
                errors: this.model.get('errors'),
                lives: this.model.get('lives'),
                score: Math.round(this.model.get('total_score')),
                ranking: 0
            });

            this.$el.html(html);

            this.initBindModel();

            return this;
        }

    });

    return ScoreView;
});
