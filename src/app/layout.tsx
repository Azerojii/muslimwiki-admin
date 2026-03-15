import type { Metadata } from 'next'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'
import EmojiProvider from '@/components/EmojiProvider'

export const metadata: Metadata = {
  title: 'Administration — MuslimWiki',
  description: 'Interface d\'administration de MuslimWiki',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/twemoji@14.0.2/dist/twemoji.min.css"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/twemoji@14.0.2/dist/twemoji.min.js"
          crossOrigin="anonymous"
          async
        ></script>
      </head>
      <body>
        <AuthProvider>
          <EmojiProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
