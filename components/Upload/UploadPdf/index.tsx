"use client";

import useUserBackendForm from "@/hooks/useUserBackendForm";
import { stringToJSON } from "@/utils/app";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function UploadPdf({ setUploadType }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const backend = useUserBackendForm();
  const params = useSearchParams();
  const [project, setProject] = useState(params.get('project') || '');
  const router = useRouter();
  const [error, setError] = useState('');

  const onChangeHandler = async (event) => {
    const file: File = event.target.files[0];
    setFile(file);
  };
  
  const handleSubmit = async (e) => {
    if (loading) return;
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps: any = Object.fromEntries(formData);
    const isMetaJson = stringToJSON(formProps.metadata);
    if (file.size > 20000000) toast.error('File limit is 20MB');
    else if (!isMetaJson) toast.error("Metadata invalid");
    else {
      const data = new FormData();
      
      data.append('file', file);
      data.append('db', formProps.project);
      data.append('collection', formProps.collection);
      data.append('metadata', JSON.stringify(isMetaJson));
      data.append('type', 'pdf');
      
      try {
        await backend.post('/data/store/file', data);
        toast('Complete!');
        router.push(`/dashboard?project=${formProps.project}&collection=${formProps.collection}`)
        e.target.reset();
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
          <p className="text-2xl">PDF Upload</p>
          <div onClick={()=>setUploadType('')} className="flex items-center text-primary cursor-pointer underline">
            <ArrowLeftOnRectangleIcon className="h-6 w-6"/>
            Return
          </div>
          
        </div>
       <div className="text-gray-700">20MB max</div>
        <div
            onClick={() => { }}
            className={`rounded-md w-full text-center relative flex items-center justify-center ease-in-out ${file? 'bg-green-700' : 'bg-red '} py-2 h-9  mt-4 px-8 text-base font-semibold text-white duration-300 ease-in-out cursor-pointer`}
        >
          <input accept=".pdf" onChange={onChangeHandler} type="file" className="w-full opacity-0 cursor-pointer h-fully left-0 top-0 absolute bg-blue-400" />
          <div>Upload PDF</div>
          </div>
        <div className="text-sm mt-2"><span className=" text-primary font-bold">Uploaded file:</span> {file?.name}</div>
        <form onSubmit={handleSubmit}>
          <div className="mt-6 w-full">
            <p className="font-bold text-primary flex justify-between">Metadata <span className="text-gray-500 text-sm ml-4">Optional</span></p>
            <div></div>
            <input name="metadata" className="w-full border-gray rounded-lg mt-2 shadow-md" placeholder="erasers: 3, pens: 12, stocked: 'July 23'..."/>
            <div className="text-gray-500 text-sm mt-2">Enter item: value seperated by a comma</div>
          </div>
          <div className="mt-6 w-full">
            <p className="font-bold text-primary">Collection Name</p>
            <input name="collection" className="w-full border-gray rounded-lg mt-2 shadow-md" placeholder="OfficeSupplies..."/>
          </div>
          <div className="mt-6 w-full">
            <p className="font-bold text-primary">Project Name</p>
            <input value={project} onChange={(e) => setProject(e.target.value)}  name="project" className="w-full border-gray rounded-lg mt-2 shadow-md" placeholder="Walmart..." />
          </div>
          {error && <p className="text-red font-bold text-center my-3">{error}</p>}
          <div className="flex justify-center w-full">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md w-full text-center flex justify-center items-center bg-primary py-2 max-w-sm mt-12 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
            >
              {loading? <ThreeDots width="40px" height="24px" color="white"/>: 'Generate Embedding!'}
            </button>
          </div>
        </form>
       {loading && <p className="w-full text-center mt-4 text-primary">Please do not refresh page</p>}
        
      </div>
    </div>
  )
}