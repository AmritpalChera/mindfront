import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import useUserBackend from "@/hooks/useUserBackend";

const chatbots = [
  {
    botId: '12323423',
    created_at: 'date of creation',
    name: 'Lucy Chatbot',
    goal: 'I will provide key answers on such and such'
  },
  {
    botId: '12323423',
    created_at: 'date of creation',
    name: 'Lucy Chatbot',
    goal: 'I will provide key answers on such and such'
  },
];

export default function Chatbots() {
  const [chatbots, setChatbots] = useState([]);
  const backend = useUserBackend();

  const getChatbots = async () => {
    const {data} = await backend.post('/chatbot/list').then(res => res.data).catch(err => console.log(err.response?.data));
    if (data?.length > 0) setChatbots(data);
  }
  useEffect(() => {
    getChatbots();
  }, [])

  const chatbotCard = (chatbotdata) => {
    const date = new Date(chatbotdata.created_at).toDateString();
    return (
      <div key={chatbotdata.created_at} className="flex flex-col border border-gray-300 w-64 items-center text-center p-4 rounded-lg">
        <h1 className="font-bold text-xl">{chatbotdata.name}</h1>
        <div className="mt-2 text-gray-500">{ chatbotdata.goal }</div>
        <div className="w-full text-start text-sm text-gray-500 mt-4">Created: { date }</div>
        <div className="w-full">
          <div
            className="rounded-md text-center mt-4 w-full bg-primary py-2 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
          >
            Chat
          </div>
          <button
            className="w-full p-2 shadow bg-white text-black border-gray-300 hover:bg-gray-100 border flex justify-center rounded-md mt-2 max-w-5xl">
            Share
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <SectionTitle title="Chatbots" paragraph="Go to your collection vectors to generate a bot" />
      <div className="flex gap-4 flex-wrap">
        {chatbots.map((chatbot) => chatbotCard(chatbot))}
      </div>
    </div>
  )
}