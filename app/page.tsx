import Contact from '@/components/Contact'
import Hero from '@/components/Hero'
import Pricing from '@/components/Pricing'
import CodeSnippet from "@/components/CodeSnippet";
import Demo from '@/components/Demo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Poppins } from 'next/font/google'
import UploadDemo from '@/components/Demo/Upload';
import ProjectsDemo from '@/components/Demo/Projects';
import PoweredBy from '@/components/Demo/BuiltBy';
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
      <UploadDemo />
      <ProjectsDemo />
      {/* <Demo /> */}
      {/* <CodeSnippet /> */}
      {/* <Pricing /> */}
      {/* <Contact /> */}
      <PoweredBy />
      <Footer />
    </div>
  )
}
