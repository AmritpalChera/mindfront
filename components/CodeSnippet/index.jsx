"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import SectionTitle from '../Common/SectionTitle';

const CodeSnippet = () => {
  const [tab2, setTab2] = useState(false); // show tab 1 by default

  return (
    <section id="codeSnippet" className="pt-16 md:pt-20 lg:pt-28">
      <div className='container'>
        <div className='w-full flex justify-center'>
          <SectionTitle
            title="Get started with our API"
            center={true}
            paragraph=""
            mb="44px"
          />
        </div>
          
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className='flex justify-center w-full'>
            <div className='w-full max-w-2xl'>
              <ul
              className="mb-4 flex list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row"
              id="tabs-tab3"
              role="tablist"
              data-te-nav-ref>
              <li role="presentation">
                  <button
                  className={`my-2 block text-lg border-x-0 border-t-0 border-b-2 border-transparent px-7 pt-4 pb-3.5 font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:bg-neutral-100 focus:isolate  ${!tab2 && "border-primary text-primary"}  dark:text-neutral-400 dark:hover:bg-transparent `}
                  onClick={() =>setTab2(false)}
                  >Store
                  </button>
              </li>
              <li role="presentation">
                <button
                  className={`text-bold text-lg my-2 block border-x-0 border-t-0 border-b-2 border-transparent px-7 pt-4 pb-3.5  font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:bg-neutral-100 focus:isolate ${tab2 && "border-primary text-primary"}  dark:text-neutral-400 dark:hover:bg-transparent`}
                  onClick={() =>setTab2(true)}
                  >Fetch</button>
              </li>
            </ul>
            <div className='bg-primary overflow-hidden h-128 rounded-xl'>
              {!tab2 && <div
                className={`transition-opacity duration-150 ease-linear w-full bg-primary flex items-center h-full`}
              >
                
                <div className="w-full px-4">
                  <div
                    className="wow fadeInUp relative mx-auto aspect-[1000/500] max-w-[1000px] lg:mr-0"
                    data-wow-delay=".2s"
                  >
                    <Image
                      src="/images/code/index.svg"
                      alt="index-image"
                      fill
                      className="mx-auto max-w-full lg:mr-0"
                    />
                  </div>
                </div>
              </div>
                }
              {tab2 && <div
                className={`transition-opacity duration-150 ease-linear`}
              >
                  <div className="w-full px-4">
                    <div
                      className="wow fadeInUp relative mx-auto aspect-[1000/500] max-w-[900px] lg:mr-0"
                      data-wow-delay=".2s"
                    >
                      <Image
                        src="/images/code/fetch.svg"
                        alt="fetch-image"
                        fill
                        className="mx-auto max-w-full lg:mr-0"
                      />
                    </div>
                  </div>
                </div>}
              </div>

            
            </div>
            
          </div>
          <div onClick={()=>window.open('https://docs.mindplug.io', '_blank')} className='text-primary bold text-2xl text-center mt-16 cursor-pointer'>
            View Documentation
            </div>
        </div>

        
        <div className="-mx-4 h-full">

          
        </div>
      </div>
      
    </section>
  )
}

export default CodeSnippet