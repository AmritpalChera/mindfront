import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'Mindplug',
  description: 'A virtual brain for smart applications',
  keywords: ['ai brain', 'embedding generator', 'embedding manager', 'no-code embeddings', 'semantic search', 'ai mind', 'mindplug'],
  twitter: {
    images: 'https://image.lexica.art/full_jpg/10080586-52fd-438f-b988-8019fc7582fb'
  },
  openGraph: {
    images: 'https://image.lexica.art/full_jpg/10080586-52fd-438f-b988-8019fc7582fb'
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
