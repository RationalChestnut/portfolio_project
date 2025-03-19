import styled from "styled-components";
import { motion } from "framer-motion";

export const NavigationBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 42%;
  padding-top: 10vh;
  padding-left: 5%;
  align-self: flex-start;
  margin-right: 12px;
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

export const Text = styled.p``;

export const StrongText = styled.h4``;

export const ListContainer = styled.ul`
  margin: 0;
`;

export const ListItem = styled.li``;

export const Goals = styled.div`
  @media screen and (max-width: 950px) {
    display: none;
  }
`;
