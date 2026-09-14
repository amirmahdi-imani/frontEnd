import type { Metadata } from "next"
import "./globals.css"

import Navbar from "@/components/Navbar"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "HealthCost AI",
  description: "AI-powered medical cost prediction",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}