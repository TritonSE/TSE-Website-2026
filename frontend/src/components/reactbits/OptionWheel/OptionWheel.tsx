import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
  type CSSProperties,
} from "react";
import "./OptionWheel.css";

type Side = "left" | "right";

export interface OptionWheelHandle {
  /** Smoothly eases the wheel to the given item index, same as clicking it. */
  goTo: (index: number) => void;
}

export interface OptionWheelProps {
  items?: string[];
  defaultSelected?: number;
  onChange?: (index: number, item: string) => void;
  textColor?: string;
  activeColor?: string;
  side?: Side;
  fontSize?: number;
  spacing?: number;
  curve?: number;
  tilt?: number;
  blur?: number;
  fade?: number;
  minOpacity?: number;
  smoothing?: number;
  inset?: number;
  offsetX?: number;
  notches?: boolean;
  notchCount?: number;
  notchBuffer?: number;
  notchWidth?: number;
  notchActiveWidth?: number;
  minorNotches?: number;
  minorNotchLength?: number;
  minorNotchThickness?: number;
  loop?: boolean;
  draggable?: boolean;
  soundUrl?: string;
  soundVolume?: number;
  className?: string;
}

interface WheelConfig {
  count: number;
  items: string[];
  rowH: number;
  curve: number;
  tilt: number;
  blur: number;
  fade: number;
  minOpacity: number;
  side: Side;
  offsetX: number;
  notchCount: number;
  notchBuffer: number;
  notchWidth: number;
  notchActiveWidth: number;
  minorNotches: number;
  loop: boolean;
  smoothing: number;
  draggable: boolean;
  soundUrl: string;
  soundVolume: number;
}

const DEFAULT_ITEMS = [
  "Ambient",
  "House",
  "Techno",
  "Jazz",
  "Lo-Fi",
  "Synthwave",
  "Trance",
  "Funk",
  "Disco",
  "Hip-Hop",
  "Chillwave",
  "Drum & Bass",
];

