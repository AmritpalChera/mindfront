import { FaDiscord, FaPaperPlane, FaTwitter } from "react-icons/fa";


const NoChat = () => {
  return (
    <div className="w-full h-hull flex flex-col items-center justify-center bg-white dark:bg-black dark:text-gray-300 text-secondary">
      <p className="text-md md:text-xl font-bold">Select a chat or start new conversation</p>
      <div onClick={()=>window.open('https://forms.gle/smTLTRozzeSkVDF59', 'blank')} className="max-w-xs w-full text-black flex bg-white rounded-full mt-12 py-1 justify-center items-center cursor-pointer hover:bg-white/90 border border-black"><FaPaperPlane className="mr-1"/> Provide Feedback</div>
      <div onClick={()=>window.open('https://discord.gg/vbHJY96sCT', 'blank')} className="max-w-xs w-full flex text-white bg-primary rounded-full mt-4 py-1 justify-center items-center cursor-pointer hover:bg-primary/90"><FaDiscord className="mr-1"/>Join Discord</div>
      <div onClick={()=>window.open('https://twitter.com/exper_ai', 'blank')} className="max-w-xs w-full flex text-white bg-twitter rounded-full mt-4 py-1 justify-center items-center cursor-pointer hover:bg-twitter/90"><FaTwitter className="mr-1"/>Follow Twitter</div>
    </div>
  )
};

export default NoChat;