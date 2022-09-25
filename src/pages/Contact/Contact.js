import React from "react";
import {
  CollaborateText,
  ContactContainer,
  Link,
  LinkContainer,
} from "./Contact.styles";

export const Contact = () => {
  return (
    <ContactContainer>
      <CollaborateText>
        Want to work on something awesome? I'm available.
      </CollaborateText>
      <CollaborateText>
        If you need custom work or want to collaborate, choose your method of
        contacting me:
      </CollaborateText>
      <LinkContainer>
        <Link href="mailto:brian.kw.mason@gmail.com?subject=Mail from website">
          brian.kw.mason@gmail.com
        </Link>
        <Link href="https://github.com/RationalChestnut">github</Link>
        <Link href="https://www.instagram.com/brian___mason/">instagram</Link>
      </LinkContainer>
    </ContactContainer>
  );
};
