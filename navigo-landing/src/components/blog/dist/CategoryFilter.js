"use strict";
exports.__esModule = true;
exports.CategoryFilter = void 0;
// src/components/blog/CategoryFilter.tsx
var react_1 = require("react");
var link_1 = require("next/link");
function CategoryFilter(_a) {
    var categories = _a.categories, activeCategory = _a.activeCategory;
    return (react_1["default"].createElement("div", { className: "flex flex-wrap items-center justify-center gap-3 mb-12" },
        react_1["default"].createElement("span", { className: "text-navy font-medium" }, "Explore topics:"),
        react_1["default"].createElement(link_1["default"], { href: "/blog" },
            react_1["default"].createElement("button", { className: (!activeCategory
                    ? 'bg-primary text-white'
                    : 'bg-white hover:bg-secondary/10 border border-border text-navy') + " px-4 py-1.5 rounded-full text-sm font-medium transition-colors" }, "All Posts")),
        categories.map(function (category) { return (react_1["default"].createElement(link_1["default"], { key: category, href: "/blog?category=" + encodeURIComponent(category) },
            react_1["default"].createElement("button", { className: (activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white hover:bg-secondary/10 border border-border text-navy') + " px-4 py-1.5 rounded-full text-sm font-medium transition-colors" }, category))); })));
}
exports.CategoryFilter = CategoryFilter;
