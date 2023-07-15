import { AiFillFilePdf, AiFillStar, AiFillFile } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TabSelect({ activeTab, setActiveTab }) {
  
  const tabs = [
    { name: 'Plain Text', href: '#', icon: AiFillFile, current: activeTab === 0 },
    { name: 'PDF Doc', href: '#', icon: AiFillFilePdf, current: activeTab === 1 },
    { name: 'Webpage', href: '#', icon: TbWorld, current: activeTab === 2 },
    { name: 'Mixed', href: '#', icon: AiFillStar, current: activeTab === 3 },
  ]

  return (
    <div className='w-full'>
      <div className="sm:hidden w-[300px]">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab, index) => (
            <option onClick={() => setActiveTab(index)} key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block ">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <div
                key={tab.name}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium cursor-pointer'
                )}
                aria-current={tab.current ? 'page' : undefined}
                onClick={() => setActiveTab(index)}
              >
                <tab.icon  className={classNames(
                  tab.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                  '-ml-0.5 mr-2 h-5 w-5'
                )}  aria-hidden="true"/>
                <span>{tab.name}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}