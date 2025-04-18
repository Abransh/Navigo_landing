"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var google_1 = require("next/font/google");
require("./globals.css");
var react_1 = require("@vercel/analytics/react");
var react_2 = require("react");
var script_1 = require("next/script");
// Load Montserrat font (for headlines and titles)
var montserrat = google_1.Montserrat({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-montserrat",
    preload: true
});
// Load Inter font (for body text and longer content)
var inter = google_1.Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
    preload: true
});
exports.metadata = {
    title: "Navigo - Your Local Travel Companion in India",
    description: "Connect with trusted local companions who help you navigate unfamiliar territories, overcome language barriers, and discover authentic cultural experiences.",
    icons: {
        icon: "/favicon.ico",
        apple: "/favicon.ico"
    }
};
function RootLayout(_a) {
    var children = _a.children;
    return (react_2["default"].createElement("html", { lang: "en", className: montserrat.variable + " " + inter.variable },
        react_2["default"].createElement("head", null,
            react_2["default"].createElement("meta", { name: "format-detection", content: "telephone=no, date=no, email=no, address=no" }),
            react_2["default"].createElement("link", { rel: "preload", href: "/images/india-pattern-bg.svg", as: "image" }),
            react_2["default"].createElement(script_1["default"], { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js", strategy: "beforeInteractive" }),
            react_2["default"].createElement(script_1["default"], { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/ScrollTrigger.min.js", strategy: "beforeInteractive" }),
            react_2["default"].createElement(script_1["default"], { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/TextPlugin.min.js", strategy: "beforeInteractive" }),
            react_2["default"].createElement("link", { rel: "icon", href: "/favicon.ico" }),
            react_2["default"].createElement("link", { rel: "apple-touch-icon", href: "/favicon.ico" }),
            react_2["default"].createElement("script", { async: true, src: "https://www.googletagmanager.com/gtag/js?id=G-HQHJ5XL5EJ" }),
            react_2["default"].createElement("script", { dangerouslySetInnerHTML: {
                    __html: "\n              window.dataLayer = window.dataLayer || [];\n              function gtag(){dataLayer.push(arguments);}\n              gtag('js', new Date());\n              gtag('config', 'G-HQHJ5XL5EJ');\n            "
                } })),
        react_2["default"].createElement("body", { className: "font-body antialiased bg-sand text-navy" },
            react_2["default"].createElement(script_1["default"], { id: "prevent-fouc", strategy: "beforeInteractive" }, "\n            // Add a class to prevent transition animations on page load\n            document.documentElement.classList.add('is-loading');\n            \n            // Remove the class after page has loaded\n            window.addEventListener('load', () => {\n              document.documentElement.classList.remove('is-loading');\n            });\n          "),
            children,
            react_2["default"].createElement(react_1.Analytics, null))));
}
exports["default"] = RootLayout;
