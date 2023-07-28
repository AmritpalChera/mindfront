import { selectUser } from '@/redux/features/UserSlice';
import { ArrowPathIcon, ClipboardIcon, CloudArrowUpIcon, EyeIcon, EyeSlashIcon, FingerPrintIcon, GlobeAltIcon, LockClosedIcon, SquaresPlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const features = [
  {
    name: 'Dynamic Chunking',
    description:
      'Mindplug uses recursive chunking to preserve full context and meaning of data.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Plug & Play',
    description:
      'Minimal setup delivering performant results with optimized storage.',
    icon: SquaresPlusIcon,
  },
  {
    name: 'Simple interface',
    description:
      'Easy to understand API service with straightforward queries for data.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Web enabled',
    description:
      'Fully web enabled service with abilities to auto-read websites and subpages.',
    icon: GlobeAltIcon,
  },
]

export default function ApiFeatures() {
  const { id, apiKey } = useSelector(selectUser);
  const [keyVisible, setKeyVisible] = useState(false);
  const apiKeyRender = () => {

    const copyAPIkey = () => {
      navigator.clipboard.writeText(apiKey);
      toast('API key copied');
    }

    return (
      <div className="flex w-full justify-between items-center flex-wrap gap-4">
        <div>
          <div className='mb-2 font-medium'>Mindplug API key</div>
          <div className="bg-gray-100 rounded-xl flex items-center pr-8 pl-4 py-3">
            <input type={keyVisible? 'text' : 'password'} className=" text-primary font-bold px-4 w-64 md:w-96 py-0  bg-transparent border-none focus:border-gray-300 focus:ring-0  focus:outline-nonefocus:shadow-md" readOnly value={apiKey || ''} />
            <span onClick={()=>setKeyVisible((prevState) => !prevState)} className="cursor-pointer dark:text-black">
              {
                keyVisible ? <EyeSlashIcon className="w-4 h-4 mr-2 "/> : <EyeIcon  className="w-4 h-4 mr-2"/>
              }
            </span>
            
            <ClipboardIcon onClick={copyAPIkey}  className="w-4 h-4 cursor-pointer dark:text-black"/>
          </div>
        </div>
        <p onClick={()=>window.open('https://docs.mindplug.io', '_blank', 'noopener, noreferrer')} className="font-bold text-xl bg-primary text-white py-2 px-6 rounded-xl hover:bg-primary/80 cursor-pointer">View Documentation</p>

      </div>
    )
  }

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Make it smart</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Connect your app!
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We take care of the technical so you can deliver quality.
          </p>
        </div>
        <div className='mt-12'>
          {apiKeyRender()}
          <div>

          </div>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
