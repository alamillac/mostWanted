define([
    'underscore',
    'backbone',
    'models/BaseModel',
    'utils',
    'config',
    'jGrowl',
], function (_, Backbone, BaseModel, utils, config) {
    'use strict';

    var Session = BaseModel.extend({

        _AJAX_TIMEOUT:  60 * 1000,  //1 min

        _PERIODICAL_TIME: 2000 * 60,  //2 min

        default:{
            '_isLogged': false
        },

        initialize:function(options) {
            this.options = options || {};
            this.user = this.options.user;
            if(this.user.isLogged()){
                this.setAjaxConfig();
            }

            /*
             Trigger a event each 2 minutes.
             Wherever this event was spected will be execute ever _PERIODICAL_TIME
             */
            var periodical_time;
            if(config._PERIODICAL_TASK) {
                if(config._PERIODICAL_TIME) {
                    periodical_time = config._PERIODICAL_TIME;
                }
                else {
                    periodical_time = this._PERIODICAL_TIME;
                }

                setInterval(this.periodicalTasks, periodical_time);
            }

        },

        /**
         * Muestra el mensaje de error
         * @param msgClass
         * @param msg
         */
        showMsg: function (msgClass,msg){
            $.jGrowl.defaults.theme = msgClass;
            $.jGrowl(msg);
        },
        /**
         * Pregunta si la url necesita invocar el waiting
         * @param url
         * @returns {boolean}
         */
        isNeededWaiting:function (url) {

            var notWaitingUrls = [
                'write_db.php',
                'freebase.php',
                'save_page.php',
                'background'
            ];

            for (var i = 0; i < notWaitingUrls.length; i++) {
                var notWaitingUrl = notWaitingUrls[i];
                if(url.indexOf(notWaitingUrl)>=0){
                    return false;
                }
            }

            return true;
        },
        /**
         * Retorna el token del usuario.
         * @returns {*}
         */
        getToken:function(){
            this.token = this.user.get('sessionToken');
            return this.token;
        },

        setAjaxConfig:function(){

            var maxZindex = utils.maxZIndex();
            var that = this;

            /*ajax send config*/
            $(document).ajaxSend(function(event, xhr, settings){
                    if(that.isNeededWaiting(settings.url))
                        window.app._showWaiting(maxZindex);
                }
            );
            /*ajax complete config.*/
            $(document).ajaxComplete(function(event, xhr, settings){
                    if(that.isNeededWaiting(settings.url))
                        window.app._hideWaiting();
                }
            );

            if(this.user.isLogged()){
                utils.consoleDebug('User is logged');
                $.ajaxSetup({

                    timeout: that._AJAX_TIMEOUT,

                    beforeSend: function (xhr) {
                        //console.log("ajax.beforeSend");
                        var authorization = that.getToken();

                        if (authorization) {
                            // Se actualiza el timeout de la session.
                            //console.log("Keep Alive");
                            xhr.setRequestHeader('Token', authorization);
                        }
                        else {
                            xhr.setRequestHeader('Token', '');
                        }
                    },
                    statusCode: {
                        500: function () {
                            // Redirec the to the login page.
                            utils.consoleDebug("Se recivio un 500");
                            that.showMsg("text-danger","There is a connection error. Please reload the page.");
                        },
                        401: function () {
                            // Redirec the to the login page.
                            utils.consoleDebug("Se recivio un 401 renviando a #login");
                            //todo: refreshtoken.
                        },
                        403: function () {
                            // 403 -- Access denied
                            that.user.logOff();
                            that.showMsg("text-danger","Your session has expired. Please log in again");
                        }
                    }
                    //cache: false // Necesario para que IE no cachee las collections y los models.
                });

            }else{

                $.ajaxSetup({

                    timeout: that._AJAX_TIMEOUT,

                    beforeSend: function (xhr) {
                        console.log("aut");
                        xhr.setRequestHeader('Token', '');

                    }
                });
            }
        },

        /**
         * Event launched ever _PERIODICAL_TIME
         */
        periodicalTasks:function(){
            utils.consoleDebug('2 MINUTES UPDATE');
            window.Events.trigger("SESSION::periodicalTask");
        }


    });
    return Session;
});
