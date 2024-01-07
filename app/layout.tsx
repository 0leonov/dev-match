import "@/app/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/app/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Match",
  description: "Social platform for uniting IT specialists",
  icons: {
    icon: [
      {
        url: "/favicon-dark.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-light.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
