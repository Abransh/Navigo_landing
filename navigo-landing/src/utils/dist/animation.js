"use strict";
exports.__esModule = true;
exports.loadGSAPPlugins = void 0;
// src/utils/animation.ts
exports.loadGSAPPlugins = function () {
    if (typeof window !== 'undefined') {
        // Only import GSAP on the client side
        var gsap = require('gsap');
        var ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger;
        var TextPlugin = require('gsap/TextPlugin').TextPlugin;
        // Register the plugins
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        // If using premium plugins, you would need to add proper licensing
        // This would typically be done using a .env variable
        // gsap.registerPlugin(SplitText); // Premium plugin, requires registration
        console.log('GSAP plugins registered');
        return gsap;
    }
    return null;
};
