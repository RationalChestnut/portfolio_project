import React from "react";
import {
  LastName,
  ListContainer,
  ListItem,
  Name,
  NameLink,
  NavigationBarContainer,
  StrongText,
  Text,
} from "./NavigationBar.styles";

export const Navbar = () => {
  return (
    <NavigationBarContainer>
      <Name
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: -25, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          ease: "easeOut",
        }}
      >
        <NameLink href="#">
          Brian K. <LastName>Mason</LastName>
        </NameLink>
      </Name>
      <Text>
        Hey I'm Brian! I'm a first year student at Duke University studying
        philosophy. I love programming, writing, running, lifting, playing
        tennis, listening to podcasts, reading, and cooking. Oh, also a huge fan
        of spikeball.
      </Text>
      <StrongText>2025 Fitness Goals</StrongText>
      <ListContainer>
        <ListItem>
          Qualify for the Boston Marathon (2:55). Current best time: 3:17
        </ListItem>
        <ListItem>Bench 225. Current 1 rep max: 215</ListItem>
        <ListItem>Survive an Iron Man (thriving is for next year)</ListItem>
        <ListItem>Weigh 165 at 11% body fat (currently 150 at 11%)</ListItem>
        <ListItem>Learn to backflip</ListItem>
      </ListContainer>
      <StrongText>2025 Academic Goals</StrongText>
      <ListContainer>
        <ListItem>Find a subject I love ✅ (philosophy)</ListItem>
        <ListItem>Average B or B+</ListItem>
      </ListContainer>
      <StrongText>2025 Work Goals</StrongText>
      <ListContainer>
        <ListItem>Find a co-founder ✅</ListItem>
        <ListItem>Make 1M revenue</ListItem>
        <ListItem>Learn how a great company operates</ListItem>
        <ListItem>Learn how to make products explode on social media</ListItem>
      </ListContainer>
      <StrongText>Relationship Goals</StrongText>
      <ListContainer>
        <ListItem>Call 1 high school friend a week</ListItem>
        <ListItem>Find a girl I love ✅</ListItem>
        <ListItem>Go on a spring break trip ✅</ListItem>
        <ListItem>
          Become acquaintances with ~7.5% of Duke's class (120 people)
        </ListItem>
        <ListItem>Find 20 friends I love ✅</ListItem>
      </ListContainer>
      <StrongText>Misc.</StrongText>
      <ListContainer>
        <ListItem>Organize a Hamilton Karoke Night at Duke</ListItem>
        <ListItem>Read 6 "great" books</ListItem>
        <ListItem>Read 26 books</ListItem>
      </ListContainer>
    </NavigationBarContainer>
  );
};
