import styled from "styled-components";

export const FooterContainer = styled.div`
  padding: 0 40px;
  display: flex;
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

export const ColorSpan = styled.span`
  color: #808080;
`;

export const FooterButtonText = styled.a`
  color: black;
  font-size: 16px;
  text-decoration: none;
  padding: 5px 15px;
  background-color: transparent;
  border: 2px solid #cccccc;
  border-radius: 12px;
`;

export const ContactContainer = styled.div``;

export const ContactLink = styled.a`
  font-size: 18px;
  text-decoration: underline;
  color: black;
  padding-right: 20px;
`;
