// Type definitions for animation libraries

// GSAP types
declare namespace gsap {
    interface TweenVars {
      [key: string]: any;
    }
  
    interface TimelineVars extends TweenVars {
      [key: string]: any;
    }
  
    interface Tween {
      kill(): this;
      pause(): this;
      play(): this;
      progress(value: number): this;
      restart(): this;
      resume(): this;
      reverse(): this;
      seek(position: number): this;
      timeScale(value: number): this;
      [key: string]: any;
    }
  
    interface Timeline extends Tween {
      add(child: string | Tween | Timeline, position?: any): this;
      addLabel(label: string, position: any): this;
      addPause(position: any, callback?: Function): this;
      clear(labels?: boolean): this;
      duration(value: number): this;
      from(targets: any, vars: TweenVars, position?: any): this;
      fromTo(targets: any, fromVars: TweenVars, toVars: TweenVars, position?: any): this;
      getChildren(nested?: boolean, tweens?: boolean, timelines?: boolean, ignoreBeforeTime?: number): Tween[];
      getTweensOf(targets: any, onlyActive?: boolean): Tween[];
      to(targets: any, vars: TweenVars, position?: any): this;
      [key: string]: any;
    }
  
    interface ScrollTrigger {
      create(vars: any): any;
      defaults(vars: any): void;
      getAll(): any[];
      getById(id: string): any;
      kill(reset?: boolean, matchMedia?: boolean): void;
      matchMedia(vars: any): void;
      refresh(safe?: boolean): void;
      update(reset?: boolean): void;
      [key: string]: any;
    }
  
    interface DrawSVGPlugin {
      [key: string]: any;
    }
  
    function registerPlugin(...plugins: any[]): void;
    function set(target: any, vars: TweenVars): void;
    function from(target: any, vars: TweenVars): Tween;
    function fromTo(target: any, fromVars: TweenVars, toVars: TweenVars): Tween;
    function to(target: any, vars: TweenVars): Tween;
    function timeline(vars?: TimelineVars): Timeline;
    function killAll(): void;
  }
  
  // THREE.js types
  declare namespace THREE {
    class WebGLRenderer {
      constructor(parameters?: any);
      setSize(width: number, height: number): void;
      setPixelRatio(value: number): void;
      domElement: HTMLCanvasElement;
      shadowMap: { enabled: boolean; type: any };
      setScissorTest(scissorTest: boolean): void;
      setViewport(x: number, y: number, width: number, height: number): void;
      setScissor(x: number, y: number, width: number, height: number): void;
      render(scene: Scene, camera: Camera): void;
      [key: string]: any;
    }
  
    class Scene {
      constructor();
      add(object: Object3D): this;
      [key: string]: any;
    }
  
    class Object3D {
      position: Vector3;
      rotation: Euler;
      traverse(callback: (object: Object3D) => void): void;
      add(object: Object3D): this;
      layers: Layers;
      children: Object3D[];
      [key: string]: any;
    }
  
    class Group extends Object3D {
      constructor();
      [key: string]: any;
    }
  
    class Camera extends Object3D {
      constructor();
      aspect: number;
      updateProjectionMatrix(): void;
      layers: Layers;
      lookAt(vector: Vector3): void;
      [key: string]: any;
    }
  
    class PerspectiveCamera extends Camera {
      constructor(fov?: number, aspect?: number, near?: number, far?: number);
      [key: string]: any;
    }
  
    class Vector3 {
      constructor(x?: number, y?: number, z?: number);
      x: number;
      y: number;
      z: number;
      [key: string]: any;
    }
  
    class Euler {
      constructor(x?: number, y?: number, z?: number, order?: string);
      x: number;
      y: number;
      z: number;
      [key: string]: any;
    }
  
    class Layers {
      set(channel: number): void;
      enable(channel: number): void;
      disableAll(): void;
      [key: string]: any;
    }
  
    class LineSegments extends Object3D {
      constructor(geometry?: any, material?: any);
      [key: string]: any;
    }
  
    class EdgesGeometry {
      constructor(geometry: any);
      [key: string]: any;
    }
  
    class Light extends Object3D {
      constructor(color?: any, intensity?: number);
      [key: string]: any;
    }
  
    class PointLight extends Light {
      constructor(color?: any, intensity?: number, distance?: number, decay?: number);
      [key: string]: any;
    }
  
    class AmbientLight extends Light {
      constructor(color?: any, intensity?: number);
      [key: string]: any;
    }
  
    class Material {
      constructor();
      depthTest: boolean;
      opacity: number;
      transparent: boolean;
      [key: string]: any;
    }
  
    class MeshPhongMaterial extends Material {
      constructor(parameters?: any);
      [key: string]: any;
    }
  
    class LoadingManager {
      constructor(onLoad?: Function, onProgress?: Function, onError?: Function);
      onProgress: (url: string, loaded: number, total: number) => void;
      [key: string]: any;
    }
  }
  
  declare class THREE_OBJLoader {
    constructor(manager?: THREE.LoadingManager);
    load(url: string, onLoad: (object: THREE.Object3D) => void, onProgress?: Function, onError?: Function): void;
    parse(text: string): THREE.Object3D;
    setPath(path: string): this;
    setMaterials(materials: any): this;
    setMaterialOptions(options: any): this;
    [key: string]: any;
  }
  
  // Extend Window object to include our animation libraries
  interface Window {
    gsap: typeof gsap;
    THREE: typeof THREE;
    DrawSVGPlugin: gsap.DrawSVGPlugin;
    ScrollTrigger: gsap.ScrollTrigger;
    OBJLoader: typeof THREE_OBJLoader;
    fs: {
      readFile: (path: string, options?: { encoding?: string }) => Promise<Uint8Array | string>;
    };
  }