import { Bars3Icon, CalendarIcon, ChevronRightIcon, DocumentTextIcon, GlobeAltIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline"

const items = [
  {
    name: 'Upload Text',
    description: 'Copy and paste text into a textbox to upload',
    id: 'text',
    iconColor: 'bg-pink-500',
    icon: Bars3Icon,
  },
  {
    name: 'Upload PDFs',
    description: 'Embed an entire PDF doc, limited to 20MB.',
    id: 'pdf',
    iconColor: 'bg-purple-500',
    icon: DocumentTextIcon,
  },
  {
    name: 'Upload Web',
    description: 'Link a website and we will fetch the data',
    id: 'webpage',
    iconColor: 'bg-blue-500',
    icon: GlobeAltIcon,
  },
  {
    name: 'Upload Audio',
    description: 'Upload any audio from songs, videos, podcasts',
    id: 'audio',
    iconColor: 'bg-green-500',
    icon: SpeakerWaveIcon
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
             
              <div className="group relative flex justify-around items-center space-x-3 py-4">
              {
                itemIdx % 2 === 0 && (
                  <div className="min-w-0 flex-1 max-w-md">
                    <div className="xl:text-9xl md:text-8xl sm:text-4xl text-3xl font-bold">
                        <div>
                        {item.name}
                      </div>
                    </div>
                  </div>
              )}
              <div className="flex-shrink-0">
                <span
                  className={classNames(item.iconColor, 'inline-flex items-center justify-center rounded-2xl')}
                >
                  <item.icon className="xl:w-[500px] lg:w-[400px] md:w-[300px] sm:w-[200px] w-[100px] text-white" aria-hidden="true" />
                </span>
              </div>
              {
                itemIdx % 2 === 1 && (
                  <div className="min-w-0 flex-1 max-w-md flex justify-end">
                    <div className="xl:text-9xl md:text-8xl sm:text-4xl text-3xl font-bold">
                        <div className="text-end">
                        {item.name}
                      </div>
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