import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, CalendarIcon, DocumentTextIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'

const items = [
  {
    name: 'Upload Plain Text',
    description: 'Copy and paste text into a textbox to upload',
    id: 'text',
    iconColor: 'bg-pink-500',
    icon: Bars3Icon,
  },
  {
    name: 'Upload a pdf',
    description: 'Embed an entire PDF doc, limited to 20MB.',
    id: 'pdf',
    iconColor: 'bg-purple-500',
    icon: DocumentTextIcon,
  },
  {
    name: 'Webpage URL',
    description: 'Link a website and we will fetch the data',
    id: 'webpage',
    iconColor: 'bg-blue-500',
    icon: CalendarIcon,
  },
  {
    name: 'Audio',
    description: 'Upload any audio from songs, videos, podcasts',
    id: 'audio',
    iconColor: 'bg-green-500',
    icon: SpeakerWaveIcon
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UploadSelect({setUploadType}) {
  return (
    <div className="mx-auto max-w-lg">
      <h2 className="text-base font-semibold leading-6">Select an upload method</h2>
      <p className="mt-1 text-sm text-gray-500">Get started easily through our built-in upload dashboard</p>
      <ul role="list" className="mt-6 divide-y divide-gray-200 border-b border-t border-gray-200">
        {items.map((item, itemIdx) => (
          <li key={itemIdx}>
            <div className="group relative flex items-start space-x-3 py-4">
              <div className="flex-shrink-0">
                <span
                  className={classNames(item.iconColor, 'inline-flex h-10 w-10 items-center justify-center rounded-lg')}
                >
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">
                  <div onClick={() => setUploadType(item.id)}>
                    <span className="absolute inset-0 cursor-pointer" aria-hidden="true" />
                    {item.name}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="flex-shrink-0 self-center">
                <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex">
        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Check out our API
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  )
}