const OptionWheel = forwardRef<OptionWheelHandle, OptionWheelProps>(
  (
    {
      items = DEFAULT_ITEMS,
      defaultSelected = 3,
      onChange,
      textColor = "#a6a6a6",
      activeColor = "#ffffff",
      side = "left",
      fontSize = 3,
      spacing = 1.4,
      curve = 1,
      tilt = 6,
      blur = 2,
      fade = 0.25,
      minOpacity = 0.05,
      smoothing = 200,
      inset = 80,
      offsetX = 0,
      notches = false,
      notchCount = 7,
      notchBuffer = 3,
      notchWidth = 10,
      notchActiveWidth = 24,
      minorNotches = 4,
      minorNotchLength = 4,
      minorNotchThickness = 1,
      loop = false,
      draggable = true,
      soundUrl = "",
      soundVolume = 0.5,
      className = "",
    }: OptionWheelProps,
    ref,
  ) => {
    const poolCount = Math.max(notchCount, 1) + Math.max(notchBuffer, 0) * 2;
    const rootRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const notchRefs = useRef<(HTMLDivElement | null)[]>([]);
    const minorNotchRefs = useRef<(HTMLDivElement | null)[]>([]);
    const majorSlotsRef = useRef<number[]>([]);
    const posRef = useRef(defaultSelected);
    const targetRef = useRef(defaultSelected);
    const rafRef = useRef<number | null>(null);
    const lastRef = useRef(0);
    const cfgRef = useRef<WheelConfig>({} as WheelConfig);
    const onChangeRef = useRef(onChange);
    const selectedRef = useRef(defaultSelected);
    const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dragRef = useRef<{ y: number; start: number; id: number } | null>(
      null,
    );
    const dragMovedRef = useRef(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioUrlRef = useRef("");
    const lastTickRef = useRef(0);
    const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
    const [isDragging, setIsDragging] = useState(false);

    const remPx =
      typeof window !== "undefined"
        ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
        : 16;

    onChangeRef.current = onChange;
    cfgRef.current = {
      count: items.length,
      items,
      rowH: Math.max(fontSize * spacing * remPx, 1),
      curve,
      tilt,
      blur,
      fade,
      minOpacity,
      side,
      offsetX,
      notchCount,
      notchBuffer,
      notchWidth,
      notchActiveWidth,
      minorNotches,
      loop,
      smoothing,
      draggable,
      soundUrl,
      soundVolume,
    };
    const runFrame = useCallback((now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      const cfg = cfgRef.current;
      const tau = Math.max(cfg.smoothing, 1) / 1000;
      const k = 1 - Math.exp(-dt / tau);

      const target = targetRef.current;
      const cur = posRef.current;
      let next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.001;
      if (settled) next = target;
      posRef.current = next;

      const els = itemRefs.current;
      const n = cfg.count;
      const mirror = cfg.side === "right" ? -1 : 1;
      const tiltRad = (cfg.tilt * Math.PI) / 180;
      const R = tiltRad > 0.0005 ? cfg.rowH / tiltRad : 0;
      const notchR = R - 30;

      for (let i = 0; i < n; i++) {
        const el = els[i];
        if (!el) continue;
        let d = i - next;
        if (cfg.loop && n > 1) {
          d = ((d % n) + n) % n;
          if (d > n / 2) d -= n;
        }
        const dist = Math.abs(d);
        let x = 0;
        let y = d * cfg.rowH;
        let rot = 0;
        if (R > 0) {
          const ang = Math.max(
            -Math.PI / 2,
            Math.min(Math.PI / 2, d * tiltRad),
          );
          y = R * Math.sin(ang);
          x = -mirror * R * (1 - Math.cos(ang)) * cfg.curve;
          rot = (mirror * ang * 180) / Math.PI;
        }
        const p = Math.max(0, 1 - Math.min(dist, 1));
        el.style.transform = `translate(${(x + cfg.offsetX).toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`;
        el.style.opacity = String(
          Math.max(cfg.minOpacity, 1 - dist * cfg.fade),
        );
        el.style.filter =
          cfg.blur > 0 ? `blur(${(dist * cfg.blur).toFixed(2)}px)` : "none";
        el.style.setProperty("--ow-p", p.toFixed(4));
      }

      const visibleCount = Math.max(cfg.notchCount, 1);
      const half = Math.floor(visibleCount / 2);
      const visibleHigh = half + 0.5;
      const buffer = Math.max(cfg.notchBuffer, 0);
      const poolCount = visibleCount + buffer * 2;
      const poolHalf = Math.floor(poolCount / 2);
      let slots = majorSlotsRef.current;
      if (slots.length !== poolCount) {
        const base = Math.round(next);
        slots = Array.from(
          { length: poolCount },
          (_, k) => base - poolHalf + k,
        );
        majorSlotsRef.current = slots;
      }

      const notchAt = (m: number) => {
        const d = m - next;
        let x = 0;
        let y = d * cfg.rowH;
        let rot = 0;
        if (notchR > 0) {
          const ang = Math.max(
            -Math.PI / 2,
            Math.min(Math.PI / 2, d * tiltRad),
          );
          y = notchR * Math.sin(ang);
          x = -mirror * notchR * (1 - Math.cos(ang)) * cfg.curve;
          rot = (mirror * ang * 180) / Math.PI;
        }
        return { d, x, y, rot };
      };

      // Recycle every slot first so the whole array is self-consistent before
      // any minor notch interpolates between two of them - recycling lazily
      // inside a single combined pass let one endpoint of a gap jump by
      // poolCount a beat before its neighbor, blowing up that gap's minors.
      const recycleHigh = poolHalf + 0.5;
      for (let k = 0; k < poolCount; k++) {
        while (slots[k] - next > recycleHigh) slots[k] -= poolCount;
        while (next - slots[k] > recycleHigh) slots[k] += poolCount;
      }

      // A recycled slot keeps its array index but its *value* can now land
      // anywhere on the number line relative to the other slots - array index
      // no longer means spatial order. Minors are only well-defined between
      // spatially adjacent slots, so walk the slots in sorted-by-value order
      // (order[i], order[i+1]) rather than assuming slots[k]/slots[k + 1] are
      // neighbors; that assumption is what made one gap's minors go missing.
      const order = Array.from({ length: poolCount }, (_, idx) => idx).sort(
        (a, b) => slots[a] - slots[b],
      );

      for (let i = 0; i < poolCount; i++) {
        const idx = order[i];
        const notchEl = notchRefs.current[idx];
        if (notchEl) {
          const { x, y, rot, d } = notchAt(slots[idx]);
          const visible = Math.abs(d) <= visibleHigh;
          notchEl.style.opacity = visible ? "" : "0";
          if (visible) {
            const p = Math.max(0, 1 - Math.min(Math.abs(d), 1));
            notchEl.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`;
            notchEl.style.width = `${(cfg.notchWidth + p * (cfg.notchActiveWidth - cfg.notchWidth)).toFixed(2)}px`;
            notchEl.style.setProperty("--ow-p", p.toFixed(4));
          }
        }

        if (i === poolCount - 1) continue;
        const idxNext = order[i + 1];
        const minorSteps = Math.max(cfg.minorNotches, 0);
        for (let s = 1; s <= minorSteps; s++) {
          const minorEl = minorNotchRefs.current[i * minorSteps + (s - 1)];
          if (!minorEl) continue;
          const m =
            slots[idx] + ((slots[idxNext] - slots[idx]) * s) / (minorSteps + 1);
          const { x, y, rot, d } = notchAt(m);
          const visible = Math.abs(d) <= visibleHigh;
          minorEl.style.opacity = visible ? "" : "0";
          if (visible) {
            minorEl.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`;
          }
        }
      }

      rafRef.current = settled ? null : requestAnimationFrame(runFrame);
    }, []);

    const startLoop = useCallback(() => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
      lastRef.current = performance.now();
      rafRef.current = requestAnimationFrame(runFrame);
    }, [runFrame]);

    // Optional tick on selection change, throttled so fast scrolling can't spam
    // it, and with playback failures (e.g. autoplay policies) silently ignored.
    const playTick = useCallback(() => {
      const { soundUrl, soundVolume } = cfgRef.current;
      if (!soundUrl) return;
      const now = performance.now();
      if (now - lastTickRef.current < 70) return;
      lastTickRef.current = now;
      if (!audioRef.current || audioUrlRef.current !== soundUrl) {
        audioRef.current = new Audio(soundUrl);
        audioRef.current.preload = "auto";
        audioUrlRef.current = soundUrl;
      }
      const audio = audioRef.current;
      audio.volume = Math.min(Math.max(soundVolume, 0), 1);
      audio.currentTime = 0;
      audio.play()?.catch(() => {});
    }, []);

    const applyTarget = useCallback(
      (value: number, snap: boolean) => {
        const cfg = cfgRef.current;
        let v = value;
        if (!cfg.loop) v = Math.min(Math.max(v, 0), Math.max(cfg.count - 1, 0));
        if (snap) v = Math.round(v);
        targetRef.current = v;
        const idx = ((Math.round(v) % cfg.count) + cfg.count) % cfg.count;
        if (idx !== selectedRef.current) {
          selectedRef.current = idx;
          setSelectedIndex(idx);
          onChangeRef.current?.(idx, cfg.items[idx]);
          playTick();
        }
        startLoop();
      },
      [startLoop, playTick],
    );

    // Wheel / touchpad scrolling, registered manually so it can be non-passive.
    useEffect(() => {
      const el = rootRef.current;
      if (!el) return;
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const cfg = cfgRef.current;
        const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;
        // Cap each event at one step so notchy mouse wheels move exactly one
        // option per click, while touchpads still scroll continuously.
        const step = Math.max(-1, Math.min(1, delta / cfg.rowH));
        applyTarget(targetRef.current + step, false);
        if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
        wheelTimerRef.current = setTimeout(
          () => applyTarget(targetRef.current, true),
          140,
        );
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => {
        el.removeEventListener("wheel", onWheel);
        if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      };
    }, [applyTarget]);

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!cfgRef.current.draggable) return;
        dragRef.current = {
          y: e.clientY,
          start: targetRef.current,
          id: e.pointerId,
        };
        dragMovedRef.current = false;
        setIsDragging(true);
      },
      [],
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        if (!drag) return;
        const dy = e.clientY - drag.y;
        if (!dragMovedRef.current && Math.abs(dy) > 4) {
          dragMovedRef.current = true;
          // Capture only once a real drag starts, so plain clicks still reach
          // the items and navigate to them.
          rootRef.current?.setPointerCapture(drag.id);
        }
        if (dragMovedRef.current)
          applyTarget(drag.start - dy / cfgRef.current.rowH, false);
      },
      [applyTarget],
    );

    const handlePointerEnd = useCallback(() => {
      if (!dragRef.current) return;
      dragRef.current = null;
      setIsDragging(false);
      if (dragMovedRef.current) applyTarget(targetRef.current, true);
    }, [applyTarget]);

    // Shared by clicking an item and the imperative goTo() handle: steps to
    // whichever raw target lands on `index` by the shortest signed distance.
    const goToIndex = useCallback(
      (index: number) => {
        const cfg = cfgRef.current;
        const cur = targetRef.current;
        let d = index - (((cur % cfg.count) + cfg.count) % cfg.count);
        if (cfg.loop && cfg.count > 1) {
          if (d > cfg.count / 2) d -= cfg.count;
          else if (d < -cfg.count / 2) d += cfg.count;
        }
        applyTarget(cur + d, true);
      },
      [applyTarget],
    );

    const handleItemClick = useCallback(
      (index: number) => {
        if (dragMovedRef.current) return;
        goToIndex(index);
      },
      [goToIndex],
    );

    useImperativeHandle(ref, () => ({ goTo: goToIndex }), [goToIndex]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        let delta: number | null = null;
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") delta = -1;
        else if (e.key === "ArrowDown" || e.key === "ArrowRight") delta = 1;
        if (delta == null) return;
        e.preventDefault();
        applyTarget(Math.round(targetRef.current) + delta, true);
      },
      [applyTarget],
    );

    useEffect(() => {
      applyTarget(targetRef.current, false);
    }, [
      items,
      fontSize,
      spacing,
      curve,
      tilt,
      blur,
      fade,
      minOpacity,
      side,
      loop,
      smoothing,
      applyTarget,
    ]);

    useEffect(
      () => () => {
        if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        audioRef.current?.pause();
      },
      [],
    );

    return (
      <div
        ref={rootRef}
        role="listbox"
        tabIndex={0}
        aria-label="Option wheel"
        className={`option-wheel${side === "right" ? " option-wheel--right" : ""}${isDragging ? " option-wheel--dragging" : ""}${className ? ` ${className}` : ""}`}
        style={
          {
            "--ow-text-color": textColor,
            "--ow-active-color": activeColor,
            "--ow-font-size": `${fontSize}rem`,
            "--ow-inset": `${inset}px`,
          } as CSSProperties
        }
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={handleKeyDown}
      >
        {notches &&
          Array.from({ length: poolCount }, (_, index) => (
            <div
              key={`notch-${index}`}
              aria-hidden="true"
              ref={(el) => {
                notchRefs.current[index] = el;
              }}
              className="option-wheel__notch"
            />
          ))}
        {notches &&
          Array.from(
            { length: Math.max(poolCount - 1, 0) * Math.max(minorNotches, 0) },
            (_, index) => (
              <div
                key={`minor-notch-${index}`}
                aria-hidden="true"
                ref={(el) => {
                  minorNotchRefs.current[index] = el;
                }}
                className="option-wheel__notch option-wheel__notch--minor"
                style={{
                  width: `${minorNotchLength}px`,
                  height: `${minorNotchThickness}px`,
                }}
              />
            ),
          )}
        {items.map((label, index) => (
          <div
            key={`${label}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            role="option"
            aria-selected={selectedIndex === index}
            className={`option-wheel__item${selectedIndex === index ? " option-wheel__item--selected" : ""}`}
            onClick={() => handleItemClick(index)}
          >
            {label}
          </div>
        ))}
      </div>
    );
  },
);

OptionWheel.displayName = "OptionWheel";

export default OptionWheel;
