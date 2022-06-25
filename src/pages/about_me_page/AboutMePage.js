import React from "react";
import styles from "./AboutMePage.module.css";
import brianMasonPhoto from "../../assets/brian_mason.jpg";
export const AboutMePage = () => {
  return (
    <div className={styles.aboutMePageContainer}>
      <h1 className={styles.title}>Who am I? Not quite sure yet.</h1>
      <div className={styles.mainContent}>
        <img
          src={brianMasonPhoto}
          alt="Brian Mason"
          className={styles.profileImage}
        />
        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionHeader}>What I do know</p>
          <p className={styles.meDescription}>
            I’m a student at Walt Whitman High School who spends his day working
            on companies and coding. I focus on giving others the tools they
            need to better themselves, and to build things that people love
            using(who doesn’t)!
          </p>
        </div>
      </div>
    </div>
  );
};
