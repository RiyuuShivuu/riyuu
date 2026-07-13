import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const andreaNeat = localFont({
  src: [
    {
      path: "../fonts/AndreaNeat-Demo.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/AndreaNeatSlant-Demo.otf",
      weight: "400",
      style: "italic",
    }
  ],
  variable: "--font-andrea-neat",
});

export const metadata: Metadata = {
  title: "Copywriting Portfolio | Creative Journal",
  description: "A premium, interactive copywriting portfolio crafted as an aesthetic notebook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${andreaNeat.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col selection:bg-rose/30 selection:text-foreground">
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
