import styled from "styled-components";

export const ContentContainer = styled.div`
  width: 58%;
  min-height: 100%;
  padding-right: 5%;
  @media (max-width: 1650px) {
    width: 80%;
  }
  @media (max-width: 1500px) {
    width: 90%;
  }
  @media (max-width: 1450px) {
    width: 100%;
    padding-right: 0px;
  }
  @media (max-width: 1280px) {
    padding-right: 5px;
  }
  @media (max-width: 950px) {
    width: 100%;
    padding-left: 30px;
  }
`;
