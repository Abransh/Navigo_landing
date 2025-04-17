"use strict";
exports.__esModule = true;
var Navbar_1 = require("@/components/layout/Navbar");
var HeroSectionDesktop_1 = require("@/components/sections/HeroSectionDesktop");
var FeatureBoxes_1 = require("@/components/sections/FeatureBoxes");
var HowItWorksSection_1 = require("@/components/sections/HowItWorksSection");
var JourneyTransformationSection_1 = require("@/components/sections/JourneyTransformationSection");
var CoreValuesSection_1 = require("@/components/sections/CoreValuesSection");
var InteractiveMapSection_1 = require("@/components/sections/InteractiveMapSection");
var WhyNavigoIntegration_1 = require("@/components/sections/WhyNavigoIntegration");
var FAQSection_1 = require("@/components/sections/FAQSection");
var Footer_1 = require("@/components/layout/Footer");
var react_1 = require("react");
function Home() {
    return (react_1["default"].createElement("main", { className: "min-h-screen bg-[#FFF8EA]" },
        react_1["default"].createElement(Navbar_1["default"], null),
        react_1["default"].createElement(HeroSectionDesktop_1["default"], null),
        react_1["default"].createElement("div", { className: "bg-[#FFF8EA] py-10" },
            react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4 py-2" },
                react_1["default"].createElement("div", { className: "flex items-center justify-center" },
                    react_1["default"].createElement("div", { className: "w-full h-px bg-border" }),
                    react_1["default"].createElement("div", { className: "px-4" },
                        react_1["default"].createElement("svg", { width: "40", height: "40", viewBox: "0 0 40 40", xmlns: "http://www.w3.org/2000/svg", className: "opacity-20" },
                            react_1["default"].createElement("circle", { cx: "20", cy: "20", r: "15", fill: "none", stroke: "#BE5504", strokeWidth: "1" }),
                            react_1["default"].createElement("circle", { cx: "20", cy: "20", r: "10", fill: "none", stroke: "#BE5504", strokeWidth: "1" }),
                            react_1["default"].createElement("circle", { cx: "20", cy: "20", r: "5", fill: "none", stroke: "#BE5504", strokeWidth: "1" }),
                            react_1["default"].createElement("path", { d: "M10,20 L30,20 M20,10 L20,30", stroke: "#BE5504", strokeWidth: "1" }))),
                    react_1["default"].createElement("div", { className: "w-full h-px bg-border" })))),
        react_1["default"].createElement(FeatureBoxes_1["default"], null),
        react_1["default"].createElement("div", { className: "bg-white py-6" },
            react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4" },
                react_1["default"].createElement("svg", { viewBox: "0 0 1200 40", xmlns: "http://www.w3.org/2000/svg" },
                    react_1["default"].createElement("path", { d: "M0,20 C50,40 100,0 150,20 C200,40 250,0 300,20 C350,40 400,0 450,20 C500,40 550,0 600,20 C650,40 700,0 750,20 C800,40 850,0 900,20 C950,40 1000,0 1050,20 C1100,40 1150,0 1200,20", fill: "none", stroke: "#FF9933", strokeWidth: "1", opacity: "0.3" }),
                    react_1["default"].createElement("path", { d: "M0,20 C50,0 100,40 150,20 C200,0 250,40 300,20 C350,0 400,40 450,20 C500,0 550,40 600,20 C650,0 700,40 750,20 C800,0 850,40 900,20 C950,0 1000,40 1050,20 C1100,0 1150,40 1200,20", fill: "none", stroke: "#1A5F7A", strokeWidth: "1", opacity: "0.3" })))),
        react_1["default"].createElement(HowItWorksSection_1["default"], null),
        react_1["default"].createElement(WhyNavigoIntegration_1["default"], null),
        react_1["default"].createElement("div", { className: "bg-sand py-8" },
            react_1["default"].createElement("div", { className: "max-w-7xl mx-auto flex justify-center" },
                react_1["default"].createElement("svg", { width: "80", height: "40", viewBox: "0 0 80 40", xmlns: "http://www.w3.org/2000/svg" },
                    react_1["default"].createElement("path", { d: "M40,0 C50,20 60,20 80,20 C60,20 50,20 40,40 C30,20 20,20 0,20 C20,20 30,20 40,0 Z", fill: "none", stroke: "#BE5504", strokeWidth: "1", opacity: "0.3" }),
                    react_1["default"].createElement("circle", { cx: "40", cy: "20", r: "4", fill: "none", stroke: "#BE5504", strokeWidth: "1", opacity: "0.3" }),
                    react_1["default"].createElement("circle", { cx: "40", cy: "20", r: "2", fill: "#FF9933", opacity: "0.4" })))),
        react_1["default"].createElement(JourneyTransformationSection_1["default"], null),
        react_1["default"].createElement("div", { className: "py-8 bg-white" },
            react_1["default"].createElement("div", { className: "max-w-7xl mx-auto flex justify-center" },
                react_1["default"].createElement("svg", { width: "200", height: "24", viewBox: "0 0 200 24", xmlns: "http://www.w3.org/2000/svg" },
                    react_1["default"].createElement("path", { d: "M0,12 C20,6 40,18 60,12 C80,6 100,18 120,12 C140,6 160,18 180,12 C200,6 220,18 240,12", fill: "none", stroke: "#BE5504", strokeWidth: "1", opacity: "0.3" }),
                    react_1["default"].createElement("circle", { cx: "60", cy: "12", r: "3", fill: "none", stroke: "#BE5504", strokeWidth: "1", opacity: "0.3" }),
                    react_1["default"].createElement("circle", { cx: "120", cy: "12", r: "3", fill: "none", stroke: "#BE5504", strokeWidth: "1", opacity: "0.3" }),
                    react_1["default"].createElement("circle", { cx: "180", cy: "12", r: "3", fill: "none", stroke: "#BE5504", strokeWidth: "1", opacity: "0.3" })))),
        react_1["default"].createElement(CoreValuesSection_1["default"], null),
        react_1["default"].createElement("div", { className: "bg-white py-8" },
            react_1["default"].createElement("div", { className: "max-w-7xl mx-auto flex justify-center" },
                react_1["default"].createElement("svg", { width: "80", height: "40", viewBox: "0 0 80 40", xmlns: "http://www.w3.org/2000/svg" },
                    react_1["default"].createElement("path", { d: "M40,0 C50,20 60,20 80,20 C60,20 50,20 40,40 C30,20 20,20 0,20 C20,20 30,20 40,0 Z", fill: "none", stroke: "#BE5504", strokeWidth: "1", opacity: "0.3" }),
                    react_1["default"].createElement("circle", { cx: "40", cy: "20", r: "4", fill: "none", stroke: "#BE5504", strokeWidth: "1", opacity: "0.3" }),
                    react_1["default"].createElement("circle", { cx: "40", cy: "20", r: "2", fill: "#FF9933", opacity: "0.4" })))),
        react_1["default"].createElement(InteractiveMapSection_1["default"], null),
        react_1["default"].createElement("div", { className: "bg-white py-6" },
            react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4" },
                react_1["default"].createElement("svg", { viewBox: "0 0 1200 40", xmlns: "http://www.w3.org/2000/svg" },
                    react_1["default"].createElement("path", { d: "M0,20 C50,40 100,0 150,20 C200,40 250,0 300,20 C350,40 400,0 450,20 C500,40 550,0 600,20 C650,40 700,0 750,20 C800,40 850,0 900,20 C950,40 1000,0 1050,20 C1100,40 1150,0 1200,20", fill: "none", stroke: "#FF9933", strokeWidth: "1", opacity: "0.3" }),
                    react_1["default"].createElement("path", { d: "M0,20 C50,0 100,40 150,20 C200,0 250,40 300,20 C350,0 400,40 450,20 C500,0 550,40 600,20 C650,0 700,40 750,20 C800,0 850,40 900,20 C950,0 1000,40 1050,20 C1100,0 1150,40 1200,20", fill: "none", stroke: "#1A5F7A", strokeWidth: "1", opacity: "0.3" })))),
        react_1["default"].createElement(FAQSection_1["default"], null),
        react_1["default"].createElement(Footer_1["default"], null)));
}
exports["default"] = Home;
