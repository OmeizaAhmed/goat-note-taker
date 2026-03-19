import type { Metadata } from "next";
import "./styles/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotesProvider from "@/provider/notes-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="en" suppressHydrationWarning>
        <head />
        <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NotesProvider>
          <SidebarProvider>
            <AppSidebar />
          <div className="flex min-h-screen w-full flex-col">
            {/* <div className="flex items-center shadow-lg shadow-accent">
            <SidebarTrigger/>
            <Header />
            </div> */}
            <Header />
            <main className="flex flex-1 flex-col px-4 pt-10 md:px-8">
              
              {children}
             
            </main>
          </div>
          </SidebarProvider>
          <Toaster />
          </NotesProvider>
        </ThemeProvider>
        </body>
      </html>
  );
}
