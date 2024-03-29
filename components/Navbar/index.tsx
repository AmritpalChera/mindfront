" use client";
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  CommandLineIcon,
  DocumentDuplicateIcon,
  ChatBubbleBottomCenterIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  CreditCardIcon,
  Square3Stack3DIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggler from '../Header/ThemeToggler';
import { useRouter } from 'next/navigation';
import Logo from '../Logo';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({activeTab}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const setActiveTab = (tabId) => {
    router.push(`/${tabId}`)
  }

  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: HomeIcon, current: activeTab === 'dashboard' },
    { name: 'New Upload', id: 'new', icon: DocumentDuplicateIcon, current: activeTab === 'new' },
    // { name: 'Chatbots' , id: 'chatbot', icon: ChatBubbleBottomCenterTextIcon, current: activeTab === 'chatbot' },
    { name: 'API', id: 'api', icon: ChatBubbleBottomCenterIcon, current: activeTab === 'api' },
    { name: 'Profile', id: 'profile', icon: UsersIcon, current: activeTab === 'profile' },
    { name: 'Pricing', id: 'pricing', icon: CreditCardIcon, current: activeTab === 'pricing' },

    // { name: 'Setup Guide', id: 'guide', icon: Square3Stack3DIcon, current: activeTab === 'guide' },
  ]
  const teams = [
    { id: '1', name: 'Customer Support', href: 'https://forms.gle/GNX5pbWPAziEFU9U7', initial: 'C', current: activeTab === '1' },
    { id: '2', name: 'Feedback', href: 'https://forms.gle/zxWEff4EFyoQ76Pf7', initial: 'F', current: activeTab === '2' },
    { id: '3', name: 'Get help', href: 'https://calendly.com/cheraamritpal/30min', initial: 'G', current: activeTab === '3' },
  ]

  
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  {/* <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-secondary dark:text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child> */}
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto  px-6 pb-2 bg-white dark:bg-black">
                    <div className="flex h-16 shrink-0 items-center">
                      <Link
                        href="/"
                        className={`header-logo block w-full`}
                      >
                        <Logo />
                    </Link>
                      {/* <ThemeToggler /> */}
                      <div className="flex w-16 justify-center">
                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon className="h-6 w-6 text-secondary dark:text-white" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <div
                                  onClick={()=>setActiveTab(item.id)}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-50 text-primary'
                                      : ' hover:text-primary hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current ? 'text-primary' : ' group-hover:text-primary',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-white">Your teams</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <Link
                                  href={team.href}
                                  target='_blank'
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray-50 text-indigo-600'
                                      : ' hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? 'text-indigo-600 border-indigo-600'
                                        : ' border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium'
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <Link
                href="/"
                className={`header-logo block w-full`}
              >
                <Image
                  src="/images/logo/logo-2.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className=" dark:hidden"
                />
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden dark:block"
                />
            </Link>
            {/* <ThemeToggler /> */}
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <div
                          onClick={() => setActiveTab(item.id)}
                          className={classNames(
                            item.current
                              ? 'bg-gray-50 text-indigo-600'
                              : ' hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-indigo-600' : ' group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-white">Your teams</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <Link
                          href={team.href}
                          target="_blank"
                          className={classNames(
                            team.current
                              ? 'bg-gray-50 text-indigo-600'
                              : ' hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? 'text-indigo-600 border-indigo-600'
                                : ' border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium'
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li className="-mx-6 mt-auto">
                  <a
                  href="https://twitter.com/AwesomAmri"
                  target='blank'
                    className="flex relative items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://i.ibb.co/94mwSx1/f9c5-IOx-W-400x400.jpg"
                      alt=""
                  />
                  <span className='absolute top-0 left-11'>🟢</span>
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Amritpal</span>
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

        {/* <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white dark:bg-[#000] px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5  lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1  text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
          <a className='relative' href="https://twitter.com/AwesomAmri" target='blank'>
            <span className="sr-only">Amritpal</span>
            <span className='absolute -top-2 left-6'>🟢</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://i.ibb.co/94mwSx1/f9c5-IOx-W-400x400.jpg"
              alt=""
            />
          </a>
        </div> */}
    </>
  )
}