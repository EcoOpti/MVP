import "./globals.css";
import { ReactNode } from "react";
import { Nav } from "@/components/ui/Nav";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "EcomGuard — The Complete Ecommerce Revenue Protection Engine",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-white/10">
            <div className="mx-auto max-w-7xl px-4 py-3">
              <Nav />
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

