import type { Metadata } from "next";
import { Sometype_Mono, Stack_Sans_Notch } from "next/font/google";
import "./globals.css";

const sometypeMono = Sometype_Mono({
  variable: "--font-sometype-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const stackSansNotch = Stack_Sans_Notch({
  variable: "--font-stack-sans-notch",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Triton Software Engineering",
  description: "Triton Software Engineering at UC San Diego",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sometypeMono.variable} ${stackSansNotch.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
