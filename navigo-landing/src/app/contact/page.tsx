// src/app/contact/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileAnimation from '@/components/MobileSections/MobileAnimation';
import AnimationLoader from '@/components/AnimationLoader';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, Phone, User } from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';
import styles from './contact.module.css';
import './animation.css';
import { useMobile } from '@/hooks/use-mobile';
import { load3DAnimationDependencies } from '@/lib/animation-utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  const [loading, setLoading] = useState(false);
  
  const isMobile = useMobile();
  const [animationLoaded, setAnimationLoaded] = useState(false);
  
  // Handle animation initialization after the component mounts
  useEffect(() => {
    // Only load the 3D animation on desktop devices
    if (!isMobile) {
      const loadAnimation = async () => {
        try {
          await load3DAnimationDependencies();
          setAnimationLoaded(true);
        } catch (error) {
          console.error('Failed to load animation:', error);
        }
      };
      
      loadAnimation();
    }
    
    return () => {
      // Cleanup any global GSAP animations when component unmounts
      if (typeof window !== 'undefined' && window.gsap) {
        window.gsap.killAll();
      }
    };
  }, [isMobile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Submit form data to our API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success handling
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        // Error handling
        console.error('Form submission error:', data.error);
        setFormStatus('error');
      }
    } catch (error) {
      // Network or other error handling
      console.error('Form submission failed:', error);
      setFormStatus('error');
    } finally {
      setLoading(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }
  };

  return (
    <>
      <main className="min-h-screen">
        <Navbar />
        
        {/* Contact Form Section */}
        <section className={styles.contactFormSection}>
          {/* Background decorative elements - inspired by Indian patterns */}
          <div className={styles.bgPattern}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Content */}
              <motion.div 
                className="lg:w-1/2 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                  Let's Connect{" "}
                  <span className="text-secondary">With India</span>
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                  Tell us about your travel plans and get matched with trusted local companions who will enhance your journey through India.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-white/10 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-white">Email Us</h3>
                      <p className="text-white/80">hello@navigotravel.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-white/10 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-white">Call Us</h3>
                      <p className="text-white/80">+91 (123) 456-7890</p>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:block">
                  <Link href="/" className="inline-flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                    Back to Homepage
                  </Link>
                </div>
              </motion.div>
              
              {/* Form */}
              <motion.div 
                className="lg:w-1/2 w-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={styles.formContainer}>
                  {/* Decorative element - inspired by Indian rangoli pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#BE5504" strokeWidth="2" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#BE5504" strokeWidth="2" />
                      <circle cx="50" cy="50" r="25" fill="none" stroke="#BE5504" strokeWidth="2" />
                      <path d="M50,5 L50,95 M5,50 L95,50 M15,15 L85,85 M15,85 L85,15" stroke="#BE5504" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-heading font-bold text-navy mb-6">Join Our Travel Community</h2>
                  
                  {formStatus === 'success' && (
                    <div className={styles.successMessage}>
                      Thank you for reaching out! We've received your details and will contact you shortly.
                    </div>
                  )}
                  
                  {formStatus === 'error' && (
                    <div className={styles.errorMessage}>
                      Something went wrong. Please try again or contact us directly.
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className={styles.formField}>
                      <label htmlFor="name" className={styles.formLabel}>
                        Your Name
                      </label>
                      <div className={styles.iconInput}>
                        <div className={styles.inputIcon}>
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className={styles.formInput}
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    
                    <div className={styles.formField}>
                      <label htmlFor="email" className={styles.formLabel}>
                        Email Address
                      </label>
                      <div className={styles.iconInput}>
                        <div className={styles.inputIcon}>
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={styles.formInput}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className={styles.formField}>
                      <label htmlFor="phone" className={styles.formLabel}>
                        Phone Number (optional)
                      </label>
                      <div className={styles.iconInput}>
                        <div className={styles.inputIcon}>
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className={styles.formInput}
                          placeholder="+91 123 456 7890"
                        />
                      </div>
                    </div>
                    
                    <div className={styles.formField}>
                      <label htmlFor="message" className={styles.formLabel}>
                        Your Travel Plans
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={styles.formTextarea}
                        placeholder="Tell us about your travel dates, destinations in India you want to visit, and what experiences you're looking for..."
                      ></textarea>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className={styles.submitButton}
                      >
                        {loading ? (
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <>
                            Connect with Navigo
                            <ChevronRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center mt-4">
                      By submitting this form, you agree to our{" "}
                      <Link href="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms-of-service" className="text-primary hover:underline">
                        Terms of Service
                      </Link>.
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Wave decoration with Indian-inspired pattern */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0 96L60 85.3C120 75 240 53 360 58.7C480 64 600 96 720 90.7C840 85 960 43 1080 32C1200 21 1320 43 1380 53.3L1440 64V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V96Z" fill="#FFF8EA"/>
              <path d="M120 32C150 25 180 35 210 32C240 28 270 18 300 20C330 22 360 35 390 35C420 35 450 20 480 18C510 16 540 25 570 30C600 35 630 37 660 35C690 33 720 27 750 27C780 27 810 32 840 30C870 28 900 20 915 16L930 12" stroke="#FF9933" strokeWidth="1" strokeDasharray="2 3" opacity="0.3"/>
            </svg>
          </div>
        </section>
        
        {/* Animation Section - Conditionally render based on device */}
        {isMobile ? (
          <MobileAnimation />
        ) : (
          <div className="animation-container">
            <div className="content">
              <div className="loading">
                <AnimationLoader />
              </div>
              <div className="trigger"></div>
              <div className="section">
                <h1>Your India Journey.</h1>
                <h3>The adventure begins here.</h3>
                <p>Discover the real India with a local companion.</p>
                <div className="scroll-cta">Scroll</div>
              </div>
              
              <div className="section right">
                <h2>It's not just a trip...</h2>
              </div>
              
              <div className="ground-container">
                <div className="parallax ground"></div>
                <div className="section right">
                  <h2>..it's a cultural immersion.</h2>
                  <p>Beyond tourist attractions.</p>
                </div>

                <div className="section">
                  <h2>Navigate with confidence.</h2>
                  <p>No language barriers. No tourist traps.</p>
                </div>
                
                <div className="section right">
                  <h2>Experience authentic India.</h2>
                  <p>Through local eyes!</p>
                </div>
                <div className="parallax clouds"></div>
              </div>
              
              <div className="blueprint">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <line id="line-length" x1="10" y1="80" x2="90" y2="80" strokeWidth="0.5"></line>
                  <path id="line-wingspan" d="M10 50, L40 35, M60 35 L90 50" strokeWidth="0.5"></path>
                  <circle id="circle-phalange" cx="60" cy="60" r="15" fill="transparent" strokeWidth="0.5"></circle>
                </svg>
                <div className="section dark ">
                  <h2>The Navigo Difference.</h2>
                  <p>What makes our service special...</p>
                </div>
                <div className="section dark length">
                  <h2>Safety.</h2>
                  <p>Verified companions ensure your security.</p>
                </div>
                <div className="section dark wingspan">
                  <h2>Local Knowledge.</h2>
                  <p>Insights you won't find in any guidebook.</p>
                </div>
                <div className="section dark phalange">
                  <h2>Cultural Connection</h2>
                  <p>Form meaningful relationships that last.</p>
                </div>
                <div className="section dark">
                  <h2>Authenticity</h2>
                  <p>Experience the real India that tourists rarely see.</p>
                </div>
              </div>
              <div className="sunset">
                <div className="section"></div>
                <div className="section end">
                  <h2>Ready to start your journey?</h2>
                  <a href="#contact-form" className="navigo-cta">Connect with Navigo</a>
                </div>
              </div>
            </div>
          </div>
        )}
                
        <Footer />

        {/* Animation Scripts - Load scripts only on desktop */}
        {!isMobile && (
          <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js" strategy="beforeInteractive" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js" strategy="beforeInteractive" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/DrawSVGPlugin.min.js" strategy="beforeInteractive" />
            <Script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/OBJLoader.min.js" strategy="beforeInteractive" />
            <Script id="animation-script" strategy="afterInteractive">
              {`
                // Animation script - Only runs on desktop
                console.clear();

                class Scene {
                  constructor(model) {
                    this.views = [
                      { bottom: 0, height: 1 },
                      { bottom: 0, height: 0 }
                    ];
                    
                    this.renderer = new THREE.WebGLRenderer({
                      antialias: true,
                      alpha: true
                    });
                    
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                    this.renderer.shadowMap.enabled = true;
                    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                    this.renderer.setPixelRatio(window.devicePixelRatio);
                  
                    // Only add canvas if the container exists
                    const container = document.querySelector('.animation-container');
                    if (container) {
                      container.appendChild(this.renderer.domElement);
                    }
                    
                    // scene
                  
                    this.scene = new THREE.Scene();
                    
                    for (var ii = 0; ii < this.views.length; ++ii) {
                      var view = this.views[ii];
                      var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
                      camera.position.fromArray([0, 0, 180]);
                      camera.layers.disableAll();
                      camera.layers.enable(ii);
                      view.camera = camera;
                      camera.lookAt(new THREE.Vector3(0, 5, 0));
                    }
                    
                    //light
                  
                    this.light = new THREE.PointLight(0xffffff, 0.75);
                    this.light.position.z = 150;
                    this.light.position.x = 70;
                    this.light.position.y = -20;
                    this.scene.add(this.light);
                  
                    this.softLight = new THREE.AmbientLight(0xffffff, 1.5);
                    this.scene.add(this.softLight)
                  
                    // group
                  
                    this.onResize();
                    window.addEventListener('resize', this.onResize, false);
                    
                    var edges = new THREE.EdgesGeometry(model.children[0].geometry);
                    let line = new THREE.LineSegments(edges);
                    line.material.depthTest = false;
                    line.material.opacity = 0.5;
                    line.material.transparent = true;
                    line.position.x = 0.5;
                    line.position.z = -1;
                    line.position.y = 0.2;  
                    
                    this.modelGroup = new THREE.Group();
                    
                    model.layers.set(0);
                    line.layers.set(1);
                      
                    this.modelGroup.add(model);
                    this.modelGroup.add(line);
                    this.scene.add(this.modelGroup);
                  }
                  
                  render = () => {
                    for (var ii = 0; ii < this.views.length; ++ii) {
                      var view = this.views[ii];
                      var camera = view.camera;
                  
                      var bottom = Math.floor(this.h * view.bottom);
                      var height = Math.floor(this.h * view.height);
                  
                      this.renderer.setViewport(0, 0, this.w, this.h);
                      this.renderer.setScissor(0, bottom, this.w, height);
                      this.renderer.setScissorTest(true);
                  
                      camera.aspect = this.w / this.h;
                      this.renderer.render(this.scene, camera);
                    }
                  }
                  
                  onResize = () => {
                    this.w = window.innerWidth;
                    this.h = window.innerHeight;
                    
                    for (var ii = 0; ii < this.views.length; ++ii) {
                      var view = this.views[ii];
                      var camera = view.camera;
                      camera.aspect = this.w / this.h;
                      let camZ = (screen.width - (this.w * 1)) / 3;
                      camera.position.z = camZ < 180 ? 180 : camZ;
                      camera.updateProjectionMatrix();
                    }
                  
                    this.renderer.setSize(this.w, this.h);    
                    this.render();
                  }
                }
                
                function loadModel() {
                  // Exit if on mobile
                  if (window.innerWidth < 768) return;
                  
                  if (typeof gsap !== 'undefined') {
                    gsap.registerPlugin(ScrollTrigger);
                    if (typeof DrawSVGPlugin !== 'undefined') {
                      gsap.registerPlugin(DrawSVGPlugin);
                    }
                    
                    gsap.set('#line-length', {drawSVG: 0})
                    gsap.set('#line-wingspan', {drawSVG: 0})
                    gsap.set('#circle-phalange', {drawSVG: 0})
                    
                    var object;
                  
                    function onModelLoaded() {
                      object.traverse(function(child) {
                        let mat = new THREE.MeshPhongMaterial({ 
                          color: 0x1A5F7A, // Changed to Navigo primary color
                          specular: 0xD0CBC7, 
                          shininess: 5, 
                          flatShading: true 
                        });
                        child.material = mat;
                      });
                  
                      setupAnimation(object);
                    }
                  
                    var manager = new THREE.LoadingManager(onModelLoaded);
                    manager.onProgress = (item, loaded, total) => console.log(item, loaded, total);
                  
                    // Use custom airplane model or the default
                    if (typeof THREE.OBJLoader !== 'undefined') {
                      var loader = new THREE.OBJLoader(manager);
                      loader.load('https://assets.codepen.io/557388/1405+Plane_1.obj', function(obj) { object = obj; });
                    }
                  }
                }
                
                function setupAnimation(model) {
                  let scene = new Scene(model);
                  let plane = scene.modelGroup;
                  
                  gsap.fromTo('canvas', {x: "50%", autoAlpha: 0}, {duration: 1, x: "0%", autoAlpha: 1});
                  gsap.to('.loading', {autoAlpha: 0})
                  gsap.to('.scroll-cta', {opacity: 1})
                  gsap.set('svg', {autoAlpha: 1})
                  
                  let tau = Math.PI * 2;
                
                  gsap.set(plane.rotation, {y: tau * -.25});
                  gsap.set(plane.position, {x: 80, y: -32, z: -60});
                  
                  scene.render();
                  
                  var sectionDuration = 1;
                  
                  // Setup the scroll triggers for various elements
                  gsap.fromTo(scene.views[1], 
                    { height: 1, bottom: 0 }, 
                    {
                      height: 0, bottom: 1,
                      ease: 'none',
                      scrollTrigger: {
                        trigger: ".blueprint",
                        scrub: true,
                        start: "bottom bottom",
                        end: "bottom top"
                      }
                    }
                  )
                  
                  gsap.fromTo(scene.views[1], 
                    { height: 0, bottom: 0 }, 
                    {
                      height: 1, bottom: 0,
                      ease: 'none',
                      scrollTrigger: {
                        trigger: ".blueprint",
                        scrub: true,
                        start: "top bottom",
                        end: "top top"
                      }
                    }
                  )
                  
                  gsap.to('.ground', {
                    y: "30%",
                    scrollTrigger: {
                      trigger: ".ground-container",
                      scrub: true,
                      start: "top bottom",
                      end: "bottom top"
                    }
                  })
                  
                  gsap.from('.clouds', {
                    y: "25%",
                    scrollTrigger: {
                      trigger: ".ground-container",
                      scrub: true,
                      start: "top bottom",
                      end: "bottom top"
                    }
                  })
                  
                  gsap.to('#line-length', {
                    drawSVG: 100,
                    scrollTrigger: {
                      trigger: ".length",
                      scrub: true,
                      start: "top bottom",
                      end: "top top"
                    }
                  })
                  
                  gsap.to('#line-wingspan', {
                    drawSVG: 100,
                    scrollTrigger: {
                      trigger: ".wingspan",
                      scrub: true,
                      start: "top 25%",
                      end: "bottom 50%"
                    }
                  })  
                  
                  gsap.to('#circle-phalange', {
                    drawSVG: 100,
                    scrollTrigger: {
                      trigger: ".phalange",
                      scrub: true,
                      start: "top 50%",
                      end: "bottom 100%"
                    }
                  })
                  
                  gsap.to('#line-length', {
                    opacity: 0,
                    drawSVG: 0,
                    scrollTrigger: {
                      trigger: ".length",
                      scrub: true,
                      start: "top top",
                      end: "bottom top"
                    }
                  })
                  
                  gsap.to('#line-wingspan', {
                    opacity: 0,
                    drawSVG: 0,
                    scrollTrigger: {
                      trigger: ".wingspan",
                      scrub: true,
                      start: "top top",
                      end: "bottom top"
                    }
                  })  
                  
                  gsap.to('#circle-phalange', {
                    opacity: 0,
                    drawSVG: 0,
                    scrollTrigger: {
                      trigger: ".phalange",
                      scrub: true,
                      start: "top top",
                      end: "bottom top"
                    }
                  })
                  
                  let tl = new gsap.timeline({
                    onUpdate: scene.render,
                    scrollTrigger: {
                      trigger: ".content",
                      scrub: true,
                      start: "top top",
                      end: "bottom bottom"
                    },
                    defaults: {duration: sectionDuration, ease: 'power2.inOut'}
                  });
                  
                  let delay = 0;
                  
                  tl.to('.scroll-cta', {duration: 0.25, opacity: 0}, delay)
                  tl.to(plane.position, {x: -10, ease: 'power1.in'}, delay)
                  
                  delay += sectionDuration;
                  
                  tl.to(plane.rotation, {x: tau * .25, y: 0, z: -tau * 0.05, ease: 'power1.inOut'}, delay)
                  tl.to(plane.position, {x: -40, y: 0, z: -60, ease: 'power1.inOut'}, delay)
                  
                  delay += sectionDuration;
                  
                  tl.to(plane.rotation, {x: tau * .25, y: 0, z: tau * 0.05, ease: 'power3.inOut'}, delay)
                  tl.to(plane.position, {x: 40, y: 0, z: -60, ease: 'power2.inOut'}, delay)
                  
                  delay += sectionDuration;
                  
                  tl.to(plane.rotation, {x: tau * .2, y: 0, z: -tau * 0.1, ease: 'power3.inOut'}, delay)
                  tl.to(plane.position, {x: -40, y: 0, z: -30, ease: 'power2.inOut'}, delay)
                  
                  delay += sectionDuration;
                  
                  tl.to(plane.rotation, { x: 0, z: 0, y: tau * .25}, delay)
                  tl.to(plane.position, { x: 0, y: -10, z: 50}, delay)
                  
                  delay += sectionDuration;
                  delay += sectionDuration;
                  
                  tl.to(plane.rotation, {x: tau * 0.25, y: tau *.5, z: 0, ease:'power4.inOut'}, delay)
                  tl.to(plane.position, {z: 30, ease:'power4.inOut'}, delay)
                  
                  delay += sectionDuration;
                  
                  tl.to(plane.rotation, {x: tau * 0.25, y: tau *.5, z: 0, ease:'power4.inOut'}, delay)
                  tl.to(plane.position, {z: 60, x: 30, ease:'power4.inOut'}, delay)
                  
                  delay += sectionDuration;
                  
                  tl.to(plane.rotation, {x: tau * 0.35, y: tau *.75, z: tau * 0.6, ease:'power4.inOut'}, delay)
                  tl.to(plane.position, {z: 100, x: 20, y: 0, ease:'power4.inOut'}, delay)
                  
                  delay += sectionDuration;
                  
                  tl.to(plane.rotation, {x: tau * 0.15, y: tau *.85, z: -tau * 0, ease: 'power1.in'}, delay)
                  tl.to(plane.position, {z: -150, x: 0, y: 0, ease: 'power1.inOut'}, delay)
                  
                  delay += sectionDuration;
                  
                  tl.to(plane.rotation, {duration: sectionDuration, x: -tau * 0.05, y: tau, z: -tau * 0.1, ease: 'none'}, delay)
                  tl.to(plane.position, {duration: sectionDuration, x: 0, y: 30, z: 320, ease: 'power1.in'}, delay)
                  
                  tl.to(scene.light.position, {duration: sectionDuration, x: 0, y: 0, z: 0}, delay)
                }
                
                // Start the animation when the page is ready
                if (typeof window !== 'undefined') {
                  if (document.readyState === 'complete') {
                    loadModel();
                  } else {
                    window.addEventListener('load', loadModel);
                  }
                }
              `}
            </Script>
          </>
        )}
      </main>
    </>
  );
}