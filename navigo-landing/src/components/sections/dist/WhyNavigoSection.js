"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
var SectionTitle_1 = require("@/components/ui/SectionTitle");
var use_mobile_1 = require("@/hooks/use-mobile");
var image_1 = require("next/image");
// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger);
}
// Define our conversation steps with corresponding character states
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
var SpeechBubble = function (_a) {
    var text = _a.text, isVisible = _a.isVisible, position = _a.position, bubbleColor = _a.bubbleColor;
    var textRef = react_1.useRef(null);
    react_1.useEffect(function () {
        if (isVisible && textRef.current) {
            var textElement_1 = textRef.current;
            var textContent_1 = text;
            // Clear current text
            textElement_1.textContent = '';
            // Create typewriter effect
            gsap_1.gsap.to(textElement_1, {
                duration: Math.min(0.02 * textContent_1.length, 2.5),
                onUpdate: function () {
                    var progress = Math.floor(this.progress() * textContent_1.length);
                    textElement_1.textContent = textContent_1.slice(0, progress);
                },
                ease: 'none'
            });
        }
    }, [isVisible, text]);
    var positionClasses = position === 'left'
        ? 'left-4 md:left-10 after:left-5 after:-ml-5 after:border-r-0 after:border-l-[15px]'
        : 'right-4 md:right-10 after:right-5 after:-mr-5 after:border-l-0 after:border-r-[15px]';
    return (react_1["default"].createElement(framer_motion_1.AnimatePresence, null, isVisible && (react_1["default"].createElement(framer_motion_1.motion.div, { className: "absolute top-4 max-w-[260px] md:max-w-xs " + positionClasses + " " + bubbleColor + " rounded-xl p-4 shadow-md border z-30", initial: { opacity: 0, y: -20, scale: 0.8 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }, transition: { duration: 0.4 } },
        react_1["default"].createElement("p", { ref: textRef, className: "text-navy text-sm md:text-base" }),
        react_1["default"].createElement("div", { className: "absolute -bottom-4 " + bubbleColor + " w-8 h-8 border transform rotate-45 after:content-[''] after:absolute after:top-0 after:h-0 after:w-0 after:border-t-[15px] after:border-solid after:border-transparent after:border-t-inherit" })))));
};
// Main component
function WhyNavigoSection() {
    var containerRef = react_1.useRef(null);
    var stepsRef = react_1.useRef([]);
    var _a = react_1.useState(0), activeStep = _a[0], setActiveStep = _a[1];
    var _b = react_1.useState('down'), scrollDirection = _b[0], setScrollDirection = _b[1];
    var isMobile = use_mobile_1.useMobile();
    react_1.useEffect(function () {
        if (typeof window === 'undefined')
            return;
        var handleIntersection = function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var index = parseInt(entry.target.getAttribute('data-index') || '0');
                    setActiveStep(index);
                }
            });
        };
        var options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6
        };
        var observer = new IntersectionObserver(handleIntersection, options);
        stepsRef.current.forEach(function (step) {
            if (step)
                observer.observe(step);
        });
        return function () {
            stepsRef.current.forEach(function (step) {
                if (step)
                    observer.unobserve(step);
            });
        };
    }, []);
    react_1.useEffect(function () {
        // Create scroll position tracking to determine direction
        var lastScrollTop = 0;
        var handleScroll = function () {
            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                setScrollDirection('down');
            }
            else {
                setScrollDirection('up');
            }
            lastScrollTop = st <= 0 ? 0 : st;
        };
        window.addEventListener('scroll', handleScroll);
        return function () { return window.removeEventListener('scroll', handleScroll); };
    }, []);
    // Get SVG for current step
    var getCurrentCharacterSvg = function () {
        var currentStep = conversationSteps[activeStep];
        if (currentStep.character === 'sarah-talking') {
            return '/Sarah talking.svg';
        }
        else if (currentStep.character === 'sarah-anxious') {
            return '/Sarah anxious.svg';
        }
        else if (currentStep.character === 'sarah-happy') {
            return '/Sarah happy again after priya.svg';
        }
        else if (currentStep.character.includes('priya')) {
            // Placeholder for Priya until we have her SVG
            return '/placeholder-priya.svg';
        }
        return '/Sarah talking.svg'; // Default fallback
    };
    // Simple step navigation for mobile
    var handleNextStep = function () {
        if (activeStep < conversationSteps.length - 1) {
            setActiveStep(function (prev) { return prev + 1; });
        }
    };
    var handlePrevStep = function () {
        if (activeStep > 0) {
            setActiveStep(function (prev) { return prev - 1; });
        }
    };
    return (react_1["default"].createElement("section", { id: "why-navigo", className: "relative bg-white py-20 overflow-hidden", ref: containerRef },
        react_1["default"].createElement("div", { className: "absolute inset-0 z-0 opacity-10 pointer-events-none" },
            react_1["default"].createElement("div", { className: "w-full h-full bg-gradient-to-b from-primary/5 to-transparent" }),
            react_1["default"].createElement("div", { className: "absolute inset-0 opacity-20", style: {
                    backgroundImage: 'url("/india-pattern-bg.svg")',
                    backgroundSize: '400px',
                    backgroundRepeat: 'repeat'
                } })),
        react_1["default"].createElement("div", { className: "text-center mb-16 relative z-10" },
            react_1["default"].createElement(SectionTitle_1["default"], { title: "Why Navigo?", subtitle: "Experience India with a friend by your side" })),
        react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" }, isMobile ? (
        // Mobile version - swipeable/tap through cards
        react_1["default"].createElement("div", { className: "relative min-h-[60vh] flex flex-col items-center" },
            react_1["default"].createElement("div", { className: "relative w-full h-[300px] mb-6" },
                react_1["default"].createElement("div", { className: "absolute inset-0 flex justify-center items-end" },
                    react_1["default"].createElement(framer_motion_1.motion.div, { key: activeStep, initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0 }, transition: { duration: 0.5 }, className: "relative w-[300px] h-[300px]" }, conversationSteps[activeStep].character.includes('priya') ? (react_1["default"].createElement("div", { className: "w-full h-full flex items-center justify-center" },
                        react_1["default"].createElement("div", { className: "w-40 h-40 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold" }, "Priya"))) : (react_1["default"].createElement(image_1["default"], { src: getCurrentCharacterSvg(), alt: conversationSteps[activeStep].character, fill: true, style: { objectFit: 'contain' } }))))),
            react_1["default"].createElement("div", { className: "relative w-full min-h-[150px] mb-8" },
                react_1["default"].createElement(SpeechBubble, { text: conversationSteps[activeStep].text, isVisible: true, position: conversationSteps[activeStep].bubblePosition, bubbleColor: conversationSteps[activeStep].bubbleColor })),
            react_1["default"].createElement("div", { className: "flex justify-between w-full mt-4" },
                react_1["default"].createElement("button", { onClick: handlePrevStep, disabled: activeStep === 0, className: "px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" }, "Previous"),
                react_1["default"].createElement("button", { onClick: handleNextStep, disabled: activeStep === conversationSteps.length - 1, className: "px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" }, "Next")),
            react_1["default"].createElement("div", { className: "mt-6 flex space-x-2" }, conversationSteps.map(function (_, index) { return (react_1["default"].createElement("div", { key: index, className: "w-2 h-2 rounded-full " + (index === activeStep ? 'bg-primary' : 'bg-gray-300') })); })))) : (
        // Desktop version - scroll-triggered
        react_1["default"].createElement("div", { className: "relative" },
            react_1["default"].createElement("div", { className: "sticky top-32 h-[60vh] flex items-end" },
                react_1["default"].createElement("div", { className: "w-full h-full flex justify-between relative" },
                    react_1["default"].createElement("div", { className: "absolute left-0 bottom-0 w-1/2 h-full flex items-end justify-start" },
                        react_1["default"].createElement(framer_motion_1.AnimatePresence, null, !conversationSteps[activeStep].character.includes('priya') && (react_1["default"].createElement(framer_motion_1.motion.div, { key: "sarah-" + activeStep, initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -30 }, transition: { duration: 0.5 }, className: "relative w-[300px] h-[300px]" },
                            react_1["default"].createElement(image_1["default"], { src: getCurrentCharacterSvg(), alt: conversationSteps[activeStep].character, fill: true, style: { objectFit: 'contain' } }))))),
                    react_1["default"].createElement("div", { className: "absolute right-0 bottom-0 w-1/2 h-full flex items-end justify-end" },
                        react_1["default"].createElement(framer_motion_1.AnimatePresence, null, conversationSteps[activeStep].character.includes('priya') && (react_1["default"].createElement(framer_motion_1.motion.div, { key: "priya-" + activeStep, initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 30 }, transition: { duration: 0.5 }, className: "relative w-[300px] h-[300px]" },
                            react_1["default"].createElement("div", { className: "w-full h-full flex items-center justify-center" },
                                react_1["default"].createElement("div", { className: "w-40 h-40 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold" }, "Priya")))))),
                    react_1["default"].createElement("div", { className: "absolute top-0 left-0 w-full h-full pointer-events-none" }, conversationSteps.map(function (step, index) { return (react_1["default"].createElement(SpeechBubble, { key: step.id, text: step.text, isVisible: activeStep === index, position: step.bubblePosition, bubbleColor: step.bubbleColor })); })))),
            react_1["default"].createElement("div", { className: "relative mt-[20vh]" }, conversationSteps.map(function (step, index) { return (react_1["default"].createElement("div", { key: step.id, ref: function (el) {
                    if (el)
                        stepsRef.current[index] = el;
                }, "data-index": index, className: "min-h-screen flex items-center justify-center" },
                react_1["default"].createElement("div", { className: "opacity-0 pointer-events-none" },
                    "Step ",
                    index + 1))); })),
            activeStep === 0 && (react_1["default"].createElement(framer_motion_1.motion.div, { className: "fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-primary", animate: { y: [0, 10, 0] }, transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" } },
                react_1["default"].createElement("p", { className: "mb-2 text-sm font-medium" }, "Scroll down"),
                react_1["default"].createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    react_1["default"].createElement("path", { d: "M12 5V19M12 19L19 12M12 19L5 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })))))))));
}
exports["default"] = WhyNavigoSection;
