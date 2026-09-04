import ScrollExpand from "@/components/reactbits/ScrollExpand/ScrollExpand";

import styles from "./WorkWithUs.module.css";

export default function WorkWithUs() {
  return (
    <section aria-labelledby="work-with-us-title" className={styles.section}>
      <ScrollExpand
        src="/images/members/work-with-us.jpg"
        alt="Triton Software Engineering members gathered in Joshua Tree"
        startWidth={31.3492}
        minStartWidth={320}
        startHeight={100}
        startRadius={0}
        endRadius={0}
        mediaZoom={1}
        stageHeight={50}
        stickyTop={25}
        scrollDistance={2}
        holdDistance={0}
        smoothing={0.1}
        overlayScrim={0}
        useWindowScroll
        preload
        persistentOverlay={
          <div className={styles.copyLayout}>
            <div className={`${styles.copyBlock} ${styles.introCopy}`}>
              <h1 id="work-with-us-title">Work With Us</h1>
              <p>
                Are you passionate about software and social impact? Are you
                looking to join a unique and close-knit community? Join Us now
                to work alongside nonprofit organizations and make an impact!
              </p>
            </div>

            <div className={`${styles.copyBlock} ${styles.missionCopy}`}>
              <p>
                Our mission provides a distinct experience to develop technical
                skills and interact with nonprofit clients all while applying
                your skills to impact real lives.
              </p>
            </div>
          </div>
        }
      />
    </section>
  );
}
