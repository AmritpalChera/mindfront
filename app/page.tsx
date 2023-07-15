import Contact from '@/components/Contact'
import Hero from '@/components/Hero'
import Pricing from '@/components/Pricing'
import CodeSnippet from "@/components/CodeSnippet";
import Demo from '@/components/Demo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Poppins } from 'next/font/google'
export const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  return (
    <div className={`${poppins.className}`}>
      <Header />
      <Hero />
      <Demo />
      <CodeSnippet />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  )
}
