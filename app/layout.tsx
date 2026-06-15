import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Blogging Platform | Premium Futuristic Blog',
  description: 'Premium futuristic blogging platform with authentication, CMS, SEO, and deployment',
  openGraph: {
    title: 'Blogging Platform',
    description: 'Premium futuristic blogging platform',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blogging Platform',
    description: 'Premium futuristic blogging platform',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050505" />
      </head>
      <body className="bg-background text-text-primary antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
