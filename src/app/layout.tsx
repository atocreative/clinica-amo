import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { SITE } from '@/lib/constants'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description:
    'Harmonização facial natural em Brasília, DF. Procedimentos estéticos com planejamento personalizado por Dra. Andrezza Martins, Biomédica.',
  keywords: [
    'harmonização facial',
    'harmonização orofacial',
    'estética avançada Brasília',
    'botox Brasília',
    'preenchimento labial',
    'bioestimuladores',
    'Águas Claras estética',
    'Dra Andrezza Martins',
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: 'Harmonização facial natural em Brasília, DF.',
    type: 'website',
    locale: 'pt_BR',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: SITE.name,
  description: 'Harmonização Facial Natural em Brasília, DF',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Pau Brasil, Lê Quartier',
    addressLocality: 'Águas Claras',
    addressRegion: 'DF',
    postalCode: '71926-000',
    addressCountry: 'BR',
  },
  hasMap: SITE.mapsUrl,
  employee: {
    '@type': 'Person',
    name: SITE.professional,
    jobTitle: SITE.title,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
