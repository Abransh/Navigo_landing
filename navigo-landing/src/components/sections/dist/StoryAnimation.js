"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
require("./StoryAnimation.css");
var conversationSteps = [
    {
        id: 'step-1',
        character: 'sarah-talking',
        text: "I want to visit India, it's so cultural, peaceful, and rich in heritage!",
        bubblePosition: 'right',
        bubbleColor: 'bg-sand border-earth'
    },
    {
        id: 'step-2',
        character: 'sarah-anxious',
        text: "But I'm worried about navigating all the chaos, language barriers, and safety concerns...",
        bubblePosition: 'right',
        bubbleColor: 'bg-sand border-earth'
    },
    {
        id: 'step-3',
        character: 'sarah-anxious',
        text: "I wish I had a friend there who could guide me and be my travel companion.",
        bubblePosition: 'right',
        bubbleColor: 'bg-sand border-earth'
    },
    {
        id: 'step-4',
        character: 'priya-placeholder',
        text: "Hey Sarah, don't worry! I'm here to help you explore India safely.",
        bubblePosition: 'left',
        bubbleColor: 'bg-white border-primary'
    },
    {
        id: 'step-5',
        character: 'priya-placeholder',
        text: "I'll guide you to amazing food places that are authentic but not too spicy for travelers.",
        bubblePosition: 'left',
        bubbleColor: 'bg-white border-primary'
    },
    {
        id: 'step-6',
        character: 'priya-placeholder',
        text: "We'll stay in safe areas, and Navigo's team is backing us throughout your journey.",
        bubblePosition: 'left',
        bubbleColor: 'bg-white border-primary'
    },
    {
        id: 'step-7',
        character: 'sarah-happy',
        text: "That sounds amazing! I can't wait to explore the real India with you!",
        bubblePosition: 'right',
        bubbleColor: 'bg-sand border-earth'
    },
];
var Character = function (_a) {
    var type = _a.type;
    var getImagePath = function () {
        switch (type) {
            case 'sarah-talking':
                return '/Sarah-talking.svg';
            case 'sarah-anxious':
                return '/Sarah-anxious.svg';
            case 'sarah-happy':
                return '/Sarah-happy-again-after-priya.svg';
            case 'priya-placeholder':
                return '/placeholder-priya.svg';
            default:
                return '/Sarah-talking.svg';
        }
    };
    return (react_1["default"].createElement(framer_motion_1.motion.div, { className: "character", initial: { opacity: 0, x: type.includes('sarah') ? -50 : 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: type.includes('sarah') ? -50 : 50 } },
        react_1["default"].createElement("img", { src: getImagePath(), alt: type })));
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
                react_1["default"].createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, currentConversation.bubblePosition === 'left' && (react_1["default"].createElement("div", { className: "flex items-center gap-8" },
                    react_1["default"].createElement(Character, { type: currentConversation.character }),
                    react_1["default"].createElement(SpeechBubble, { text: currentConversation.text, position: "left" })))),
                react_1["default"].createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, currentConversation.bubblePosition === 'right' && (react_1["default"].createElement("div", { className: "flex items-center gap-8 justify-end" },
                    react_1["default"].createElement(SpeechBubble, { text: currentConversation.text, position: "right" }),
                    react_1["default"].createElement(Character, { type: currentConversation.character }))))))));
};
exports["default"] = StoryAnimation;
