"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var image_1 = require("next/image");
var SectionTitle_1 = require("@/components/ui/SectionTitle");
var use_mobile_1 = require("@/hooks/use-mobile");
// Define our conversation steps with corresponding character states
var conversationSteps = [
    {
        id: 'step-1',
        character: 'sarah-talking',
        text: "I want to visit India! It's so cultural, peaceful, and rich in heritage.",
        bubblePosition: 'right',
        bubbleColor: 'bg-sand border-earth'
    },
    {
        id: 'step-2',
        character: 'sarah-anxious',
        text: "But I'm worried about navigating the chaos, language barriers, and safety concerns...",
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
        character: 'priya-placeholder',
        text: "I'll show you India's hidden gems beyond the usual tourist spots - beautiful places with less crowd!",
        bubblePosition: 'left',
        bubbleColor: 'bg-white border-primary'
    },
    {
        id: 'step-8',
        character: 'sarah-happy',
        text: "That sounds amazing! I can't wait to explore the real India with you!",
        bubblePosition: 'right',
        bubbleColor: 'bg-sand border-earth'
    },
];
var SpeechBubble = function (_a) {
    var text = _a.text, isVisible = _a.isVisible, position = _a.position, bubbleColor = _a.bubbleColor, _b = _a.delay, delay = _b === void 0 ? 0 : _b, className = _a.className;
    var textRef = react_1.useRef(null);
    var _c = react_1.useState(""), typedText = _c[0], setTypedText = _c[1];
    var _d = react_1.useState(false), isTyping = _d[0], setIsTyping = _d[1];
    // Simple typewriter effect with React state
    react_1.useEffect(function () {
        if (isVisible && text) {
            setTypedText(""); // Reset text
            setIsTyping(true);
            var i_1 = 0;
            var typeSpeed_1 = 30; // ms per character
            var typeWriter_1 = function () {
                if (i_1 < text.length) {
                    setTypedText(function (prev) { return prev + text.charAt(i_1); });
                    i_1++;
                    setTimeout(typeWriter_1, typeSpeed_1);
                }
                else {
                    setIsTyping(false);
                }
            };
            // Start typing after a short delay
            var timer_1 = setTimeout(typeWriter_1, 300);
            return function () {
                clearTimeout(timer_1);
            };
        }
    }, [isVisible, text]);
    var bubbleClass = position === 'left' ? 'speech-bubble-left' : 'speech-bubble-right';
    return (react_1["default"].createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, isVisible && (react_1["default"].createElement(framer_motion_1.motion.div, { className: "absolute " + (position === 'left' ? 'left-8 md:left-24' : 'right-8 md:right-28') + " top-4 \n            w-64 md:w-80 " + bubbleColor + " rounded-xl p-4 shadow-md border z-30 " + bubbleClass + " " + className, initial: { opacity: 0, y: -20, scale: 0.8 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }, transition: { duration: 0.4, delay: delay * 0.1 } },
        react_1["default"].createElement("p", { ref: textRef, className: "text-navy text-sm md:text-base min-h-[3.5rem]" },
            typedText,
            isTyping && react_1["default"].createElement("span", { className: "inline-block w-[2px] h-[14px] bg-primary ml-[1px] animate-pulse" }))))));
};
// Main component
function WhyNavigoSection() {
    var sectionRef = react_1.useRef(null);
    var containerRef = react_1.useRef(null);
    var _a = react_1.useState(0), activeStep = _a[0], setActiveStep = _a[1];
    var isMobile = use_mobile_1.useMobile();
    var _b = react_1.useState(0), scrollHeight = _b[0], setScrollHeight = _b[1];
    // Calculate and set section height for proper stickiness
    react_1.useEffect(function () {
        if (sectionRef.current) {
            // Set section height based on number of steps (one viewport height per step)
            var totalHeight = window.innerHeight * conversationSteps.length;
            setScrollHeight(totalHeight);
            sectionRef.current.style.height = totalHeight + "px";
        }
    }, []);
    // Handle scroll-based step transitions
    react_1.useEffect(function () {
        if (typeof window === 'undefined' || isMobile)
            return;
        var handleScroll = function () {
            if (!sectionRef.current)
                return;
            var rect = sectionRef.current.getBoundingClientRect();
            var scrollProgress = -rect.top / (scrollHeight - window.innerHeight);
            // Calculate which step we're on based on scroll position
            var newStep = Math.min(Math.floor(scrollProgress * conversationSteps.length), conversationSteps.length - 1);
            // Only update if necessary to avoid re-renders
            if (newStep >= 0 && newStep !== activeStep) {
                setActiveStep(newStep);
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return function () {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile, activeStep, scrollHeight]);
    // Simple step navigation for mobile
    var handleNextStep = function () {
        if (activeStep < conversationSteps.length - 1) {
            setActiveStep(function (prev) { return Math.min(prev + 1, conversationSteps.length - 1); });
        }
    };
    var handlePrevStep = function () {
        if (activeStep > 0) {
            setActiveStep(function (prev) { return Math.max(prev - 1, 0); });
        }
    };
    // Get current character SVG
    var getCurrentCharacterSvg = function (character) {
        if (character === 'sarah-talking') {
            return '/Sarah-talking.svg';
        }
        else if (character === 'sarah-anxious') {
            return '/Sarah-anxious.svg';
        }
        else if (character === 'sarah-happy') {
            return '/Sarah-happy-again-after-priya.svg';
        }
        else if (character.includes('priya')) {
            return '/priya-placeholder.svg';
        }
        return '/Sarah-talking.svg'; // Default fallback
    };
    // Generate Priya placeholder SVG if needed
    react_1.useEffect(function () {
        if (typeof window === 'undefined')
            return;
        // Check if the Priya SVG exists
        var priyaImage = document.createElement('img');
        priyaImage.src = '/priya-placeholder.svg';
        priyaImage.onerror = function () {
            console.info("Priya placeholder SVG is missing");
        };
    }, []);
    // Current step and character checks
    var currentStep = conversationSteps[activeStep] || conversationSteps[0];
    var isCurrentStepSarah = !currentStep.character.includes('priya');
    var isCurrentStepPriya = currentStep.character.includes('priya');
    return (react_1["default"].createElement("section", { id: "why-navigo", className: "relative bg-white", ref: sectionRef, style: { height: scrollHeight + "px" } },
        react_1["default"].createElement("div", { ref: containerRef, className: "sticky top-0 left-0 right-0 h-screen overflow-hidden" },
            react_1["default"].createElement("div", { className: "absolute inset-0 z-0 opacity-10 pointer-events-none" },
                react_1["default"].createElement("div", { className: "w-full h-full bg-gradient-to-b from-primary/5 to-transparent" }),
                react_1["default"].createElement("div", { className: "absolute inset-0 opacity-20", style: {
                        backgroundImage: 'url("/images/indian-pattern.svg")',
                        backgroundSize: '400px',
                        backgroundRepeat: 'repeat'
                    } })),
            react_1["default"].createElement("div", { className: "py-6 bg-white/95 backdrop-blur-sm z-10" },
                react_1["default"].createElement("div", { className: "text-center" },
                    react_1["default"].createElement(SectionTitle_1["default"], { title: "Why Navigo?", subtitle: "Experience India with a friend by your side" }))),
            react_1["default"].createElement("div", { className: "flex-1 flex items-center justify-center relative h-[calc(100vh-8rem)]" },
                react_1["default"].createElement("div", { className: "absolute left-0 w-1/2 h-full flex items-center justify-end" },
                    react_1["default"].createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, isCurrentStepSarah && (react_1["default"].createElement(framer_motion_1.motion.div, { key: "sarah-" + currentStep.id, initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 }, transition: { duration: 0.5 }, className: "relative z-20 mr-12 md:mr-24 mt-40" },
                        react_1["default"].createElement("div", { className: "relative" },
                            react_1["default"].createElement(image_1["default"], { src: getCurrentCharacterSvg(currentStep.character), alt: "Sarah", width: 300, height: 300, className: "w-44 h-44 md:w-64 md:h-64 object-contain" }),
                            isCurrentStepSarah && (react_1["default"].createElement(SpeechBubble, { text: currentStep.text, isVisible: true, position: "right", bubbleColor: currentStep.bubbleColor, delay: 0.2, className: "right-16 md:right-24 top-[-2rem]" }))))))),
                react_1["default"].createElement("div", { className: "absolute right-0 w-1/2 h-full flex items-center justify-start" },
                    react_1["default"].createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, isCurrentStepPriya && (react_1["default"].createElement(framer_motion_1.motion.div, { key: "priya-" + currentStep.id, initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 50 }, transition: { duration: 0.5 }, className: "relative z-20 ml-8 md:ml-16" },
                        react_1["default"].createElement("div", { className: "relative" },
                            react_1["default"].createElement(image_1["default"], { src: getCurrentCharacterSvg(currentStep.character), alt: "Priya", width: 300, height: 300, className: "w-44 h-44 md:w-64 md:h-64 object-contain" }),
                            isCurrentStepPriya && (react_1["default"].createElement(SpeechBubble, { text: currentStep.text, isVisible: true, position: "left", bubbleColor: currentStep.bubbleColor, delay: 0.2 }))))))),
                react_1["default"].createElement("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-20" },
                    react_1["default"].createElement("svg", { viewBox: "0 0 64 64", xmlns: "http://www.w3.org/2000/svg" },
                        react_1["default"].createElement("circle", { cx: "32", cy: "32", r: "30", fill: "none", stroke: "#BE5504", strokeWidth: "1" }),
                        react_1["default"].createElement("circle", { cx: "32", cy: "32", r: "20", fill: "none", stroke: "#BE5504", strokeWidth: "1" }),
                        react_1["default"].createElement("circle", { cx: "32", cy: "32", r: "10", fill: "none", stroke: "#BE5504", strokeWidth: "1" }),
                        react_1["default"].createElement("path", { d: "M32,2 L32,62 M2,32 L62,32", stroke: "#BE5504", strokeWidth: "1" })))),
            activeStep === 0 && !isMobile && (react_1["default"].createElement(framer_motion_1.motion.div, { className: "absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-primary z-30", animate: { y: [0, 10, 0] }, transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" } },
                react_1["default"].createElement("p", { className: "mb-2 text-sm font-medium" }, "Scroll down to continue the story"),
                react_1["default"].createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    react_1["default"].createElement("path", { d: "M12 5V19M12 19L19 12M12 19L5 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })))),
            react_1["default"].createElement("div", { className: "absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2" }, conversationSteps.map(function (_, index) { return (react_1["default"].createElement("div", { key: index, className: "w-2 h-2 rounded-full " + (index === activeStep ? 'bg-primary' : 'bg-primary/30') })); })),
            isMobile && (react_1["default"].createElement("div", { className: "absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-30" },
                react_1["default"].createElement("button", { onClick: handlePrevStep, disabled: activeStep === 0, className: "px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50" }, "Previous"),
                react_1["default"].createElement("button", { onClick: handleNextStep, disabled: activeStep === conversationSteps.length - 1, className: "px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50" }, "Next"))))));
}
exports["default"] = WhyNavigoSection;
