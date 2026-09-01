import Button from "@/components/Button";

import styles from "./AboutUs.module.css";
import PhotoRow from "./PhotoRow";

// TODO(design): swap these placeholder paths for real photos.
const rowAPhotos = [
  "/images/about-us/row-a-1.jpg",
  "/images/about-us/row-a-2.jpg",
  "/images/about-us/row-a-3.jpg",
  "/images/about-us/row-a-4.jpg",
  "/images/about-us/row-a-5.jpg",
  "/images/about-us/row-a-6.jpg",
  "/images/about-us/row-a-7.jpg",
];

const rowBPhotos = [
  "/images/about-us/row-b-1.jpg",
  "/images/about-us/row-b-2.jpg",
  "/images/about-us/row-b-3.jpg",
  "/images/about-us/row-b-4.jpg",
  "/images/about-us/row-b-5.jpg",
  "/images/about-us/row-b-6.jpg",
  "/images/about-us/row-b-7.jpg",
];

export default function AboutUs() {
  return (
    <section className={styles.section}>
      <div className={styles.text}>
        <h2 className={styles.heading}>So what&rsquo;s the story?</h2>
        <p className={styles.body}>
          In the Spring of 2017, a group of undergraduate students here at UC
          San Diego saw a problem: many nonprofit organizations had little to no
          resources for professional web and technical development services. To
          solve it, they banded together to create Triton Software Engineering.
        </p>
        <Button href="/about" variant="dark">
          tell me more
        </Button>
      </div>

      <div className={styles.carousels}>
        <PhotoRow photos={rowAPhotos} direction="left" />
        <PhotoRow photos={rowBPhotos} direction="right" />
      </div>
    </section>
  );
}
