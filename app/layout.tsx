import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import fonts from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable, "antialiased"
      )}
    >
      <body className="font-body">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: { default: "Zachary Deak", template: "%s | Zachary Deak" },
  description: "Portfolio of Zachary Deak.",
  openGraph: {
    title: "My Portfolio",
    description: "This is my portfolio.",
    url: "https://deako.dev",
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
  },
  icons: { shortcut: "/favicon.ico" },
};
