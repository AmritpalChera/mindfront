import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'Mindplug',
  description: 'An AI brain for any file, any data.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={`h-full`}>
        <Providers>
          <ToastContainer autoClose={3000} />
          {children}
        </Providers>  
      </body>
     
    </html>
  )
}
