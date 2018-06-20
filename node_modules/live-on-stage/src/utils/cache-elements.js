"use strict";

var viewport = require('./viewport.js');

module.exports = function (elements) {
    var elementArray = [];

    [].slice.call(elements).forEach(function (element) {
        var rect = element.getBoundingClientRect(),
            buffer = element.getAttribute('data-buffer');
            
        if (element.getAttribute('data-stop-tracking') !== 'true') {
            elementArray.push({
                dom: element,
                isOnStage: false,
                buffer: parseInt(buffer) || 0,
                top: rect.top + viewport.top,
                left: rect.left + viewport.left,
                bottom: rect.bottom + viewport.top,
                right: rect.right + viewport.left
            });
        }
    });
    
    return elementArray;
};