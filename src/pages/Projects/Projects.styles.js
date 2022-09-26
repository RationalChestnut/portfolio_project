import styled from "styled-components";

export const ProjectsContainer = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
