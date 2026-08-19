import { useEffect } from "react";
import type { RefObject } from "react";

export interface Particle {
  ox: number; // origin x (home position sampled from image)
  oy: number; // origin y
  x: number; // current x
  y: number; // current y
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
  a: number;
  phase: number; // static "topography" phase baked in from noise field
  ampMult: number; // per-pixel height/amplitude multiplier from topography
}

interface UsePixelWavePhysicsOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  particlesRef: RefObject<Particle[]>;
  particleSize?: number; // rendered dot size, in css px
  springStrength?: number; // how eagerly particles chase their (moving) home position
  damping?: number; // velocity damping (higher = less "bouncy")
  waveAmplitude?: number; // max vertical swell/recede distance, in px
  waveSpeed?: number; // how fast the surface swells/recedes over time
}

/**
 * Runs the swell/recede animation loop: each particle's home position
 * drifts up/down over time, driven by the topography (phase + amplitude)
 * baked into it at matrix-build time, and a spring pulls the particle
 * toward that moving home position.
 */
export function usePixelWavePhysics({
  canvasRef,
  particlesRef,
  particleSize = 3,
  springStrength = 0.08,
  damping = 0.86,
  waveAmplitude = 5,
  waveSpeed = 0.0006,
}: UsePixelWavePhysicsOptions) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;

    const tick = (time: number) => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const swell = Math.sin(time * waveSpeed + p.phase) * waveAmplitude * p.ampMult;
        const targetX = p.ox;
        const targetY = p.oy + swell;

        p.vx += (targetX - p.x) * springStrength;
        p.vy += (targetY - p.y) * springStrength;

        p.vx *= damping;
        p.vy *= damping;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`;
        ctx.fillRect(p.x, p.y, particleSize, particleSize);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [canvasRef, particlesRef, springStrength, damping, particleSize, waveAmplitude, waveSpeed]);
}
