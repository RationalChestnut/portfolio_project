import React from "react";
import { Project } from "./Project";
import { ProjectsContainer } from "./Projects.styles";
import { projectsData } from "./ProjectsData.data";
export const Projects = () => {
  return (
    <ProjectsContainer id="project">
      {projectsData.map((project, index) => {
        return (
          <Project project={project} left={index & (2 == 0)} key={index} />
        );
      })}
    </ProjectsContainer>
  );
};
