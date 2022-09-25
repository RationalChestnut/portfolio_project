import styled from "styled-components";

export const FooterContainer = styled.div`
  font-size: 22px;
  padding: 100px 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Copyright = styled.p``;

export const UpperContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const LinksContainer = styled.div``;

export const Link = styled.a.attrs({ target: "_blank" })`
  color: #808080;
  padding: 0px 10px;
  text-decoration: none;
`;

export const ColorSpan = styled.span`
  color: #808080;
`;
