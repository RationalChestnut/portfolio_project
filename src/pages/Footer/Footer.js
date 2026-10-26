import React from "react";
import {
  ColorSpan,
  Copyright,
  FooterContainer,
  LinksContainer,
  FooterButtonText,
  ContactContainer,
  ContactLink,
} from "./Footer.styles";

export const Footer = () => {
  return (
    <FooterContainer>
      <ContactContainer>
        <ContactLink
          href="mailto:brian.kw.mason@gmail.com?subject=Mail from website"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          brian.kw.mason@gmail.com
        </ContactLink>
        <ContactLink
          href="https://github.com/RationalChestnut"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          linkedin
        </ContactLink>
        <ContactLink
          href="https://github.com/RationalChestnut"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          instagram
        </ContactLink>
      </ContactContainer>
      <LinksContainer>
        <FooterButtonText href="https://www.yashdagade.com/" target="_blank">
          Yash →
        </FooterButtonText>
      </LinksContainer>
    </FooterContainer>
  );
};
