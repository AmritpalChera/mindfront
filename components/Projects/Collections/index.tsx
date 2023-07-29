import BaseModal from "@/atoms/Modal";
import SectionTitle from "@/components/Common/SectionTitle";
import useUserBackend from "@/hooks/useUserBackend";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { Oval, ThreeDots } from "react-loader-spinner";
import Vectors from "../Vectors";
import CollectionMenu from "./Menu";

type collectionType = {
  collection: string,
  totalVectors: number,
  collectionId: string
}

export default function Collections({ activeProject }) {
  const [collections, setCollections] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(-1); // selected collection to delete
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [loadingCollections, setLoadingCollections] = useState(false);

  const params = useSearchParams();


  const [collectionName, setCollectionName] = useState(params.get('collection') || '');

  useEffect(() => {
    const collection = params.get('collection');
    setCollectionName(collection || '');
  }, [params]);

  const parentRef = useRef();
  const router = useRouter();

  const backend = useUserBackend();

  const getCollections = async () => {
    setLoadingCollections(true);
    const data = await backend.post("/collection/list", { db: activeProject }).then(res => res.data).catch(err => err?.response?.data);
    if (data) setCollections(data.data);
    setLoadingCollections(false);
  }
  useEffect(() => {
    getCollections();
  }, []);
  
  const createCard = () => {
    return (
      <button onClick={()=>router.push(`/new?project=${activeProject}`)}
        className="w-full p-2 shadow hover:bg-primary/80 border-gray-300 border flex justify-center font-bold rounded-md mt-4 max-w-5xl bg-primary text-white">
        Create New Collection
      </button>
    )
  };

  const handleDeleteCollection = async () => {
    setDeleteLoading(true);
    const deleted = await backend.post('/collection/delete', { db: activeProject, collection: collections[isDeleteModalOpen].collection }).then(res => res.data).catch(err => console.log(err?.response?.data));
    if (!deleted) toast.error('Could not delete colletion');
    else {
      toast('Collection deleted');
      setCollections((prevCollec) => {
        let prev = prevCollec;
        prev.splice(isDeleteModalOpen, 1)
        return prev;
      });
    }
    setDeleteLoading(false);
    setIsDeleteModalOpen(-1);
  }

  const handleActionClick = (action: string, index: number) => {
    if (action === 'test') {
    } else if (action === 'vectors') {
      router.push(`/dashboard?project=${activeProject}&collection=${collections[index].collection}`)
    } else if (action === 'delete') {
      setIsDeleteModalOpen(index);
    }
  }

  const collectionCard = (collection: collectionType, index: number) => {
    return (
      <div key={collection.collection} className="shadow border-gray-300 border rounded-md  mt-4  w-full p-2">
        <div  className="w-full justify-between flex">
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-bold md:text-xl text-sm max-w-[200px] md:max-w-[400px] text-ellipsis overflow-clip whitespace-pre">{collection.collection}</p>
          </div>
          <CollectionMenu handleActionClick={handleActionClick} index={index} />
        </div>
        
        <div className="flex mt-2 md:mt-0 "> 
          <p className=" text-gray max-w-[200px] md:w-fit text-ellipsis whitespace-pre overflow-clip md:overflow-auto">
            {collection.totalVectors} </p> <p>vectors</p>
        </div>
       
      </div>
    )
  }
  
  if (collectionName) {
    return <Vectors activeProject={activeProject} collectionName={collectionName}/>
  }

  const handleReturn = () => {
    router.push('/dashboard')
  }

  return (
    <div ref={parentRef} className="max-w-5xl ">
      <SectionTitle title={`Collections`} paragraph={"Project: " +activeProject} />
      <div onClick={handleReturn} className="mt-12 text-primary underline cursor-pointer">
        Return Home
      </div>
      <div className="text-sm text-gray mt-4">{collections.length} results</div>
      {createCard()}
      {
        loadingCollections? <div className="flex w-full justify-center mt-6"><Oval /></div>  :  collections.map((collection, index) => collectionCard(collection, index))
      }
      {parentRef && <BaseModal parentElement={parentRef.current} setIsOpen={setIsDeleteModalOpen} isOpen={(isDeleteModalOpen > -1)}>
        <div className="bg-dark px-6 py-8">
          <div className="text-xl text-white">Are you sure you want to delete this collection?</div>
          <div className="flex gap-4 justify-end mt-4">
            <button onClick={() => setIsDeleteModalOpen(-1)} className="border px-4 py-1 rounded-md border-gray bg-white shadow text-black cursor-pointer">Close</button>
            <button disabled={deleteLoading} onClick={handleDeleteCollection} className="border px-4 py-1 w-24 flex justify-center items-center rounded-md border-gray shadow bg-red text-white cursor-pointer">{deleteLoading ? <ThreeDots width={"30px"} height={'20px'} color="white"/> : 'Delete'}</button>
          </div>
        </div>
      </BaseModal>}
    </div>
  )
}