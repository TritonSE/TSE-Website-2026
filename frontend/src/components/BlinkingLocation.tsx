import styles from "./BlinkingLocation.module.css";

type BlinkingLocationProps = {
  text?: string;
  className?: string;
};

export default function BlinkingLocation({
  text = "San Diego, CA",
  className,
}: BlinkingLocationProps) {
  const classes = [styles.location, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.locationText}>{text}</span>
    </div>
  );
}
