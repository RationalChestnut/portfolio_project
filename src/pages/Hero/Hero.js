import React from "react";
import { HeroContainer, Highlighter, Tagline } from "./Hero.styles";

export const Hero = () => {
  return (
    <HeroContainer>
      <Tagline>
        I make <Highlighter>websites & mobile apps</Highlighter>.
      </Tagline>
    </HeroContainer>
  );
};
