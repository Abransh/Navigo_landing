"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var react_intersection_observer_1 = require("react-intersection-observer");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var animejs_1 = require("animejs");
// A custom hook for mouse position tracking
var useMousePosition = function () {
    var _a = react_1.useState({ x: 0, y: 0 }), mousePosition = _a[0], setMousePosition = _a[1];
    react_1.useEffect(function () {
        var updateMousePosition = function (ev) {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return function () {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return mousePosition;
};
// Interactive particle system component
var ParticleSystem = function (_a) {
    var _b = _a.color, color = _b === void 0 ? '#FFFFFF' : _b, _c = _a.count, count = _c === void 0 ? 50 : _c, _d = _a.size, size = _d === void 0 ? 2 : _d, _e = _a.speed, speed = _e === void 0 ? 1 : _e;
    var containerRef = react_1.useRef(null);
    var particlesRef = react_1.useRef([]);
    var animationRef = react_1.useRef(null);
    react_1.useEffect(function () {
        if (!containerRef.current)
            return;
        var container = containerRef.current;
        var containerWidth = container.offsetWidth;
        var containerHeight = container.offsetHeight;
        // Generate random particles
        particlesRef.current = Array.from({ length: count }).map(function () { return ({
            x: Math.random() * containerWidth,
            y: Math.random() * containerHeight,
            size: Math.random() * size + 0.5,
            speedX: (Math.random() - 0.5) * speed,
            speedY: (Math.random() - 0.5) * speed
        }); });
        // Create SVG elements for each particle
        particlesRef.current.forEach(function (particle) {
            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', particle.x);
            circle.setAttribute('cy', particle.y);
            circle.setAttribute('r', particle.size);
            circle.setAttribute('fill', color);
            circle.style.opacity = Math.random() * 0.5 + 0.2;
            container.appendChild(circle);
            // Add the DOM element to the particle object
            particle.element = circle;
        });
        // Animation loop
        var animate = function () {
            particlesRef.current.forEach(function (particle) {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                // Boundary check with wrap-around
                if (particle.x < 0)
                    particle.x = containerWidth;
                if (particle.x > containerWidth)
                    particle.x = 0;
                if (particle.y < 0)
                    particle.y = containerHeight;
                if (particle.y > containerHeight)
                    particle.y = 0;
                // Update DOM element
                particle.element.setAttribute('cx', particle.x);
                particle.element.setAttribute('cy', particle.y);
            });
            animationRef.current = requestAnimationFrame(animate);
        };
        animate();
        // Cleanup
        return function () {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            // Remove all particles
            particlesRef.current.forEach(function (particle) {
                if (particle.element && particle.element.parentNode) {
                    particle.element.parentNode.removeChild(particle.element);
                }
            });
        };
    }, [color, count, size, speed]);
    return (react_1["default"].createElement("svg", { ref: containerRef, className: "absolute inset-0 w-full h-full pointer-events-none z-10", preserveAspectRatio: "none" }));
};
// Main hero component
var PremiumHeroSection = function () {
    // Refs for elements
    var heroRef = react_1.useRef(null);
    var headingRef = react_1.useRef(null);
    var contentRef = react_1.useRef(null);
    var mapContainerRef = react_1.useRef(null);
    // State management
    var _a = react_1.useState(false), isLoaded = _a[0], setIsLoaded = _a[1];
    var _b = react_1.useState(0), activeLocation = _b[0], setActiveLocation = _b[1];
    // Mouse tracking for interactive effects
    var mousePosition = useMousePosition();
    var mouseX = framer_motion_1.useMotionValue(0);
    var mouseY = framer_motion_1.useMotionValue(0);
    // Smoother mouse movement
    var smoothMouseX = framer_motion_1.useSpring(mouseX, { damping: 50, stiffness: 400 });
    var smoothMouseY = framer_motion_1.useSpring(mouseY, { damping: 50, stiffness: 400 });
    // Scroll animations
    var scrollY = framer_motion_1.useScroll().scrollY;
    var headerOpacity = framer_motion_1.useTransform(scrollY, [0, 300], [1, 0]);
    var headerY = framer_motion_1.useTransform(scrollY, [0, 300], [0, -100]);
    // Parallax effects
    var parallax1 = framer_motion_1.useTransform(scrollY, [0, 1000], [0, -300]);
    var parallax2 = framer_motion_1.useTransform(scrollY, [0, 1000], [0, -150]);
    var parallax3 = framer_motion_1.useTransform(scrollY, [0, 1000], [0, -50]);
    // Intersection observer for element reveals
    var _c = react_intersection_observer_1.useInView({
        threshold: 0.2,
        triggerOnce: true
    }), headingInViewRef = _c[0], headingInView = _c[1];
    var _d = react_intersection_observer_1.useInView({
        threshold: 0.2,
        triggerOnce: true
    }), contentInViewRef = _d[0], contentInView = _d[1];
    // India locations data
    var locations = [
        {
            id: 'delhi',
            name: 'Delhi',
            x: 200,
            y: 120,
            description: 'Experience the vibrant capital city'
        },
        {
            id: 'mumbai',
            name: 'Mumbai',
            x: 150,
            y: 250,
            description: 'Explore the bustling city of dreams'
        },
        {
            id: 'jaipur',
            name: 'Jaipur',
            x: 170,
            y: 150,
            description: 'Discover the Pink City\'s rich heritage'
        },
        {
            id: 'goa',
            name: 'Goa',
            x: 160,
            y: 280,
            description: 'Relax on pristine beaches'
        },
        {
            id: 'varanasi',
            name: 'Varanasi',
            x: 250,
            y: 200,
            description: 'Immerse in spiritual traditions'
        }
    ];
    // Update mouse position for interactive elements
    react_1.useEffect(function () {
        mouseX.set(mousePosition.x);
        mouseY.set(mousePosition.y);
    }, [mousePosition, mouseX, mouseY]);
    // Initialize anime.js animations
    react_1.useEffect(function () {
        // Ensure the component is mounted and anime.js is available
        if (!heroRef.current || !headingRef.current || typeof animejs_1["default"] !== 'function')
            return;
        // Set loaded state to trigger entrance animations
        setIsLoaded(true);
        // Animate the India map
        if (mapContainerRef.current) {
            // Path animations for India outline
            var paths_1 = mapContainerRef.current.querySelectorAll('.india-path');
            animejs_1["default"]({
                targets: paths_1,
                strokeDashoffset: [animejs_1["default"].setDashoffset, 0],
                easing: 'easeInOutCubic',
                duration: 3000,
                delay: function (el, i) { return i * 250; },
                begin: function (anim) {
                    paths_1.forEach(function (path) {
                        path.style.visibility = 'visible';
                    });
                }
            });
            // Locations pulse animation
            var locationMarkers = mapContainerRef.current.querySelectorAll('.location-marker');
            animejs_1["default"]({
                targets: locationMarkers,
                scale: [0, 1],
                opacity: [0, 1],
                easing: 'easeOutElastic(1, .5)',
                duration: 1500,
                delay: function (el, i) { return 2000 + i * 150; }
            });
            // Setup continuous subtle animations
            animejs_1["default"]({
                targets: '.pulse-circle',
                scale: [1, 1.5],
                opacity: [0.6, 0],
                easing: 'easeOutSine',
                duration: 1500,
                loop: true
            });
        }
        // Text animation for the main heading (without SplitText plugin)
        var letters = __spreadArrays(headingRef.current.querySelectorAll('.letter'));
        animejs_1["default"]({
            targets: letters,
            opacity: [0, 1],
            translateY: [50, 0],
            translateZ: 0,
            easing: 'easeOutExpo',
            duration: 1500,
            delay: function (el, i) {
                return 300 + 30 * i;
            }
        });
        // Cleanup
        return function () {
            animejs_1["default"].remove(paths);
            animejs_1["default"].remove(locationMarkers);
            animejs_1["default"].remove('.pulse-circle');
            animejs_1["default"].remove(letters);
        };
    }, []);
    // Load the next location in sequence
    var nextLocation = function () {
        setActiveLocation(function (prev) { return (prev + 1) % locations.length; });
    };
    // Handle location selection
    var selectLocation = function (index) {
        setActiveLocation(index);
        // Animate the selected location marker
        if (mapContainerRef.current) {
            var marker = mapContainerRef.current.querySelector("#marker-" + locations[index].id);
            if (marker) {
                animejs_1["default"]({
                    targets: marker,
                    scale: [1, 1.5, 1],
                    easing: 'easeInOutQuad',
                    duration: 800
                });
            }
        }
    };
    // Prepare text for animation
    var renderAnimatedText = function (text) {
        return (react_1["default"].createElement("span", { className: "inline-block" }, text.split('').map(function (char, index) { return (react_1["default"].createElement("span", { key: index, className: "letter inline-block" }, char)); })));
    };
    return (react_1["default"].createElement("section", { ref: heroRef, className: "relative min-h-screen bg-gradient-to-b from-[#050A30] to-[#233577] overflow-hidden" },
        react_1["default"].createElement(ParticleSystem, { color: "#FFFFFF", count: 100, size: 2, speed: 0.2 }),
        react_1["default"].createElement(framer_motion_1.motion.div, { className: "absolute top-0 left-0 w-full h-full opacity-20 z-0 pointer-events-none", style: { y: parallax1 } },
            react_1["default"].createElement("div", { className: "absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" }),
            react_1["default"].createElement("div", { className: "absolute top-20 left-1/4 w-64 h-64 rounded-full bg-[#FF9933] blur-[100px] opacity-20" }),
            react_1["default"].createElement("div", { className: "absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-[#138808] blur-[150px] opacity-10" })),
        react_1["default"].createElement(framer_motion_1.motion.header, { className: "fixed top-0 left-0 w-full z-40 px-6 py-4", style: {
                opacity: headerOpacity,
                y: headerY
            } },
            react_1["default"].createElement("div", { className: "max-w-7xl mx-auto flex justify-between items-center" },
                react_1["default"].createElement("div", { className: "text-white font-bold text-2xl" }, "Navigo"),
                react_1["default"].createElement("div", { className: "flex space-x-6" },
                    react_1["default"].createElement("button", { className: "text-white hover:text-[#FF9933] transition-colors" }, "About"),
                    react_1["default"].createElement("button", { className: "text-white hover:text-[#FF9933] transition-colors" }, "Features"),
                    react_1["default"].createElement("button", { className: "text-white hover:text-[#FF9933] transition-colors" }, "Destinations"),
                    react_1["default"].createElement("button", { className: "text-white hover:text-[#FF9933] transition-colors" }, "Contact")))),
        react_1["default"].createElement("div", { className: "relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-16 flex flex-col lg:flex-row items-center" },
            react_1["default"].createElement("div", { className: "w-full lg:w-1/2 mb-16 lg:mb-0" },
                react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }, transition: { duration: 0.6, delay: 0.3 }, className: "inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6" },
                    react_1["default"].createElement("span", { className: "text-[#FF9933] font-medium" }, "Discover India Like Never Before")),
                react_1["default"].createElement("h1", { ref: function (el) {
                        headingRef.current = el;
                        headingInViewRef(el);
                    }, className: "text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6" },
                    renderAnimatedText("Experience India"),
                    react_1["default"].createElement("br", null),
                    react_1["default"].createElement("span", { className: "text-[#FF9933]" }, renderAnimatedText("With a Local"))),
                react_1["default"].createElement(framer_motion_1.motion.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }, transition: { duration: 0.6, delay: 0.8 }, className: "text-xl text-white/80 mb-8 max-w-lg" }, "Connect with trusted local companions who navigate language barriers, ensure your safety, and unlock authentic cultural experiences."),
                react_1["default"].createElement("div", { ref: contentInViewRef, className: "flex flex-wrap gap-6 mb-10" }, [
                    { icon: react_1["default"].createElement(lucide_react_1.Shield, null), text: "Verified Safety", delay: 0 },
                    { icon: react_1["default"].createElement(lucide_react_1.Languages, null), text: "Language Support", delay: 0.1 },
                    { icon: react_1["default"].createElement(lucide_react_1.MapPin, null), text: "Local Insights", delay: 0.2 },
                ].map(function (feature, index) { return (react_1["default"].createElement(framer_motion_1.motion.div, { key: index, initial: { opacity: 0, x: -20 }, animate: {
                        opacity: contentInView ? 1 : 0,
                        x: contentInView ? 0 : -20
                    }, transition: { duration: 0.6, delay: 1 + feature.delay }, className: "flex items-center" },
                    react_1["default"].createElement("div", { className: "w-10 h-10 rounded-full bg-[#FF9933] flex items-center justify-center mr-3" },
                        react_1["default"].createElement("span", { className: "text-[#050A30]" }, feature.icon)),
                    react_1["default"].createElement("span", { className: "text-white font-medium" }, feature.text))); })),
                react_1["default"].createElement("div", { className: "flex flex-col sm:flex-row gap-4" },
                    react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }, transition: { duration: 0.6, delay: 1.2 } },
                        react_1["default"].createElement(link_1["default"], { href: "/try-navigo" },
                            react_1["default"].createElement("button", { className: "w-full sm:w-auto bg-[#FF9933] hover:bg-[#FF9933]/90 text-[#050A30] font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-[#FF9933]/30 hover:shadow-xl transition-all transform hover:-translate-y-1" }, "Start Your Journey"))),
                    react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }, transition: { duration: 0.6, delay: 1.3 } },
                        react_1["default"].createElement(link_1["default"], { href: "#how-it-works" },
                            react_1["default"].createElement("button", { className: "w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium px-8 py-4 rounded-lg transition-all" }, "Learn More")))),
                react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: isLoaded ? 1 : 0 }, transition: { duration: 0.6, delay: 2 }, className: "hidden md:flex items-center text-white/50 mt-20" },
                    react_1["default"].createElement("div", { className: "mr-3 w-px h-10 bg-white/20" }),
                    react_1["default"].createElement("span", { className: "text-sm uppercase tracking-wider" }, "Scroll to explore"),
                    react_1["default"].createElement(lucide_react_1.ArrowDown, { className: "ml-2 w-4 h-4" }))),
            react_1["default"].createElement(framer_motion_1.motion.div, { className: "w-full lg:w-1/2 lg:pl-10", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }, transition: { duration: 0.8, delay: 0.5 }, style: { y: parallax2 } },
                react_1["default"].createElement("div", { className: "relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl overflow-hidden" },
                    react_1["default"].createElement("div", { className: "absolute -top-20 -right-20 w-40 h-40 bg-[#FF9933]/20 rounded-full blur-3xl" }),
                    react_1["default"].createElement("div", { className: "absolute -bottom-20 -left-20 w-40 h-40 bg-[#138808]/20 rounded-full blur-3xl" }),
                    react_1["default"].createElement("div", { ref: mapContainerRef, className: "relative aspect-[4/3] w-full" },
                        react_1["default"].createElement("svg", { viewBox: "0 0 400 350", className: "w-full h-full", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                            react_1["default"].createElement("path", { className: "india-path", d: "M200,80 C230,90 260,85 280,100", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1.5", strokeLinecap: "round", visibility: "hidden" }),
                            react_1["default"].createElement("path", { className: "india-path", d: "M280,100 C300,115 310,130 320,160", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1.5", strokeLinecap: "round", visibility: "hidden" }),
                            react_1["default"].createElement("path", { className: "india-path", d: "M320,160 C330,190 325,220 320,250", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1.5", strokeLinecap: "round", visibility: "hidden" }),
                            react_1["default"].createElement("path", { className: "india-path", d: "M320,250 C315,280 300,310 280,330", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1.5", strokeLinecap: "round", visibility: "hidden" }),
                            react_1["default"].createElement("path", { className: "india-path", d: "M280,330 C260,350 230,355 200,360", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1.5", strokeLinecap: "round", visibility: "hidden" }),
                            react_1["default"].createElement("path", { className: "india-path", d: "M200,360 C170,355 140,350 120,330", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1.5", strokeLinecap: "round", visibility: "hidden" }),
                            react_1["default"].createElement("path", { className: "india-path", d: "M120,330 C100,310 85,280 80,250", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1.5", strokeLinecap: "round", visibility: "hidden" }),
                            react_1["default"].createElement("path", { className: "india-path", d: "M80,250 C75,220 70,190 80,160", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1.5", strokeLinecap: "round", visibility: "hidden" }),
                            react_1["default"].createElement("path", { className: "india-path", d: "M80,160 C90,130 100,115 120,100", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1.5", strokeLinecap: "round", visibility: "hidden" }),
                            react_1["default"].createElement("path", { className: "india-path", d: "M120,100 C140,85 170,90 200,80", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1.5", strokeLinecap: "round", visibility: "hidden" }),
                            locations.map(function (location, index) { return (react_1["default"].createElement("g", { key: location.id, className: "location-marker cursor-pointer", id: "marker-" + location.id, onClick: function () { return selectLocation(index); }, style: {
                                    transform: "translate(" + location.x + "px, " + location.y + "px)",
                                    transformOrigin: 'center'
                                } },
                                activeLocation === index && (react_1["default"].createElement("circle", { className: "pulse-circle", r: "15", fill: "#FF9933", opacity: "0.6" })),
                                react_1["default"].createElement("circle", { r: "5", fill: activeLocation === index ? "#FF9933" : "white", opacity: activeLocation === index ? 1 : 0.7 }),
                                react_1["default"].createElement("text", { x: "0", y: "20", textAnchor: "middle", fill: "white", fontSize: "10", className: "pointer-events-none" }, location.name))); }),
                            activeLocation > 0 && (react_1["default"].createElement("path", { d: "M" + locations[activeLocation - 1].x + "," + locations[activeLocation - 1].y + " Q" + ((locations[activeLocation - 1].x + locations[activeLocation].x) / 2 + 20) + "," + ((locations[activeLocation - 1].y + locations[activeLocation].y) / 2 - 20) + " " + locations[activeLocation].x + "," + locations[activeLocation].y, stroke: "#FF9933", strokeWidth: "2", strokeDasharray: "5,5", strokeLinecap: "round", fill: "none" }))),
                        react_1["default"].createElement(framer_motion_1.motion.div, { className: "absolute inset-0 flex items-center justify-center", style: {
                                x: framer_motion_1.useTransform(smoothMouseX, [0, window.innerWidth], [10, -10]),
                                y: framer_motion_1.useTransform(smoothMouseY, [0, window.innerHeight], [5, -5])
                            } },
                            react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, key: activeLocation, className: "absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg max-w-[200px]" },
                                react_1["default"].createElement("h3", { className: "text-[#FF9933] font-bold text-lg" }, locations[activeLocation].name),
                                react_1["default"].createElement("p", { className: "text-white/80 text-sm mt-1" }, locations[activeLocation].description),
                                react_1["default"].createElement("button", { onClick: nextLocation, className: "mt-3 bg-[#FF9933]/20 hover:bg-[#FF9933]/30 text-[#FF9933] text-sm px-3 py-1.5 rounded-lg flex items-center" },
                                    "Next location",
                                    react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "w-4 h-4 ml-1" }))),
                            react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, className: "absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 py-2 px-3 rounded-lg flex items-center space-x-2" },
                                react_1["default"].createElement("div", { className: "w-8 h-8 rounded-full bg-[#FF9933] flex items-center justify-center" },
                                    react_1["default"].createElement(lucide_react_1.Users, { className: "w-4 h-4 text-[#050A30]" })),
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("div", { className: "text-white text-xs" }, "Local Companions"),
                                    react_1["default"].createElement("div", { className: "text-[#FF9933] font-bold text-sm" },
                                        5 + activeLocation,
                                        " Available"))))),
                    react_1["default"].createElement(framer_motion_1.motion.div, { className: "absolute -bottom-5 right-8 bg-white/10 backdrop-blur-lg border border-white/20 p-3 rounded-xl shadow-xl flex items-center space-x-3", initial: { opacity: 0, y: 20 }, animate: { opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }, transition: { duration: 0.6, delay: 1.5 } },
                        react_1["default"].createElement("div", { className: "w-10 h-10 rounded-full bg-[#FF9933] flex items-center justify-center text-[#050A30] font-bold" }, "SR"),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("p", { className: "text-white font-medium text-sm" }, "Sarah R."),
                            react_1["default"].createElement("div", { className: "flex" }, Array(5).fill(0).map(function (_, i) { return (react_1["default"].createElement(lucide_react_1.Star, { key: i, className: "w-3 h-3 text-[#FF9933] fill-[#FF9933]" })); }))))))),
        react_1["default"].createElement(framer_motion_1.motion.div, { className: "absolute bottom-0 left-0 w-full bg-white/5 backdrop-blur-sm border-t border-white/10 py-4 z-20", initial: { y: 100 }, animate: { y: isLoaded ? 0 : 100 }, transition: { duration: 0.8, delay: 1.8 } },
            react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6" }, [
                { value: "500+", label: "Local Companions" },
                { value: "15+", label: "Cities Covered" },
                { value: "4.9/5", label: "Traveler Rating" },
                { value: "10k+", label: "Happy Travelers" },
            ].map(function (stat, index) { return (react_1["default"].createElement(framer_motion_1.motion.div, { key: index, initial: { opacity: 0, y: 20 }, animate: { opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }, transition: { duration: 0.6, delay: 1.8 + (index * 0.1) }, className: "text-center" },
                react_1["default"].createElement("div", { className: "text-[#FF9933] font-bold text-2xl md:text-3xl" }, stat.value),
                react_1["default"].createElement("div", { className: "text-white/70 text-sm mt-1" }, stat.label))); }))),
        react_1["default"].createElement("div", { className: "absolute top-0 right-0 w-64 h-64 overflow-hidden pointer-events-none" },
            react_1["default"].createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 64 64", fill: "none" },
                react_1["default"].createElement("circle", { cx: "32", cy: "32", r: "64", fill: "#FF9933", fillOpacity: "0.05" }),
                react_1["default"].createElement("circle", { cx: "32", cy: "32", r: "48", fill: "#FF9933", fillOpacity: "0.05" }),
                react_1["default"].createElement("circle", { cx: "32", cy: "32", r: "32", fill: "#FF9933", fillOpacity: "0.05" }))),
        react_1["default"].createElement("div", { className: "absolute bottom-0 left-0 w-96 h-96 overflow-hidden pointer-events-none", style: { zIndex: 5 } },
            react_1["default"].createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 96 96", fill: "none" },
                react_1["default"].createElement("circle", { cx: "0", cy: "96", r: "96", fill: "#138808", fillOpacity: "0.05" }),
                react_1["default"].createElement("circle", { cx: "0", cy: "96", r: "72", fill: "#138808", fillOpacity: "0.05" }),
                react_1["default"].createElement("circle", { cx: "0", cy: "96", r: "48", fill: "#138808", fillOpacity: "0.05" })))));
};
exports["default"] = PremiumHeroSection;
