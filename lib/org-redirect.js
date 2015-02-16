'use strict';

function performRedirect(location) {
    var LIVESAFE_ORG_ID = 1,
        newLocation = location.pathname.replace(/^\/[0-9]+/, '/' + LIVESAFE_ORG_ID);

    if (location.pathname !== newLocation) {
        location.href = newLocation;
    } else {
        throw new Error('Redirect loop for ' + location.href);
    }
}

if (typeof module == 'object' && module.exports) {
    module.exports = performRedirect;
} else if (window) {
    performRedirect(window.location);
} else {
    throw new Error('Could not find module.exports nor window.  Where are you running me??');
}
