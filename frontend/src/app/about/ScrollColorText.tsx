"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type ScrollColorTextProps = {
  children: ReactNode;
  title: string;
  className: string;
  activeClassName: string;
};

export default function ScrollColorText({
  children,
  title,
  className,
  activeClassName,
}: ScrollColorTextProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hasPassedViewportCenter, setHasPassedViewportCenter] = useState(false);

  useEffect(() => {
    let frameId: number | undefined;

    const updateColor = () => {
      frameId = undefined;

      const title = titleRef.current;
      if (!title) return;

      const { top, height } = title.getBoundingClientRect();
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
    <>
      <h2 ref={titleRef}>{title}</h2>
      <p
        className={`${className} ${
          hasPassedViewportCenter ? activeClassName : ""
        }`}
      >
        {children}
      </p>
    </>
  );
}
