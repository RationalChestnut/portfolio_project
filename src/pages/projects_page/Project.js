import React from "react";
import styles from "./Project.module.css";
export const Project = ({
  title,
  description,
  image,
  color,
  rotate,
  secondaryColor,
  techList,
  myRoleText,
  highlightsList,
  link,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.front} style={{ backgroundColor: color }}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <img
            src={image}
            alt={title}
            className={`${styles.projectImage} ${
              rotate === "clockwise"
                ? styles.clockwise
                : styles.counterclockwise
            }`}
          />
        </div>
        <div
          className={styles.back}
          style={{ backgroundColor: secondaryColor }}
        >
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.info}>
            <h4 className={styles.highlightText}>My Role</h4>
            <p className={styles.role}>{myRoleText}</p>
            <h4 className={styles.highlightText}>Tech Used</h4>
            <ul className={styles.list}>
              {techList.map((tech) => {
                return <li className={styles.item}>{tech}</li>;
              })}
            </ul>

            <h4 className={styles.highlightText}>Highlights</h4>
            <ul className={styles.list}>
              {highlightsList.map((highlight) => {
                return <li className={styles.item}>{highlight}</li>;
              })}
            </ul>
            <div className={styles.repoContainer}>
              <a
                href={link}
                alt={link}
                className={styles.repo}
                rel="noreferrer"
                target="_blank"
              >
                Link to Github Repo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
