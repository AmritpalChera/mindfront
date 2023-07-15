import SectionTitle from "../Common/SectionTitle";
import ProjectsGrid from "./ProjectsGrid";
import Stats from "./Stats";

export default function Projects() {
  return (
    <div>
      <SectionTitle title="Projects" />
      <Stats />
      <div className="mt-12">
        <ProjectsGrid />
      </div>
      
    </div>
  )
}