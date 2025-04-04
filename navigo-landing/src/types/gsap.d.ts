declare module 'gsap' {
  export interface TweenVars {
    [key: string]: any;
  }

  export interface ScrollTrigger {
    getAll(): ScrollTrigger[];
    kill(): void;
  }

  export interface Timeline {
    clear(): void;
    to(target: any, vars: TweenVars, position?: string | number): Timeline;
  }

  export interface GSAPStatic {
    registerPlugin(plugin: any): void;
    set(target: any, vars: TweenVars): void;
    fromTo(target: any, fromVars: TweenVars, toVars: TweenVars): void;
    to(target: any, vars: TweenVars): void;
    timeline(vars?: any): Timeline;
    scrollTrigger: ScrollTrigger;
  }
}

declare global {
  interface Window {
    gsap: import('gsap').GSAPStatic;
  }
} 