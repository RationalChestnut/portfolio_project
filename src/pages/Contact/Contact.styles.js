import styled from "styled-components";
import { motion } from "framer-motion";

export const ContactContainer = styled.div`
  padding-top: 20vh;
  height: 50vh;
  @media (max-width: 950px) {
    height: 60vh;
    padding-top: 0vh;
    width: 95%;
  }
`;

export const CollaborateText = styled(motion.p)`
  font-size: 28px;
  max-width: 550px;
  line-height: 40px;
  margin: 69.12px 0px 0px;
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding-top: 5%;
  @media (max-width: 1300px) {
    width: 75%;
  }
  @media (max-width: 1150px) {
    width: 80%;
  }
  @media (max-width: 1050px) {
    width: 90%;
  }
  @media (max-width: 950px) {
    flex-direction: column;
  }
`;

export const Link = styled(motion.a).attrs({ target: "_blank" })`
  color: #3366ff;
  font-size: 24px;
  text-decoration: none;
  @media (max-width: 950px) {
    padding: 10px 0px;
  }
`;
