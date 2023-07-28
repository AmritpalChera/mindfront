"use client";

import SectionTitle from "@/components/Common/SectionTitle";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Upload from "@/components/Upload";
import { useEffect, useState } from "react";

export default function Guide() {
  const [activeTab] = useState('new');

  useEffect(() => {
    console.log('active tab is:  ', activeTab);
    console.log('I am making a video');
  }, [activeTab]);


  return (
    <>
      <div>
        
        <Navbar activeTab={activeTab}/>
        <main className="lg:pl-72">
          <div className="xl:pr-96">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <SectionTitle title="New Upload" paragraph="Add content to collections" />
              <Upload />
            </div>
          </div>
        </main>

        <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
          {/* Secondary column (hidden on smaller screens) */}
        </aside>
      </div>
    </>
  )
}
