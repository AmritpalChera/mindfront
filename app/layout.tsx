import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'Mindplug',
  description: 'A virtual brain for semantic search on text, pdfs, webpages and audio.',
  keywords: ['ai brain', 'embedding generator', 'embedding manager', 'no-code embeddings', 'semantic search', 'ai mind', 'mindplug'],
  twitter: {
    images: 'https://image.lexica.art/full_jpg/1860ab74-3eab-48c5-9a39-88e0fd7a0de0'
  },
  openGraph: {
    images: 'https://image.lexica.art/full_jpg/1860ab74-3eab-48c5-9a39-88e0fd7a0de0'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className="h-full">
        <Providers>
          <ToastContainer autoClose={3000} />
          {children}
        </Providers>  
      </body>
     
    </html>
  )
}
