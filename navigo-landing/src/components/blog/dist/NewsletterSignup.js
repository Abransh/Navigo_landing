"use strict";
exports.__esModule = true;
exports.NewsletterSignup = void 0;
// src/components/blog/NewsletterSignup.tsx
var react_1 = require("react");
function NewsletterSignup() {
    return (react_1["default"].createElement("div", { className: "bg-primary/10 rounded-xl p-8 md:p-12 relative overflow-hidden" },
        react_1["default"].createElement("div", { className: "absolute -right-20 -bottom-20 w-64 h-64 opacity-10" },
            react_1["default"].createElement("svg", { viewBox: "0 0 200 200", xmlns: "http://www.w3.org/2000/svg" },
                react_1["default"].createElement("path", { d: "M100,10 L120,90 L200,100 L120,110 L100,190 L80,110 L0,100 L80,90 L100,10 Z", fill: "#1A5F7A" }),
                react_1["default"].createElement("circle", { cx: "100", cy: "100", r: "50", fill: "none", stroke: "#1A5F7A", strokeWidth: "1" }),
                react_1["default"].createElement("circle", { cx: "100", cy: "100", r: "70", fill: "none", stroke: "#1A5F7A", strokeWidth: "1" }))),
        react_1["default"].createElement("div", { className: "relative z-10 md:max-w-xl" },
            react_1["default"].createElement("h2", { className: "text-2xl md:text-3xl font-heading font-bold text-navy mb-3" }, "Never Miss a Story"),
            react_1["default"].createElement("p", { className: "text-foreground-muted mb-6" }, "Subscribe to our newsletter for the latest travel tips, local insights, and exclusive content delivered straight to your inbox."),
            react_1["default"].createElement("form", { className: "flex flex-col sm:flex-row gap-3" },
                react_1["default"].createElement("input", { type: "email", placeholder: "Your email address", className: "flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary", required: true }),
                react_1["default"].createElement("button", { type: "submit", className: "bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md whitespace-nowrap" }, "Subscribe")),
            react_1["default"].createElement("p", { className: "mt-3 text-xs text-foreground-muted" }, "By subscribing, you agree to our privacy policy. We'll never spam you."))));
}
exports.NewsletterSignup = NewsletterSignup;
