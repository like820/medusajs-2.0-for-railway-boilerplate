import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { sourceSans3, sourceSerif4, sourceCodePro } from "@lib/fonts"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "waterlike.shop",
  description: "waterlike™ shop for regeneration",
}

import { MenuProvider } from "@lib/context/menu-context"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className="h-full">
      <body className={`relative h-full font-sans antialiased ${sourceSans3.variable} ${sourceSerif4.variable} ${sourceCodePro.variable}`}>
        <MenuProvider>
          <main className="relative h-full">{props.children}</main>
        </MenuProvider>
      </body>
    </html>
  )
}
