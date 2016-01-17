define([
    'jquery',
    'config'
], function($, config){
    'use strict';

    function pathTpl(templateName) {
        var baseTemplatePath = 'public/js/templates';
        return baseTemplatePath + '/' + templateName;
    }

    /**
    * Retorna el numero de index mas alto
    * de los elementos del DOM en el momento en que es llamado.
    * @returns {number}
    */
    function maxZIndex() {
        var maxZ = Math.max.apply(null, $.map($('body > *'), function (e, n) {
                if ($(e).css('position') == 'absolute')
                    return parseInt($(e).css('z-index')) || 1;
            })
        );
        return maxZ;
    }

    /**
    * Mensaje de consola de Debug.
    * @param msg
    */
    function consoleDebug(msg){
        if(config._DEBUG){
            console.log(msg);
        }
    }

    return {
        pathTpl: pathTpl,
        maxZIndex: maxZIndex,
        consoleDebug: consoleDebug
    };
});
