import styled from "styled-components";

export const AboutContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: row;
  gap: 32px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 24px;
  }
`;

export const TextColumn = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ImageColumn = styled.div`
  flex-shrink: 0;

  @media (max-width: 768px) {
    order: 2;
  }
`;

export const ProfileImage = styled.img`
  width: 240px;
  max-width: 100%;
  border-radius: 12px;
  display: block;

  @media (max-width: 768px) {
    width: 220px;
  }
`;

export const SectionHeader = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #222;
  margin: 44px 0 20px;

  &:first-child {
    margin-top: 0;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #222;
  margin: 0 0 16px;
`;

export const OrderedList = styled.ol`
  margin: 0 0 16px;
  padding-left: 22px;
  line-height: 1.6;
  color: #222;
`;

export const ListItem = styled.li`
  margin-bottom: 4px;
`;

export const InlineLink = styled.a`
  color: #222;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s ease-in;

  &:hover {
    color: #8c8e8e;
  }
`;

export const ContactRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
`;

export const ContactLink = styled.a`
  color: #8c8e8e;
  text-decoration: none;
  transition: color 0.2s ease-in;

  &:hover {
    color: #222;
  }
`;
