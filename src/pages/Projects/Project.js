import React from "react";
import {
  Link,
  ListItem,
  ProjectContainer,
  ProjectRole,
} from "./Project.styles";
import { ProjectName, Image } from "./Project.styles";

export const Project = ({ project, left }) => {
  return (
    <ProjectContainer
      initial={left ? { x: -50 } : { x: 50 }}
      whileInView={{ x: 0 }}
      transition={{ ease: "linear", duration: 0.25 }}
    >
      <Image src={project.image} />
      <ProjectName>{project.name}</ProjectName>
      <ProjectRole>{project.role}</ProjectRole>
      {project.highlights.map((highlight, index) => (
        <ListItem key={index}>- {highlight}</ListItem>
      ))}
      <Link href={project.link} target="_blank">
        Link
      </Link>
    </ProjectContainer>
  );
};
