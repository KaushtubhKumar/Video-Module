import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Videos — AI Tools Directory",
  description: "Watch AI tools in action before you commit to one.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
