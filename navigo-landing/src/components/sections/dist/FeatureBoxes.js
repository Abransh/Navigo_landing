"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var framer_motion_1 = require("framer-motion");
var use_mobile_1 = require("@/hooks/use-mobile");
var SectionTitle_1 = require("@/components/ui/SectionTitle");
var lucide_react_1 = require("lucide-react");
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger);
}
var FeatureBoxes = function () {
    var isMobile = use_mobile_1.useMobile();
    var sectionRef = react_1.useRef(null);
    var _a = react_1.useState(0), activeFeatureIndex = _a[0], setActiveFeatureIndex = _a[1];
    var _b = react_1.useState(false), isAnimationComplete = _b[0], setIsAnimationComplete = _b[1];
    var controlsTitle = framer_motion_1.useAnimation();
    var controlsDescription = framer_motion_1.useAnimation();
    var featureBoxes = react_1.useMemo(function () { return [
        {
            title: "Enhanced Safety for All Travelers",
            description: "Travel with confidence knowing you're accompanied by a verified local companion. We prioritize safety with thorough background checks, real-time location sharing, and specialized support for solo female travelers.",
            icon: lucide_react_1.Shield,
            leftImage: "/images/QrBarBoxes.png",
            rightImage: "/images/featuresbox1.jpg",
            color: "#FF9933",
            facts: [
                "All companions undergo thorough background checks",
                "Real-time location sharing for peace of mind",
                "24/7 support team available during your travels",
                "Special safety protocols for solo female travelers"
            ]
        },
        {
            title: "Protection from Tourist Inflation",
            description: "Stop paying tourist prices! Our local companions help you access fair, local rates for everything from street food to souvenirs. They'll negotiate on your behalf and steer you away from overpriced tourist traps.",
            icon: lucide_react_1.Users,
            leftImage: "/images/QrBarBoxes.png",
            rightImage: "/images/featuresbox2.jpg",
            color: "#1A5F7A",
            facts: [
                "Save 30-50% on typical tourist prices",
                "Access authentic local markets and street food",
                "Skip tourist-targeted scams and price inflation",
                "Learn the real value of goods and services"
            ]
        },
        {
            title: "Seamless Communication",
            description: "Break through language barriers with our bilingual companions. They'll help translate conversations, read menus, negotiate with vendors, and ensure you're always understood wherever you go.",
            icon: lucide_react_1.Languages,
            leftImage: "/images/QrBarBoxes.png",
            rightImage: "/images/SeamlessCom.png",
            color: "#BE5504",
            facts: [
                "Companions are fluent in English and local languages",
                "Navigate complex cultural customs with ease",
                "Communicate with locals authentically",
                "Understand the subtle nuances in conversations"
            ]
        },
        {
            title: "Authentic Cultural Experiences",
            description: "Discover hidden gems and experience destinations like a true local. Our companions share insider knowledge, family traditions, and off-the-beaten-path locations that you'd never find in guidebooks.",
            icon: lucide_react_1.MapPin,
            leftImage: "/images/QrBarBoxes.png",
            rightImage: "/images/AuthenticExp.jpeg",
            color: "#FF9933",
            facts: [
                "Visit places only locals know about",
                "Experience authentic cultural ceremonies",
                "Learn about traditions firsthand from locals",
                "Create meaningful connections with local communities"
            ]
        },
    ]; }, []);
    // Initialize GSAP animations for desktop
    react_1.useEffect(function () {
        if (isMobile || !sectionRef.current)
            return;
        // Clear any existing ScrollTriggers
        ScrollTrigger_1.ScrollTrigger.getAll().forEach(function (t) { return t.kill(); });
        // Create a GSAP timeline for the feature sections
        featureBoxes.forEach(function (_, index) {
            var featureElement = document.getElementById("feature-section-" + index);
            if (!featureElement)
                return;
            // Create a ScrollTrigger for each feature section
            gsap_1.gsap.fromTo(featureElement, { opacity: 0.3, y: 50 }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: featureElement,
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play none none reverse",
                    onEnter: function () { return setActiveFeatureIndex(index); },
                    onEnterBack: function () { return setActiveFeatureIndex(index); },
                    id: "feature-" + index
                }
            });
            // Animate the image container with a parallax effect
            var imageContainer = featureElement.querySelector('.image-container');
            if (imageContainer) {
                gsap_1.gsap.fromTo(imageContainer, { y: 50 }, {
                    y: -50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: featureElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5,
                        id: "parallax-" + index
                    }
                });
            }
        });
        // Animation for the section title
        gsap_1.gsap.from(".feature-title", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".feature-title",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
        return function () {
            // Clean up all ScrollTriggers when component unmounts
            ScrollTrigger_1.ScrollTrigger.getAll().forEach(function (t) { return t.kill(); });
        };
    }, [isMobile, featureBoxes]);
    // Framer Motion animation variants
    var containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };
    var itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1.0]
            }
        }
    };
    // Function to handle manual navigation for mobile
    var handleFeatureClick = function (index) {
        setActiveFeatureIndex(index);
        controlsTitle.start({ opacity: 0, y: -20 })
            .then(function () {
            controlsTitle.start({ opacity: 1, y: 0 });
        });
        controlsDescription.start({ opacity: 0 })
            .then(function () {
            controlsDescription.start({ opacity: 1 });
        });
    };
    react_1.useEffect(function () {
        if (isMobile) {
            controlsTitle.start({ opacity: 1, y: 0 });
            controlsDescription.start({ opacity: 1 });
        }
    }, [activeFeatureIndex, isMobile, controlsTitle, controlsDescription]);
    // Mobile version with enhanced card-based UI and animations
    if (isMobile) {
        return (react_1["default"].createElement("section", { id: "benefits-mobile", className: "px-4 py-16 bg-sand overflow-hidden" },
            react_1["default"].createElement("div", { className: "text-center mb-10" },
                react_1["default"].createElement(SectionTitle_1["default"], { title: "Experience India Without Barriers", subtitle: "Our unique approach solves the most common challenges faced by foreign travelers" })),
            react_1["default"].createElement("div", { className: "flex overflow-x-scroll pb-4 mb-8 hide-scrollbar" },
                react_1["default"].createElement("div", { className: "flex space-x-2 mx-auto" }, featureBoxes.map(function (feature, index) { return (react_1["default"].createElement("button", { key: index, onClick: function () { return handleFeatureClick(index); }, className: "py-2 px-4 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 transform " + (activeFeatureIndex === index
                        ? "bg-[" + feature.color + "] text-white scale-105 shadow-lg"
                        : 'bg-white text-navy border border-border'), style: {
                        backgroundColor: activeFeatureIndex === index ? feature.color : '',
                        borderColor: activeFeatureIndex === index ? feature.color : ''
                    } },
                    react_1["default"].createElement(feature.icon, { className: "w-4 h-4 inline-block mr-1" }),
                    feature.title.split(' ')[0])); }))),
            react_1["default"].createElement("div", { className: "relative" },
                react_1["default"].createElement(framer_motion_1.AnimatePresence, { mode: "wait" },
                    react_1["default"].createElement(framer_motion_1.motion.div, { key: activeFeatureIndex, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.5 }, className: "bg-white rounded-xl overflow-hidden shadow-lg border border-border" },
                        react_1["default"].createElement("div", { className: "relative aspect-video" },
                            react_1["default"].createElement(image_1["default"], { src: featureBoxes[activeFeatureIndex].rightImage, alt: "Illustration of " + featureBoxes[activeFeatureIndex].title, fill: true, className: "object-cover" }),
                            react_1["default"].createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" }),
                            react_1["default"].createElement("div", { className: "absolute bottom-0 left-0 right-0 p-4" },
                                react_1["default"].createElement(framer_motion_1.motion.h3, { animate: controlsTitle, className: "text-2xl font-heading font-bold text-white mb-1" }, featureBoxes[activeFeatureIndex].title))),
                        react_1["default"].createElement("div", { className: "p-5" },
                            react_1["default"].createElement(framer_motion_1.motion.p, { animate: controlsDescription, className: "text-foreground-muted mb-6" }, featureBoxes[activeFeatureIndex].description),
                            react_1["default"].createElement("ul", { className: "space-y-2" }, featureBoxes[activeFeatureIndex].facts.map(function (fact, idx) { return (react_1["default"].createElement(framer_motion_1.motion.li, { key: idx, initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + (idx * 0.1) }, className: "flex items-start" },
                                react_1["default"].createElement("span", { className: "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 mr-2", style: { backgroundColor: featureBoxes[activeFeatureIndex].color } },
                                    react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "w-3 h-3 text-white" })),
                                react_1["default"].createElement("span", { className: "text-sm text-navy" }, fact))); })),
                            react_1["default"].createElement("div", { className: "flex justify-center mt-6 space-x-2" }, featureBoxes.map(function (_, index) { return (react_1["default"].createElement("button", { key: index, onClick: function () { return handleFeatureClick(index); }, className: "w-3 h-3 rounded-full transition-all duration-300", style: {
                                    backgroundColor: activeFeatureIndex === index
                                        ? featureBoxes[activeFeatureIndex].color
                                        : '#E2E8F0'
                                } })); })))))),
            react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.8 }, className: "text-center mt-10" },
                react_1["default"].createElement("button", { className: "bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-heading font-semibold transition-colors shadow-lg", style: {
                        background: "linear-gradient(90deg, " + featureBoxes[activeFeatureIndex].color + " 0%, " + (activeFeatureIndex < featureBoxes.length - 1
                            ? featureBoxes[activeFeatureIndex + 1].color
                            : featureBoxes[0].color) + " 100%)"
                    } }, "Experience the Difference"))));
    }
    // Desktop version with enhanced scroll-based animations
    return (react_1["default"].createElement("section", { id: "benefits", className: "py-20 bg-sand", ref: sectionRef },
        react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
            react_1["default"].createElement(SectionTitle_1["default"], { title: "Experience India Without Barriers", subtitle: "Our unique approach solves the most common challenges faced by foreign travelers" })),
        react_1["default"].createElement("div", { className: "relative mt-16 pb-24" }, featureBoxes.map(function (feature, index) { return (react_1["default"].createElement("section", { key: index, id: "feature-section-" + index, className: "py-12 transition-all duration-700 sticky", style: { top: "14vh" }, "aria-label": "Feature: " + feature.title },
            react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex relative" },
                react_1["default"].createElement("div", { className: "w-[700px] h-[350px] rounded-2xl bg-white p-8 flex flex-col justify-center shadow-lg border border-border relative overflow-hidden", style: {
                        borderLeft: "4px solid " + feature.color,
                        background: "linear-gradient(to right, rgba(255,255,255,1) 90%, rgba(255,255,255,0.9) 100%)"
                    } },
                    react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, scale: 0.8 }, whileInView: { opacity: 0.05, scale: 1 }, transition: { duration: 1.5 }, className: "absolute top-0 right-0 w-full h-full pointer-events-none z-0" },
                        react_1["default"].createElement("svg", { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", className: "w-full h-full" },
                            react_1["default"].createElement("defs", null,
                                react_1["default"].createElement("pattern", { id: "pattern-" + index, x: "0", y: "0", width: "10", height: "10", patternUnits: "userSpaceOnUse" },
                                    react_1["default"].createElement("circle", { cx: "5", cy: "5", r: "1", fill: feature.color }))),
                            react_1["default"].createElement("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: feature.color, strokeWidth: "0.5" }),
                            react_1["default"].createElement("circle", { cx: "50", cy: "50", r: "35", fill: "none", stroke: feature.color, strokeWidth: "0.5" }),
                            react_1["default"].createElement("circle", { cx: "50", cy: "50", r: "25", fill: "none", stroke: feature.color, strokeWidth: "0.5" }),
                            react_1["default"].createElement("circle", { cx: "50", cy: "50", r: "15", fill: "none", stroke: feature.color, strokeWidth: "0.5" }),
                            react_1["default"].createElement("rect", { x: "0", y: "0", width: "100", height: "100", fill: "url(#pattern-" + index + ")" }),
                            react_1["default"].createElement("path", { d: "M50,5 L50,95 M5,50 L95,50 M15,15 L85,85 M15,85 L85,15", stroke: feature.color, strokeWidth: "0.2" }))),
                    react_1["default"].createElement("div", { className: "mb-6 flex items-center relative z-10" },
                        react_1["default"].createElement("div", { className: "w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white", style: { backgroundColor: feature.color } },
                            react_1["default"].createElement(feature.icon, { size: 24 })),
                        react_1["default"].createElement("h3", { className: "text-3xl font-heading font-bold text-navy feature-title" }, feature.title)),
                    react_1["default"].createElement("p", { className: "text-xl leading-relaxed text-foreground-muted z-10 mb-6" }, feature.description),
                    react_1["default"].createElement(framer_motion_1.motion.ul, { initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: containerVariants, className: "grid grid-cols-2 gap-3 mt-auto z-10" }, feature.facts.map(function (fact, idx) { return (react_1["default"].createElement(framer_motion_1.motion.li, { key: idx, variants: itemVariants, className: "flex items-start" },
                        react_1["default"].createElement("span", { className: "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 mr-2", style: { backgroundColor: feature.color } },
                            react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "w-3 h-3 text-white" })),
                        react_1["default"].createElement("span", { className: "text-sm text-navy" }, fact))); })),
                    react_1["default"].createElement("div", { className: "absolute bottom-0 left-0 right-0 h-1", style: { background: "linear-gradient(to right, " + feature.color + "50, transparent)" } })),
                react_1["default"].createElement("div", { className: "w-[100px] h-[350px] rounded-2xl mx-3 overflow-hidden shadow-lg border border-border relative" },
                    react_1["default"].createElement(framer_motion_1.motion.div, { initial: { backgroundPositionY: '0%' }, whileInView: { backgroundPositionY: '100%' }, transition: { duration: 20, repeat: Infinity, repeatType: 'reverse' }, className: "absolute inset-0", style: {
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23" + feature.color.replace('#', '') + "' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                            backgroundSize: '24px 24px'
                        } }),
                    react_1["default"].createElement("div", { className: "w-full h-full relative" },
                        react_1["default"].createElement(image_1["default"], { src: feature.leftImage, alt: "", fill: true, className: "object-cover", "aria-hidden": "true", sizes: "100px" })),
                    react_1["default"].createElement(framer_motion_1.motion.div, { initial: { scale: 0 }, whileInView: { scale: 1 }, transition: { type: "spring", stiffness: 400, damping: 10, delay: 0.2 }, className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center z-10" },
                        react_1["default"].createElement("span", { className: "font-heading font-bold text-2xl", style: { color: feature.color } }, index + 1))),
                react_1["default"].createElement("div", { className: "w-[580px] h-[350px] rounded-2xl overflow-hidden shadow-lg relative image-container" },
                    react_1["default"].createElement(framer_motion_1.motion.div, { initial: { scale: 1.1 }, whileInView: { scale: 1 }, transition: { duration: 1.5 }, className: "w-full h-full relative" },
                        react_1["default"].createElement(image_1["default"], { src: feature.rightImage, alt: "Illustration of " + feature.title, fill: true, className: "object-cover", priority: index === 0, sizes: "580px" }),
                        react_1["default"].createElement("div", { className: "absolute inset-0 opacity-60", style: { background: "linear-gradient(135deg, " + feature.color + "50 0%, transparent 50%)" } })),
                    react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, scale: 0, rotate: -90 }, whileInView: { opacity: 1, scale: 1, rotate: 0 }, transition: { type: "spring", stiffness: 400, damping: 10, delay: 0.3 }, className: "absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10", style: { backgroundColor: feature.color } },
                        react_1["default"].createElement("div", { className: "text-white font-heading font-bold text-lg" }, index + 1)),
                    react_1["default"].createElement(framer_motion_1.motion.div, { initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, transition: { duration: 0.5, delay: 0.5 }, className: "absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-3 border-t border-earth/20" },
                        react_1["default"].createElement("div", { className: "flex items-center" },
                            react_1["default"].createElement("div", { className: "w-1 h-6 rounded-full mr-3", style: { backgroundColor: feature.color } }),
                            react_1["default"].createElement("p", { className: "text-sm font-heading font-medium text-navy" },
                                "Verified by ",
                                featureBoxes.length,
                                " local companions"))))))); })),
        react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 50 }, animate: isAnimationComplete ? { opacity: 1, y: 0 } : {}, className: "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40" },
            react_1["default"].createElement("button", { className: "bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center space-x-2", style: {
                    background: "linear-gradient(90deg, " + featureBoxes[0].color + " 0%, " + featureBoxes[2].color + " 100%)"
                }, onMouseEnter: function () { return setIsAnimationComplete(true); } },
                react_1["default"].createElement("span", null, "Experience the Difference"),
                react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "w-5 h-5" })))));
};
exports["default"] = FeatureBoxes;
