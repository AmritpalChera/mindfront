import { Switch } from '@headlessui/react'

export default function Toggle({enabled, setEnabled}) {

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-0 focus:ring-offset-2"
    >
      <span className="sr-only">Use setting</span>
      <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md" />
      <div
        aria-hidden="true"
        className={
          `pointer-events-none opacity-100 ${enabled? 'bg-primary' : 'bg-gray-500'} absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out`
        }
      />
      <div
        aria-hidden="true"
        className={
          `pointer-events-none transform  ${enabled? 'translate-x-5' : 'translate-x-0'} absolute left-0 inline-block h-5 w-5 rounded-full border bg-white border-gray-500 bg-red-500 shadow ring-0 transition-transform duration-200 ease-in-out`
        }
      />
    </Switch>
  )
}
