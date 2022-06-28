import React from "react";
import styles from "./Social.module.css";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
export const Social = ({ name, link }) => {
  return (
    <a href={link} className={styles.link} target="_blank" rel="noreferrer">
      <div className={styles.socialContainer}>
        {name === "Github" ? (
          <AiFillGithub className={styles.icon} />
        ) : (
          <AiFillInstagram className={styles.icon} />
        )}
        <p className={styles.iconName}>{name}</p>
      </div>
    </a>
  );
};
