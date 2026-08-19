import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export interface Particle {
  ox: number; // origin x (fixed grid position, sampled from image)
  oy: number; // origin y
  x: number; // render x (always equal to ox — kept for draw-call symmetry)
  y: number; // render y (always equal to oy)
  r: number;
  g: number;
  b: number;
  a: number;
  revealAt: number; // 0-100, random threshold at which this particle appears
  twinkleFreq: number; // random per-particle pulse frequency
  twinklePhase: number; // random per-particle pulse phase offset
  revealedAt: number | null; // timestamp this particle crossed its threshold; null until revealed
}

interface UsePixelRevealPhysicsOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  particlesRef: RefObject<Particle[]>;
  particleSize?: number; // base rendered dot size, in css px
  progress?: number; // externally controlled reveal progress, 0-100
  revealDuration?: number; // ms to auto-drive progress 0->100 when `progress` is not supplied
  fadeInMs?: number; // duration of the per-particle fade-in ease once revealed
  twinkleSharpness?: number; // higher = sparser, brighter, shorter twinkle spikes
  twinkleScaleBoost?: number; // e.g. 1.6 = twinkling particles render up to 60% larger
  twinkleAlphaBoost?: number; // additive alpha boost at peak twinkle
}

/**
 * Runs the "materialize" reveal + twinkle animation loop. Particles sit at a
 * fixed grid position for their whole lifetime — nothing springs or drifts.
 * Each particle fades in once a global progress value crosses its randomly
 * baked-in threshold (scattering the reveal across the whole image instead
 * of wiping across it), then twinkles independently like a starfield.
 */
export function usePixelRevealPhysics({
  canvasRef,
  particlesRef,
  particleSize = 3,
  progress,
  revealDuration = 2500,
  fadeInMs = 400,
  twinkleSharpness = 8,
  twinkleScaleBoost = 1.6,
  twinkleAlphaBoost = 0.4,
}: UsePixelRevealPhysicsOptions) {
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;

    const tick = (time: number) => {
      if (startTimeRef.current === null) startTimeRef.current = time;

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const rawT = Math.min(1, (time - startTimeRef.current) / revealDuration);
      const easedT = 1 - Math.pow(1 - rawT, 3); // ease-out cubic: fast start, slow finish
      const currentProgress = progress ?? easedT * 100;

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.revealedAt === null) {
          if (currentProgress < p.revealAt) continue; // not yet revealed, skip entirely
          p.revealedAt = time;
        }

        const fadeT = fadeInMs > 0 ? Math.min(1, (time - p.revealedAt) / fadeInMs) : 1;
        // ease-out
        const fadeAlpha = 1 - (1 - fadeT) * (1 - fadeT);

        const twinkle = Math.pow(
          Math.max(0, Math.sin(time * p.twinkleFreq + p.twinklePhase)),
          twinkleSharpness,
        );

        const alpha = Math.min(1, p.a * fadeAlpha + twinkle * twinkleAlphaBoost);
        const size = particleSize * (1 + twinkle * (twinkleScaleBoost - 1));

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha})`;
        ctx.fillRect(p.x - (size - particleSize) / 2, p.y - (size - particleSize) / 2, size, size);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [
    canvasRef,
    particlesRef,
    particleSize,
    progress,
    revealDuration,
    fadeInMs,
    twinkleSharpness,
    twinkleScaleBoost,
    twinkleAlphaBoost,
  ]);
}
