import type { Metadata } from "next";
import { Sometype_Mono } from "next/font/google";
import "./globals.css";

const sometypeMono = Sometype_Mono({
  variable: "--font-sometype-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Triton Software Engineering",
  description: "Triton Software Engineering at UC San Diego",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={sometypeMono.variable}>
      <body>{children}</body>
    </html>
  );
}
