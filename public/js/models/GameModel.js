/*global define*/

define([
    'underscore',
    'backbone',
    'models/BaseModel',
], function (_, Backbone,BaseModel) {
    'use strict';

    var GameModel = BaseModel.extend({

        url:function(){
            return this.urlBase() + 'api/games/' + this.get("id") + this.getParameters();
        },

        getParameters: function() {
            if(this.playedMatch) {
                return "?next_match=true";
            }
            return '';
        },

        playedMatch: false, //indica si el juego ya fue jugado o no. Es decir si ya se eligio una de las opciones

        defaults:{
            last_match: {
                contenders: [{ mid: '', name: '' }, { mid: '', name: '' }],
                id: '',
                result: {
                    choice_mid: '',
                    graph: '',
                    score: '',
                    error_diff: '',
                    duration: ''
                }
            },
            id:'new',
            total_score: 0,
            played_matches: 0,
            errors: 0,
            lives: 0,
            consecutive_successes: 0
        },

        reset: function() {
            this.clear().set(this.defaults);
            this.playedMatch = false;
        },

        isGameOver: function() {
            return !this.get('lives');
        },

        initialize:function(){
        },

        parse:function(response, options){
            return response.data;
        },

        /*
         * envia la jugada del usuario al server y obtiene la puntuacion
         */
        play:function(contender_mid, success, args) {
            if(!this.playedMatch) { //solo se juega si no se ha jugado antes
                var that = this;
                this.get("last_match").result.choice_mid = contender_mid;
                this.save(undefined,
                        {
                            success: function(model, response){
                                that.playedMatch = true;
                                if(success) {
                                    success(model, args);
                                }
                            }
                        });
            }
            else {
                console.log("Esta partida ya fue jugada");
            }
        },

        /*
         * pide el siguiente juego
         */
        next:function(success) {
            if(this.playedMatch) { //solo se pide un nuevo juego si el actual ya fue jugado
                var that = this;
                var args = {
                    success: function(model, response){
                        that.playedMatch = false;
                        if(success) {
                            success(model);
                        }
                    }
                };
                this.fetch(args);
            }
            else {
                console.log("No se puede obtener un nuevo juego sin haber jugado el actual");
            }
        }

    });
    return GameModel;
});
