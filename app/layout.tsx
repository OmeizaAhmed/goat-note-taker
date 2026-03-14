import type { Metadata } from "next";
import "./styles/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


;

export const metadata: Metadata = {
  title: "Goat Notes",
  description: "Ai-powered note-taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>
        {children}
      </body>
    </html>
  );
}
