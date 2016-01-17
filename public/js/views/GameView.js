/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/BaseView',
    'views/ContenderView',
    'views/ScoreView',
    'models/GameModel',
    'utils',
    'config',
    //No se incluye
    'jFlotCurved',
    'jPieTimer'
], function ($, _, Backbone, BaseView, ContenderView, ScoreView, GameModel, utils, config) {
    'use strict';

    var GameView = BaseView.extend({
        template: JST[utils.pathTpl('GameView.ejs')],
        model: new GameModel(),
        log_referer: 'GameView',
        scoreView: null,

        events: {
            'click ._next_match': 'change_match',
            'click ._contender': 'choose',
            'click ._results.show_results': 'moreDetails'
        },

        initialize:function(){
            this.getNewGame();
            this.initScoreView();
        },

        initScoreView: function() {
            var $headerScore = $('.header-right');
            this.scoreView = new ScoreView({ el: $headerScore, model: this.model });
        },

        updateScore: function() {
            this.scoreView.render();
        },

        getNewGame: function() {
            var that = this;
            this.model.fetch({
                success:function(model, response) {
                    that.showContenders(model.get("last_match").contenders);
                    that.createTimer();
                    //that.updateScore();
                }
            });
        },

        /*
         * Create a timer that will indicate the remaining time to answer the question
         */
        createTimer: function() {
            //https://github.com/knorthfield/pietimer/
            var $element = $('#countdownTimer');
            var that = this;
            $element.pietimer({ // Will place pietimer inside $element
                    seconds: config._MAX_TIME_TO_ANSWER,
                    color: config._COLOR_TIMER
                },
                function() {
                    if(!that.model.playedMatch) { //if game was not played finish game
                        that.timeOver();
                    }
                }
            );
            $element.pietimer('start');
        },

        /*
         * Stop the timer
         */
        stopTimer: function() {
            var $element = $('#countdownTimer');
            $element.pietimer('pause');
        },

        /*
         * cambia al siguiente juego de la partida
         */
        change_match:function(event){
            event.preventDefault();
            //delete the previous html class from the contenders
            this.clearLoserContenders();
            this.clearResults();

            //validate if it's a new game or not
            if(this.model.isGameOver()) {
                this.log_debug("Se crea un nuevo juego");
                $('._next_match').text('NEXT');

                //reset game model and get a new one from server
                this.model.reset();
                this.getNewGame();
            }
            else {
                this.log_debug("Siguiente jugada");
                var that = this;
                this.model.next(function(model, response) {
                    that.showContenders(model.get("last_match").contenders);
                    that.createTimer();
                });
            }
        },

        /*
         * dibuja los contenders del juego
         */
        showContenders:function(contenders){
            var $contender1 = $("._contender1");
            var $contender2 = $("._contender2");
            var contenderView1 = new ContenderView({ el: $contender1,  contender: contenders[0]});
            var contenderView2 = new ContenderView({ el: $contender2, contender: contenders[1]});
        },

        /*
         * Elimina las graficas y los resultados del codigo html
         */
        clearResults:function() {
            $('._results').removeClass("show_results");
            $('#results').removeClass("incorrect").removeClass("correct");
            $('._winner_class').removeClass("entity1").removeClass("entity2");
            $('#graph_results').html("");
            $('.game_status').addClass('hidden');
        },

        clearLoserContenders:function() {
            $('._contender').removeClass('loser');
        },

        /*
         * Show game result details
         */
        moreDetails: function() {
            this.log_debug("Show details of the game");
        },

        /*
         * Draw a little graph of searches of both contenders in a time series
         */
        drawGraphFlot: function($container, graph_data) {
            //Getting reduced data
            var d1 = [];
            var d2 = [];
            for(var i=1; i < graph_data.length-1; i+=2) {
                var v1 = parseInt((graph_data[i][1] + graph_data[i+1][1])/2);
                var v2 = parseInt((graph_data[i][4] + graph_data[i+1][4])/2);
                d1.push([i, v1]);
                d2.push([i, v2]);
            }

            //flot options
            var options = {

                grid: {
                    color: 'Black',
                    margin: 15,
                    borderWidth: {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0
                    }
                },

                xaxis: {
                    show: false
                },

                yaxis: {
                    show: false
                },

                colors: [ '#D61C38', '#4ACCD4' ],

                series: {
                    curvedLines: {
                        apply: true,
                        active: true,
                        monotonicFit: true
                    }
                }
            };

            //plotting
            $.plot($container, [
                {data: d1, lines: { show: true, fill: true }, stack: true },
                {data: d2, lines: { show: true, fill: true }, stack: true }
                ], options);
        },

        /*
         * show results after the user choose a famous
         */
        showResult:function(gameModel, that) {
            that.log_debug("Drawing Results.");

            $('._results').addClass("show_results");

            var result = gameModel.get("last_match").result;

            //contenders mid
            var contender1 = gameModel.get("last_match").contenders[0],
                contender2 = gameModel.get("last_match").contenders[1],
                contender1_mid = contender1.mid,
                contender2_mid = contender2.mid;

            //draw the graph
            that.drawGraphFlot($('#graph_results'), result.graph);

            if(result.error_diff > 0) {
                //el resultado fue correcto
                $('#results').addClass("correct");
            }
            else {
                //el resultado fue incorrecto
                $('#results').addClass("incorrect");
            }

            //Winner contender name
            var winner_mid = result.winner_mid,
                winner_name, winner_class, loser_mid;
            if(winner_mid == contender1_mid) {
                winner_name = contender1.name;
                winner_class = "entity1";
                loser_mid = contender2_mid;
            }
            else {
                winner_name = contender2.name;
                winner_class = "entity2";
                loser_mid = contender1_mid;
            }

            $('._winner_class').addClass(winner_class);
            $('#winnerName').text(winner_name);

            //adding loser class
            var $loser_contender = $('#gamePage').find("[data-mid='" + loser_mid + "']");
            $loser_contender.parent('._contender').addClass('loser');

            //validate end of game
            if(gameModel.get("lives") === 0) {
                $('.game_status').removeClass('hidden');
                $('._next_match').text('PLAY AGAIN');
            }

            //update the score view
            //that.updateScore();
        },

        timeOver: function() {
            this.log_debug("Tiempo agotado, ningun contender seleccionado.");
            this.model.play('', this.showResult, this);
        },

        /*
         * This event is trigger when a user choose a famous by doing click on its picture
         */
        choose:function(event){
            event.preventDefault();
            this.stopTimer();
            this.log_debug("Contender seleccionado "+contender_mid);
            var contender_mid = $(event.currentTarget).find("._mid_data").data('mid');
            this.model.play(contender_mid, this.showResult, this);
        }
    });

    return GameView;
});
