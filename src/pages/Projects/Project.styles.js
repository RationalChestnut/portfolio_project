import styled from "styled-components";
import { motion } from "framer-motion";

export const ProjectContainer = styled(motion.div)`
  padding: 25px 0px;
  padding-right: 10px;
`;

export const ProjectName = styled.h2`
  @media (max-width: 950px) {
    font-size: 28px;
  }
`;

export const ProjectRole = styled.p`
  @media (max-width: 950px) {
    font-size: 18px;
  }
`;

export const Image = styled.img`
  width: 400px;
  border-radius: 10px;
  @media (max-width: 1280px) {
    width: 375px;
  }
  @media (max-width: 1180px) {
    width: 325px;
  }
  @media (max-width: 700px) {
    width: 80%;
  }
`;

export const ListItem = styled.p`
  @media (max-width: 950px) {
    font-size: 18px;
  }
`;

export const Link = styled.a`
  color: #222;
  text-decoration: none;
  @media (max-width: 950px) {
    font-size: 18px;
  }
`;
