import BaseModal from "@/atoms/Modal";
import SectionTitle from "@/components/Common/SectionTitle";
import useUserBackend from "@/hooks/useUserBackend";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Oval, ThreeDots } from "react-loader-spinner";
import { JSONtoString } from "@/utils/app";
import Filters from "./Filters";
import VectorCard from "./Card";


interface VectorsInterface {
  activeProject: string,
  collectionName: string
}

export default function Vectors({ activeProject, collectionName } : VectorsInterface) {
  const [vectors, setVectors] = useState([]);
  const [totalVector, setTotalVectors] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(-1); // selected collection to delete
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filtersApplied, setFilterApplied] = useState(false);
  const [loadingVectors, setLoadingVectors] = useState(false);
  const [activeChatIndex, setActiveChatIndex] = useState(-1);
  const [search, setSearch] = useState('');

  const parentRef = useRef();
  const router = useRouter();

  const backend = useUserBackend();

  const getVectors = async () => {
    setLoadingVectors(true)
    const data = await backend.post("/collection/vectors", { db: activeProject, collection: collectionName }).then(res => res.data).catch(err => err?.response?.data);
    if (data && data?.data?.length > 0) {
      setVectors(data.data);
      setTotalVectors(data.count)
    }
    setLoadingVectors(false);
  }
  useEffect(() => {
    if (!filtersApplied) getVectors();
  }, [filtersApplied]);


  const handleCreateVector = () => {
    localStorage.setItem('uploadReturn', `/dashboard?project=${activeProject}&collection=${collectionName}`);
    router.push(`/new?project=${activeProject}&collection=${collectionName}`)
  }
  
  const createCard = () => {
    return (
      <button onClick={handleCreateVector}
        className="w-full p-2 shadow hover:bg-primary/80 border-gray-300 border flex justify-center font-bold rounded-md mt-4 max-w-5xl bg-primary text-white">
        Create New Vectors
      </button>
    )
  };

  const handleDeleteVector = async () => {
    setDeleteLoading(true);
    console.log(`${activeProject}-${vectors[isDeleteModalOpen].collection}`);
    const deleted = await backend.post('/data/delete', { db: activeProject, collection: collectionName, vectorIds: [vectors[isDeleteModalOpen].id] }).then(res => res.data).catch(err => console.log(err?.response?.data));
    if (!deleted) toast.error('Could not delete vector');
    else {
      toast('Vector deleted');
      setVectors((prevCollec) => {
        let prev = prevCollec;
        prev.splice(isDeleteModalOpen, 1)
        return prev;
      });
    }
    setDeleteLoading(false);
    setIsDeleteModalOpen(-1);
  }

  const handleUpdateVector = (index: number) => {
    localStorage.setItem('uploadReturn', `/dashboard?project=${activeProject}&collection=${collectionName}`);
    const vector = vectors[index];
    const vectorText = vector.metadata.content;
    delete vector.metadata.content;
    const metaDataString = JSONtoString(vector.metadata);
    router.push(`/new?uploadtype=text&metadata=${metaDataString || ''}&text=${vectorText || ''}&project=${activeProject || ''}&collection=${collectionName || ''}&id=${vector.id}`)
    return;
  }

  const handleActionClick = (action: string, index: number) => {
    // console.log('collection is: ', collectionName, 'at index: ', index, 'with action: ', action)
    if (action === 'update') {
      handleUpdateVector(index);
    } else if (action === 'delete') {
      setIsDeleteModalOpen(index);
    }
  }


  const handleReturn = () => {
    router.push(`/dashboard?project=${activeProject}`)
  }

  return (
    <div ref={parentRef} className="max-w-5xl ">
      <SectionTitle title={`Vectors`} paragraph={"Collection: " + collectionName + " of " + activeProject} />
      <div onClick={handleReturn} className="mt-12 text-primary underline cursor-pointer">
        Return Home
      </div>
      <div className="text-sm text-gray mt-4">Showing {vectors.length} of {totalVector} vectors</div>
      {createCard()}
      <Filters searchValue={search} setSearch={setSearch} filtersApplied={filtersApplied} setFiltersApplied={setFilterApplied} setVectors={setVectors}  activeProject={activeProject} collectionName={collectionName}/>
     
      {
        loadingVectors ? <div className="flex w-full justify-center"><Oval /> </div> :
          vectors.map((vector, index) => <VectorCard filtersApplied={filtersApplied} activeChatIndex={activeChatIndex} search={search} setActiveChatIndex={setActiveChatIndex} key={vector.id} vector={vector} index={index} handleActionClick={handleActionClick} />)
      }
      {parentRef && <BaseModal parentElement={parentRef.current} setIsOpen={setIsDeleteModalOpen} isOpen={(isDeleteModalOpen > -1)}>
        <div className="bg-dark px-6 py-8">
          <div className="text-xl text-white">Are you sure you want to delete this vector?</div>
          <div className="flex gap-4 justify-end mt-4">
            <button onClick={() => setIsDeleteModalOpen(-1)} className="border px-4 py-1 rounded-md border-gray bg-white shadow text-black cursor-pointer">Close</button>
            <button disabled={deleteLoading} onClick={handleDeleteVector} className="border px-4 py-1 w-24 flex justify-center items-center rounded-md border-gray shadow bg-red text-white cursor-pointer">{deleteLoading ? <ThreeDots width={"30px"} height={'20px'} color="white"/> : 'Delete'}</button>
          </div>
        </div>
      </BaseModal>}
    </div>
  )
}