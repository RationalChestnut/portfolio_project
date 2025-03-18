import React from "react";
import {
  ColorSpan,
  Copyright,
  FooterContainer,
  LinksContainer,
  FooterButtonText,
} from "./Footer.styles";

export const Footer = () => {
  return (
    <FooterContainer>
      <Copyright>
        &#169; Copyright 2025 <ColorSpan>Brian Mason</ColorSpan>
      </Copyright>
      <LinksContainer>
        <FooterButtonText href="https://www.yashdagade.com/" target="_blank">
          Yash →
        </FooterButtonText>
      </LinksContainer>
    </FooterContainer>
  );
};
