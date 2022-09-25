import React from "react";
import {
  LastName,
  Link,
  LinksContainer,
  Name,
  NavigationBarContainer,
} from "./NavigationBar.styles";
export const Navbar = () => {
  return (
    <NavigationBarContainer>
      <Name>
        Brian K. <LastName>Mason</LastName>
      </Name>
      <LinksContainer>
        <Link>Projects.</Link>
        <Link>Get In Touch.</Link>
      </LinksContainer>
    </NavigationBarContainer>
  );
};
