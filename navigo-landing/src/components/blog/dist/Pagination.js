"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Pagination = void 0;
// src/components/blog/Pagination.tsx
var react_1 = require("react");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
function Pagination(_a) {
    var currentPage = _a.currentPage, totalPages = _a.totalPages, basePath = _a.basePath;
    var pageNumbers = Array.from({ length: totalPages }, function (_, i) { return i + 1; });
    // Create a range of page numbers to display
    var pageRange = pageNumbers;
    if (totalPages > 5) {
        if (currentPage <= 3) {
            // Near the start
            pageRange = __spreadArrays(pageNumbers.slice(0, 5), [null, totalPages]);
        }
        else if (currentPage >= totalPages - 2) {
            // Near the end
            pageRange = __spreadArrays([1, null], pageNumbers.slice(totalPages - 5));
        }
        else {
            // Middle
            pageRange = [1, null, currentPage - 1, currentPage, currentPage + 1, null, totalPages];
        }
    }
    return (react_1["default"].createElement("nav", { className: "flex justify-center mt-12" },
        react_1["default"].createElement("ul", { className: "flex items-center space-x-2" },
            react_1["default"].createElement("li", null,
                react_1["default"].createElement(link_1["default"], { href: currentPage > 1 ? basePath + "/page/" + (currentPage - 1) : "" + basePath, className: "\n              flex items-center justify-center w-10 h-10 rounded-md border\n              " + (currentPage === 1
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-border hover:bg-primary hover:text-white text-navy transition-colors') + "\n            ", "aria-disabled": currentPage === 1, tabIndex: currentPage === 1 ? -1 : undefined },
                    react_1["default"].createElement(lucide_react_1.ChevronLeft, { className: "w-5 h-5" }))),
            pageRange.map(function (pageNumber, i) {
                return pageNumber === null ? (react_1["default"].createElement("li", { key: "ellipsis-" + i, className: "text-foreground-muted" }, "\u2026")) : (react_1["default"].createElement("li", { key: pageNumber },
                    react_1["default"].createElement(link_1["default"], { href: pageNumber === 1 ? basePath : basePath + "/page/" + pageNumber, className: "\n                  flex items-center justify-center w-10 h-10 rounded-md border\n                  " + (pageNumber === currentPage
                            ? 'bg-primary text-white border-primary'
                            : 'border-border hover:bg-sand/50 text-navy transition-colors') + "\n                ", "aria-current": pageNumber === currentPage ? 'page' : undefined }, pageNumber)));
            }),
            react_1["default"].createElement("li", null,
                react_1["default"].createElement(link_1["default"], { href: basePath + "/page/" + (currentPage + 1), className: "\n              flex items-center justify-center w-10 h-10 rounded-md border\n              " + (currentPage === totalPages
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-border hover:bg-primary hover:text-white text-navy transition-colors') + "\n            ", "aria-disabled": currentPage === totalPages, tabIndex: currentPage === totalPages ? -1 : undefined },
                    react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "w-5 h-5" }))))));
}
exports.Pagination = Pagination;
