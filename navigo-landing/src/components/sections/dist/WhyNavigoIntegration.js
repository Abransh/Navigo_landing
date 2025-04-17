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
var SectionTitle_1 = require("@/components/ui/SectionTitle");
var lucide_react_1 = require("lucide-react");
// Dynamically import the WhyNavigo component to avoid SSR issues
var WhyNavigoSection = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require('@/components/sections/WhyNavigoSection'); }); }, {
    ssr: false,
    loading: function () { return react_1["default"].createElement(WhyNavigoSectionFallback, null); }
});
// Fallback loading component shown while the main component loads
var WhyNavigoSectionFallback = function () {
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-white py-20" },
        react_1["default"].createElement("div", { className: "sticky top-0 py-10 bg-white/95 backdrop-blur-sm z-20" },
            react_1["default"].createElement("div", { className: "text-center" },
                react_1["default"].createElement(SectionTitle_1["default"], { title: "Why Navigo?", subtitle: "Experience India with a friend by your side" }))),
        react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-20" },
            react_1["default"].createElement("div", { className: "animate-pulse space-y-8 w-full max-w-2xl" },
                react_1["default"].createElement("div", { className: "flex justify-between" },
                    react_1["default"].createElement("div", { className: "w-40 h-40 rounded-full bg-primary/20" }),
                    react_1["default"].createElement("div", { className: "w-40 h-40 rounded-full bg-secondary/20" })),
                react_1["default"].createElement("div", { className: "flex flex-col space-y-4" },
                    react_1["default"].createElement("div", { className: "h-20 bg-sand/50 rounded-xl w-4/5 self-end" }),
                    react_1["default"].createElement("div", { className: "h-20 bg-white/70 rounded-xl w-4/5 self-start" })),
                react_1["default"].createElement("div", { className: "text-center text-primary/70 font-medium pt-6" },
                    react_1["default"].createElement("p", { className: "mb-2" }, "Loading interactive experience..."),
                    react_1["default"].createElement(lucide_react_1.ArrowDownCircle, { className: "mx-auto animate-bounce h-6 w-6 text-primary" }))))));
};
// Create a Priya placeholder SVG in the public directory
var createPriyaPlaceholderSvg = function () {
    if (typeof window === 'undefined')
        return;
    try {
        // Create SVG content
        var svgContent_1 = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\">\n      <circle cx=\"150\" cy=\"150\" r=\"120\" fill=\"#1A5F7A\" fill-opacity=\"0.2\"/>\n      <circle cx=\"150\" cy=\"150\" r=\"80\" fill=\"#1A5F7A\" fill-opacity=\"0.3\"/>\n      <circle cx=\"150\" cy=\"110\" r=\"40\" fill=\"#1A5F7A\" fill-opacity=\"0.5\"/>\n      <text x=\"150\" y=\"190\" font-family=\"Arial\" font-size=\"24\" fill=\"#1A5F7A\" text-anchor=\"middle\" dominant-baseline=\"middle\">Priya</text>\n      <text x=\"150\" y=\"220\" font-family=\"Arial\" font-size=\"16\" fill=\"#1A5F7A\" text-anchor=\"middle\" dominant-baseline=\"middle\">Local Companion</text>\n    </svg>";
        // Check if placeholder exists and create it if needed
        // In a browser environment we can't actually write files, but we can create a Blob URL
        var priyaImage = new Image();
        priyaImage.src = '/priya-placeholder.svg';
        priyaImage.onerror = function () {
            // Create a blob URL
            var blob = new Blob([svgContent_1], { type: 'image/svg+xml' });
            var url = URL.createObjectURL(blob);
            // Log the URL for debugging
            console.info("Created Priya placeholder SVG blob URL:", url);
            // Optionally can be used for download in dev environments
            // const link = document.createElement('a');
            // link.href = url;
            // link.download = 'priya-placeholder.svg';
            // link.click();
            // URL.revokeObjectURL(url);
        };
    }
    catch (error) {
        console.warn("Browser doesn't support SVG creation", error);
    }
};
// Main integration component
function WhyNavigoIntegration() {
    var _this = this;
    var _a = react_1.useState(false), assetsReady = _a[0], setAssetsReady = _a[1];
    react_1.useEffect(function () {
        // Create array of image paths to preload
        var imagesToPreload = [
            '/Sarah-talking.svg',
            '/Sarah-anxious.svg',
            '/Sarah-happy-again-after-priya.svg',
            '/priya-placeholder.svg',
            '/images/indian-pattern.svg'
        ];
        // Try to create Priya placeholder
        createPriyaPlaceholderSvg();
        // Function to preload a single image
        var preloadImage = function (src) {
            return new Promise(function (resolve) {
                var img = new Image();
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
                        setAssetsReady(true);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error preloading images:', error_1);
                        // Set as loaded anyway to not block the UI
                        setAssetsReady(true);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Load GSAP if needed
        var loadGSAP = function () {
            try {
                // Check if we need to dynamically import GSAP
                if (typeof window !== 'undefined' && !window.gsap) {
                    // In a real project, we'd load GSAP from CDN if needed
                    console.info("GSAP would be loaded if not already available");
                }
            }
            catch (error) {
                console.warn("Error checking for GSAP:", error);
            }
        };
        // Initialize everything
        loadGSAP();
        preloadAll();
        // Set a timeout to ensure we don't block indefinitely
        var timeout = setTimeout(function () {
            setAssetsReady(true);
        }, 3000);
        return function () {
            clearTimeout(timeout);
        };
    }, []);
    // Render the component or fallback based on loading status
    return assetsReady ? react_1["default"].createElement(WhyNavigoSection, null) : react_1["default"].createElement(WhyNavigoSectionFallback, null);
}
exports["default"] = WhyNavigoIntegration;
