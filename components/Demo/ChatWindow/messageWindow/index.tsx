"use client";

import { useDispatch, useSelector } from "react-redux";
import OurMessage from "./ourMessage";
import OurMessageContainer from "./ourMessage/container";
import TheirMessage from "./theirMessage";
import TheirMessageContainer from "./theirMessage/containter";
import { useEffect, useState, useRef, MutableRefObject } from 'react';



const MessageWindow = ({ messages, windowRef, topRef }: any) => {
  const bottomRef = useRef();

  return (
    <div ref={windowRef}   className="flex-1 overflow-y-scroll noScrollbar">
      <div className="flex flex-col justify-end min-h-full">
        <div className="p-4 noScrollbar flex flex-col justify-end">
          <div ref={topRef} />
          {
            messages.map((message: any, key) => {
              if (message.role === 'user') {
                return (<OurMessageContainer key={key}>
                  <OurMessage text={message.content} />
                </OurMessageContainer>)
              } else if (message.role === 'assistant') {
                // console.log('their message');
                return (<TheirMessageContainer key={key} imageUrl={'https://image.lexica.art/full_jpg/f5fb48ed-5c50-4179-845d-b03c4f95937d'}>
                  <TheirMessage text={message.content} />
                </TheirMessageContainer>)
              }
            })
          }
          <div ref={bottomRef}></div>
        </div>
      </div>
      
    </div>
  )
}

export default MessageWindow;