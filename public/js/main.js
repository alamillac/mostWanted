/*global require*/

(function(requirejs) {
    'use strict';

    require.config({
        shim: {
            underscore: {
                exports: '_'
            },
            backbone: {
                deps: [
                    'underscore',
                    'jquery'
                ],
                exports: 'Backbone'
            },
            jQueryCookie: {
                deps: ['jquery'],
                exports: 'jQueryCookie'
            },
            jGrowl: {
                deps: ['jquery'],
                exports: 'jGrowl'
            },
            jFlot: {
                deps: ['jquery'],
                exports: 'jFlot'
            },
            jFlotCurved: {
                deps: ['jquery', 'jFlot'],
                exports: 'jFlotCurved'
            },
            jPieTimer: {
                deps: ['jquery'],
                exports: 'jPieTimer'
            }
        },
        paths: {
            jquery: 'vendor/jquery/dist/jquery',
            backbone: 'vendor/backbone/backbone',
            underscore: 'vendor/underscore/underscore',
            //bootstrap: 'vendor/bootstrap',
            modelBinder: 'vendor/backbone.modelBinder/Backbone.ModelBinder',
            jqueryMd5: 'vendor/jquery-md5/jquery.md5',
            jGrowl: "vendor/jGrowl/jquery.jgrowl",
            jQueryCookie: 'vendor/jquery.cookie/jquery.cookie',
            jFlot: 'libs/jquery-flot/jquery.flot',
            jFlotCurved: 'libs/jquery-flot/curvedLines',
            jPieTimer: 'libs/jquery-pietimer/jquery.pietimer.min',

            /** Touch Mobile Events **/
            hammerjs:'vendor/hammerjs/hammer',

            //General Config
            config: 'config',
            utils: 'libs/utils',
            log: 'libs/log'

        }
    });

    require([
        'backbone',
        'routes/mainRouter',
        //'bootstrap',
        'jQueryCookie',
        'hammerjs',
        'config',
        'utils'
    ], function (Backbone, MainRouter) {

        window.Events = {};
        _.extend(window.Events, Backbone.Events);

        window.app = new MainRouter();
        Backbone.history.start();
    });

}(window.requirejs));
