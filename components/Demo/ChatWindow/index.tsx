import { useRef, useState } from "react"
import ChatTitle from "./chatTitle";
import MessageWindow from "./messageWindow";
import Footer from "./footer";

export default function ExperChatWindow() {
  const windowRef = useRef();
  const windowTopRef = useRef();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! Ask me anything related to the given text.' }
  ]);

  const addUserMessage = (message: string) => {
    setMessages([...messages,
      { role: 'user', content: message }
    ])
  }
  return (
    <div className="flex flex-col h-full rounded-xl shadow-md shadow-gray">
      <ChatTitle />
      <MessageWindow messages={messages} windowRef={windowRef} topRef={windowTopRef} />
      <Footer addUserMessage={addUserMessage} />
    </div>
  )
}