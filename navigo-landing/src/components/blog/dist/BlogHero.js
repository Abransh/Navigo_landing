"use strict";
exports.__esModule = true;
exports.BlogHero = void 0;
// src/components/blog/BlogHero.tsx
var react_1 = require("react");
function BlogHero(_a) {
    var title = _a.title, subtitle = _a.subtitle;
    return (react_1["default"].createElement("section", { className: "bg-primary py-16 relative overflow-hidden" },
        react_1["default"].createElement("div", { className: "absolute inset-0 opacity-10 pointer-events-none" },
            react_1["default"].createElement("div", { className: "absolute top-0 left-0 w-full h-full bg-[url('/images/indian-pattern.svg')] bg-repeat bg-contain" })),
        react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" },
            react_1["default"].createElement("div", { className: "text-center" },
                react_1["default"].createElement("h1", { className: "text-4xl md:text-5xl font-heading font-bold text-white mb-4" }, title),
                subtitle && (react_1["default"].createElement("p", { className: "text-xl text-white/90 max-w-3xl mx-auto" }, subtitle)))),
        react_1["default"].createElement("div", { className: "absolute bottom-0 left-0 right-0" },
            react_1["default"].createElement("svg", { viewBox: "0 0 1440 96", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "w-full h-auto" },
                react_1["default"].createElement("path", { d: "M0 96L60 85.3C120 75 240 53 360 58.7C480 64 600 96 720 90.7C840 85 960 43 1080 32C1200 21 1320 43 1380 53.3L1440 64V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V96Z", fill: "#FFF8EA" }),
                react_1["default"].createElement("path", { d: "M120 32C150 25 180 35 210 32C240 28 270 18 300 20C330 22 360 35 390 35C420 35 450 20 480 18C510 16 540 25 570 30C600 35 630 37 660 35C690 33 720 27 750 27C780 27 810 32 840 30C870 28 900 20 915 16L930 12", stroke: "#FF9933", strokeWidth: "1", strokeDasharray: "2 3", opacity: "0.3" })))));
}
exports.BlogHero = BlogHero;
