"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { useRouter } from "next/navigation";

import * as THREE from "three";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type ForexPairItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
};

type CardData = {
  href: string;
  itemIndex: number;
  finalSlot: number;
  hoverScale: number;
  targetHoverScale: number;
};

type FinalEntryPreset = {
  xFactor: number;
  direction: "top" | "bottom";
  z: number;
  rotation: number;
  scale: number;
  delay: number;
  curveX: number;
};

type CardMesh = THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;

/* -------------------------------------------------------------------------- */
/*                        REDUCED MOTION HELPER                               */
/* -------------------------------------------------------------------------- */

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setPrefersReducedMotion(media.matches);
    };

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);

      return () => {
        media.removeEventListener("change", update);
      };
    }

    media.addListener(update);

    return () => {
      media.removeListener(update);
    };
  }, []);

  return prefersReducedMotion;
}

/* -------------------------------------------------------------------------- */
/*                             FOREX PAIR DATA                                */
/* -------------------------------------------------------------------------- */

const ITEMS: ForexPairItem[] = [
  /* ---------------------------------------------------------------------- */
  /* FEATURED PAIRS                                                        */
  /* First six also become the final 3 × 2 grid.                            */
  /* ---------------------------------------------------------------------- */

  {
    id: "01",
    title: "EUR/USD",
    category: "Major Forex Pair",
    image: "/images/forex-pairs/eurusd.png",
    href: "/markets",
  },

  {
    id: "02",
    title: "GBP/USD",
    category: "Major Forex Pair",
    image: "/images/forex-pairs/gbpusd.png",
    href: "/markets",
  },

  {
    id: "03",
    title: "AUD/USD",
    category: "Major Forex Pair",
    image: "/images/forex-pairs/audusd.png",
    href: "/markets",
  },

  {
    id: "04",
    title: "GBP/JPY",
    category: "Cross Currency Pair",
    image: "/images/forex-pairs/gbpjpy.png",
    href: "/markets",
  },

  {
    id: "05",
    title: "EUR/GBP",
    category: "Cross Currency Pair",
    image: "/images/forex-pairs/eurgbp.png",
    href: "/markets",
  },

  {
    id: "06",
    title: "AUD/CAD",
    category: "Cross Currency Pair",
    image: "/images/forex-pairs/audcad.png",
    href: "/markets",
  },

  /* ---------------------------------------------------------------------- */
  /* ADDITIONAL PAIRS                                                       */
  /* ---------------------------------------------------------------------- */

  {
    id: "07",
    title: "AUD/JPY",
    category: "Cross Currency Pair",
    image: "/images/forex-pairs/audjpy.png",
    href: "/markets",
  },

  {
    id: "08",
    title: "AUD/NZD",
    category: "Cross Currency Pair",
    image: "/images/forex-pairs/audnzd.png",
    href: "/markets",
  },

  {
    id: "09",
    title: "CAD/JPY",
    category: "Cross Currency Pair",
    image: "/images/forex-pairs/cadjpy.png",
    href: "/markets",
  },

  {
    id: "10",
    title: "CHF/JPY",
    category: "Cross Currency Pair",
    image: "/images/forex-pairs/chfjpy.png",
    href: "/markets",
  },

  {
    id: "11",
    title: "EUR/AUD",
    category: "Cross Currency Pair",
    image: "/images/forex-pairs/euraud.png",
    href: "/markets",
  },

  {
    id: "12",
    title: "EUR/NZD",
    category: "Cross Currency Pair",
    image: "/images/forex-pairs/eurnzd.png",
    href: "/markets",
  },

  {
    id: "13",
    title: "EUR/PLN",
    category: "Global Currency Pair",
    image: "/images/forex-pairs/eurpln.png",
    href: "/markets",
  },

  {
    id: "14",
    title: "EUR/SEK",
    category: "Global Currency Pair",
    image: "/images/forex-pairs/eursek.png",
    href: "/markets",
  },

  {
    id: "15",
    title: "EUR/TRY",
    category: "Global Currency Pair",
    image: "/images/forex-pairs/eurtry.png",
    href: "/markets",
  },

  {
    id: "16",
    title: "EUR/ZAR",
    category: "Global Currency Pair",
    image: "/images/forex-pairs/eurzar.png",
    href: "/markets",
  },

  {
    id: "17",
    title: "GBP/AUD",
    category: "Cross Currency Pair",
    image: "/images/forex-pairs/gbpaud.png",
    href: "/markets",
  },

  {
    id: "18",
    title: "GBP/CAD",
    category: "Cross Currency Pair",
    image: "/images/forex-pairs/gbpcad.png",
    href: "/markets",
  },
];

/* -------------------------------------------------------------------------- */
/*                              MOTION SETTINGS                               */
/* -------------------------------------------------------------------------- */

const CARD_WIDTH = 2.62;
const CARD_HEIGHT = 1.66;

const WIDTH_SEGMENTS = 34;

/*
 * Longer than the original BEZTEQ version because
 * we now have 18 currency-pair cards.
 */
const SCROLL_DISTANCE_VIEWPORTS = 8.2;

/* -------------------------------------------------------------------------- */
/*                         FINAL FEATURED GRID                                */
/* -------------------------------------------------------------------------- */

const FINAL_ITEM_INDEXES = [0, 1, 2, 3, 4, 5] as const;

const FINAL_INDEX_TO_SLOT = new Map<number, number>(
  FINAL_ITEM_INDEXES.map((itemIndex, slot) => [itemIndex, slot]),
);

/* -------------------------------------------------------------------------- */
/*                              HELIX SETTINGS                                */
/* -------------------------------------------------------------------------- */

const HELIX_RADIUS = 5.05;

const HELIX_PITCH = 0.59;

const HELIX_DIP_AMOUNT = 0.58;

const ANGLE_GAP = 0.565;

const FRONT_ANGLE = Math.PI / 2;

const INITIAL_SCROLL_ANGLE = -0.76;

/*
 * Increased because 18 pair cards need more travel
 * through the helix.
 */
const FINAL_SCROLL_ANGLE = 8.7;

/* -------------------------------------------------------------------------- */
/*                                FINAL GRID                                  */
/* -------------------------------------------------------------------------- */

const GRID_X_GAP = 3.2;

const GRID_Y_GAP = 1.98;

const GRID_CENTER_Y = 0.08;

const GRID_Z = 0.42;

