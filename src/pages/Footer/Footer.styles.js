import styled from "styled-components";

export const FooterContainer = styled.div`
  font-size: 22px;
  padding: 100px 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Copyright = styled.p`
  @media screen and (max-width: 950px) {
    font-size: 14px;
    max-width: 40%;
  }
`;

export const UpperContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: 950px) {
    display: block;
  }
`;

export const LinksContainer = styled.div``;

export const Link = styled.a`
  color: #808080;
  padding: 0px 10px;
  text-decoration: none;
  @media screen and (max-width: 950px) {
    font-size: 20px;
  }
`;

export const ColorSpan = styled.span`
  color: #808080;
`;
