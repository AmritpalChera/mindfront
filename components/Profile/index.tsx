"use client";

import { selectUser } from '@/redux/features/UserSlice'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'


export default function Profile() {
  const { email, isCustomer } = useSelector(selectUser);
  
  return (
    <>

      <div>
          <main>
         

            {/* Settings forms */}
            <div className="divide-y divide-white/5">
              <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 ">Personal Information</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Your email address associated with the account.
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
                    </div>

                
                  
                  </div>
                </form>
            </div>
            
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 ">Bring your own keys</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Have higher control over your data
                  </p>
                </div>

                <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                   

                    

                  <div className="col-span-full">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                      Pinecone Key
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='1234...'
                        autoComplete="email"
                        disabled
                        value={''}
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
                         
                        placeholder='gcp-west'
                        autoComplete="email"
                        disabled
                        value={''}
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
                        placeholder='1234...'
                        autoComplete="email"
                        disabled
                        value={''}
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                

                    <div className=" flex">
                      <button
                        className="rounded-md bg-indigo-500 max-w-sm w-full text-white px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        {isCustomer ? 'Save' : 'Upgrade'}
                      </button>
                    </div>
            </div>
                
                  
                  </div>
                </form>
              </div>

              <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 ">Change password</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Update your password associated with your account.
                  </p>
                </div>

                <div className="md:col-span-2">
                

                  <div className=" flex">
                    <button
                      className="rounded-md bg-indigo-500 max-w-xs w-full text-white px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Send Email
                    </button>
                  </div>
              </div>
              
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 ">Manage Subscription</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    {isCustomer? 'Manage your payments' : 'Start your subscription today for $19.99'}
                  </p>
                </div>

                <div className="md:col-span-2">
                

                  <div className=" flex flex-col">
                    <button
                      className="rounded-md bg-indigo-500 text-white px-3 py-2 text-sm font-semibold max-w-xs w-full  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      {isCustomer ? 'Manage' : 'Upgrade'}
                  </button>
                  <div className='max-w-xs text-center mt-4 underline'>View Plans</div>
                  </div>
              </div>
              
            </div>
            
            

            </div>
          </main>
        </div>
    </>
  )
}
