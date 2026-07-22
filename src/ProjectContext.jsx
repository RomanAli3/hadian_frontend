import { createContext, useState } from "react";

export const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(null);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;