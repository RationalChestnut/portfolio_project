import React from "react";
import { HeroContainer, Highlighter, Tagline } from "./Hero.styles";

export const Hero = () => {
  return (
    <HeroContainer>
      <Tagline
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: -25, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          ease: "easeOut",
        }}
      >
        Programmer<Highlighter>, Founder.</Highlighter>.
      </Tagline>
    </HeroContainer>
  );
};
