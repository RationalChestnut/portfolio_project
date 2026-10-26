import React from "react";
import profile from "../../assets/profile.jpg";
import {
  AboutContainer,
  ContactLink,
  ContactRow,
  ImageColumn,
  InlineLink,
  ListItem,
  OrderedList,
  ProfileImage,
  SectionHeader,
  Text,
  TextColumn,
} from "./About.styles";

export const About = () => {
  return (
    <AboutContainer>
      <TextColumn>
        <SectionHeader>About</SectionHeader>
        <Text>
          My name is Brian Mason. I grew up in Bethesda, Maryland. I love being
          active (running, lifting, tennis, spikeball), reading, writing, and
          playing guitar. I’m incredibly competitive, have an addictive
          personality, and am the type of person who constantly has a scheme for
          improving his own life.
        </Text>
        <Text>My top three life goals:</Text>
        <OrderedList>
          <ListItem>Be surrounded by the people I love</ListItem>
          <ListItem>Produce things that are a reflection of who I am</ListItem>
          <ListItem>Live a storyful life</ListItem>
        </OrderedList>

        <SectionHeader>Currently</SectionHeader>
        <Text>
          Head of Engineering at{" "}
          <InlineLink
            href="https://www.differenthealth.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Different Health
          </InlineLink>
        </Text>
        <Text>Studying Math at Duke University</Text>

        <SectionHeader>Previously</SectionHeader>
        <Text>Founded an app ranked 21st on the Google Play Store</Text>
        <Text>
          Founding Engineer at{" "}
          <InlineLink
            href="https://www.pathfindercard.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pathfinder
          </InlineLink>
        </Text>

        <ContactRow>
          <ContactLink href="mailto:brian.kw.mason@gmail.com">email</ContactLink>
          <ContactLink
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </ContactLink>
        </ContactRow>
      </TextColumn>

      <ImageColumn>
        <ProfileImage src={profile} alt="Brian Mason" />
      </ImageColumn>
    </AboutContainer>
  );
};
