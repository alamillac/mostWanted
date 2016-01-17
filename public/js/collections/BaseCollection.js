/**
 * Created by ruben on 22/04/2014.
 */

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var BaseCollection = Backbone.Collection.extend({

        destroy:function(){

            var model;
           /* while (model = this.first()) {
                model.destroy();
            }*/

            this.off(null, null, this);

        }
    });



    return BaseCollection;
});
