"use strict";

var cache = require('./utils/cache.js'),
    cacheElements = require('./utils/cache-elements.js'),
    notify = require('./utils/notify.js'),
    viewport = require('./utils/viewport.js'),
    
    resizeComplete, // Resize complete timer
    
    liveOnStage = {
    
        /*
            Check element's onScreen position
        */
        check: function () {
            viewport.update();

            for (var key in cache) {
                if (cache.hasOwnProperty(key)) {
                    this.checkCache(key);
                }
            }
        },
        
        /*
            Check individual cache
            
            @param [object]: Cache to check
        */
        checkCache: function (key) {
            var thisCache = cache[key];

            thisCache.elements.forEach(function (element, i) {
                var elementIsOnStage = viewport.checkOnStage(element),
                    stopTracking = false;

                // If element is on stage and previously wasn't, fire onstage event
                if (elementIsOnStage && !element.isOnStage) {
                    stopTracking = notify(element, true, thisCache.onStage);
                
                // If element isn't on stage and previously was, fire offstage event
                } else if (!elementIsOnStage && element.isOnStage) {
                    stopTracking = notify(element, false, thisCache.offStage);
                }
                
                if (stopTracking) {
                    element.dom.setAttribute('data-stop-tracking', true);
                    delete thisCache.elements[i];
                }
            });
        },
    
        /*
            Refresh cached elements
            
            @param [string] (optional): Name of cache to refresh
        */
        refresh: function (selector) {
            // If an attribute has been provided, refresh that cache
            if (cache[selector]) {
                this.track(selector, cache[selector].onStage, cache[selector].offStage);
                
            // Or refresh all caches
            } else {
                for (var key in cache) {
                    if (cache.hasOwnProperty(key)) {
                        this.track(key, cache[key].onStage, cache[key].offStage);
                    }
                }
            }
        },
        
        /*
            Track elements
            
            @param [string || NodeList]: CSS selector or DOM selection
            @param [function]: Function to call when element appears on stage
            @param [function]: Function to call when element leaves stage
        */
        track: function (selector, onStage, offStage) {
            var trackElements = (typeof selector == 'string') ? document.querySelectorAll(selector) : selector;
            
            if (trackElements.length) {
                viewport.update();

                cache[selector] = {
                    elements: cacheElements(trackElements),
                    onStage: onStage,
                    offStage: offStage
                };
                
                this.check();
            }
        }
    };

// Check all cached elements every time the viewport changes position
window.addEventListener('scroll', function () { liveOnStage.check(); });

// Refresh position of all elements when the screen resizes
window.addEventListener('resize', function () {
    clearTimeout(resizeComplete);

    resizeComplete = setTimeout(function () {
        liveOnStage.refresh();
    }, 200);
});

module.exports = liveOnStage;
