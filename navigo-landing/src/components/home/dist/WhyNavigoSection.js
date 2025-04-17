"use strict";
exports.__esModule = true;
exports.WhyNavigoSection = void 0;
var react_1 = require("react");
var WhyNavigoImplementation_1 = require("./WhyNavigoImplementation");
function WhyNavigoSection() {
    return (react_1["default"].createElement("section", { className: "bg-sand py-16 md:py-24 overflow-hidden" },
        react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
            react_1["default"].createElement("div", { className: "text-center mb-12" },
                react_1["default"].createElement("h2", { className: "text-3xl md:text-4xl font-heading font-bold text-navy mb-4" },
                    "Why ",
                    react_1["default"].createElement("span", { className: "text-primary" }, "Navigo"),
                    "?"),
                react_1["default"].createElement("p", { className: "text-foreground-muted max-w-3xl mx-auto text-lg" }, "Experience the difference of traveling with a trusted local companion who understands your needs.")),
            react_1["default"].createElement(WhyNavigoImplementation_1.WhyNavigoImplementation, null))));
}
exports.WhyNavigoSection = WhyNavigoSection;