/* -------------------------------------------------------------------------- */
/*                               GUIDE CURVES                                 */
/* -------------------------------------------------------------------------- */

const LINE_POINTS = 220;

/* -------------------------------------------------------------------------- */
/*                            ANIMATION PHASES                                */
/* -------------------------------------------------------------------------- */

const INTRO_START = 0.015;

const INTRO_END = 0.145;

const ROLL_START = 0.105;

const ROLL_END = 0.675;

const TITLE_CROSS_START = 0.42;

const TITLE_CROSS_END = 0.705;

const GRID_PHASE_START = 0.725;

const GRID_PHASE_END = 0.965;

/* -------------------------------------------------------------------------- */
/*                         FINAL CARD ENTRY SETTINGS                          */
/* -------------------------------------------------------------------------- */

const FINAL_ENTRY_PRESETS: FinalEntryPreset[] = [
  {
    xFactor: -0.23,
    direction: "top",
    z: -0.95,
    rotation: -0.075,
    scale: 0.77,
    delay: 0,
    curveX: -0.18,
  },

  {
    xFactor: 0.015,
    direction: "top",
    z: -1.2,
    rotation: 0.055,
    scale: 0.72,
    delay: 0.026,
    curveX: 0.14,
  },

  {
    xFactor: 0.245,
    direction: "top",
    z: -0.88,
    rotation: 0.082,
    scale: 0.78,
    delay: 0.055,
    curveX: 0.2,
  },

  {
    xFactor: -0.24,
    direction: "bottom",
    z: -0.9,
    rotation: 0.068,
    scale: 0.75,
    delay: 0.034,
    curveX: -0.16,
  },

  {
    xFactor: 0.01,
    direction: "bottom",
    z: -1.25,
    rotation: -0.048,
    scale: 0.71,
    delay: 0.075,
    curveX: 0.12,
  },

  {
    xFactor: 0.25,
    direction: "bottom",
    z: -0.9,
    rotation: -0.082,
    scale: 0.76,
    delay: 0.108,
    curveX: 0.22,
  },
];

/* -------------------------------------------------------------------------- */
/*                                  SHADERS                                   */
/* -------------------------------------------------------------------------- */

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uMap;
  uniform float uOpacity;
  uniform float uHover;
  uniform float uRadius;
  uniform vec2 uSize;

  varying vec2 vUv;

  void main() {
    vec2 sampleUv = vUv;

    if (!gl_FrontFacing) {
      sampleUv.x = 1.0 - sampleUv.x;
    }

    vec2 pixelPosition =
      (sampleUv - 0.5) * uSize;

    vec2 distanceVector =
      abs(pixelPosition) -
      uSize * 0.5 +
      uRadius;

    float signedDistance =
      min(
        max(
          distanceVector.x,
          distanceVector.y
        ),
        0.0
      ) +
      length(
        max(
          distanceVector,
          0.0
        )
      ) -
      uRadius;

    float cornerAlpha =
      1.0 -
      smoothstep(
        -0.025,
        0.025,
        signedDistance
      );

    if (cornerAlpha <= 0.001) {
      discard;
    }

    vec4 imageColor =
      texture2D(
        uMap,
        sampleUv
      );

    vec3 finalColor =
      mix(
        imageColor.rgb,
        imageColor.rgb * 1.08,
        uHover
      );

    gl_FragColor =
      vec4(
        finalColor,
        imageColor.a *
        cornerAlpha *
        uOpacity
      );
  }
