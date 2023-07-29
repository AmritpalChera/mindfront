"use client";

import { selectUser } from '@/redux/features/UserSlice'
import { CustomerPlans } from '@/utils/app/customerplans';
import supabase from '@/utils/supabaseClient';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';


export default function Profile() {
  const { email, isCustomer, planType, app_metadata, id } = useSelector(selectUser);
  const emailProvider = app_metadata.provider;
  const [pineconeKey, setPineconeKey] = useState('');
  const [pineconeEnv, setPineconeEnv] = useState('');
  const [openaiKey, setopenaiKey] = useState('');

  const getKeys = async () => {
    const keyData = await supabase.from('keys').select('pineconeKey, pineconeEnv, openaiKey').eq('userId', id).single();
    if (keyData.data) {
      setPineconeEnv(keyData.data.pineconeEnv);
      setPineconeKey(keyData.data.pineconeKey);
      setopenaiKey(keyData.data.openaiKey);
    }
  }

  useEffect(() => {
    getKeys();
  }, [])

  const submitKeys = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps: any = Object.fromEntries(formData);
    const { pineconeKey, pineconeEnv, openaiKey } = formProps;
    if (!pineconeKey || !pineconeEnv || !openaiKey) return toast.error('Please enter all keys')
    const submitted = await supabase.from('keys').upsert({userId: id, pineconeEnv, pineconeKey, openaiKey })
    if (submitted.error) {
      console.log('error submitting: ', submitted.error);
    }
    else toast('Keys submitted')
  }

  return (
    <>

      <div>
          <main>
         

            {/* Settings forms */}
            <div className="divide-y divide-white/5">
              <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 ">Personal Information</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300">
                    Signed in with {app_metadata.provider}
                  </p>
                </div>

                <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                   

                    

                    <div className="col-span-full">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                        autoComplete="email"
                        disabled
                        value={email || ''}
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    
                    <div className='text-sm text-gray-500 pl-6 mt-1'></div>
                    </div>

                
                  
                  </div>
                </form>
            </div>
            
            {planType === CustomerPlans.CUSTOM && <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 ">Bring your own keys</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300">
                    Have higher control over your data
                  </p>
                </div>

                <form onSubmit={submitKeys} className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                   

                    

                  <div className="col-span-full">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                      Pinecone Key
                    </label>
                    <div className="mt-2">
                      <input
                        value={pineconeKey}
                        onChange={(e) => setPineconeKey(e.target.value)}
                        name="pineconeKey"
                        placeholder='1234...'
                        type="password"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  
                  <div className="col-span-full">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                        Pinecone Environment
                      </label>
                      <div className="mt-2">
                      <input
                         value={pineconeEnv}
                         onChange={(e) => setPineconeEnv(e.target.value)}
                        type="password"
                        placeholder='gcp-west'
                        name="pineconeEnv"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                      </div>
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                      OpenAI Key
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        placeholder='1234...'
                        name="openaiKey"
                        value={openaiKey}
                        onChange={(e) => setopenaiKey(e.target.value)}
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                

                    <div className=" flex">
                      <button
                        className="rounded-md bg-indigo-500 max-w-sm w-full text-white px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        Save
                      </button>
                    </div>
            </div>
                
                  
                  </div>
                </form>
              </div>}

              {emailProvider === "email" && <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 ">Change password</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300">
                    Update your password associated with your account.
                  </p>
                </div>

                <div className="md:col-span-2">
                

                <Link href="/reset" className=" flex">

                    <button
                      className="rounded-md bg-indigo-500 max-w-xs w-full text-white px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Change
                    </button>
                  </Link>
              </div>
              
            </div>}

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 ">Manage Subscription</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300">
                    {isCustomer? 'Manage your payments' : 'Start your subscription today for $19.99'}
                  </p>
                </div>

                <div className="md:col-span-2">
                

                <div className=" flex flex-col">
                  <Link href="/pricing">
                    <button
                        className="rounded-md bg-indigo-500 text-white px-3 py-2 text-sm font-semibold max-w-xs w-full  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        View Plans
                    </button>
                  </Link>
                    
                  {/* <div className='max-w-xs text-center mt-4 underline'>View Plans</div> */}
                  </div>
              </div>
              
            </div>
            
            

            </div>
          </main>
        </div>
    </>
  )
}
