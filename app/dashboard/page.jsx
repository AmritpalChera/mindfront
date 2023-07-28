"use client";

import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    console.log('active tab is:  ', activeTab);
    console.log('I am making a video');
  }, []);


  return (
    <>
      <div>
        
        <Navbar setActiveTab={setActiveTab} activeTab={activeTab}/>
        <main className="lg:pl-72">
          <div className="">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <Projects />
            </div>
          </div>
        </main>

        {/* <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        </aside> */}
      </div>
    </>
  )
}
