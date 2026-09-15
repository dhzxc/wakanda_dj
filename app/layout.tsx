import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WAKANDA // Afro-Tech transmissions",
  description: "The digital home of an Afro-tech ritualist.",
  icons: { icon: "/images/wakanda-mark.png", apple: "/images/wakanda-mark.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
