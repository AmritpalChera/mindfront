// import Contact from "@/components/Contact";
"use client";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";

const ContactPage = () => {
  return (
    <>
      <Navbar activeTab={'pricing'} />
      <main className="lg:pl-72">
        <Pricing/>
      </main>
      
    </>
  );
};

export default ContactPage;
