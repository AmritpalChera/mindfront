"use client";
import { useState } from 'react';
import BouncingDotsLoader from '../messageWindow/Dotloader';
import { IoMdSend } from 'react-icons/io';
import { toast } from 'react-toastify';
import backend from '@/utils/axios/backend';

const Footer = ({external, addUserMessage}: any) => {
  const [inputRef, setInputRef] = useState<HTMLDivElement | null>(null);
  const [input, setInput] = useState('');

  const submitMessage = async (custom: string) => {
    const textToSend = custom || input;
    if (!textToSend) {
      toast('Please enter something');
      return;
    } else if (textToSend?.length > 2600) {
      toast('Please reduce the amount of text');
      return;
    }

    addUserMessage(textToSend);
    setInput('');

    return;
    const { data, error, premium } = await backend.post('/user/recordMessage', {
      groupId: '',
      senderUserId: '',
      text: textToSend,
    }).then(res => res?.data).catch(error => {
      console.log(error.response.data)
      return error.response.data
    });


    if (premium) {
      console.log('could not produce results')
      return;
    }


    if (error) {
      console.log('error is: ', error)
      toast("Could not store message");
      return;
    };

    
    // dispatch(addMessage({ message: data }))
    // dispatch(setUserData({generateAIResponse: true}))
    !custom && setInput('');

  }

  
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      submitMessage("");
    }
  }

  return (
    <div className="chat-footer flex-none">
      {/* {loadingResponse && <span className='px-1 text-gray flex justify-start mb-0 mt-2 pl-6'><BouncingDotsLoader/></span>} */}
      <div className="flex flex-row items-center p-4">
        
       
        <div className="relative flex-grow">
          <label>
          <input ref={setInputRef} className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 dark:border-primary focus:border-gray-700 text-black  focus:outline-nonefocus:shadow-md transition duration-300 ease-in"
              type="text" id="textInput" value={input} onKeyDown={handleKeyDown}  onChange={(e) => setInput(e.target.value)} placeholder="Aa"/>

          </label>
        </div>
        
          <button onClick={() => submitMessage("")} type="button" className="flex ml-2 lg:hidden">
            <span className={`${input ? 'text-primary' : 'text-gray'} text-3xl`}>
              <IoMdSend />
            </span>
          </button>
        </div>
    </div>
  );
}

export default Footer;