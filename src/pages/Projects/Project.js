import React from "react";
import {
  Link,
  ListItem,
  ProjectContainer,
  ProjectRole,
} from "./Project.styles";
import { ProjectName, Image } from "./Project.styles";

export const Project = ({ project }) => {
  return (
    <ProjectContainer>
      <Image src={project.image} />
      <ProjectName>{project.name}</ProjectName>
      <ProjectRole>{project.role}</ProjectRole>
      {project.highlights.map((highlight) => (
        <ListItem>- {highlight}</ListItem>
      ))}
      <Link href={project.link} target="_blank">
        Link
      </Link>
    </ProjectContainer>
  );
};
