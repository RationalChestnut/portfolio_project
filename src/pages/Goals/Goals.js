import React from "react";
import { Goal, GoalHeader, GoalList, GoalsContainer } from "./Goals.styles";

export const Goals = () => {
  return (
    <GoalsContainer>
      <GoalHeader>Adventure</GoalHeader>
      <GoalList>
        <Goal>Learn to sing</Goal>
        <Goal>Perform improv at 3 different venues</Goal>
        <Goal>Travel somewhere new for spring break</Goal>
      </GoalList>
      <GoalHeader>Work</GoalHeader>
      <GoalHeader>Relationships</GoalHeader>
      <GoalHeader>Health/Fitness</GoalHeader>
      <GoalHeader>Misc.</GoalHeader>
    </GoalsContainer>
  );
};
