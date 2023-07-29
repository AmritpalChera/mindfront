import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import ProjectsGrid from "./ProjectsGrid";
import Stats from "./Stats";
import Collections from "./Collections";
import { useSearchParams } from "next/navigation";

export default function Projects() {
  const params = useSearchParams();
  const [activeProject, setActiveProject] = useState(params.get('project') || '');

  useEffect(() => {
    const project = params.get('project');
    setActiveProject(project || '');
  }, [params])

  const projects = () => {
    return (
      <div>
        <SectionTitle title="Projects" />
        <Stats />
        <div className="mt-12">
          <ProjectsGrid />
        </div>
        
      </div>
    )
  };

  const collections = () => <Collections activeProject={activeProject} />


  return (
   activeProject? collections() : projects()
  )
}