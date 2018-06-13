"use strict";

/*
    Notify DOM element of new onScreen status
*/
module.exports = function (element, isOnStage, callback) {
    element.isOnStage = isOnStage;

    if (callback) {
        return (callback(element.dom));
    }
};