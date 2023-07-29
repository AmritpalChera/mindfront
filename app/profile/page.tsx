"use client";

import SectionTitle from "@/components/Common/SectionTitle";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import { useEffect, useState } from "react";

export default function New() {
  const [activeTab] = useState('profile');

  useEffect(() => {
    console.log('active tab is:  ', activeTab);
    console.log('I am making a video');
  }, [activeTab]);


  return (
    <>
      <div>
        
        <Navbar activeTab={activeTab}/>
        <main className="lg:pl-72">
          <div className="">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <SectionTitle title="Profile" paragraph="Manage your profile and payments" />
              <Profile />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
