import styled from "styled-components";
import { motion } from "framer-motion";

export const NavigationBarContainer = styled(motion.div)`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: column
  align-items: flex-start;
  width: 42%;
  height: 100vh;
  padding-top: 10vh;
  padding-left: 5%;
  align-self: flex-start;
  @media screen and (max-width: 1650px) {
    width: 45%;
  }
  @media screen and (max-width: 1200px) {
    width: 40%;
  }
  @media screen and (max-width: 1000px) {
    width: 45%;
  }
  @media screen and (max-width: 950px) {
    display: flex;
    flex-direction: column;
    position: static;
    height: 30vh;
    width: 100%;
    justify-content: flex-start;
  }
`;

export const NameLink = styled(motion.a)`
  text-decoration: none;
  color: #222;
  font-weight: 300;
`;

export const Name = styled(motion.h1)`
  font-weight: 300;
  font-size: 42px;
  @media screen and (max-width: 1280px) {
    font-size: 30px;
  }
`;

export const LastName = styled.span`
  color: #8c8e8e;
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: absolute;
  top: 40%;
  @media screen and (max-width: 950px) {
    position: static;
    height: 50%;
    width: 100%:
  }
`;

export const Link = styled(motion.a)`
  font-size: 38px;
  font-weight: 600;
  padding: 10px 0px;
  text-decoration: none;
  color: #222;
  @media screen and (max-width: 1280px) {
    font-size: 30px;
  }
`;

export const Divider = styled.hr`
  width: 80%;
  margin: 0;
  @media screen and (min-width: 950px) {
    display: none;
  }
`;
