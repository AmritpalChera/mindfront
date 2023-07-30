import { selectUser } from "@/redux/features/UserSlice";
import generateBotResponse from "@/utils/openai/generateBotResponse"
import { useEffect, useState } from "react"
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";

interface ChatbotInterface {
  context: string,
  search: string,
  matchScore: number
}

export default function Chatbot({ context, search, matchScore }: ChatbotInterface) {
  const [botResponse, setBotResponse] = useState('');
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  const generateResponse = async () => {
    let response = await generateBotResponse({ context, search, matchScore, openaiKey: user.openaiKey });
    if (!response) {
      response = 'Something went wrong. Could not generate response';
    }
    setBotResponse(response);
    setLoading(false);
  }

  useEffect(() => {
    // context and search should already be present here
    generateResponse();
  }, [])

  return (
    <div className="absolute right-2 bottom-16 rounded-md shadow-lg text-black shadow-gray-500 w-full max-w-sm text-sm overflow-y-scroll h-48 bg-white p-4 border-gray-300 border">
      {loading? <Oval width={24} height={24} strokeWidth={8}/> : botResponse}
    </div>
  )
}