var Log = (function() {
    var _private = {
        debug: true,

        getDate: function() {
            /*
             * return the current time in the following format
             * year-month-day hour:minutes:seconds
             */
            var today = new Date();

            var y = today.getFullYear();
            var m = today.getMonth()+1;
            var d = today.getDate();

            var H = today.getHours();
            var M = today.getMinutes();
            var S = today.getSeconds();

            return y + '-' + m + '-' + d + ' ' + H + ':' + M + ':' + S;
        }

    };

    var _public = {
        init: function(options) {
            if(options) {
                if(options.debug != null && options.debug === false) {
                    _private.debug = false;
                }
            }
        },

        DEBUG: 0,
        INFO: 1,
        WARNING: 2,
        ERROR: 3,


        /*
         * Display text in console if debug is true
         */
        log: function(log_status, log_referer, log_comment, log_object) {
            var date = _private.getDate();

            switch(log_status) {
                case this.DEBUG:
                    if(_private.debug == true) {
                        console.log("DEBUG " + log_referer + ": " + log_comment);
                        if(log_object) {
                            console.log("object: " + log_object);
                        }
                        }
                        break;
                    case this.INFO:
                        //by the moment just print to console
                        console.log(date + " INFO " + log_referer + ": " + log_comment);
                        if(log_object) {
                            console.log("object: " + log_object);
                        }
                        break;
                    case this.WARNING:
                        //by the moment just print to console
                        console.log(date + " WARNING " + log_referer + ": " + log_comment);
                        if(log_object) {
                            console.log("object: " + log_object);
                        }
                        break;
                    case this.ERROR:
                        //by the moment just print to console
                        console.log(date + " ERROR " + log_referer + ": " + log_comment);
                        if(log_object) {
                            console.log("object: " + log_object);
                        }
                        break;
                    default:
                    console.log(date + " ERROR log.js: Not valid status.");
                    break;
            }
        }
    };

    return _public;
}());
