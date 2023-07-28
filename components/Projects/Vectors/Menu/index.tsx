import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ChatBubbleBottomCenterIcon, TrashIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline'

const solutions = [
  { name: 'Update', description: '', id: 'update', icon: ViewfinderCircleIcon },
  { name: 'Delete', description: '', id: 'delete', icon: TrashIcon},
]

type CollectionMenuTypes = {
  handleActionClick: (e: string, i: number) => void,
  index: number
}

export default function VectorsMenu({handleActionClick, index}: CollectionMenuTypes) {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-primary">
        <span >Options</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute  z-10 mt-5 flex w-screen max-w-max -translate-x-3/4 px-4">
          {({ close }) => (
              <div className="w-screen max-w-sm flex-auto rounded-3xl dark:bg-dark bg-white p-4 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              {solutions.map((item) => (
                <div onClick={() => {
                  close()
                  handleActionClick(item.id, index);   
                }} key={item.name} className="relative border-b  p-4 hover:text-primary hover:cursor-pointer">
                  <div className="font-semibold  flex justify-between">
                    <span>{item.name}</span>
                    <item.icon className="h-6 w-6 " aria-hidden="true" />
                  </div>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          )}
          
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
