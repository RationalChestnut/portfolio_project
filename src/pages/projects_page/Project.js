import React from "react";
import styles from "./Project.module.css";
export const Project = ({ title, description, image, color, rotate }) => {
  return (
    <div className={styles.projectContainer} style={{ backgroundColor: color }}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <img
        src={image}
        alt={title}
        className={`${styles.projectImage} ${
          rotate === "clockwise" ? styles.clockwise : styles.counterclockwise
        }`}
      />
    </div>
  );
};
