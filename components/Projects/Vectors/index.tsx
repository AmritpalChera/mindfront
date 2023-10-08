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

  const [createBotModalOpen, setCreateBotModalOpen] = useState(false);
  const [createBotLoading, setCreateBotLoading] = useState(false);

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
        className="w-full p-2 shadow bg-white text-black border-gray-300 hover:bg-gray-100 border flex justify-center font-bold rounded-md mt-4 max-w-5xl">
        Add New Vectors
      </button>
    )
  };

  const createChatbotCard = () => {
    return (
      <button onClick={() => setCreateBotModalOpen(true)}
        className="w-full p-2 shadow hover:bg-primary/80 border-gray-300 border flex justify-center font-bold rounded-md mt-4 max-w-5xl bg-primary text-white">
        Create Chatbot
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

  const handleCreateChatbot = async (e) => {
    e.preventDefault();
    if (createBotLoading) return;
    setCreateBotLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps: any = Object.fromEntries(formData);
    const { botId } = await backend.post('/chatbot/create', {
      db: activeProject,
      collection: collectionName,
      name: formProps.name,
      goal: formProps.topic
    }).then(res => res.data);
    setCreateBotLoading(false);
    if (!botId) {
      toast.error('Could not create chatbot');
      return;
    }
    router.push('/chatbot')
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
      {/* {createChatbotCard()} */}
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

      {parentRef && <BaseModal parentElement={parentRef.current} setIsOpen={() => setCreateBotModalOpen(false)} isOpen={(createBotModalOpen)}>
        <div className="bg-white px-6 py-8">
          <h1 className="w-64 sm:w-96 font-bold text-xl">Create Chatbot</h1>
          <form onSubmit={handleCreateChatbot}>
            <div className="mt-2">
              <p>Enter name</p>
              <input required name="name" className="w-full border-gray text-black  rounded-lg shadow-md" placeholder="Lucy Shopkeeper"/>
            </div>
            <div className="mt-4">
              <p>What is the main topic of this collection?</p>
              <input required name="topic" className="w-full border-gray text-black  rounded-lg shadow-md" placeholder="Answers questions on shop's contents"/>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="rounded-md w-64 text-center bg-primary py-2 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </BaseModal>}
    </div>
  )
}