import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "WAKANDA // Afro-Tech transmissions",
  description: "The digital home of an Afro-tech ritualist.",
  icons: { icon: "/images/wakanda-mark.png", apple: "/images/wakanda-mark.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><body><ThemeProvider>{children}</ThemeProvider></body></html>;
}
