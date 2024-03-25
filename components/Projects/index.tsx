import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import ProjectsGrid from "./ProjectsGrid";
import Stats from "./Stats";
import Collections from "./Collections";
import { useSearchParams } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Projects() {
  const params = useSearchParams();
  const [projectsList, setProjectsList] = useState([]);
  const [activeProject, setActiveProject] = useState(params.get('project') || '');
  const router = useRouter();

  useEffect(() => {
    const project = params.get('project');
    setActiveProject(project || '');
  }, [params])

  const projects = () => {
    return (
      <div>
        <SectionTitle title="Projects" />
        <div className="flex justify-between items-center">
          <Stats />
          <div onClick={()=>router.push('/new')} className="relative border-primary border shadow flex gap-4 items-center px-8 py-2 rounded-lg text-white bg-primary">

            <PlusCircleIcon className="h-6 w-6" />
            <div className="text-lg ">  Create New</div>
            {projectsList.length === 0 && <div className="absolute left-20 -top-2">
              <Image
                src="/images/vector/cursors.png"
                alt="index-image"
                height={150}
                width={150}
                className="mx-auto max-w-full lg:ml-0 animate-pulse"
              />
            </div>}
          </div>
        </div>
        <div className="mt-12">
          <ProjectsGrid projectsList={projectsList} setProjectsList={setProjectsList}/>
        </div>
        
      </div>
    )
  }; 
  const collections = () => <Collections activeProject={activeProject} />


  return (
   activeProject? collections() : projects()
  )
}