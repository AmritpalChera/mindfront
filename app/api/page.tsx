"use client";

import SectionTitle from "@/components/Common/SectionTitle";
import Demo from "@/components/Demo";
import ExperChatWindow from "@/components/Demo/ChatWindow";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import ProjectSelect from "@/components/Projects/ProjectSelect";
import { selectUser } from "@/redux/features/UserSlice";
import supabase from "@/utils/supabaseClient";
import { ClipboardIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [activeTab] = useState('api');
  const [keyVisible, setKeyVisible] = useState(false);
  const [collection, setCollection] = useState('');

  const { id, apiKey } = useSelector(selectUser);
  console.log(apiKey);

  



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
          <span onClick={()=>setKeyVisible((prevState) => !prevState)} className="cursor-pointer dark:text-black">
            {
              keyVisible ? <EyeSlashIcon className="w-4 h-4 mr-2 "/> : <EyeIcon  className="w-4 h-4 mr-2"/>
            }
          </span>
          
          <ClipboardIcon onClick={copyAPIkey}  className="w-4 h-4 cursor-pointer dark:text-black"/>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>
        
        <Navbar activeTab={activeTab}/>
        <main className="lg:pl-72">
          <div className="max-w-7xl">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <SectionTitle title="API" paragraph="Connect to Mindplug API" />
              {apiKeyRender()}
              <div className="mt-2 text-gray-500 font-bold cursor-pointer">View Documentation</div>
              <div></div>
              <div className="mt-12 bg-dark p-4 py-16 rounded-3xl">
                <div className="flex flex-wrap justify-around gap-4 ">
                  <div className="max-w-sm w-full flex bg-white dark:bg-black flex-col lg:border-y-[32px] lg:border-[12px] rounded-xl p-4 dark:border-primary">
                    <div className="lg:block hidden">
                      <Logo />
                    </div>
                    <div className="mt-4 text-gray-700">Choose a project and a collection to interface with</div>
                    <div className="w-64 mt-8">
                      <ProjectSelect />
                      <div className="block text-sm font-medium leading-6 text-gray-900 mt-4">Collection</div>
                      <input value={collection} onChange={e => setCollection(e.target.value)} placeholder="Enter collection name"
                        className="ring-0 focus:ring-0 focus:outline-none rounded-md py-1 border-2 border-gray-300 mt-1"
                      />
                    </div>
                    <div className="mt-4">
                      <div
                        className="rounded-md text-center bg-primary py-2 px-8 mt-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
                      >
                        Apply
                      </div>
                    </div>
                    
                  </div>
                  <div className="h-[600px]">
                    <ExperChatWindow />
                  </div>
                </div>
                <div className="w-full mt-12 text-white flex-col  flex items-center">
                  <div className="font-bold text-primary text-xl">
                    Raw Output
                  </div>
                  <div className="p-4 mt-4">
                    Sed luctus consectetur sem, nec consectetur dolor imperdiet vel. Vestibulum ultrices blandit mi, non vestibulum massa pharetra quis. Maecenas lacinia aliquet quam, sit amet bibendum ligula ultrices sit amet. Etiam euismod non nisi eu sodales. Donec urna risus, pretium et massa elementum, luctus ullamcorper magna. Morbi porta risus ut justo mollis, in dapibus lacus vestibulum. Sed ac mattis nisi, nec mattis dui. In at sagittis nunc. Nulla tempus maximus libero, nec venenatis purus efficitur in. Phasellus facilisis in felis a pellentesque. Donec aliquam est auctor vestibulum pretium. Nullam in sapien sit amet tellus iaculis tincidunt. Cras eu neque nulla. Morbi augue turpis, aliquam eget blandit eu, egestas vel metus. Donec augue neque, convallis et enim eget, rhoncus cursus massa. Suspendisse potenti.
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
