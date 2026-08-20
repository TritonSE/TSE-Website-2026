"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { usePixelRevealPhysics, type Particle } from "@/hooks/usePixelRevealPhysics";

// ~15,000s (4hr) cycle so each particle is bright for ~15s per pass. Paired
// with twinkleWidth = 0.001 below, that also puts ~1/1000 particles bright
// at any given instant (see the comment where twinkleFreq is assigned).
const TWINKLE_BASE_FREQ = (2 * Math.PI) / 1_000_000;

interface PixelWaveHeroProps {
  src: string;
  className?: string;
  cellSize?: number; // sampling grid step, in source-image px
  particleSize?: number; // base rendered dot size, in css px
  baseOpacity?: number; // resting per-pixel opacity between twinkles, 0-1
  minAlpha?: number; // ignore fully-transparent source pixels below this alpha (0-255)
  progress?: number; // externally controlled reveal progress, 0-100
  revealDuration?: number; // ms to auto-drive progress 0->100 when `progress` is not supplied
  fadeInMs?: number; // duration of the per-particle fade-in ease once revealed
  twinkleWidth?: number; // 0-1, fraction of each cycle the gaussian pulse occupies; lower = rarer, sharper spikes
  twinkleScaleBoost?: number; // e.g. 1.6 = twinkling particles render up to 60% larger, and opacity grows by the same ratio
}

export default function PixelWaveHero({
  src,
  className,
  cellSize = 1,
  particleSize = 3,
  baseOpacity = 0.4,
  minAlpha = 10,
  progress,
  revealDuration = 10000,
  fadeInMs = 220,
  twinkleWidth = 0.002,
  twinkleScaleBoost = 1.6,
}: PixelWaveHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  // Build the particle matrix: sample the image into a fixed grid of
  // particles, baking in a random reveal threshold and twinkle timing for
  // each so the materialize/twinkle hook can animate them independently.
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

          particles.push({
            ox: px,
            oy: py,
            x: px,
            y: py,
            r,
            g,
            b,
            a: a / 255,
            // Randomized independently of position so the reveal resolves in
            // scattered clusters everywhere at once, not a directional wipe.
            revealAt: Math.random() * 100,
            // twinkleWidth is the fraction of each particle's cycle spent
            // bright, which (with random phases) is also the fraction of
            // all particles bright at any instant. So a ~15s bright window
            // out of a ~15,000s (4hr) period gives both "bright for 15s"
            // and "~1/1000 bright at once" from the same 0.001 width.
            twinkleFreq: TWINKLE_BASE_FREQ * (0.85 + Math.random() * 0.3),
            twinklePhase: Math.random() * Math.PI * 2,
            revealedAt: null,
          });
        }
      }

      particlesRef.current = particles;
    },
    [cellSize, minAlpha],
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

  usePixelRevealPhysics({
    canvasRef,
    particlesRef,
    particleSize,
    baseOpacity,
    progress,
    revealDuration,
    fadeInMs,
    twinkleWidth,
    twinkleScaleBoost,
  });

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 1 }}
      />
      {status === "error" && (
        <p style={{ color: "#e66", fontFamily: "monospace", padding: "1rem" }}>
          {`couldn't load image at "${src}"`}
        </p>
      )}
    </div>
  );
}
