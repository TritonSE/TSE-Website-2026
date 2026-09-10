import styles from "./Timeline.module.css";
import { isBeforeDeadline } from "@/lib/date";

const timeline = [
  {
    week: "Week 0",
    date: "Thursday 09/24/26",
    description: "Applications to join open.",
  },
  {
    week: "Week 2",
    date: "Sunday 10/11/26",
    description:
      "Applications close at midnight and the review process begins.",
  },
  {
    week: "Week 3",
    date: "Friday 10/16/26",
    description: "Phone screen invitation emails sent out by midnight.",
  },
  {
    week: "Week 5",
    date: "Monday 10/26/26",
    description: "Technical interview invitation emails sent out by midnight.",
    star: true,
  },
  {
    week: "Week 6",
    date: "Friday 11/06/26",
    description: "Acceptance or rejection emails sent out by midnight.",
  },
];

export default function Timeline() {
  return (
    <section className={styles.timeline}>
      <div className={styles.timelineLeft}>
        <div className={styles.timelineLeftInner}>
          <h2>Our Timeline</h2>

          <p>
            Please note that these dates are subject to
            <br />
            change depending on application volume. Check
            <br />
            back often for the most up-to-date information!
          </p>

          <p>
            <span className={styles.yellowStar}>*</span> TEST Designer and TEST
            Developer applications
            <br />
            do not require a technical interview round.
          </p>
        </div>
      </div>

      <div className={styles.timelineRight}>
        <div className={styles.applications}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>
            {isBeforeDeadline()
              ? "APPLICATIONS NOW OPEN FOR 2026-27"
              : "APPLICATIONS CLOSED FOR 2026-27"}
          </span>
        </div>

        <div className={styles.timelineItems}>
          {timeline.map((item, index) => (
            <div className={styles.timelineItem} key={index}>
              <div className={styles.timelineDate}>
                <span>{item.week}</span>
                <span>{item.date}</span>
              </div>

              <div className={styles.timelineDescription}>
                {item.description}
                {item.star && <span className={styles.yellowStar}> *</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
