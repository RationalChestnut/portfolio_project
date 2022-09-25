import React from "react";
import { Project } from "./Project";
import { ProjectsContainer } from "./Projects.styles";
import { projectsData } from "./ProjectsData.data";
export const Projects = () => {
  return (
    <ProjectsContainer>
      {projectsData.map((project) => {
        return <Project project={project} />;
      })}
    </ProjectsContainer>
  );
};
