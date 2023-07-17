import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import ProjectsGrid from "./ProjectsGrid";
import Stats from "./Stats";

export default function Projects() {
  const [activeCollection, setActiveCollection] = useState('');

  const projects = () => {
    return (
      <div>
        <SectionTitle title="Projects" />
        <Stats />
        <div className="mt-12">
          <ProjectsGrid setActiveCollection={setActiveCollection} />
        </div>
        
      </div>
    )
  };

  const collections = () => {
    return (
      <div>
        <SectionTitle title={`Collections > ${activeCollection}`} />
        <div onClick={()=>setActiveCollection('')} className="mt-12 text-primary underline cursor-pointer">
          Return Home
        </div>
        
      </div>
    )
  }


  return (
   activeCollection? collections() : projects()
  )
}