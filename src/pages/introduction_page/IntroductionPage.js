import React from "react";
import styles from "./IntroductionPage.module.css";

export const IntroductionPage = () => {
  return (
    <div className={styles.introductionPageContainer}>
      <hr className={styles.purpleLine} />
      <hr className={styles.blueLine} />
      <div className={styles.circle}>
        <div className={styles.innerDotContainer}>
          <div className={styles.innerDot}></div>
        </div>
      </div>
      <div className={styles.square}>
        <div className={styles.innerSquareContainer}>
          <div className={styles.innerSquare}></div>
        </div>
      </div>
      <div className={styles.triangle}>
        <div className={styles.innerTriangleContainer}>
          <div className={styles.innerTriangle}></div>
        </div>
      </div>
      <div className={styles.textContainer}>
        <p className={styles.text}>Hello, I'm</p>
        <h1 className={styles.name}>Brian Mason</h1>
        <p className={styles.text}>Student Developer, Wannabe Founder</p>
      </div>
    </div>
  );
};
