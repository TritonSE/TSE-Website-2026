"use client";

import { useState, type ReactNode } from "react";
import styles from "./FAQ.module.css";

export type FAQItem = {
  question: string;
  answer: ReactNode;
};

export type FAQSection = {
  title: string;
  items: FAQItem[];
};

export type FAQProps = {
  heading?: string;
  sections: FAQSection[];
};

/** Build a stable id for an item so open state survives re-renders. */
function itemId(sectionIndex: number, itemIndex: number) {
  return `${sectionIndex}-${itemIndex}`;
}

export default function FAQ({
  heading = "Frequently Asked Questions",
  sections,
}: FAQProps) {
  // Multiple items can be open at once, so track a set of open ids.
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const sectionIds = (sectionIndex: number, count: number) =>
    Array.from({ length: count }, (_, i) => itemId(sectionIndex, i));

  const isSectionExpanded = (sectionIndex: number, count: number) =>
    count > 0 && sectionIds(sectionIndex, count).every((id) => openIds.has(id));

  const toggleSection = (sectionIndex: number, count: number) => {
    const ids = sectionIds(sectionIndex, count);
    const expanded = isSectionExpanded(sectionIndex, count);
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (expanded) {
        ids.forEach((id) => next.delete(id));
      } else {
        ids.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  return (
    <section className={styles.faq} aria-label={heading}>
      <h2 className={styles.heading}>{heading}</h2>

      {sections.map((section, sectionIndex) => {
        const expanded = isSectionExpanded(sectionIndex, section.items.length);
        return (
          <div className={styles.section} key={section.title}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <button
                type="button"
                className={styles.expandAll}
                onClick={() =>
                  toggleSection(sectionIndex, section.items.length)
                }
              >
                {expanded ? "Collapse All" : "Expand All"}
              </button>
            </div>

            <ul className={styles.list}>
              {section.items.map((item, itemIndex) => {
                const id = itemId(sectionIndex, itemIndex);
                const isOpen = openIds.has(id);
                const panelId = `faq-panel-${id}`;
                const buttonId = `faq-button-${id}`;
                return (
                  <li
                    className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                    key={item.question}
                  >
                    <button
                      type="button"
                      id={buttonId}
                      className={styles.question}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(id)}
                    >
                      <span className={styles.questionText}>
                        {item.question}
                      </span>
                      <span
                        className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
                        aria-hidden="true"
                      >
                        <span className={styles.iconBar} />
                        <span className={styles.iconBar} />
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
                      inert={!isOpen}
                    >
                      <div className={styles.panelInner}>{item.answer}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
