import styled from "styled-components";

export const ProjectsContainer = styled.div`
  min-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
