import React from "react";
import {
  ColorSpan,
  Copyright,
  FooterContainer,
  Link,
  LinksContainer,
} from "./Footer.styles";

export const Footer = () => {
  return (
    <FooterContainer>
      <Copyright>
        &#169; Copyright 2022 <ColorSpan>Brian Mason Ltd.</ColorSpan>
      </Copyright>
      <LinksContainer>
        <Link href="#">Home</Link>
        <Link
          href="mailto:brian.kw.mason@gmail.com?subject=Mail from website"
          target="_blank"
        >
          Email
        </Link>
      </LinksContainer>
    </FooterContainer>
  );
};
