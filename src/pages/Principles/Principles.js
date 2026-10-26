import React from "react";
import {
  Header,
  ListItem,
  OrderedList,
  PrinciplesContainer,
  Text,
  Bold,
} from "./Principles.styles";

export const Principles = () => {
  return (
    <PrinciplesContainer>
      <Header>Life Goals</Header>
      <Text>I have three primary life goals:</Text>
      <OrderedList>
        <ListItem>Be surrounded by the people I love</ListItem>
        <ListItem>Find my ikigai</ListItem>
        <ListItem>Live a storyful life</ListItem>
      </OrderedList>
      <Bold>1. Be surrounded by the people I love</Bold>
      <Text>
        One idea that excites me is 'marrying' one or two friends. This is
        similar to family friends in that you get together for special occasions
        and your families know and take care of each other. It builds on top of
        that by ensuring close geographic proximity. It is actively choosing to
        intertwine your life and family with someone other than a romantic
        partner.
      </Text>
      <Text>
        That is a longer term goal. But as a principle, proximity really matters
        for me. I love college because I am always around my friends. In the
        future, I want to live with my friends. After college this might mean
        renting an apartment together. When I raise a family this might mean
        'marrying' a friend or two and choosing to settle down in the same
        neighborhood.
      </Text>
      <Text>
        <Bold>One note: </Bold>This is my first life goal. This means I would
        choose a job which allows me to be near my friends over a job that
        doesn't (in most circumstances).
      </Text>
      <Text>
        Same with family. I always want to live near my immediate family and get
        together for the holidays.
      </Text>
      <Text>Lastly, I want to get married and have kids.</Text>
      <Bold>2. Find my ikigai</Bold>
      <Text></Text>
    </PrinciplesContainer>
  );
};
