"use client";
import Chatbots from "@/components/Chatbots";
import Navbar from "@/components/Navbar";
import { useState } from "react";
export default function ChatbotPage() {
  const [activeTab, setActiveTab] = useState('chatbot');
  return (
    <div>
      <Navbar setActiveTab={setActiveTab} activeTab={activeTab}/>
        <main className="lg:pl-72">
          <div className="">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <Chatbots />
            </div>
          </div>
        </main>
    </div>
  )
}