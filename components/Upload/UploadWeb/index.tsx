import Toggle from "@/atoms/Switch";
import useUserBackend from "@/hooks/useUserBackend";
import { isValidUrl, stringToJSON } from "@/utils/app";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";


export default function UploadWeb({setUploadType}) {
  const [loading, setLoading] = useState(false);
  const backend = useUserBackend();
  const router = useRouter();
  const params = useSearchParams();
  const [projectInput, setProjectInput] = useState(params.get('project') || '');
  const [collectionInput, setCollectionInput] = useState(params.get('collection') || '');
  const [error, setError] = useState('');

  const formSubmitted = async (e) => {
    if (loading) return;
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps: any = Object.fromEntries(formData);
  
    const isMetaJson = stringToJSON(formProps.metadata);
    if (!isMetaJson)  toast.error("Metadata invalid");
    else if (!isValidUrl(formProps.webpage)) toast.error("Invalid URL")
    else {

      try {
        await backend.post('/data/store/webpage', {
          db: formProps.project,
          collection: formProps.collection,
          url: formProps.webpage,
          metadata: isMetaJson,
        }).then(res => res.data);
        toast('Complete!');
        e.target.reset();
        router.push(`/dashboard?project=${formProps.project}&collection=${formProps.collection}`);
      } catch (e) {
        console.log(e?.response?.data)
        if (typeof (e?.response?.data?.error) === 'string') setError(e?.response?.data?.error);
        toast.error('Process failed. Try again')
      }
    }
    setLoading(false);
  }
  
  
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-lg w-full">
        <div className="flex gap-4 items-center pb-8 font-bold justify-between">
          <p className="text-2xl">Web Upload</p>
          <div onClick={()=>setUploadType('')} className="flex items-center text-primary cursor-pointer underline">
            <ArrowLeftOnRectangleIcon className="h-6 w-6"/>
            Return
          </div>
          
        </div>
        <form onSubmit={formSubmitted}>
          <div className="font-bold text-primary flex justify-between">
            <span>Webpage URL</span>
            {/* <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Subpages</span>
              <Toggle enabled={toggleActive} setEnabled={setToggleActive} />
            </div> */}
          </div>
          {/* <input className="w-full rounded-lg border-gray shadow-md mt-2" placeholder="Enter webpage URL here..." /> */}
          <div className="relative mt-2 rounded-md shadow-sm flex items-center">
          <input
            type="text"
            name="webpage"
            className="w-full border-gray rounded-lg mt-2 shadow-md"
            placeholder="Enter Webpage URL here..."
          />
          {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div> */}
          </div>
          {/* <div className="font-bold cursor-pointer text-secondary text-sm mt-2 underline flex items-center"><WindowIcon className="h-6 w-6 mr-2"/> View subpages to embed</div> */}
          <div className="mt-6 w-full">
            <p className="font-bold text-primary flex justify-between">Metadata <span className="text-gray-500 text-sm ml-4">Optional</span></p>
            <div></div>
            <input name="metadata" className="w-full border-gray rounded-lg mt-2 shadow-md" placeholder="erasers: 3, pens: 12, stocked: 'July 23'..."/>
            <div className="text-gray-500 text-sm mt-2">Enter item: value seperated by a comma</div>
          </div>
          <div className="mt-6 w-full">
            <p className="font-bold text-primary">Collection Name</p>
            <input value={collectionInput} onChange={(e) => setCollectionInput(e.target.value)} name="collection" className="w-full border-gray rounded-lg mt-2 shadow-md" placeholder="OfficeSupplies..."/>
          </div>
          <div className="mt-6 w-full">
            <p className="font-bold text-primary">Project Name</p>
            <input value={projectInput} onChange={(e) => setProjectInput(e.target.value)} name="project" className="w-full border-gray rounded-lg mt-2 shadow-md" placeholder="Walmart..." />
          </div>
          {error && <p className="text-red font-bold text-center my-3">{error}</p>}
          <div className="flex justify-center w-full">
            <button
              onClick={() => { }}
              type="submit"
              disabled={loading}
              className="rounded-md w-full text-center flex justify-center items-center bg-primary py-2 max-w-sm mt-12 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
            >
              {loading ? <ThreeDots width="40px" height="24px" color="white"/>: 'Generate Embedding!' }
            </button>
          </div>
        </form>
        {loading && <p className="w-full text-center mt-4 text-primary">Please do not refresh page</p>}
        
      </div>
    </div>
  )
}