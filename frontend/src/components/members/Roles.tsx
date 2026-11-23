import Image from "next/image";
import { type ComponentProps, type JSX } from "react";

import styles from "./Roles.module.css";

type RoleCardData = {
  img: string;
  header: string;
  body: string;
  faqJump: string;
};

type RoleCardProps = RoleCardData & {
  applicationOpen: boolean;
};

const ROLE_DATA: RoleCardData[] = [
  {
    img: "/images/members/designers_group.jpg",
    header: "Designer",
    body: "Our designers build innovative solutions for our partners, applying product design thinking alongside engineers. If you're a creative who wants to put those skills to work on real products, apply to the TSE Design team today.",
    faqJump: "faq-designer",
  },
  {
    img: "/images/members/developers_group.jpg",
    header: "Developer",
    body: "We're looking for builders interested in developing products for social good, growing their coding skills, and working collaboratively with product designers and stakeholders. If that sounds like you, apply to the TSE Developer team today.",
    faqJump: "faq-developer",
  },
  {
    img: "/images/members/test_F3.jpg",
    header: "TEST Designer",
    body: "For students with no technical design experience, the TEST Design program is a place to explore product and UI/UX design from the ground up. If you're motivated, creative, and curious about the field, apply today.",
    faqJump: "faq-test",
  },
  {
    img: "/images/members/test_pvp.jpg",
    header: "TEST Developer",
    body: "Curious about software engineering but don't know where to start? The TEST Developer program gives students with no technical experience a way to learn with hands-on projects. If you're motivated and eager to learn, apply today.",
    faqJump: "faq-test",
  },
];

// TODO move to dedicated URL storage, replace with real urls
const INSTAGRAM_URL = "https://www.instagram.com/tse.atucsd";
const INFO_SESSION_SLIDES_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSvX0rD3jLyddDAtgWhG3svGRBDd_ld-6EwG9LpiOerGF7tSa6oszDdmy6&s=10";
const APPLY_URL =
  "https://i.pinimg.com/originals/88/14/9b/88149b0400750578f4d07d9bc3fb0fee.gif";
const CONTACT_URL = "mailto:triton.software.engineering@gmail.com";

// !!!! TODO !!!!
// Placeholder buttons. Replace with the universal good button component later
function GoodButtonPrimary({
  children,
  ...props
}: ComponentProps<"button">): JSX.Element {
  return (
    <button
      type="button"
      className={styles.placeholderButtonPrimary}
      {...props}
    >
      {children}
      <div>{">"}</div>
    </button>
  );
}
function GoodButtonSecondary({
  children,
  ...props
}: ComponentProps<"button">): JSX.Element {
  return (
    <button
      type="button"
      className={styles.placeholderButtonSecondary}
      {...props}
    >
      {children}
    </button>
  );
}

function RoleCard({
  img,
  header,
  body,
  faqJump,
  applicationOpen,
}: RoleCardProps): JSX.Element {
  return (
    <div className={styles.cardSection}>
      <Image
        src={img}
        alt={header}
        width={600}
        height={424}
        className={styles.cardImage}
      />
      <div className={styles.cardText}>
        <div className={styles.header}>{header}</div>
        <div className={styles.headerBody}>{body}</div>
      </div>
      <div className={styles.buttonSection}>
        <a href={`#${faqJump}`}>
          <GoodButtonSecondary>View faqs</GoodButtonSecondary>
        </a>
        <a
          href={applicationOpen ? APPLY_URL : CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GoodButtonPrimary>
            {applicationOpen ? "Apply" : "Contact Us"}
          </GoodButtonPrimary>
        </a>
      </div>
    </div>
  );
}

export default function Roles() {
  return (
    <div className={styles.roleSection}>
      <div className={styles.headerSection}>
        <div className={styles.header}>Explore Our Open Roles</div>
        <div className={styles.headerBody}>
          We host information sessions and many more recruitment events every
          Fall Quarter for prospective members. Check out our{" "}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>{" "}
          to see the schedule of events, or access our past info session slides{" "}
          <a
            href={INFO_SESSION_SLIDES_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </div>
      </div>
      <div className={styles.roleBody}>
        {ROLE_DATA.map((role) => (
          <RoleCard key={role.header} {...role} applicationOpen={false} />
        ))}
      </div>
    </div>
  );
}
