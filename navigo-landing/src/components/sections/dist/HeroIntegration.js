// src/components/sections/HeroIntegration.tsx
"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var dynamic_1 = require("next/dynamic");
var framer_motion_1 = require("framer-motion");
// Dynamically import the enhanced hero component to prevent SSR issues with GSAP
var NavigoHeroSection = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require('@/components/sections/HeroSectionDesktop'); }); }, {
    ssr: false,
    loading: function () { return react_1["default"].createElement(HeroLoadingFallback, null); }
});
// Loading fallback that displays while the main component is loading
var HeroLoadingFallback = function () {
    return (react_1["default"].createElement("section", { className: "relative min-h-[90vh] bg-primary overflow-hidden flex items-center justify-center" },
        react_1["default"].createElement("div", { className: "absolute inset-0 opacity-10 pointer-events-none" },
            react_1["default"].createElement("div", { className: "absolute top-0 left-0 w-full h-full bg-[url('/images/indian-map.svg')] bg-repeat bg-contain" })),
        react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 text-center" },
            react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0.5, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" }, className: "text-sand" },
                react_1["default"].createElement("div", { className: "flex flex-col items-center space-y-4" },
                    react_1["default"].createElement("div", { className: "w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center" },
                        react_1["default"].createElement("svg", { className: "animate-spin h-8 w-8 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
                            react_1["default"].createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                            react_1["default"].createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }))),
                    react_1["default"].createElement("p", { className: "text-xl font-heading font-medium" }, "Loading Experience..."),
                    react_1["default"].createElement("p", { className: "text-sand/70" }, "Preparing your journey through India"))))));
};
// This component handles loading necessary assets before showing the hero section
function HeroIntegration() {
    var _this = this;
    var _a = react_1.useState(false), assetsPreloaded = _a[0], setAssetsPreloaded = _a[1];
    // Preload required assets
    react_1.useEffect(function () {
        // Create array of image paths to preload
        var imagesToPreload = [
            '/images/india-pattern-bg.svg',
            '/images/india-map-outline.svg',
            '/images/placeholder-priya.svg',
            '/images/clouds-simple.svg',
            '/images/airplane-silhouette.svg'
        ];
        // Function to preload a single image
        var preloadImage = function (src) {
            return new Promise(function (resolve) {
                var img = new window.Image();
                img.onload = function () { return resolve(src); };
                img.onerror = function () {
                    console.warn("Failed to preload image: " + src);
                    resolve(src); // Resolve anyway to continue
                };
                img.src = src;
            });
        };
        // Preload all images
        var preloadAll = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all(imagesToPreload.map(preloadImage))];
                    case 1:
                        _a.sent();
                        setAssetsPreloaded(true);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error preloading images:', error_1);
                        // Set as loaded anyway to not block the UI
                        setAssetsPreloaded(true);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        preloadAll();
    }, []);
    // Load GSAP plugins if available
    react_1.useEffect(function () {
        if (typeof window !== 'undefined') {
            // Dynamic import to avoid SSR issues
            Promise.resolve().then(function () { return require('@/utils/animation'); }).then(function (_a) {
                var loadGSAPPlugins = _a.loadGSAPPlugins;
                loadGSAPPlugins();
            })["catch"](function (error) {
                console.warn('GSAP plugins could not be loaded:', error);
            });
        }
    }, []);
    return assetsPreloaded ? react_1["default"].createElement(NavigoHeroSection, null) : react_1["default"].createElement(HeroLoadingFallback, null);
}
exports["default"] = HeroIntegration;
