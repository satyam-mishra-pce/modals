import type { Metadata } from "next"
import { Bricolage_Grotesque, Geist_Mono, Instrument_Serif } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { ModalProvider } from "@/components/ui/modal/context"
import { cn } from "@/lib/utils"
import "./globals.css"

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
})

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
})

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Modals — a responsive modal stack for shadcn",
  description:
    "Copy-paste responsive modal stack components. One body renders as a Radix dialog on desktop and a Vaul drawer on mobile, with stacked flows and a tiny provider API.",
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
      className={cn(
        "dark font-sans antialiased",
        display.variable,
        serif.variable,
        mono.variable,
      )}
    >
      <body>
        <ThemeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
