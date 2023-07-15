"use client";

import { useState } from 'react';
import TabSelect from './TabSelect';
import ExperChatWindow from './ChatWindow';
import ContextWindow from './ContextWindow';


export default function Demo() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className='w-screen relative overflow-x-scroll noScrollbar'>
      <div className='container max-w-6xl min-w-[650px] overflow-x-scroll noScrollbar'>
          <TabSelect activeTab={activeTab} setActiveTab={setActiveTab}  />
        
        <div className='mt-4 flex justify-around gap-4 pb-12 h-[600px]'>
          <div className='max-w-lg  w-full'>
            <ExperChatWindow />
          </div>
          <div className='flex-1 max-w-md h-full min-w-[300px]'>
            <ContextWindow />
          </div>
        </div>
      </div>
    </div>
  )
}