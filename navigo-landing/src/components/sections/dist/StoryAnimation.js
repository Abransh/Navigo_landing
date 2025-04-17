"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
require("./StoryAnimation.css");
var conversationSteps = [
    {
        character: 'user',
        text: "I need help with my code...",
        position: 'left'
    },
    {
        character: 'navigo',
        text: "I can help you with that! What's the issue?",
        position: 'right'
    },
    {
        character: 'user',
        text: "I'm having trouble with this animation...",
        position: 'left'
    },
    {
        character: 'navigo',
        text: "Let me take a look and help you fix it!",
        position: 'right'
    }
];
var Character = function (_a) {
    var type = _a.type;
    return (react_1["default"].createElement(framer_motion_1.motion.div, { className: "character", initial: { opacity: 0, x: type === 'user' ? -50 : 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: type === 'user' ? -50 : 50 } },
        react_1["default"].createElement("img", { src: type === 'user' ? '/user-avatar.png' : '/navigo-avatar.png', alt: type, className: "w-16 h-16 rounded-full" })));
};
var SpeechBubble = function (_a) {
    var text = _a.text, position = _a.position;
    return (react_1["default"].createElement(framer_motion_1.motion.div, { className: "speech-bubble " + position, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 } },
        react_1["default"].createElement("div", { className: "typewriter" },
            text,
            react_1["default"].createElement("span", { className: "cursor" }))));
};
var StoryAnimation = function () {
    var _a = react_1.useState(0), currentStep = _a[0], setCurrentStep = _a[1];
    react_1.useEffect(function () {
        var handleScroll = function () {
            var scrollPosition = window.scrollY;
            var windowHeight = window.innerHeight;
            var section = document.getElementById('story-section');
            if (section) {
                var sectionTop = section.offsetTop;
                var sectionHeight = section.offsetHeight;
                var progress = scrollPosition / (sectionHeight - windowHeight);
                if (progress >= 0 && progress <= 1) {
                    var step = Math.floor(progress * conversationSteps.length);
                    setCurrentStep(Math.min(step, conversationSteps.length - 1));
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return function () { return window.removeEventListener('scroll', handleScroll); };
    }, []);
    var currentConversation = conversationSteps[currentStep];
    return (react_1["default"].createElement("section", { id: "story-section" },
        react_1["default"].createElement("div", { className: "container" },
            react_1["default"].createElement("div", { className: "content-wrapper" },
                react_1["default"].createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, currentConversation.position === 'left' && (react_1["default"].createElement("div", { className: "flex items-center gap-8" },
                    react_1["default"].createElement(Character, { type: currentConversation.character }),
                    react_1["default"].createElement(SpeechBubble, { text: currentConversation.text, position: "left" })))),
                react_1["default"].createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, currentConversation.position === 'right' && (react_1["default"].createElement("div", { className: "flex items-center gap-8 justify-end" },
                    react_1["default"].createElement(SpeechBubble, { text: currentConversation.text, position: "right" }),
                    react_1["default"].createElement(Character, { type: currentConversation.character }))))))));
};
exports["default"] = StoryAnimation;
