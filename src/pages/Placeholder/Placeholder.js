import React from "react";
import {
  PlaceholderContainer,
  PlaceholderText,
  PlaceholderTitle,
} from "./Placeholder.styles";

export const Placeholder = ({ title }) => {
  return (
    <PlaceholderContainer>
      <PlaceholderTitle>{title}</PlaceholderTitle>
      <PlaceholderText>Coming soon.</PlaceholderText>
    </PlaceholderContainer>
  );
};
