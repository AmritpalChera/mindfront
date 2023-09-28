import useUserBackend from "@/hooks/useUserBackend";
import { stringToJSON } from "@/utils/app";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function UploadText({ setUploadType }) {
  const backend = useUserBackend();
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const [projectInput, setProjectInput] = useState(params.get('project') || '');
  const [collectionInput, setCollectionInput] = useState(params.get('collection') || '');
  const [textInput, setTextInput] = useState(params.get('text') || '');
  const [metadata, setMetadata] = useState(params.get('metadata') || '');
  const [returnPath] = useState(localStorage.getItem('uploadReturn'));
  const [vectorId] = useState(params.get('id') || '');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleReturn = () => {
    if (returnPath) {
      localStorage.removeItem('uploadReturn');
      return router.push(returnPath)
    };
    setUploadType('');
  }

  const formSubmitted = async (e) => {
    if (loading) return;
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps: any = Object.fromEntries(formData);
  
    const isMetaJson = stringToJSON(formProps.metadata);
    console.log('is metadata: ', isMetaJson);
    if (!isMetaJson) toast.error("Metadata invalid");

    else {

      try {
        await backend.post('/data/store', {
          db: formProps.project,
          collection: formProps.collection,
          content: formProps.text,
          metadata: isMetaJson,
          vectorId: vectorId
        }).then(res => res.data);
        toast('Complete!');
        e.target.reset();
        setProjectInput('');
        setCollectionInput('');
        if (returnPath) handleReturn();
        else router.push(`/dashboard?project=${formProps.project}&collection=${formProps.collection}`);
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
          <p className="text-2xl">Text Upload</p>
          <div onClick={handleReturn} className="flex items-center text-primary cursor-pointer underline">
            <ArrowLeftOnRectangleIcon className="h-6 w-6"/>
            Return
          </div>
          
        </div>
        <form onSubmit={formSubmitted}>
          <div className="font-bold text-primary">Copy & paste text here</div>
          <textarea value={textInput} onChange={(e)=>setTextInput(e.target.value)} name="text" className="w-full dark:bg-secondary rounded-lg border-gray shadow-md mt-2" placeholder="Enter text here..." />
          <div className="mt-6 w-full">
            <p className="font-bold text-primary flex justify-between">Metadata <span className="text-gray-500 text-sm ml-4">Optional</span></p>
            <div></div>
            <input value={metadata} onChange={(e)=>setMetadata(e.target.value)} name="metadata" className="w-full dark:bg-secondary border-gray rounded-lg mt-2 shadow-md" placeholder="erasers: 3, pens: 12, stocked: 'July 23'..."/>
            <div className="text-gray-500 text-sm mt-2">Enter item: value seperated by a comma</div>
          </div>
          <div className="mt-6 w-full">
            <p className="font-bold text-primary">Collection Name</p>
            <input value={collectionInput} onChange={(e) => setCollectionInput(e.target.value)} name="collection" className="w-full dark:bg-secondary border-gray rounded-lg mt-2 shadow-md" placeholder="OfficeSupplies..."/>
          </div>
          <div className="mt-6 w-full">
            <p className="font-bold text-primary">Project Name</p>
            <input value={projectInput} onChange={(e)=>setProjectInput(e.target.value)} name="project" className="w-full border-gray dark:bg-secondary rounded-lg mt-2 shadow-md" placeholder="Walmart..." />
          </div>
          {error && <p className="text-red font-bold text-center my-3">{error}</p>}
          <div className="flex justify-center w-full">
            <button
              onClick={() => { }}
              type="submit"
              disabled={loading}
              className="rounded-md w-full text-center bg-primary h-12 py-2 max-w-sm mt-12 flex justify-center items-center px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
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