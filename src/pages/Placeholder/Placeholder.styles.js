import styled from "styled-components";

export const PlaceholderContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 40px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const PlaceholderTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #222;
  margin: 0 0 12px;
`;

export const PlaceholderText = styled.p`
  font-size: 16px;
  color: #8c8e8e;
  margin: 0;
`;
