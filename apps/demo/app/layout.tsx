import type { Metadata } from "next"
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { ModalProvider } from "@/components/ui/modal/context"
import { cn } from "@/lib/utils"
import "./globals.css"

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
})

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Modals — shadcn registry demo",
  description:
    "Documentation and live demos for the copy-paste responsive modal stack.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans antialiased", display.variable, mono.variable)}
    >
      <body>
        <ThemeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
