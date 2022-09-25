import React from "react";
import { ContentContainer } from "./Content.styles";
import { Hero } from "./Hero/Hero";
import { Projects } from "./Projects/Projects";

export const Content = () => {
  return (
    <ContentContainer>
      <Hero />
      <Projects />
    </ContentContainer>
  );
};
