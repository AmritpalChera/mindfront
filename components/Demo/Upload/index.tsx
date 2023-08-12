import { Bars3Icon, CalendarIcon, ChevronRightIcon, DocumentTextIcon, GlobeAltIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline"
import Image from "next/image";

const items = [
  {
    name: 'Initialize',
    description: '3 lines of code',
    id: 'text',
    iconColor: 'bg-pink-500',
    icon: Bars3Icon,
    image: '/images/landingpage/code1.png'
  },
  {
    name: 'Store',
    description: '4 lines of code',
    id: 'pdf',
    iconColor: 'bg-purple-500',
    icon: DocumentTextIcon,
    image: '/images/landingpage/store.png'
  },
  {
    name: 'Query',
    description: '4 lines of code',
    id: 'webpage',
    iconColor: 'bg-blue-500',
    icon: GlobeAltIcon,
    image: '/images/landingpage/query.png'
  }
];


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UploadDemo() {
  return (
    <div className="container mb-32 text-secondary dark:text-primary">
      <div className="flex justify-center flex-col">
          {items.map((item, itemIdx) => (
            <div key={itemIdx} className="mb-24 md:mb-48">
             
              <div className="group relative flex flex-wrap justify-around items-center space-x-3 py-4">
              {
                itemIdx % 2 === 0 && (
                  <div className="min-w-0 flex-1 max-w-md">
                    <div className="">
                        <p className="xl:text-9xl md:text-8xl text-4xl font-bold">
                        {item.name}
                        </p>
                        <p className="text-2xl mt-4">
                          {item.description}
                        </p>
                      </div>
                  </div>
              )}
              <div className="flex-shrink-0">
               <Image className="rounded-lg xl:w-[500px] md:w-96 w-full" alt="" src={item.image} width={1028} height={1028} />
              </div>
              {
                itemIdx % 2 === 1 && (
                  <div className="min-w-0 flex-1 max-w-md flex justify-end">
                    <div className="text-end ">
                        <p className="xl:text-9xl md:text-8xl text-4xl font-bold">
                        {item.name}
                        </p>
                        <p className="text-2xl mt-4">
                          {item.description}
                        </p>
                      </div>
                      
                  </div>
              )}
            </div>
          </div>
          ))}

      </div>
      
  </div>
    
  )
}