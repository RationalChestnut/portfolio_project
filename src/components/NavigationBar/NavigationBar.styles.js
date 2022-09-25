import styled from "styled-components";

export const NavigationBarContainer = styled.div`
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
`;

export const Name = styled.h1`
  font-weight: 300;
  font-size: 42px;
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
`;

export const Link = styled.a`
  font-size: 38px;
  font-weight: 600;
  padding: 10px 0px;
`;
