import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  @media screen and (max-width: 950px) {
    min-height: 60vh;
    width: 90%;
  }
`;

export const Tagline = styled(motion.h1)`
  font-size: 52px;
  font-weight: 600;
  @media screen and (max-width: 950px) {
    font-size: 40px;
  }
`;

export const Highlighter = styled.span`
  color: #8c8e8e;
`;
