"use client";

import { createNoise2D } from "simplex-noise";
import { useCallback, useEffect, useRef, useState } from "react";

import { usePixelWavePhysics, type Particle } from "@/hooks/usePixelWavePhysics";

interface PixelWaveHeroProps {
  src: string;
  className?: string;
  cellSize?: number; // sampling grid step, in source-image px
  particleSize?: number; // rendered dot size, in css px
  minAlpha?: number; // ignore fully-transparent source pixels below this alpha (0-255)
  springStrength?: number; // how eagerly particles chase their (moving) home position
  damping?: number; // velocity damping (higher = less "bouncy")
  waveAmplitude?: number; // max vertical swell/recede distance, in px
  waveScale?: number; // spatial frequency of the randomized topography
  waveSpeed?: number; // how fast the surface swells/recedes over time
}

export default function PixelWaveHero({
  src,
  className,
  cellSize = 1,
  particleSize = 3,
  minAlpha = 10,
  springStrength = 0.08,
  damping = 0.86,
  waveAmplitude = 5,
  waveScale = 0.01,
  waveSpeed = 0.0006,
}: PixelWaveHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  // Build the particle matrix: sample the image, and bake a randomized
  // "topography" height field (via simplex noise) into each particle so
  // the surface swells/recedes coherently instead of flickering randomly.
  const buildMatrix = useCallback(
    (img: HTMLImageElement, canvas: HTMLCanvasElement, container: HTMLDivElement) => {
      const displayWidth = container.clientWidth;
      const displayHeight = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = img.naturalWidth;
      off.height = img.naturalHeight;
      const offCtx = off.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;
      offCtx.drawImage(img, 0, 0);

      const { data } = offCtx.getImageData(0, 0, off.width, off.height);
      // Independent x/y scaling to fill the container, matching a stretched
      // "background-size: 100% 100%" look rather than preserving aspect ratio.
      const scaleX = displayWidth / off.width;
      const scaleY = displayHeight / off.height;

      const noise2D = createNoise2D();
      const particles: Particle[] = [];

      for (let y = 0; y < off.height; y += cellSize) {
        for (let x = 0; x < off.width; x += cellSize) {
          const idx = (y * off.width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          if (a < minAlpha) continue;

          const px = x * scaleX;
          const py = y * scaleY;

          // Randomized topography: a smooth 2D height field sampled once
          // per pixel. Its value becomes a phase offset and an amplitude
          // multiplier, so neighboring particles swell/recede together
          // like a real water surface instead of independently.
          const height = noise2D(x * waveScale, y * waveScale);
          const phase = height * Math.PI * 2;
          const ampMult = 0.5 + (height + 1) * 0.5; // ~[0.5, 1.5]

          particles.push({
            ox: px,
            oy: py,
            x: px,
            y: py,
            vx: 0,
            vy: 0,
            r,
            g,
            b,
            a: a / 255,
            phase,
            ampMult,
          });
        }
      }

      particlesRef.current = particles;
    },
    [cellSize, minAlpha, waveScale],
  );

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      buildMatrix(img, canvas, container);
      setStatus("ready");
    };
    img.onerror = () => setStatus("error");
    img.src = src;

    const container = containerRef.current;
    if (!container) return;
    const resizeObserver = new ResizeObserver(() => {
      const canvas = canvasRef.current;
      if (!canvas || img.naturalWidth === 0) return;
      buildMatrix(img, canvas, container);
    });
    resizeObserver.observe(container);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
    };
  }, [src, buildMatrix]);

  usePixelWavePhysics({
    canvasRef,
    particlesRef,
    particleSize,
    springStrength,
    damping,
    waveAmplitude,
    waveSpeed,
  });

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }}
      />
      {status === "error" && (
        <p style={{ color: "#e66", fontFamily: "monospace", padding: "1rem" }}>
          {`couldn't load image at "${src}"`}
        </p>
      )}
    </div>
  );
}
