import React from "react";
import {
  CollaborateText,
  ContactContainer,
  Link,
  LinkContainer,
} from "./Contact.styles";

export const Contact = () => {
  return (
    <ContactContainer id="contact">
      <CollaborateText
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
      >
        Want to work on something awesome? I'm available.
      </CollaborateText>
      <CollaborateText
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "linear", duration: 0.5 }}
      >
        If you need custom work or want to collaborate, choose your method of
        contacting me:
      </CollaborateText>
      <LinkContainer>
        <Link
          href="mailto:brian.kw.mason@gmail.com?subject=Mail from website"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          brian.kw.mason@gmail.com
        </Link>
        <Link
          href="https://github.com/RationalChestnut"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          github
        </Link>
        <Link
          href="https://www.instagram.com/brian___mason/"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          instagram
        </Link>
      </LinkContainer>
    </ContactContainer>
  );
};
