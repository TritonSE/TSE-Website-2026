"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type ScrollColorTextProps = {
  children: ReactNode;
  className: string;
  activeClassName: string;
};

export default function ScrollColorText({
  children,
  className,
  activeClassName,
}: ScrollColorTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [hasPassedViewportCenter, setHasPassedViewportCenter] = useState(false);

  useEffect(() => {
    let frameId: number | undefined;

    const updateColor = () => {
      frameId = undefined;

      const text = textRef.current;
      if (!text) return;

      const { top, height } = text.getBoundingClientRect();
      setHasPassedViewportCenter(top + height / 2 <= window.innerHeight / 2);
    };

    const requestUpdate = () => {
      if (frameId === undefined) {
        frameId = window.requestAnimationFrame(updateColor);
      }
    };

    updateColor();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <p
      ref={textRef}
      className={`${className} ${
        hasPassedViewportCenter ? activeClassName : ""
      }`}
    >
      {children}
    </p>
  );
}
