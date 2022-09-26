import React from "react";
import {
  Divider,
  LastName,
  Link,
  LinksContainer,
  Name,
  NameLink,
  NavigationBarContainer,
} from "./NavigationBar.styles";

export const Navbar = () => {
  return (
    <NavigationBarContainer>
      <Name
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: -25, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          ease: "easeOut",
        }}
      >
        <NameLink href="#">
          Brian K. <LastName>Mason</LastName>
        </NameLink>
      </Name>
      <LinksContainer>
        <Link
          href="#projects"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -25, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          Projects.
        </Link>
        <Link
          href="#contact"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -25, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          Get In Touch.
        </Link>
      </LinksContainer>
      <Divider />
    </NavigationBarContainer>
  );
};
