"use client";

import useUserBackend from "@/hooks/useUserBackend";
import { stringToJSON } from "@/utils/app";
import openai from "@/utils/setup/openai";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function UploadAudio({ setUploadType }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const backend = useUserBackend();
  const params = useSearchParams();
  const [project, setProject] = useState(params.get('project') || '');
  const [collection, setCollection] = useState(params.get('collection') || '');
  const router = useRouter();

  const onChangeHandler = async (event) => {
    const file: File = event.target.files[0];
    console.log('selectedFile: ', event.target.files[0]);
    setFile(file);
  };
  
  const handleSubmit = async (e) => {
    if (loading) return;
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps: any = Object.fromEntries(formData);

    const isMetaJson = stringToJSON(formProps.metadata);
    if (!isMetaJson) toast.error("Metadata invalid");

    if (!file) return toast.error('File not uploaded');
    if (file.size > 20000000) throw toast.error('File limit is 20MB');
    const response = await openai.createTranscription(file, 'whisper-1', undefined, 'json', 1, 'en');
    const content = response.data?.text;
    if (!content) return toast.error('Could not transcribe audio');

    try {
      await backend.post('/data/store', {
        db: formProps.project,
        collection: formProps.collection,
        content: content,
        metadata: isMetaJson,
      }).then(res => res.data);
      toast('Complete!');
      e.target.reset();
      router.push(`/dashboard?project=${formProps.project}&collection=${formProps.collection}`);
    } catch (e) {
      console.log(e?.response?.data);
      toast.error('Process failed. Try again');
    }
    setLoading(false);
  }


  return (
    <div className="flex flex-col items-center">
      <div className="max-w-lg w-full">
        <div className="flex gap-4 items-center pb-8 font-bold justify-between">
          <p className="text-2xl">Audio Upload</p>
          <div onClick={()=>setUploadType('')} className="flex items-center text-primary cursor-pointer underline">
            <ArrowLeftOnRectangleIcon className="h-6 w-6"/>
            Return
          </div>
          
        </div>
        <p className="text-gray-700 dark:text-primary">🔊 wav, mp3 - 20MB max</p>
        <div
            onClick={() => { }}
            className={`rounded-md w-full text-center relative flex items-center justify-center ease-in-out ${file? 'bg-green-500' : 'bg-secondary '} py-2 h-9  mt-4 px-8 text-base font-semibold text-white duration-300 ease-in-out cursor-pointer`}
        >
          <input onChange={onChangeHandler} type="file" className="w-full opacity-0 cursor-pointer h-fully left-0 top-0 absolute bg-blue-400" />
          <div>Upload Audio</div>
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
            <input value={collection} onChange={(e) => setCollection(e.target.value)} name="collection" className="w-full border-gray rounded-lg mt-2 shadow-md" placeholder="OfficeSupplies..."/>
          </div>
          <div className="mt-6 w-full">
            <p className="font-bold text-primary">Project Name</p>
            <input value={project} onChange={(e) => setProject(e.target.value)}  name="project" className="w-full border-gray rounded-lg mt-2 shadow-md" placeholder="Walmart..." />
          </div>

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