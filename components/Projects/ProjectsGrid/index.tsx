
"use client";

import useUserBackend from "@/hooks/useUserBackend";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProjectsMenu from "./Menu";
import BaseModal from "@/atoms/Modal";
import { Oval, ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import Image from "next/image";

type ProjectType = {
  projectName: string;
  lastUpdated: Date;
  totalVectors: number;
  collectionCount: number;
}

export default function ProjectsGrid() {
  const userBackend = useUserBackend();
  const [projectsList, setProjectsList] = useState([]);
  const router = useRouter();
  const parentRef = useRef();
  const [loading, setLoading] = useState(true);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(-1);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const backend = useUserBackend();

  const getProjectsList = async () => {
    setLoading(true)
    const list = await userBackend.post('/db/list', {}).then(res => res.data).catch(err => {
      console.log(err?.response?.data);
    });
    if (list?.success) setProjectsList(list.projects)
    setLoading(false);
  };

  useEffect(() => {
    getProjectsList();
  }, [])

  const createCard = () => {
    return (
      <div onClick={()=>router.push('/new')} className="w-64  relative rounded-xl border-2 border-gray-200 text-white dark:text-black dark:bg-white bg-secondary  cursor-pointer h-64 font-medium flex flex-col items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span className="mt-4 text-lg ">Create New</span>
        {projectsList.length === 0 && <div className="absolute -right-20 top-4">
          <Image
            src="/images/vector/cursors.png"
            alt="index-image"
            height={150}
            width={150}
            className="mx-auto max-w-full lg:mr-0 animate-pulse"
          />
        </div>}
      </div>
    )
  }

  const handleDeleteProject = async () => {
    setDeleteLoading(true);
    const deleted = await backend.post('/db/delete', { db: projectsList[deleteConfirmModal].projectName }).then(res => res.data).catch(err => console.log(err?.response?.data));
    if (!deleted) toast.error('Could not delete project');
    else {
      toast('Project deleted');
      setProjectsList((prevCollec) => {
        let prev = prevCollec;
        prev.splice(deleteConfirmModal, 1)
        return prev;
      });
    }
    setDeleteLoading(false);
    setDeleteConfirmModal(-1);
  }

  const handleOptionsClick = (action: string, index: number) => {
    if (action === 'delete') {
      setDeleteConfirmModal(index);
    }
  }

  const projectCard = (project: ProjectType, index: number) => {
    return (
      <div key={project.projectName} className="w-64 rounded-xl border-2 border-gray-200 h-64 shadow-md shadow-gray flex flex-col p-4  dark:bg-secondary">
        <div className="flex justify-between">
          <p className="text-xl font-bold overflow-clip text-ellipsis">
            {project.projectName}
          </p>
          {/* <p className="underline text-primary">
            export
          </p> */}
          <ProjectsMenu index={index} handleActionClick={handleOptionsClick} />
        </div>
        
        <div className="text-gray-500 mt-3 gap-3 flex flex-col  flex-1">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
            <span>{project.collectionCount} collections</span>
          </div>
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09" />
            </svg>
            <span>{project.totalVectors} stored objects</span>
          </div>
          <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg>

            <span>Updated {new Date(project.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>
        <div>
          <div
            onClick={()=>router.push(`/dashboard?project=${project.projectName}`)}
            className="rounded-md text-center bg-primary py-2 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
          >
            Collections
          </div>
        </div>
        
      </div>
    )
  }

  if (loading) {
    return <Oval />
  }
  
  return (
    <div className="flex flex-wrap gap-8" ref={parentRef}>
      {createCard()}
      {projectsList.map((project, index) => projectCard(project, index))}
      {parentRef && <BaseModal parentElement={parentRef.current} setIsOpen={setDeleteConfirmModal} isOpen={(deleteConfirmModal > -1)}>
        <div className="bg-dark px-6 py-8">
          <div className="text-xl text-white">Are you sure you want to delete this collection?</div>
          <div className="flex gap-4 justify-end mt-4">
            <button onClick={() => setDeleteConfirmModal(-1)} className="border px-4 py-1 rounded-md border-gray bg-white shadow text-black cursor-pointer">Close</button>
            <button disabled={deleteLoading} onClick={handleDeleteProject} className="border px-4 py-1 w-24 flex justify-center items-center rounded-md border-gray shadow bg-red text-white cursor-pointer">{deleteLoading ? <ThreeDots width={"30px"} height={'20px'} color="white"/> : 'Delete'}</button>
          </div>
        </div>
      </BaseModal>}
    </div>
  )
}