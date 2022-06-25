import React from "react";
import styles from "./Navbar.module.css";
import { linkData } from "./links.data";
export const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navItemsContainer}>
        {linkData.map((link) => {
          return (
            <a href={link.link} key={link.id} className={styles.link}>
              {link.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};
