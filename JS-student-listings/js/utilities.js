/*
 Name: Jeffrey McCommas
 Date: 12/18/2013
 Class & Section:  PWA1-sec 01
 Comments: " FINAL PWA-1"
 */


// This script defines an object that has some utilitarian functions.

var U = {

    // For getting the document element by ID:
    $: function(id) {
        'use strict';
        if (typeof id == 'string') {
            return document.querySelector(id);
        } return true;
    }, // End of $() function.


    // Function for creating event listeners:
    addEvent: function(obj, type, fn) {
        'use strict';
        if (obj && obj.addEventListener) { // W3C
            obj.addEventListener(type, fn, false);
        } else if (obj && obj.attachEvent) { // Older IE
            obj.attachEvent('on' + type, fn);
        }
    }, // End of addEvent() function.

    // Function for removing event listeners:
    removeEvent: function(obj, type, fn) {
        'use strict';
        if (obj && obj.removeEventListener) { // W3C
            obj.removeEventListener(type, fn, false);
        } else if (obj && obj.detachEvent) { // Older IE
            obj.detachEvent('on' + type, fn);
        }
    } // End of removeEvent() function.
    
}; // End of Utilities declarations
