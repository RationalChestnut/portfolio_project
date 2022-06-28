import React from "react";
import styles from "./Contact.module.css";
import { Social } from "./Social.component";
import { socialData } from "./Social.data";
export const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Get In Touch</h1>
        <p className={styles.info}>
          If you wanna get in touch, work on something awesome, or just say hi,
          send an email to {""}
          <span className={styles.email}>
            <a
              className={styles.email}
              target="_blank"
              rel="noreferrer"
              href="mailto:brian.kw.mason@gmail.com"
            >
              brian.kw.mason@gmail.com
            </a>
          </span>
        </p>
        <h1 className={styles.socialTitle}>Socials</h1>
        <div className={styles.socialIconContainer}>
          {socialData.map((icon, index) => {
            return (
              <Social
                key={`${index}-icon`}
                name={icon.name}
                link={icon.link}
                icon={icon.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
