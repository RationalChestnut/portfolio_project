import React from "react";
import styles from "./Social.module.css";
export const Social = ({ name, image, link }) => {
  return (
    <a href={link} className={styles.link}>
      <div className={styles.socialContainer}>
        <img src={image} alt={name} className={styles.icon} />
        <p className={styles.iconName}>{name}</p>
      </div>
    </a>
  );
};
