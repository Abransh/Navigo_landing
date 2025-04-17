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
    var text = _a.text, isVisible = _a.isVisible, position = _a.position, bubbleColor = _a.bubbleColor, _b = _a.delay, delay = _b === void 0 ? 0 : _b;
    var textRef = react_1.useRef(null);
    var _c = react_1.useState(false), isTyping = _c[0], setIsTyping = _c[1];
    var typingRef = react_1.useRef(null);
    react_1.useEffect(function () {
        if (isVisible && textRef.current) {
            setIsTyping(true);
            var textElement_1 = textRef.current;
            var textContent_1 = text;
            // Clear current text
            textElement_1.textContent = '';
            // Create simple typewriter effect
            var i_1 = 0;
            var speed_1 = Math.min(40, 1000 / textContent_1.length); // Adjust speed based on text length
            var typeWriter_1 = function () {
                if (i_1 < textContent_1.length) {
                    textElement_1.textContent += textContent_1.charAt(i_1);
                    i_1++;
                    typingRef.current = setTimeout(typeWriter_1, speed_1);
                }
                else {
                    setIsTyping(false);
                }
            };
            // Start typing effect with a small delay
            var startDelay_1 = setTimeout(function () {
                typeWriter_1();
            }, 300 + delay);
            return function () {
                clearTimeout(startDelay_1);
                if (typingRef.current) {
                    clearTimeout(typingRef.current);
                }
            };
        }
        return function () {
            if (typingRef.current) {
                clearTimeout(typingRef.current);
            }
        };
    }, [isVisible, text, delay]);
    var positionClasses = position === 'left'
        ? 'left-4 md:left-16'
        : 'right-4 md:right-16';
    return (react_1["default"].createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, isVisible && (react_1["default"].createElement(framer_motion_1.motion.div, { className: "absolute top-8 max-w-[260px] md:max-w-xs " + positionClasses + " " + bubbleColor + " rounded-xl p-4 shadow-md border z-30", initial: { opacity: 0, y: -20, scale: 0.8 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }, transition: { duration: 0.4, delay: delay * 0.1 } },
        react_1["default"].createElement("p", { ref: textRef, className: "text-navy text-sm md:text-base min-h-[2.5rem]" }),
        isTyping && (react_1["default"].createElement("span", { className: "inline-block w-[2px] h-[14px] bg-primary ml-[1px] animate-pulse" })),
        react_1["default"].createElement("div", { className: "absolute -bottom-4 " + bubbleColor + " w-8 h-8 border transform rotate-45 " + (position === 'left' ? 'left-5' : 'right-5') })))));
};
// Main component
function WhyNavigoSection() {
    var sectionRef = react_1.useRef(null);
    var _a = react_1.useState(0), activeStep = _a[0], setActiveStep = _a[1];
    var isMobile = use_mobile_1.useMobile();
    var _b = react_1.useState(false), isScrolling = _b[0], setIsScrolling = _b[1];
    // Function to handle scroll for desktop
    react_1.useEffect(function () {
        if (typeof window === 'undefined' || isMobile)
            return;
        var handleScroll = function () {
            if (!sectionRef.current)
                return;
            var rect = sectionRef.current.getBoundingClientRect();
            var windowHeight = window.innerHeight;
            var sectionTop = rect.top;
            var sectionHeight = rect.height;
            // Calculate visible portion of the section
            var visibleHeight = Math.min(windowHeight - Math.max(0, sectionTop), sectionHeight);
            // Calculate scroll progress (0 to 1)
            var scrollProgress = Math.min(Math.max(0, -sectionTop / (sectionHeight - windowHeight)), 1);
            // Calculate step based on scroll progress
            var stepIndex = Math.floor(scrollProgress * (conversationSteps.length - 1));
            if (stepIndex >= 0 && stepIndex < conversationSteps.length && stepIndex !== activeStep) {
                setActiveStep(stepIndex);
            }
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        // Initial check
        handleScroll();
        return function () {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [isMobile, activeStep]);
    // Simple step navigation for mobile with bounds checking
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
    // Get current character image with safety check
    var getCurrentCharacterSvg = function (character) {
        if (!character)
            return '/Sarah-talking.svg'; // Default fallback
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
            return '/placeholder-priya.svg';
        }
        return '/Sarah-talking.svg'; // Default fallback
    };
    // Safety check for current step
    var currentStep = conversationSteps[activeStep] || conversationSteps[0];
    return (react_1["default"].createElement("section", { id: "why-navigo", className: "sticky top-0 min-h-[800vh] bg-white overflow-hidden", ref: sectionRef },
        react_1["default"].createElement("div", { className: "absolute inset-0 z-0 opacity-10 pointer-events-none" },
            react_1["default"].createElement("div", { className: "w-full h-full bg-gradient-to-b from-primary/5 to-transparent" }),
            react_1["default"].createElement("div", { className: "absolute inset-0 opacity-20", style: {
                    backgroundImage: 'url("/india-pattern-bg.svg")',
                    backgroundSize: '400px',
                    backgroundRepeat: 'repeat'
                } })),
        react_1["default"].createElement("div", { className: "sticky top-0 py-10 bg-white/95 backdrop-blur-sm z-10" },
            react_1["default"].createElement("div", { className: "text-center" },
                react_1["default"].createElement(SectionTitle_1["default"], { title: "Why Navigo?", subtitle: "Experience India with a friend by your side" }))),
        react_1["default"].createElement("div", { className: "sticky top-[200px] h-[70vh] flex items-center justify-center z-20" },
            react_1["default"].createElement("div", { className: "absolute left-1/4 transform -translate-x-1/2" },
                react_1["default"].createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, !currentStep.character.includes('priya') && (react_1["default"].createElement(framer_motion_1.motion.div, { key: currentStep.character, initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 }, transition: { duration: 0.5 }, className: "relative z-20" },
                    react_1["default"].createElement(image_1["default"], { src: getCurrentCharacterSvg(currentStep.character), alt: currentStep.character, width: 200, height: 200, className: "w-40 h-40 md:w-48 md:h-48" }))))),
            react_1["default"].createElement("div", { className: "absolute right-1/4 transform translate-x-1/2" },
                react_1["default"].createElement(SpeechBubble, { text: currentStep.text, isVisible: true, position: currentStep.bubblePosition, bubbleColor: currentStep.bubbleColor, delay: 0.2 })),
            currentStep.character.includes('priya') && (react_1["default"].createElement("div", { className: "absolute right-1/4 transform translate-x-1/2" },
                react_1["default"].createElement(framer_motion_1.AnimatePresence, { mode: "wait" },
                    react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 50 }, transition: { duration: 0.5 }, className: "relative z-20" },
                        react_1["default"].createElement(image_1["default"], { src: "/placeholder-priya.svg", alt: "Priya", width: 200, height: 200, className: "w-40 h-40 md:w-48 md:h-48" })))))),
        activeStep === 0 && (react_1["default"].createElement(framer_motion_1.motion.div, { className: "fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-primary z-30", animate: { y: [0, 10, 0] }, transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" } },
            react_1["default"].createElement("p", { className: "mb-2 text-sm font-medium" }, "Scroll down to continue the story"),
            react_1["default"].createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                react_1["default"].createElement("path", { d: "M12 5V19M12 19L19 12M12 19L5 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })))),
        isMobile && (react_1["default"].createElement("div", { className: "fixed bottom-4 left-0 right-0 flex justify-center gap-4 z-30" },
            react_1["default"].createElement("button", { onClick: handlePrevStep, disabled: activeStep === 0, className: "px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50" }, "Previous"),
            react_1["default"].createElement("button", { onClick: handleNextStep, disabled: activeStep === conversationSteps.length - 1, className: "px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50" }, "Next"))),
        react_1["default"].createElement("div", { className: "h-[700vh]" })));
}
exports["default"] = WhyNavigoSection;
