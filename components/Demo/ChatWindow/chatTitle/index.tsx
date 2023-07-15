"use client";
import { selectUser } from "@/redux/features/UserSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

const ChatTitle = () => {
  const { activeGroup } = useSelector(selectUser);
  const router = useRouter();



  const copyExpertToNavigator = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/c/${activeGroup?.npc.username}`
    if (window.innerWidth < 700) await navigator.share({ url }).catch(err => { });
    else {
      toast('Link Copied');
    }
    navigator.clipboard.writeText(url);
  }

  return (
    <div className="chat-header px-3 py-1 flex flex-row flex-none justify-between items-center shadow">
      <div className="flex items-center">
        
        <div className="flex ml-2">
          
          <div className="w-12 h-12 relative flex flex-shrink-0">
            <img className="shadow-md rounded-full w-full h-full object-cover"
              src={"https://image.lexica.art/full_jpg/f5fb48ed-5c50-4179-845d-b03c4f95937d"}
              alt=""
            />
          </div>
              <div className="text-sm ml-2">
              <p className="font-bold">Mindplug</p>
                  <p className="font-bold text-gray">Active</p>
              </div>
            </div>
      </div>
      

        <p className="text-sm text-end text-gray">From ExperAI</p>
      </div>
  );
};

export default ChatTitle;