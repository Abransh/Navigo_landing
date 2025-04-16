"use strict";
exports.__esModule = true;
exports.ShareButtons = void 0;
// src/components/blog/ShareButtons.tsx
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function ShareButtons(_a) {
    var title = _a.title, slug = _a.slug;
    var url = "https://navigoindia.com/blog/" + slug;
    return (react_1["default"].createElement("div", { className: "mt-8 pt-8 border-t border-border" },
        react_1["default"].createElement("h2", { className: "text-lg font-heading font-bold text-navy mb-4" }, "Share this article"),
        react_1["default"].createElement("div", { className: "flex space-x-4" },
            react_1["default"].createElement("a", { href: "https://twitter.com/intent/tweet?text=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(url), target: "_blank", rel: "noopener noreferrer", className: "bg-[#1DA1F2] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity", "aria-label": "Share on Twitter" },
                react_1["default"].createElement(lucide_react_1.Twitter, { className: "w-5 h-5" })),
            react_1["default"].createElement("a", { href: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), target: "_blank", rel: "noopener noreferrer", className: "bg-[#4267B2] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity", "aria-label": "Share on Facebook" },
                react_1["default"].createElement(lucide_react_1.Facebook, { className: "w-5 h-5" })),
            react_1["default"].createElement("a", { href: "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title), target: "_blank", rel: "noopener noreferrer", className: "bg-[#0077B5] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity", "aria-label": "Share on LinkedIn" },
                react_1["default"].createElement(lucide_react_1.Linkedin, { className: "w-5 h-5" })))));
}
exports.ShareButtons = ShareButtons;