`;

/* -------------------------------------------------------------------------- */
/*                                UTILITIES                                   */
/* -------------------------------------------------------------------------- */

function clamp01(value: number) {
  return THREE.MathUtils.clamp(value, 0, 1);
}

function smoothStep(start: number, end: number, value: number) {
  if (start === end) {
    return value >= end ? 1 : 0;
  }

  const progress = clamp01((value - start) / (end - start));

  return progress * progress * (3 - 2 * progress);
}

function rotatePoint(x: number, y: number, rotation: number) {
  const cosine = Math.cos(rotation);

  const sine = Math.sin(rotation);

  return {
    x: x * cosine - y * sine,

    y: x * sine + y * cosine,
  };
}

function getCardData(mesh: CardMesh): CardData {
  return mesh.userData as CardData;
}

/* -------------------------------------------------------------------------- */
/*                           FALLBACK TEXTURE                                 */
/* -------------------------------------------------------------------------- */

function createFallbackTexture(label: string) {
  const canvas = document.createElement("canvas");

  canvas.width = 1400;

  canvas.height = 900;

  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  /*
   * JKV Global emerald / deep teal fallback.
   */

  const gradient = context.createLinearGradient(
    0,
    0,
    canvas.width,
    canvas.height,
  );

  gradient.addColorStop(0, "#06110F");

  gradient.addColorStop(0.58, "#064F49");

  gradient.addColorStop(1, "#20C997");

  context.fillStyle = gradient;

  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "rgba(255,255,255,0.08)";

  for (let x = 0; x <= canvas.width; x += 90) {
    context.beginPath();

    context.moveTo(x, 0);

    context.lineTo(x, canvas.height);

    context.stroke();
  }

  for (let y = 0; y <= canvas.height; y += 90) {
    context.beginPath();

    context.moveTo(0, y);

    context.lineTo(canvas.width, y);

    context.stroke();
  }

  context.fillStyle = "#EAFBF6";

  context.font = "600 84px Arial, sans-serif";

  context.fillText(label.toUpperCase(), 70, 760);

  const texture = new THREE.CanvasTexture(canvas);

  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

/* -------------------------------------------------------------------------- */
/*                               HELIX HELPERS                                */
/* -------------------------------------------------------------------------- */

function helixDip(angle: number) {
  const midpoint = FRONT_ANGLE + 2.02;

  const spread = 1.27;

  const difference = (angle - midpoint) / spread;

  return HELIX_DIP_AMOUNT * Math.exp(-difference * difference);
}

function helixLocalY(angle: number) {
  return (angle - FRONT_ANGLE) * HELIX_PITCH - helixDip(angle);
}

/* -------------------------------------------------------------------------- */
/*                                   ICON                                     */
/* -------------------------------------------------------------------------- */

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M4 16 16 4M7 4h9v9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                          FOREX PAIRS IN MOTION                             */
/* -------------------------------------------------------------------------- */

export function ForexPairsInMotion() {
  const sectionRef = useRef<HTMLElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const router = useRouter();

  const prefersReducedMotion = usePrefersReducedMotion();

  /* ------------------------------------------------------------------------ */
  /*                       THREE + SCROLL LIFECYCLE                           */
  /* ------------------------------------------------------------------------ */

  useGSAP(
    () => {
      const section = sectionRef.current;

      const canvas = canvasRef.current;

      if (
        !section ||
        !canvas ||
        prefersReducedMotion ||
        !window.matchMedia("(min-width: 1024px)").matches
      ) {
        return;
      }

      /* -------------------------------------------------------------------- */
      /*                               STATE                                  */
      /* -------------------------------------------------------------------- */

      let disposed = false;

      let rafId = 0;

      let isActive = false;

      let targetProgress = 0;

      let currentProgress = 0;

      let hoveredCard: CardMesh | null = null;

      let interactionEnabled = false;

      /* -------------------------------------------------------------------- */
      /*                         DOM REFERENCES                               */
      /* -------------------------------------------------------------------- */

      const title = section.querySelector<HTMLElement>("[data-motion-title]");

      const firstTitleLine = section.querySelector<HTMLElement>(
        "[data-motion-line-one]",
      );

      const secondTitleLine = section.querySelector<HTMLElement>(
        "[data-motion-line-two]",
      );

      const descriptor = section.querySelector<HTMLElement>(
        "[data-motion-description]",
      );

      const leftCopy = section.querySelector<HTMLElement>(
        "[data-motion-left-copy]",
      );

      const rightLink = section.querySelector<HTMLElement>(
        "[data-motion-right-link]",
      );

      /* -------------------------------------------------------------------- */
      /*                              THREE                                   */
      /* -------------------------------------------------------------------- */

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);

      camera.position.set(0, 0.05, 11.85);

      const contextAttributes: WebGLContextAttributes = {
        alpha: true,

        antialias: true,

        depth: true,

        stencil: false,

        premultipliedAlpha: true,

        preserveDrawingBuffer: false,

        powerPreference: "high-performance",
      };

      const webglContext =
        canvas.getContext("webgl2", contextAttributes) ??
        canvas.getContext("webgl", contextAttributes);

      if (!webglContext) {
        console.error("[ForexPairsInMotion] Unable to create WebGL context.");

        return;
      }

      if (
        typeof webglContext.isContextLost === "function" &&
        webglContext.isContextLost()
      ) {
        console.warn("[ForexPairsInMotion] WebGL context is already lost.");

        return;
      }

      let renderer: THREE.WebGLRenderer;

      try {
        renderer = new THREE.WebGLRenderer({
          canvas,

          context: webglContext as WebGLRenderingContext,

          alpha: true,

          antialias: true,

          powerPreference: "high-performance",
        });
      } catch (error) {
        console.error("[ForexPairsInMotion] Renderer creation failed:", error);

        return;
      }

      renderer.setClearColor(0x000000, 0);

      renderer.outputColorSpace = THREE.SRGBColorSpace;

      /* -------------------------------------------------------------------- */
      /*                       WEBGL CONTEXT EVENTS                           */
      /* -------------------------------------------------------------------- */

      const handleContextLost = (event: Event) => {
        event.preventDefault();

        isActive = false;

        if (rafId) {
          window.cancelAnimationFrame(rafId);

          rafId = 0;
        }

        console.warn("[ForexPairsInMotion] WebGL context lost.");
      };

      const handleContextRestored = () => {
        if (disposed) {
          return;
        }

        console.info("[ForexPairsInMotion] WebGL context restored.");

        requestAnimationFrame(() => {
          if (disposed) {
            return;
          }

          handleResize();

          requestFrame();
        });
      };

      canvas.addEventListener("webglcontextlost", handleContextLost, false);

      canvas.addEventListener(
        "webglcontextrestored",
        handleContextRestored,
        false,
      );

      /* -------------------------------------------------------------------- */
      /*                            TEXTURES                                  */
      /* -------------------------------------------------------------------- */

      const textureLoader = new THREE.TextureLoader();

      const cards: CardMesh[] = [];

      const loadedTextures = new Set<THREE.Texture>();

      const disposedTextures = new WeakSet<THREE.Texture>();

      const disposeTexture = (texture: THREE.Texture) => {
        if (disposedTextures.has(texture)) {
          return;
        }

        disposedTextures.add(texture);

        texture.dispose();
      };

      /* -------------------------------------------------------------------- */
      /*                           GUIDE CURVES                               */
      /* -------------------------------------------------------------------- */

      const topLineGeometry = new THREE.BufferGeometry();

      const bottomLineGeometry = new THREE.BufferGeometry();

      topLineGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(LINE_POINTS * 3), 3),
      );

      bottomLineGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(LINE_POINTS * 3), 3),
      );

      /*
       * JKV teal guide paths.
       */

      const topLineMaterial = new THREE.LineBasicMaterial({
        color: 0x3d7d6b,

        transparent: true,

        opacity: 0,
      });

      const bottomLineMaterial = new THREE.LineBasicMaterial({
        color: 0x3d7d6b,

        transparent: true,

        opacity: 0,
      });

      const topGuide = new THREE.Line(topLineGeometry, topLineMaterial);

      const bottomGuide = new THREE.Line(
        bottomLineGeometry,
        bottomLineMaterial,
      );

      scene.add(topGuide, bottomGuide);

      /* -------------------------------------------------------------------- */
      /*                           TEXTURE LOADER                             */
      /* -------------------------------------------------------------------- */

      const loadTexture = async (item: ForexPairItem) => {
        try {
          const texture = await textureLoader.loadAsync(item.image);

          if (disposed) {
            disposeTexture(texture);

            return texture;
          }

          texture.colorSpace = THREE.SRGBColorSpace;

          texture.anisotropy = Math.min(
            renderer.capabilities.getMaxAnisotropy(),
            8,
          );

          loadedTextures.add(texture);

          return texture;
        } catch {
          const texture = createFallbackTexture(item.title);

          if (disposed) {
            disposeTexture(texture);

            return texture;
          }

          loadedTextures.add(texture);

          return texture;
        }
      };

      /* -------------------------------------------------------------------- */
      /*                            CREATE CARD                               */
      /* -------------------------------------------------------------------- */

      const createCard = (
        item: ForexPairItem,

        itemIndex: number,

        texture: THREE.Texture,
      ) => {
        const geometry = new THREE.PlaneGeometry(
          CARD_WIDTH,
          CARD_HEIGHT,
          WIDTH_SEGMENTS,
          1,
        );

        const material = new THREE.ShaderMaterial({
          vertexShader,

          fragmentShader,

          transparent: true,

          side: THREE.DoubleSide,

          depthTest: true,

          depthWrite: true,

          toneMapped: false,

          uniforms: {
            uMap: {
              value: texture,
            },

            uOpacity: {
              value: 0,
            },

            uHover: {
              value: 0,
            },

            uRadius: {
              value: 0.085,
            },

            uSize: {
              value: new THREE.Vector2(CARD_WIDTH, CARD_HEIGHT),
            },
          },
        });

        const mesh = new THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>(
          geometry,
          material,
        );

        mesh.userData = {
          href: item.href,

          itemIndex,

          finalSlot: FINAL_INDEX_TO_SLOT.get(itemIndex) ?? -1,

          hoverScale: 1,

          targetHoverScale: 1,
        } satisfies CardData;

        mesh.frustumCulled = false;

        mesh.renderOrder = 10 + itemIndex;

        scene.add(mesh);

        cards.push(mesh);
      };

      /* -------------------------------------------------------------------- */
      /*                     CAMERA WORLD BOUNDS                             */
      /* -------------------------------------------------------------------- */

      const getVisibleWorldBounds = (planeZ = GRID_Z) => {
        const distance = Math.abs(camera.position.z - planeZ);

        const halfHeight =
          Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * distance;

        const halfWidth = halfHeight * camera.aspect;

        return {
          halfWidth,
          halfHeight,
        };
      };

      /* -------------------------------------------------------------------- */
      /*                           GUIDE LINE                                 */
      /* -------------------------------------------------------------------- */

      const updateGuideLine = (
        geometry: THREE.BufferGeometry,

        firstAngle: number,

        lastAngle: number,

        verticalOffset: number,

        radialOffset: number,

        circleCenterY: number,
      ) => {
        const position = geometry.getAttribute(
          "position",
        ) as THREE.BufferAttribute;

        for (let index = 0; index < LINE_POINTS; index += 1) {
          const fraction = index / (LINE_POINTS - 1);

          const angle = THREE.MathUtils.lerp(firstAngle, lastAngle, fraction);

          const radius = HELIX_RADIUS + radialOffset;

          position.setXYZ(
            index,

            radius * Math.cos(angle),

            circleCenterY + helixLocalY(angle) + verticalOffset,

            radius * Math.sin(angle),
          );
        }

        position.needsUpdate = true;
      };

      /* -------------------------------------------------------------------- */
      /*                         CARD GEOMETRY                                */
      /* -------------------------------------------------------------------- */

      const updateCardGeometry = (
        mesh: CardMesh,

        cardIndex: number,

        progress: number,

        scrollAngle: number,

        circleCenterY: number,
      ) => {
        const data = getCardData(mesh);

        data.hoverScale += (data.targetHoverScale - data.hoverScale) * 0.13;

        const { halfWidth, halfHeight } = getVisibleWorldBounds();

        const geometryPosition = mesh.geometry.getAttribute(
          "position",
        ) as THREE.BufferAttribute;

        const uv = mesh.geometry.getAttribute("uv") as THREE.BufferAttribute;

        const centerOffset = cardIndex - (cards.length - 1) / 2;

        const centerAngle =
          FRONT_ANGLE + centerOffset * ANGLE_GAP + scrollAngle;

        const cardArcWidth = CARD_WIDTH / HELIX_RADIUS;

        const finalSlot = data.finalSlot;

        const isFinalCard = finalSlot >= 0;

        let finalEntryProgress = 0;

        let gridCenterX = 0;

        let gridCenterY = 0;

        let entryCenterX = 0;

        let entryCenterY = 0;

        let entryZ = GRID_Z;

        let entryRotation = 0;

        let entryScale = 1;

        let entryCurveX = 0;

        if (isFinalCard) {
          const preset = FINAL_ENTRY_PRESETS[finalSlot];

          const column = finalSlot % 3;

          const row = Math.floor(finalSlot / 3);

          gridCenterX = (column - 1) * GRID_X_GAP;

          gridCenterY = (0.5 - row) * GRID_Y_GAP + GRID_CENTER_Y;

          const cardEntryStart = GRID_PHASE_START + preset.delay;

          const cardEntryEnd = Math.min(
            GRID_PHASE_END,

            cardEntryStart + 0.175,
          );

          finalEntryProgress = smoothStep(
            cardEntryStart,

            cardEntryEnd,

            progress,
          );

          entryCenterX = preset.xFactor * halfWidth;

          entryCenterY =
            preset.direction === "top"
              ? halfHeight + CARD_HEIGHT * 1.1
              : -halfHeight - CARD_HEIGHT * 1.1;

          entryZ = GRID_Z + preset.z;

          entryRotation = preset.rotation;

          entryScale = preset.scale;

          entryCurveX = preset.curveX;
        }

        for (
          let vertexIndex = 0;
          vertexIndex < geometryPosition.count;
          vertexIndex += 1
        ) {
          const u = uv.getX(vertexIndex);

          const v = uv.getY(vertexIndex);

          const localX = (u - 0.5) * CARD_WIDTH;

          const localY = (v - 0.5) * CARD_HEIGHT;

          /* -------------------------------------------------------------- */
          /*                           HELIX                                */
          /* -------------------------------------------------------------- */

          const vertexAngle = centerAngle + (u - 0.5) * cardArcWidth;

          const helixX = HELIX_RADIUS * Math.cos(vertexAngle);

          const helixY = circleCenterY + helixLocalY(vertexAngle) + localY;

          const helixZ = HELIX_RADIUS * Math.sin(vertexAngle);

          if (progress < GRID_PHASE_START || !isFinalCard) {
            geometryPosition.setXYZ(
              vertexIndex,

              helixX,

              helixY,

              helixZ,
            );

            continue;
          }

          /* -------------------------------------------------------------- */
          /*                     OFFSCREEN -> GRID                          */
          /* -------------------------------------------------------------- */

          const curvedEntry = Math.sin(finalEntryProgress * Math.PI);

          const currentRotation = THREE.MathUtils.lerp(
            entryRotation,

            0,

            finalEntryProgress,
          );

          const currentScale = THREE.MathUtils.lerp(
            entryScale,

            data.hoverScale,

            finalEntryProgress,
          );

          const rotatedLocal = rotatePoint(
            localX * currentScale,

            localY * currentScale,

            currentRotation,
          );

          const centerX =
            THREE.MathUtils.lerp(
              entryCenterX,

              gridCenterX,

              finalEntryProgress,
            ) +
            curvedEntry * entryCurveX * halfWidth * 0.1;

          const centerY = THREE.MathUtils.lerp(
            entryCenterY,

            gridCenterY,

            finalEntryProgress,
          );

          const centerZ = THREE.MathUtils.lerp(
            entryZ,

            GRID_Z + finalSlot * 0.003,

            finalEntryProgress,
          );

          geometryPosition.setXYZ(
            vertexIndex,

            centerX + rotatedLocal.x,

            centerY + rotatedLocal.y,

            centerZ,
          );
        }

        geometryPosition.needsUpdate = true;

        mesh.material.uniforms.uHover.value = Math.max(
          data.hoverScale - 1,

          0,
        );
      };

      /* -------------------------------------------------------------------- */
      /*                          DOM ANIMATION                               */
      /* -------------------------------------------------------------------- */

      const updateDOM = (progress: number) => {
        const intro = smoothStep(
          INTRO_START,

          INTRO_END,

          progress,
        );

        const cross = smoothStep(
          TITLE_CROSS_START,

          TITLE_CROSS_END,

          progress,
        );

        const titleFade =
          1 -
          smoothStep(
            0.66,

            0.735,

            progress,
          );

        if (title) {
          title.style.opacity = String(intro * titleFade);

          title.style.transform = `
            translate3d(
              0,
              ${(1 - intro) * 24}px,
              0
            )
          `;
        }

        if (firstTitleLine) {
          const introX = (1 - intro) * -34;

          const crossX = cross * 79;

          firstTitleLine.style.transform = `
            translate3d(
              ${introX + crossX}vw,
              0,
              0
            )
          `;
        }

        if (secondTitleLine) {
          const introX = (1 - intro) * 34;

          const crossX = cross * -88;

          secondTitleLine.style.transform = `
            translate3d(
              ${introX + crossX}vw,
              0,
              0
            )
          `;
        }

        if (descriptor) {
          const descriptorIn = smoothStep(
            0.045,

            0.155,

            progress,
          );

          const descriptorOut =
            1 -
            smoothStep(
              0.53,

              0.67,

              progress,
            );

          descriptor.style.opacity = String(descriptorIn * descriptorOut);

          descriptor.style.transform = `
            translate3d(
              0,
              ${(1 - descriptorIn) * 16 - cross * 14}px,
              0
            )
          `;
        }

        if (leftCopy) {
          const copyIn = smoothStep(
            0.035,

            0.14,

            progress,
          );

          leftCopy.style.opacity = String(copyIn);

          leftCopy.style.transform = `
            translate3d(
              0,
              ${(1 - copyIn) * 12}px,
              0
            )
          `;
        }

        if (rightLink) {
          const linkIn = smoothStep(
            0.055,

            0.16,

            progress,
          );

          rightLink.style.opacity = String(linkIn);

          rightLink.style.transform = `
            translate3d(
              0,
              ${(1 - linkIn) * 12}px,
              0
            )
          `;

          rightLink.style.pointerEvents = linkIn > 0.8 ? "auto" : "none";
        }
      };

      /* -------------------------------------------------------------------- */
      /*                          RESET DOM                                   */
      /* -------------------------------------------------------------------- */

      const resetDOMStyles = () => {
        if (title) {
          title.style.removeProperty("opacity");

          title.style.removeProperty("transform");
        }

        if (firstTitleLine) {
          firstTitleLine.style.removeProperty("transform");
        }

        if (secondTitleLine) {
          secondTitleLine.style.removeProperty("transform");
        }

        if (descriptor) {
          descriptor.style.removeProperty("opacity");

          descriptor.style.removeProperty("transform");
        }

        if (leftCopy) {
          leftCopy.style.removeProperty("opacity");

          leftCopy.style.removeProperty("transform");
        }

        if (rightLink) {
          rightLink.style.removeProperty("opacity");

          rightLink.style.removeProperty("transform");

          rightLink.style.removeProperty("pointer-events");
        }
      };

      /* -------------------------------------------------------------------- */
      /*                          SCENE UPDATE                                */
      /* -------------------------------------------------------------------- */

      function updateScene(progress: number) {
        if (disposed) {
          return;
        }

        const { halfHeight } = getVisibleWorldBounds();

        const intro = smoothStep(
          INTRO_START,

          INTRO_END,

          progress,
        );

        const roll = smoothStep(
          ROLL_START,

          ROLL_END,

          progress,
        );

        const scrollAngle = THREE.MathUtils.lerp(
          INITIAL_SCROLL_ANGLE,

          FINAL_SCROLL_ANGLE,

          roll,
        );

        const circleStartY = -halfHeight - CARD_HEIGHT * 1.95;

        const circleEndY = halfHeight + CARD_HEIGHT * 2.15;

        const circleCenterY = THREE.MathUtils.lerp(
          circleStartY,

          circleEndY,

          roll,
        );

        cards.forEach((mesh, cardIndex) => {
          updateCardGeometry(
            mesh,

            cardIndex,

            progress,

            scrollAngle,

            circleCenterY,
          );

          const data = getCardData(mesh);

          const centerOffset = cardIndex - (cards.length - 1) / 2;

          const centerAngle =
            FRONT_ANGLE + centerOffset * ANGLE_GAP + scrollAngle;

          const depth = Math.sin(centerAngle);

          const depthOpacity = THREE.MathUtils.lerp(
            0.2,

            1,

            clamp01((depth + 1) / 2),
          );

          const revealDelay = cardIndex * 0.006;

          const ribbonReveal = smoothStep(
            ROLL_START + revealDelay,

            ROLL_START + 0.1 + revealDelay,

            progress,
          );

          const ribbonOpacity = intro * ribbonReveal * depthOpacity;

          let finalOpacity = ribbonOpacity;

          if (progress >= GRID_PHASE_START) {
            if (data.finalSlot < 0) {
              finalOpacity = 0;
            } else {
              const preset = FINAL_ENTRY_PRESETS[data.finalSlot];

              const cardEntryStart = GRID_PHASE_START + preset.delay;

              finalOpacity = smoothStep(
                cardEntryStart,

                cardEntryStart + 0.055,

                progress,
              );
            }
          }

          mesh.material.uniforms.uOpacity.value = finalOpacity;

          mesh.visible = finalOpacity > 0.004;
        });

        const firstAngle =
          FRONT_ANGLE -
          ((cards.length - 1) / 2) * ANGLE_GAP +
          scrollAngle -
          0.76;

        const lastAngle =
          FRONT_ANGLE +
          ((cards.length - 1) / 2) * ANGLE_GAP +
          scrollAngle +
          0.76;

        updateGuideLine(
          topLineGeometry,

          firstAngle,

          lastAngle,

          CARD_HEIGHT * 0.64,

          -0.09,

          circleCenterY,
        );

        updateGuideLine(
          bottomLineGeometry,

          firstAngle,

          lastAngle,

          -CARD_HEIGHT * 0.64,

          0.09,

          circleCenterY,
        );

        const lineExit =
          1 -
          smoothStep(
            ROLL_END,

            GRID_PHASE_START,

            progress,
          );

        const lineOpacity = 0.2 * intro * lineExit;

        topLineMaterial.opacity = lineOpacity;

        bottomLineMaterial.opacity = lineOpacity;

        /*
         * Enable clicks once featured pairs
         * settle into the final grid.
         */

        interactionEnabled = progress > 0.86;

        if (!interactionEnabled && hoveredCard) {
          hoveredCard = null;

          cards.forEach((card) => {
            getCardData(card).targetHoverScale = 1;
          });
        }

        updateDOM(progress);
      }

      /* -------------------------------------------------------------------- */
      /*                           INTERACTION                                */
      /* -------------------------------------------------------------------- */

      const raycaster = new THREE.Raycaster();

      const pointer = new THREE.Vector2(-10, -10);

      const updateHover = () => {
        if (disposed) {
          return;
        }

        if (!interactionEnabled) {
          hoveredCard = null;

          cards.forEach((card) => {
            getCardData(card).targetHoverScale = 1;
          });

          canvas.style.cursor = "default";

          return;
        }

        if (
          pointer.x < -1 ||
          pointer.x > 1 ||
          pointer.y < -1 ||
          pointer.y > 1
        ) {
          hoveredCard = null;
        } else {
          raycaster.setFromCamera(
            pointer,

            camera,
          );

          const intersections = raycaster.intersectObjects(
            cards.filter((card) => {
              const data = getCardData(card);

              return card.visible && data.finalSlot >= 0;
            }),

            false,
          );

          hoveredCard =
            intersections.length > 0
              ? (intersections[0].object as CardMesh)
              : null;
        }

        cards.forEach((card) => {
          const data = getCardData(card);

          data.targetHoverScale = card === hoveredCard ? 1.055 : 1;
        });

        canvas.style.cursor = hoveredCard ? "pointer" : "default";
      };

      /* -------------------------------------------------------------------- */
      /*                             RAF LOOP                                 */
      /* -------------------------------------------------------------------- */

      const render = () => {
        if (disposed) {
          return;
        }

        if (
          typeof webglContext.isContextLost === "function" &&
          webglContext.isContextLost()
        ) {
          return;
        }

        currentProgress += (targetProgress - currentProgress) * 0.105;

        updateScene(currentProgress);

        updateHover();

        renderer.render(scene, camera);
      };

      const tick = () => {
        if (disposed) {
          rafId = 0;

          return;
        }

        render();

        const progressMoving =
          Math.abs(targetProgress - currentProgress) > 0.0001;

        const hoverMoving = cards.some((card) => {
          const data = getCardData(card);

          return Math.abs(data.targetHoverScale - data.hoverScale) > 0.001;
        });

        if (isActive || progressMoving || hoverMoving) {
          rafId = window.requestAnimationFrame(tick);

          return;
        }

        rafId = 0;
      };

      const requestFrame = () => {
        if (rafId || disposed) {
          return;
        }

        rafId = window.requestAnimationFrame(tick);
      };

      /* -------------------------------------------------------------------- */
      /*                           TEXTURE LOAD                               */
      /* -------------------------------------------------------------------- */

      void Promise.all(ITEMS.map(loadTexture)).then((textures) => {
        if (disposed) {
          textures.forEach(disposeTexture);

          return;
        }

        textures.forEach(
          (
            texture,

            index,
          ) => {
            createCard(
              ITEMS[index],

              index,

              texture,
            );
          },
        );

        updateScene(currentProgress);

        if (!webglContext.isContextLost()) {
          renderer.compile(scene, camera);

          renderer.render(scene, camera);
        }

        requestFrame();
      });

      /* -------------------------------------------------------------------- */
      /*                        SCROLL PROGRESS                               */
      /* -------------------------------------------------------------------- */

      const scrollTrigger = ScrollTrigger.create({
        id: "jkv-forex-pairs-motion",

        trigger: section,

        start: "top top",

        end: "bottom bottom",

        invalidateOnRefresh: true,

        onEnter: () => {
          if (disposed) {
            return;
          }

          isActive = true;

          requestFrame();
        },

        onEnterBack: () => {
          if (disposed) {
            return;
          }

          isActive = true;

          requestFrame();
        },

        onLeave: () => {
          isActive = false;
        },

        onLeaveBack: () => {
          isActive = false;
        },

        onUpdate: (self) => {
          if (disposed) {
            return;
          }

          targetProgress = self.progress;

          requestFrame();
        },

        onRefresh: (self) => {
          if (disposed) {
            return;
          }

          targetProgress = self.progress;

          currentProgress = self.progress;

          updateScene(self.progress);

          requestFrame();
        },
      });

      /* -------------------------------------------------------------------- */
      /*                              EVENTS                                  */
      /* -------------------------------------------------------------------- */

      const handlePointerMove = (event: PointerEvent) => {
        if (disposed) {
          return;
        }

        const bounds = canvas.getBoundingClientRect();

        if (bounds.width <= 0 || bounds.height <= 0) {
          return;
        }

        pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;

        pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

        requestFrame();
      };

      const handlePointerLeave = () => {
        if (disposed) {
          return;
        }

        pointer.set(-10, -10);

        hoveredCard = null;

        cards.forEach((card) => {
          getCardData(card).targetHoverScale = 1;
        });

        requestFrame();
      };

      const handleClick = () => {
        if (!hoveredCard || !interactionEnabled || disposed) {
          return;
        }

        const href = getCardData(hoveredCard).href;

        router.push(href);
      };

      const handleResize = () => {
        if (disposed) {
          return;
        }

        if (webglContext.isContextLost()) {
          return;
        }

        const width = canvas.clientWidth;

        const height = canvas.clientHeight;

        if (width <= 0 || height <= 0) {
          return;
        }

        camera.aspect = width / height;

        camera.updateProjectionMatrix();

        renderer.setPixelRatio(
          Math.min(
            window.devicePixelRatio,

            1.75,
          ),
        );

        renderer.setSize(
          width,

          height,

          false,
        );

        updateScene(currentProgress);

        requestFrame();
      };

      canvas.addEventListener(
        "pointermove",

        handlePointerMove,
      );

      canvas.addEventListener(
        "pointerleave",

        handlePointerLeave,
      );

      canvas.addEventListener(
        "click",

        handleClick,
      );

      window.addEventListener(
        "resize",

        handleResize,
      );

      /* -------------------------------------------------------------------- */
      /*                          INITIAL FRAME                               */
      /* -------------------------------------------------------------------- */

      handleResize();

      updateScene(0);

      requestFrame();

      /* -------------------------------------------------------------------- */
      /*                            FONT READY                                */
      /* -------------------------------------------------------------------- */

      document.fonts?.ready.then(() => {
        if (disposed) {
          return;
        }

        ScrollTrigger.refresh();
      });

      /* -------------------------------------------------------------------- */
      /*                              CLEANUP                                 */
      /* -------------------------------------------------------------------- */

      return () => {
        disposed = true;

        isActive = false;

        interactionEnabled = false;

        hoveredCard = null;

        /* RAF */

        if (rafId) {
          window.cancelAnimationFrame(rafId);

          rafId = 0;
        }

        /* ScrollTrigger */

        scrollTrigger.kill();

        /* Events */

        canvas.removeEventListener(
          "pointermove",

          handlePointerMove,
        );

        canvas.removeEventListener(
          "pointerleave",

          handlePointerLeave,
        );

        canvas.removeEventListener(
          "click",

          handleClick,
        );

        canvas.removeEventListener(
          "webglcontextlost",

          handleContextLost,
        );

        canvas.removeEventListener(
          "webglcontextrestored",

          handleContextRestored,
        );

        window.removeEventListener(
          "resize",

          handleResize,
        );

        canvas.style.removeProperty("cursor");

        /* DOM */

        resetDOMStyles();

        /* Cards */

        cards.forEach((card) => {
          scene.remove(card);

          card.geometry.dispose();

          card.material.dispose();
        });

        cards.length = 0;

        /* Textures */

        loadedTextures.forEach(disposeTexture);

        loadedTextures.clear();

        /* Guide resources */

        scene.remove(topGuide, bottomGuide);

        topLineGeometry.dispose();

        bottomLineGeometry.dispose();

        topLineMaterial.dispose();

        bottomLineMaterial.dispose();

        /* Scene */

        scene.clear();

        /* Renderer */

        renderer.renderLists.dispose();

        renderer.dispose();

        /*
         * Do NOT call renderer.forceContextLoss().
         *
         * React owns the canvas.
         */
      };
    },

    {
      dependencies: [prefersReducedMotion, router],

      revertOnUpdate: true,
    },
  );

  /* ------------------------------------------------------------------------ */
  /*                        SECTION SCROLL HEIGHT                             */
  /* ------------------------------------------------------------------------ */

  const sectionStyle = {
    "--systems-scroll-height": `${(SCROLL_DISTANCE_VIEWPORTS + 1) * 100}svh`,
  } as CSSProperties;

  /* ------------------------------------------------------------------------ */
  /*                                  JSX                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <section
      ref={sectionRef}
      id="forex-pairs-in-motion"
      style={sectionStyle}
      className={`
        relative
        isolate
        bg-[#EAFBF6]
        text-[#123B32]
        ${prefersReducedMotion ? "" : "lg:h-[var(--systems-scroll-height)]"}
      `}
    >
      {/* ------------------------------------------------------------------ */}
      {/*                     MOBILE / REDUCED MOTION                         */}
      {/* ------------------------------------------------------------------ */}

      <div
        className={`
          relative
          overflow-hidden
          px-6
          py-24
          sm:px-10
          ${prefersReducedMotion ? "" : "lg:hidden"}
        `}
      >
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#20C997]" />

          <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-[#123B32]/55">
            JKV GLOBAL / Currency Markets
          </p>
        </div>

        <h2
          className="
            mt-6
            text-[clamp(3.7rem,15vw,7rem)]
            font-medium
            uppercase
            leading-[0.83]
            tracking-[-0.07em]
          "
        >
          Forex in
          <br />
          <span className="text-[#20C997]">motion</span>
        </h2>

        <p className="mt-7 max-w-[460px] text-sm leading-6 text-[#123B32]/65">
          Explore a selection of global currency pairs through JKV Global and
          discover the breadth of the forex market through one connected trading
          experience.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <Link key={item.id} href={item.href} className="group block">
              <div
                className="
                    relative
                    aspect-[16/10]
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-[#123B32]/10
                    bg-white/45
                  "
              >
                <Image
                  src={item.image}
                  alt={`${item.title} currency pair`}
                  fill
                  sizes="
                      (max-width: 640px) 100vw,
                      50vw
                    "
                  className="
                      object-contain
                      p-3
                      transition-transform
                      duration-500
                      group-hover:scale-[1.035]
                    "
                />
              </div>

              <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-5
                    border-b
                    border-[#123B32]/15
                    py-4
                  "
              >
                <div>
                  <p
                    className="
                        font-mono
                        text-[0.48rem]
                        uppercase
                        tracking-[0.12em]
                        text-[#123B32]/45
                      "
                  >
                    {item.category}
                  </p>

                  <h3
                    className="
                        mt-2
                        text-lg
                        font-medium
                        tracking-[-0.035em]
                      "
                  >
                    {item.title}
                  </h3>
                </div>

                <span
                  className="
                      mt-1
                      text-[#20C997]
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                >
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/markets"
          className="
            mt-12
            inline-flex
            items-center
            gap-12
            border-b
            border-[#123B32]/40
            pb-3
            font-mono
            text-[0.62rem]
            uppercase
            tracking-[0.12em]
            text-[#123B32]
          "
        >
          Explore Markets
          <ArrowIcon />
        </Link>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*                               DESKTOP                               */}
      {/* ------------------------------------------------------------------ */}

      {!prefersReducedMotion && (
        <div
          className="
            sticky
            top-0
            hidden
            h-[100svh]
            overflow-hidden
            lg:block
          "
        >
          {/* -------------------------------------------------------------- */}
          {/*                         AMBIENT GLOWS                           */}
          {/* -------------------------------------------------------------- */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[-15vw]
              top-[-25vh]
              h-[65vw]
              w-[65vw]
              rounded-full
              bg-[#20C997]/10
              blur-[130px]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-[-30vh]
              right-[-10vw]
              h-[60vw]
              w-[60vw]
              rounded-full
              bg-[#064F49]/10
              blur-[150px]
            "
          />

          {/* -------------------------------------------------------------- */}
          {/*                         TOP META                                */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              absolute
              left-[2vw]
              top-[4vh]
              z-30
              flex
              items-center
              gap-3
            "
          >
            <span className="h-2 w-2 rounded-full bg-[#20C997]" />

            <p
              className="
                font-mono
                text-[0.55rem]
                uppercase
                tracking-[0.16em]
                text-[#123B32]/50
              "
            >
              JKV GLOBAL / Forex Markets
            </p>
          </div>

          <div
            className="
              absolute
              right-[2vw]
              top-[4vh]
              z-30
              font-mono
              text-[0.52rem]
              uppercase
              tracking-[0.15em]
              text-[#123B32]/40
            "
          >
            Global Currency Access
          </div>

          {/* -------------------------------------------------------------- */}
          {/*                         LARGE HEADING                           */}
          {/* -------------------------------------------------------------- */}

          <div
            data-motion-title
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-[27%]
              z-10
              uppercase
              opacity-0
              will-change-transform
            "
          >
            <h2
              aria-label="Forex in motion"
              className="
                font-medium
                leading-[0.79]
                tracking-[-0.075em]
                text-[#123B32]
              "
            >
              <span
                data-motion-line-one
                className="
                  ml-[22vw]
                  block
                  w-max
                  text-[clamp(5.2rem,8.6vw,10.2rem)]
                  will-change-transform
                "
              >
                Forex in
              </span>

              <span
                data-motion-line-two
                className="
                  ml-[50vw]
                  mt-[5.8vh]
                  block
                  w-max
                  text-[clamp(5.2rem,8.6vw,10.2rem)]
                  text-[#20C997]
                  will-change-transform
                "
              >
                Motion
              </span>
            </h2>
          </div>

          {/* -------------------------------------------------------------- */}
          {/*                     CENTER DESCRIPTION                         */}
          {/* -------------------------------------------------------------- */}

          <p
            data-motion-description
            className="
              pointer-events-none
              absolute
              left-[51.5%]
              top-[47%]
              z-10
              max-w-[250px]
              -translate-x-1/2
              text-center
              font-mono
              text-[0.64rem]
              uppercase
              leading-[1.28]
              text-[#123B32]/55
              opacity-0
              will-change-transform
            "
          >
            Global currency pairs moving through one connected JKV Global
            trading environment.
          </p>

          {/* -------------------------------------------------------------- */}
          {/*                        BOTTOM COPY                              */}
          {/* -------------------------------------------------------------- */}

          <p
            data-motion-left-copy
            className="
              absolute
              bottom-[5vh]
              left-[2vw]
              z-30
              max-w-[310px]
              text-[0.9rem]
              leading-[1.4]
              text-[#123B32]/60
              opacity-0
              will-change-transform
            "
          >
            Explore selected major, cross and global currency pairs across the
            forex market with JKV Global.
          </p>

          {/* -------------------------------------------------------------- */}
          {/*                              CTA                               */}
          {/* -------------------------------------------------------------- */}

          <Link
            data-motion-right-link
            href="/markets"
            className="
              group
              absolute
              bottom-[5vh]
              right-[2vw]
              z-30
              flex
              items-center
              gap-14
              border-b
              border-[#123B32]/45
              pb-3
              font-mono
              text-[0.62rem]
              uppercase
              tracking-[0.12em]
              text-[#123B32]/70
              opacity-0
              transition-colors
              hover:border-[#20C997]
              hover:text-[#20C997]
            "
          >
            Explore Forex
            <span
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              <ArrowIcon />
            </span>
          </Link>

          {/* -------------------------------------------------------------- */}
          {/*                         THREE CANVAS                            */}
          {/* -------------------------------------------------------------- */}

          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="
              absolute
              inset-0
              z-20
              h-full
              w-full
              touch-none
            "
          />

          {/* -------------------------------------------------------------- */}
          {/*                       EDITORIAL PATHS                           */}
          {/* -------------------------------------------------------------- */}

          <svg
            aria-hidden="true"
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
            className="
              pointer-events-none
              absolute
              inset-0
              z-[5]
              h-full
              w-full
            "
          >
            <path
              d="M310 108 C505 185 655 175 800 140"
              fill="none"
              stroke="rgba(6,79,73,0.12)"
              strokeWidth="1"
            />

            <path
              d="M380 350 C580 290 760 298 900 260"
              fill="none"
              stroke="rgba(6,79,73,0.12)"
              strokeWidth="1"
            />

            <path
              d="M1370 370 C1270 250 1145 205 990 180"
              fill="none"
              stroke="rgba(32,201,151,0.12)"
              strokeWidth="1"
            />

            <circle cx="310" cy="108" r="4" fill="#20C997" opacity="0.45" />

            <circle cx="1370" cy="370" r="4" fill="#20C997" opacity="0.35" />
          </svg>

          {/* -------------------------------------------------------------- */}
          {/*                     BOTTOM MARKET META                          */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-[4.7vh]
              left-1/2
              z-[8]
              flex
              -translate-x-1/2
              items-center
              gap-3
              font-mono
              text-[0.48rem]
              uppercase
              tracking-[0.17em]
              text-[#123B32]/35
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#20C997]
              "
            />
            EUR/USD · GBP/USD · AUD/USD · GBP/JPY
          </div>
        </div>
      )}
    </section>
  );
}

/*
 * Keep this export so your existing homepage import:
 *
 * import { SystemsInMotion } from "...";
 *
 * does not need to change.
 */
export const SystemsInMotion = ForexPairsInMotion;
