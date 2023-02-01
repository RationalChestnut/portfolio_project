import styled from "styled-components";
import { motion } from "framer-motion";

export const ProjectContainer = styled(motion.div)`
  padding: 25px 0px;
  padding-right: 10px;
`;

export const ProjectName = styled.h2`
  @media screen and (max-width: 950px) {
    font-size: 28px;
  }
`;

export const ProjectRole = styled.p`
  @media screen and (max-width: 950px) {
    font-size: 18px;
  }
`;

export const Image = styled.img`
  max-width: 400px;
  max-height: 400px;
  border-radius: 10px;
  align-self: center;
  @media screen and (max-width: 1280px) {
    width: 375px;
  }
  @media screen and (max-width: 1180px) {
    width: 325px;
  }
  @media screen and (max-width: 700px) {
    width: 80%;
  }
`;

export const ListItem = styled.p`
  @media screen and (max-width: 950px) {
    font-size: 18px;
  }
  @media screen and (max-width: 600px) {
    font-size: 16px;
    max-width: 90%;
  }
`;

export const Link = styled.a`
  color: #222;
  text-decoration: none;
  @media screen and (max-width: 950px) {
    font-size: 18px;
  }
`;
