import { useEffect, useRef } from "react";
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

interface Ripple {
  x: number;
  y: number;
  start: number; // timestamp (ms) the ripple was spawned
  strength: number; // 0-1+ multiplier, boosted for fast strokes
}

interface PointerSample {
  x: number;
  y: number;
  time: number;
}

interface UsePixelWavePhysicsOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  particlesRef: RefObject<Particle[]>;
  particleSize?: number; // rendered dot size, in css px
  springStrength?: number; // how eagerly particles chase their (moving) home position
  damping?: number; // velocity damping (higher = less "bouncy")
  waveAmplitude?: number; // max vertical swell/recede distance, in px
  waveSpeed?: number; // how fast the surface swells/recedes over time
  rippleAmplitude?: number; // base max outward push of a ripple ring, in px
  rippleSpeed?: number; // how fast a ripple ring expands, in px/ms
  rippleWidth?: number; // thickness of the ripple ring, in px
  rippleLifetime?: number; // how long a ripple stays active, in ms
  rippleSpawnSpacing?: number; // min DISTANCE (px) between ripple origins along a stroke
  maxRipples?: number; // cap on concurrently active ripples
  maxStepsPerEvent?: number; // safety cap on ripples spawned from one pointermove jump
  minStrengthMult?: number; // ripple strength floor for a very slow drift
  maxStrengthMult?: number; // ripple strength ceiling for a fast swipe
}

/**
 * Runs the swell/recede animation loop, same as before, plus pointer-driven
 * ripples that push particles outward from wherever the pointer has been.
 *
 * Fix for fast-pointer breakage: ripples used to spawn only at the pointer's
 * *current* position, throttled by time. A fast swipe covers a lot of ground
 * inside that time window, so origins ended up sparse and the wake looked
 * like disconnected rings instead of a continuous trail. Now we walk the
 * line segment between the last and current pointer sample and spawn ripple
 * origins spaced by DISTANCE (rippleSpawnSpacing) instead of time, so a fast
 * stroke gets just as many ripple origins per unit length as a slow one.
 * Speed is also soft-clamped and used to modestly boost ripple amplitude,
 * since fast strokes still end up with fewer, more spread-out samples than
 * a slow deliberate move even with path-stepping.
 */
export function usePixelWavePhysics({
  canvasRef,
  particlesRef,
  particleSize = 3,
  springStrength = 0.08,
  damping = 0.86,
  waveAmplitude = 5,
  waveSpeed = 0.0006,
  rippleAmplitude = 1.3,
  rippleSpeed = 0.35,
  rippleWidth = 40,
  rippleLifetime = 1400,
  rippleSpawnSpacing = 10,
  minStrengthMult = 0.15,
  maxRipples = 24,
  maxStepsPerEvent = 24,
  maxStrengthMult = 1.6,
}: UsePixelWavePhysicsOptions) {
  const lastSampleRef = useRef<PointerSample | null>(null);
  // Distance already travelled toward the next spawn boundary, in px. Kept
  // across events so spawn *rate* only depends on real distance covered —
  // not on how many pointermove/coalesced events fire along the way, which
  // is what caused slow, deliberate moves to pile up ripples in one spot.
  const leftoverDistRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ripples: Ripple[] = [];

    const pushRipple = (
      x: number,
      y: number,
      time: number,
      strength: number,
    ) => {
      if (ripples.length >= maxRipples) ripples.shift();
      ripples.push({ x, y, start: time, strength });
    };

    // Spawn ripple origins along the segment from the last known pointer
    // position to the current one, spaced by real distance travelled
    // (rippleSpawnSpacing) so a slow drift and a fast swipe both produce
    // the same ripple density per pixel — only their strength differs.
    const spawnAlongPath = (curr: PointerSample) => {
      const last = lastSampleRef.current;
      lastSampleRef.current = curr;

      if (!last) {
        pushRipple(curr.x, curr.y, curr.time, minStrengthMult);
        return;
      }

      const dx = curr.x - last.x;
      const dy = curr.y - last.y;
      const dist = Math.hypot(dx, dy);
      const dt = Math.max(1, curr.time - last.time); // avoid div-by-zero

      if (dist < 1) return; // pointer basically stationary, nothing to add

      // Ripple magnitude tracks pointer speed: a slow drift barely
      // disturbs the surface, a fast swipe hits it hard.
      const speed = dist / dt; // px/ms
      const speedNorm = Math.min(1, speed / 3); // 3 px/ms ~= a brisk swipe
      const strength =
        minStrengthMult + speedNorm * (maxStrengthMult - minStrengthMult);

      let travelled = -leftoverDistRef.current;
      let stepsSpawned = 0;

      while (stepsSpawned < maxStepsPerEvent) {
        travelled += rippleSpawnSpacing;
        if (travelled > dist) break;
        const t = travelled / dist;
        pushRipple(last.x + dx * t, last.y + dy * t, curr.time, strength);
        stepsSpawned++;
      }

      leftoverDistRef.current = dist - (travelled - rippleSpawnSpacing);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const time = performance.now();

      // Use coalesced events when available so a fast swipe's actual path
      // (sampled by the OS/browser between rAFs) feeds the ripple trail,
      // not just the single most recent point for this frame.
      const events =
        typeof e.getCoalescedEvents === "function"
          ? e.getCoalescedEvents()
          : [e];

      for (const evt of events.length ? events : [e]) {
        spawnAlongPath({
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top,
          time,
        });
      }
    };

    const handlePointerLeave = () => {
      lastSampleRef.current = null;
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    let rafId: number;

    const tick = (time: number) => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Drop expired ripples.
      while (ripples.length > 0 && time - ripples[0].start > rippleLifetime) {
        ripples.shift();
      }

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const swell =
          Math.sin(time * waveSpeed + p.phase) * waveAmplitude * p.ampMult;
        let targetX = p.ox;
        let targetY = p.oy + swell;

        for (let j = 0; j < ripples.length; j++) {
          const ripple = ripples[j];
          const age = time - ripple.start;
          const dx = p.ox - ripple.x;
          const dy = p.oy - ripple.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 0.001) continue;

          const ringRadius = age * rippleSpeed;
          const decay = 1 - age / rippleLifetime;
          const ring = Math.exp(
            -((dist - ringRadius) ** 2) / (2 * rippleWidth * rippleWidth),
          );
          const push = rippleAmplitude * decay * ring * ripple.strength;

          targetX += (dx / dist) * push;
          targetY += (dy / dist) * push;
        }

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
    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      lastSampleRef.current = null;
    };
  }, [
    canvasRef,
    particlesRef,
    springStrength,
    damping,
    particleSize,
    waveAmplitude,
    waveSpeed,
    rippleAmplitude,
    rippleSpeed,
    rippleWidth,
    rippleLifetime,
    rippleSpawnSpacing,
    maxRipples,
    maxStepsPerEvent,
    minStrengthMult,
    maxStrengthMult,
  ]);
}
