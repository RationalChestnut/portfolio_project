import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { linkData } from "./links.data";
export const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
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
