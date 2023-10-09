import Hero from '@/components/Hero'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadDemo from '@/components/Demo/Upload';
import ProjectsDemo from '@/components/Demo/Projects';
import PoweredBy from '@/components/Demo/BuiltBy';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      {/* <UploadDemo /> */}
      <ProjectsDemo />
      {/* <PoweredBy /> */}
      <Footer />
    </div>
  )
}
