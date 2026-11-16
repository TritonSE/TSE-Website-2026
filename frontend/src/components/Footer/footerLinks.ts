export type FooterLink = { label: string; href: string; alt: string };

export const internalLinks = {
  home: { label: "HOME", href: "/", alt: "Go to the home page" },
  about: {
    label: "ABOUT",
    href: "/about",
    alt: "Learn about Triton Software Engineering",
  },
  projects: { label: "PROJECTS", href: "/projects", alt: "See our projects" },
  members: { label: "MEMBERS", href: "/members", alt: "Meet our members" },
  nonprofits: {
    label: "NONPROFITS",
    href: "/nonprofits",
    alt: "Information for nonprofits",
  },
  sponsors: {
    label: "SPONSORS",
    href: "/sponsors",
    alt: "Information for sponsors",
  },
} satisfies Record<string, FooterLink>;

export const contactLinks = {
  email: {
    label: "EMAIL",
    //TODO idk what the email is
    href: "mailto:triton.software.engineering@gmail.com",
    alt: "Contact Triton Software Engineering",
  },
  instagram: {
    label: "INSTA",
    href: "https://www.instagram.com/tse.atucsd/",
    alt: "Follow Triton Software Engineering on Instagram",
  },
  linkedin: {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/company/tritonsoftwareengineering/home/",
    alt: "Connect with Triton Software Engineering on LinkedIn",
  },
  github: {
    label: "GITHUB",
    href: "https://github.com/TritonSE",
    alt: "View Triton Software Engineering on GitHub",
  },
} satisfies Record<string, FooterLink>;

/** Key of the page the footer is shown on, used to highlight its link. */
export type FooterPage = keyof typeof internalLinks;
