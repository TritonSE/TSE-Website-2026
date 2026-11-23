"use client";

import { useId, useState, type ReactNode } from "react";

import styles from "./Drawer.module.css";

type HeadingLevel = "h2" | "h3" | "h4";

type DrawerProps = {
  title: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  headingLevel?: HeadingLevel;
  className?: string;
};

function PlusIcon() {
  return (
    <svg
      className={styles.icon}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 9H17M9 1V17" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/**
 * Bordered expand/collapse panel with a + toggle that rotates into an x.
 *
 * Text and border use `currentColor`, so set `color` on a parent to theme it.
 * Override `--drawer-title-size`, `--drawer-title-weight`, `--drawer-body-size`,
 * `--drawer-padding` and `--drawer-border-color` via `className` for other
 * variants. Style the open state from outside with `[data-open="true"]`.
 */
export default function Drawer({
  title,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  headingLevel: Heading = "h3",
  className,
}: DrawerProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const panelId = useId();

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div
      className={[styles.drawer, isOpen ? styles.open : "", className]
        .filter(Boolean)
        .join(" ")}
      data-open={isOpen}
    >
      <Heading className={styles.heading}>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggle}
        >
          <span>{title}</span>
          <PlusIcon />
        </button>
      </Heading>
      <div id={panelId} className={styles.panel} inert={!isOpen}>
        <div className={styles.panelInner}>{children}</div>
      </div>
    </div>
  );
}

/** Vertical stack of drawers. Override `--drawer-group-gap` for spacing. */
export function DrawerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={[styles.group, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
