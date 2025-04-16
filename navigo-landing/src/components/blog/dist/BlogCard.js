"use strict";
exports.__esModule = true;
exports.BlogCard = void 0;
// src/components/blog/BlogCard.tsx
var react_1 = require("react");
var link_1 = require("next/link");
var image_1 = require("next/image");
var lucide_react_1 = require("lucide-react");
function BlogCard(_a) {
    var post = _a.post, _b = _a.featured, featured = _b === void 0 ? false : _b;
    return (react_1["default"].createElement("article", { className: "\n      bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border\n      " + (featured ? 'md:flex' : '') + "\n    " },
        react_1["default"].createElement(link_1["default"], { href: "/blog/" + post.slug, className: "block " + (featured ? 'md:w-1/2' : '') },
            react_1["default"].createElement("div", { className: "relative " + (featured ? 'aspect-auto md:h-full' : 'aspect-[16/9]') },
                react_1["default"].createElement(image_1["default"], { src: post.coverImage || "/images/blog/placeholder.jpg", alt: post.title, fill: true, className: "object-cover" }),
                post.categories[0] && !featured && (react_1["default"].createElement("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-navy px-3 py-1 rounded-full text-xs font-medium" }, post.categories[0])),
                featured && (react_1["default"].createElement("div", { className: "absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium" }, "Featured")))),
        react_1["default"].createElement("div", { className: "p-6 " + (featured ? 'md:w-1/2 md:flex md:flex-col' : '') },
            featured && (react_1["default"].createElement("div", { className: "flex flex-wrap gap-2 mb-3" }, post.categories.map(function (category) { return (react_1["default"].createElement("span", { key: category, className: "bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium" }, category)); }))),
            react_1["default"].createElement("h3", { className: "font-heading font-bold text-navy mb-2 line-clamp-2 " + (featured ? 'text-2xl' : 'text-xl') },
                react_1["default"].createElement(link_1["default"], { href: "/blog/" + post.slug, className: "hover:text-primary transition-colors" }, post.title)),
            react_1["default"].createElement("p", { className: "text-foreground-muted mb-4 line-clamp-2 " + (featured ? 'text-base' : 'text-sm') }, post.excerpt),
            react_1["default"].createElement("div", { className: "flex items-center " + (featured ? 'mt-auto' : 'justify-between') },
                react_1["default"].createElement("div", { className: "flex items-center" },
                    react_1["default"].createElement("div", { className: "rounded-full overflow-hidden relative mr-2 " + (featured ? 'w-10 h-10' : 'w-8 h-8') },
                        react_1["default"].createElement(image_1["default"], { src: post.author.avatar, alt: post.author.name, fill: true, className: "object-cover" })),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("p", { className: "font-medium text-navy " + (featured ? 'text-base' : 'text-sm') }, post.author.name),
                        featured && (react_1["default"].createElement("div", { className: "flex items-center text-xs text-foreground-muted" },
                            react_1["default"].createElement(lucide_react_1.Calendar, { className: "w-3 h-3 mr-1" }),
                            react_1["default"].createElement("span", null, post.date),
                            react_1["default"].createElement("span", { className: "mx-2" }, "\u2022"),
                            react_1["default"].createElement(lucide_react_1.Clock, { className: "w-3 h-3 mr-1" }),
                            react_1["default"].createElement("span", null, post.readTime))))),
                !featured && (react_1["default"].createElement("div", { className: "flex items-center text-xs text-foreground-muted" },
                    react_1["default"].createElement(lucide_react_1.Calendar, { className: "w-3 h-3 mr-1" }),
                    react_1["default"].createElement("span", null, post.date)))),
            featured && (react_1["default"].createElement(link_1["default"], { href: "/blog/" + post.slug, className: "mt-6 inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors" },
                "Read full story",
                react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 ml-2", viewBox: "0 0 20 20", fill: "currentColor" },
                    react_1["default"].createElement("path", { fillRule: "evenodd", d: "M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z", clipRule: "evenodd" })))))));
}
exports.BlogCard = BlogCard;
