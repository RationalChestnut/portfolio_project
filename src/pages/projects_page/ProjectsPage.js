import React from "react";
import styles from "./ProjectsPage.module.css";
import { projectsData } from "./ProjectsData.data";
import { Project } from "./Project";
export const ProjectsPage = () => {
  return (
    <div className={styles.projectsPageContainer}>
      <h1 className={styles.projectsHeader}>Projects</h1>
      <div className={styles.projectsContainer}>
        {projectsData.map((item, index) => {
          return (
            <Project
              key={`${item.id}-project-${index}`}
              title={item.name}
              description={item.description}
              image={item.image}
              color={item.color}
              rotate={item.rotate}
            />
          );
        })}
      </div>
    </div>
  );
};
