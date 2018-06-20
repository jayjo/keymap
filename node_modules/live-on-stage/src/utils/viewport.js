"use strict";

var docElement = document.documentElement;

module.exports = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    
    /*
        Update viewport measurements
    */
    update: function () {
        this.top = document.body.scrollTop;
        this.left = document.body.scrollLeft;
        this.bottom = this.top + docElement.clientHeight;
        this.right = this.left + docElement.clientWidth;
    },
    
    /*
        Check if element is within viewport
        
        @param [object]: Cached element
    */
    checkOnStage: function (element) {
        var buffer = element.buffer;
    
        return !(
            this.bottom < (element.top - buffer) || // Element off bottom
            this.top > (element.bottom + buffer) || // Element off top
            this.left > (element.right + buffer) || // Element off left
            this.right < (element.left - buffer)    // Element off right
        );
    }
};