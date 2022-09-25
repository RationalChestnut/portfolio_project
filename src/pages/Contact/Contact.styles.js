import styled from "styled-components";

export const ContactContainer = styled.div`
  padding-top: 20vh;
  height: 50vh;
`;

export const CollaborateText = styled.p`
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
`;

export const Link = styled.a.attrs({ target: "_blank" })`
  color: #3366ff;
  font-size: 24px;
  text-decoration: none;
`;
