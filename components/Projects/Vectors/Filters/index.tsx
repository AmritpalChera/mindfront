import useUserBackend from "@/hooks/useUserBackend";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function Filters({activeProject, searchValue, filtersApplied, collectionName, setVectors, setSearch, setFiltersApplied}) {
  const [loadingVectors, setLoadingVectors] = useState(false);
  const backend = useUserBackend();

  const search = async () => {
    if (!searchValue) return toast.error('Please enter something');
    setLoadingVectors(true)
    const vectors = await backend.post('/data/query', { db: activeProject, collection: collectionName, search: searchValue }).then(res => res.data).catch(err => console.log(err?.response?.data));
    console.log('searched vectors are: ', vectors)
    if (vectors.data) {
      setVectors(vectors.data);
      setFiltersApplied(true);
    }
    setLoadingVectors(false);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  }

  return (
    <div className="my-12">
      <p className="font-bold">Search</p>
      <div className="flex items-center gap-4">
        <div className="relative mt-2 rounded-md shadow-sm w-full">
          <input
            type="text"
            name="account-number"
            value={searchValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search something in the collection..."
          />
          {searchValue && <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {loadingVectors? <Oval width={24} height={24} strokeWidth={8}/> : <PaperAirplaneIcon onClick={search} className={`h-5 w-5 text-primary cursor-pointer`} aria-hidden="true" />}
          </div>}
        </div>
      </div>
      {filtersApplied && <div className="text-primary mt-4">
        Top search results. <span className="underline cursor-pointer" onClick={()=>setFiltersApplied(false)}>Clear results</span>
      </div>}
    </div>
    
  )
}