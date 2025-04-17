"use client";
"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

var react_1 = require("react");

var dynamic_1 = require("next/dynamic");

var SectionTitle_1 = require("@/components/ui/SectionTitle"); // Dynamically import the WhyNavigo component to avoid SSR issues with GSAP


var WhyNavigoSection = dynamic_1["default"](function () {
  return Promise.resolve().then(function () {
    return require('@/components/sections/WhyNavigoSection');
  });
}, {
  ssr: false,
  loading: function loading() {
    return react_1["default"].createElement(WhyNavigoSectionFallback, null);
  }
}); // Fallback loading component

var WhyNavigoSectionFallback = function WhyNavigoSectionFallback() {
  return react_1["default"].createElement("div", {
    className: "min-h-screen bg-background py-20 flex items-center justify-center"
  }, react_1["default"].createElement("div", {
    className: "text-center"
  }, react_1["default"].createElement(SectionTitle_1["default"], {
    title: "Why Navigo?",
    subtitle: "Loading interactive experience..."
  }), react_1["default"].createElement("div", {
    className: "mt-8 flex justify-center"
  }, react_1["default"].createElement("div", {
    className: "animate-pulse flex space-x-4"
  }, react_1["default"].createElement("div", {
    className: "rounded-full bg-primary/30 h-12 w-12"
  }), react_1["default"].createElement("div", {
    className: "flex-1 space-y-4 py-1 max-w-md"
  }, react_1["default"].createElement("div", {
    className: "h-4 bg-primary/20 rounded w-3/4"
  }), react_1["default"].createElement("div", {
    className: "space-y-2"
  }, react_1["default"].createElement("div", {
    className: "h-4 bg-primary/10 rounded"
  }), react_1["default"].createElement("div", {
    className: "h-4 bg-primary/10 rounded w-5/6"
  })))))));
}; // Main component that replaces the "How Navigo Works" section


function WhyNavigoIntegration() {
  var _this = this;

  var _a = react_1.useState(false),
      assetsLoaded = _a[0],
      setAssetsLoaded = _a[1];

  react_1.useEffect(function () {
    // Function to preload SVG assets
    var preloadSvgs = function preloadSvgs() {
      return __awaiter(_this, void 0, void 0, function () {
        var svgUrls, preloadPromises, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              svgUrls = ['/Sarah-talking.svg', '/Sarah-anxious.svg', '/Sarah-happy-again-after-priya.svg'];
              preloadPromises = svgUrls.map(function (url) {
                return new Promise(function (resolve, reject) {
                  var img = new Image();

                  img.onload = function () {
                    return resolve(url);
                  };

                  img.onerror = function () {
                    console.warn("Failed to preload: " + url);
                    resolve(url); // Resolve anyway to not block the UI
                  };

                  img.src = url;
                });
              }); // Wait for all images to load

              return [4
              /*yield*/
              , Promise.all(preloadPromises)];

            case 1:
              // Wait for all images to load
              _a.sent();

              setAssetsLoaded(true);
              return [3
              /*break*/
              , 3];

            case 2:
              error_1 = _a.sent();
              console.error('Error preloading SVGs:', error_1); // Set assets as loaded anyway to avoid blocking the UI

              setAssetsLoaded(true);
              return [3
              /*break*/
              , 3];

            case 3:
              return [2
              /*return*/
              ];
          }
        });
      });
    }; // Create a placeholder for Priya SVG until we have it


    var createPriyaPlaceholder = function createPriyaPlaceholder() {
      // Create a simple SVG as a placeholder
      var svgStr = "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 320\" width=\"200\" height=\"320\">\n          <circle cx=\"100\" cy=\"160\" r=\"80\" fill=\"#1A5F7A\" opacity=\"0.2\" />\n          <text x=\"100\" y=\"160\" text-anchor=\"middle\" dominant-baseline=\"middle\" font-family=\"Arial\" font-size=\"24\" fill=\"#1A5F7A\">Priya</text>\n        </svg>\n      "; // Create a blob URL

      var blob = new Blob([svgStr], {
        type: 'image/svg+xml'
      });
      var url = URL.createObjectURL(blob); // Add to document to enable loading

      var img = new Image();

      img.onload = function () {
        // Create a temporary link to save to the virtual filesystem
        var a = document.createElement('a');
        a.href = url;
        a.download = 'placeholder-priya.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

      img.src = url;
    }; // Load assets and create placeholder


    preloadSvgs();
    createPriyaPlaceholder(); // Clean up function

    return function () {// Any cleanup code here
    };
  }, []);
  return react_1["default"].createElement(react_1["default"].Fragment, null, assetsLoaded ? react_1["default"].createElement(WhyNavigoSection, null) : react_1["default"].createElement(WhyNavigoSectionFallback, null));
}

exports["default"] = WhyNavigoIntegration;