"use client";

import SectionTitle from "@/components/Common/SectionTitle";
import Navbar from "@/components/Navbar";
import { selectUser } from "@/redux/features/UserSlice";
import supabase from "@/utils/supabaseClient";
import { ClipboardIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [activeTab] = useState('connect');
  const [keyVisible, setKeyVisible] = useState(false);

  const { id, apiKey } = useSelector(selectUser);

  



  const apiKeyRender = () => {

    const copyAPIkey = () => {
      navigator.clipboard.writeText(apiKey);
      toast('API key copied');
    }

    return (
      <div className="flex w-full justify-between items-center flex-wrap gap-4">
        <p className="font-bold text-xl text-primary">Mindplug API key</p>
        <div className="bg-gray-100 rounded-xl flex items-center pr-8 pl-4 py-3">
          <input type={keyVisible? 'text' : 'password'} className=" text-primary font-bold px-4 w-64 md:w-96 py-0  bg-transparent border-none focus:border-gray-300 focus:ring-0  focus:outline-nonefocus:shadow-md" readOnly value={apiKey || ''} />
          <span onClick={()=>setKeyVisible((prevState) => !prevState)} className="cursor-pointer">
            {
              keyVisible ? <EyeSlashIcon className="w-4 h-4 mr-2"/> : <EyeIcon  className="w-4 h-4 mr-2"/>
            }
          </span>
          
          <ClipboardIcon onClick={copyAPIkey}  className="w-4 h-4 cursor-pointer"/>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>
        
        <Navbar activeTab={activeTab}/>
        <main className="lg:pl-72">
          <div className="xl:pr-96">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <SectionTitle title="Connect" paragraph="Connect to Mindplug API" />
              {apiKeyRender()}
              <div className="mt-2 text-gray-500 font-bold cursor-pointer">View Documentation</div>
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
