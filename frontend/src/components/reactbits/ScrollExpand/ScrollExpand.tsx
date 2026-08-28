"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";

import styles from "./ScrollExpand.module.css";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const smoothstep = (edgeStart: number, edgeEnd: number, value: number) => {
  const progress = clamp(
    (value - edgeStart) / (edgeEnd - edgeStart || 0.000001),
    0,
    1,
  );

  return progress * progress * (3 - 2 * progress);
};

type ScrollExpandConfig = {
  startWidth: number;
  effectiveStartWidth: number;
  minStartWidth: number;
  startHeight: number;
  startRadius: number;
  endRadius: number;
  mediaZoom: number;
  scrollDistance: number;
  holdDistance: number;
  smoothing: number;
  overlayScrim: number;
  useWindowScroll: boolean;
  enabled: boolean;
  imageSizes: string;
  expandedImageSizes: string;
};

type ScrollExpandProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  src: string;
  mediaType?: "image" | "video";
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  minStartWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  preload?: boolean;
  imageSizes?: string;
  expandedImageSizes?: string;
  children?: ReactNode;
  persistentOverlay?: ReactNode;
  style?: CSSProperties;
};

export default function ScrollExpand({
  src,
  mediaType = "image",
  poster = "",
  alt = "",
  title = "",
  scrollHint = "",
  startWidth = 42,
  minStartWidth = 0,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  preload = false,
  imageSizes,
  expandedImageSizes = "100vw",
  children,
  persistentOverlay,
  className = "",
  style,
  ...rest
}: ScrollExpandProps) {
  const restingWidth = clamp(startWidth, 0, 100);
  const restingHeight = clamp(startHeight, 0, 100);
  const restingHorizontalInset = minStartWidth
    ? `max(0px, calc((100% - max(${restingWidth}%, ${Math.max(0, minStartWidth)}px)) / 2))`
    : `${(100 - restingWidth) / 2}%`;
  const restingInset = `${(100 - restingHeight) / 2}% ${restingHorizontalInset}`;
  const restingImageSizes = imageSizes ?? `${restingWidth}vw`;
  const trackLength =
    100 * (1 + Math.max(0, scrollDistance) + Math.max(0, holdDistance));

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const configRef = useRef<ScrollExpandConfig>({
    startWidth,
    effectiveStartWidth: startWidth,
    minStartWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
    imageSizes: restingImageSizes,
    expandedImageSizes,
  });

  const applyProgress = useCallback((progress: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;

    if (!frame || !media) return;

    const config = configRef.current;
    const easedProgress = smoothstep(0, 1, progress);
    const width =
      config.effectiveStartWidth +
      (100 - config.effectiveStartWidth) * easedProgress;
    const height =
      config.startHeight + (100 - config.startHeight) * easedProgress;
    const horizontalInset = Math.max(0, (100 - width) / 2);
    const verticalInset = Math.max(0, (100 - height) / 2);
    const radius =
      config.startRadius +
      (config.endRadius - config.startRadius) * easedProgress;

    frame.style.inset = `${verticalInset}% ${horizontalInset}%`;
    frame.style.borderRadius = `${radius}px`;
    media.style.transform = `scale(${config.mediaZoom + (1 - config.mediaZoom) * easedProgress})`;

    if (media instanceof HTMLImageElement) {
      const nextSizes =
        progress > 0.05 ? config.expandedImageSizes : config.imageSizes;

      if (media.sizes !== nextSizes) media.sizes = nextSizes;
    }

    if (scrimRef.current) {
      scrimRef.current.style.opacity = `${config.overlayScrim * easedProgress}`;
    }

    if (titleRef.current) {
      const titleExit = smoothstep(0.4, 0.88, progress);
      titleRef.current.style.opacity = `${1 - titleExit}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * titleExit}px, 0) scale(${1 + 0.06 * titleExit})`;
    }

    if (hintRef.current) {
      const hintExit = smoothstep(0, 0.12, progress);
      hintRef.current.style.opacity = `${1 - hintExit}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * hintExit}px, 0)`;
    }

    if (overlayRef.current) {
      const overlayEntrance = smoothstep(0.68, 1, progress);
      overlayRef.current.style.opacity = `${overlayEntrance}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - overlayEntrance)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    Object.assign(configRef.current, {
      startWidth,
      minStartWidth,
      startHeight,
      startRadius,
      endRadius,
      mediaZoom,
      scrollDistance,
      holdDistance,
      smoothing,
      overlayScrim,
      useWindowScroll,
      enabled,
      imageSizes: restingImageSizes,
      expandedImageSizes,
    });
  }, [
    enabled,
    endRadius,
    expandedImageSizes,
    holdDistance,
    mediaZoom,
    minStartWidth,
    overlayScrim,
    scrollDistance,
    smoothing,
    startHeight,
    startRadius,
    startWidth,
    restingImageSizes,
    useWindowScroll,
  ]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;

    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrame = 0;
    let current = 0;
    let target = 0;
    let stageHeight = 0;
    let running = false;

    const measure = () => {
      const config = configRef.current;
      const stageRect = stage.getBoundingClientRect();
      stageHeight = stageRect.height;

      if (stageHeight <= 0) return;

      const scrollLength =
        stageHeight *
        (1 +
          Math.max(0, config.scrollDistance) +
          Math.max(0, config.holdDistance));
      track.style.height = `${scrollLength}px`;

      const stageWidth = stageRect.width || stageHeight;
      const minimumWidthPercent = config.minStartWidth
        ? (config.minStartWidth / stageWidth) * 100
        : 0;
      config.effectiveStartWidth = clamp(
        Math.max(config.startWidth, minimumWidthPercent),
        0,
        100,
      );
      stage.style.setProperty(
        "--scroll-expand-title-size",
        `${clamp(stageWidth * 0.075, 20, 84)}px`,
      );
    };

    const readProgress = () => {
      const config = configRef.current;

      if (reduceMotion || !config.enabled) return 1;

      const scrollSpan = stageHeight * Math.max(0.01, config.scrollDistance);

      if (config.useWindowScroll) {
        return clamp(-track.getBoundingClientRect().top / scrollSpan, 0, 1);
      }

      return clamp(root.scrollTop / scrollSpan, 0, 1);
    };

    const tick = () => {
      const config = configRef.current;
      const followRate =
        config.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * config.smoothing));
      current += (target - current) * followRate;

      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }

      applyProgress(current);
      animationFrame = running ? window.requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      animationFrame = window.requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();

      if (configRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }

      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller: Window | HTMLDivElement = useWindowScroll ? window : root;
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(stage);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  const media =
    mediaType === "video" ? (
      <video
        ref={mediaRef as RefObject<HTMLVideoElement | null>}
        className={styles.media}
        style={{ transform: `scale(${mediaZoom})` }}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <Image
        ref={mediaRef as RefObject<HTMLImageElement | null>}
        className={styles.media}
        src={src}
        alt={alt}
        fill
        sizes={restingImageSizes}
        preload={preload}
        style={{ transform: `scale(${mediaZoom})` }}
        draggable={false}
      />
    );

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${useWindowScroll ? "" : styles.scroller} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div
        ref={trackRef}
        className={styles.track}
        style={{
          height: `${trackLength}${useWindowScroll ? "svh" : "%"}`,
        }}
      >
        <div ref={stageRef} className={styles.stage}>
          <div
            ref={frameRef}
            className={styles.frame}
            style={{
              inset: restingInset,
              borderRadius: `${startRadius}px`,
            }}
          >
            {media}
            <div ref={scrimRef} className={styles.scrim} />
            {children ? (
              <div ref={overlayRef} className={styles.overlay}>
                {children}
              </div>
            ) : null}
          </div>

          {persistentOverlay ? (
            <div className={styles.persistentOverlay}>{persistentOverlay}</div>
          ) : null}

          {title ? (
            <div ref={titleRef} className={styles.title}>
              {title}
            </div>
          ) : null}

          {scrollHint ? (
            <div ref={hintRef} className={styles.hint}>
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
