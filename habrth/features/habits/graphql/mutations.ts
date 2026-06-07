import { gql } from "@apollo/client";
import { HABIT_FIELDS_FRAGMENT } from "@/features/habits/graphql/fragments";

export const CREATE_HABIT_MUTATION = gql`
  mutation CreateHabit(
    $userId: ID!
    $title: String!
    $description: String
    $category: String!
    $difficulty: String!
    $xpReward: Int!
    $frequency: String!
    $streak: Int
  ) {
    createHabit(
      userId: $userId
      title: $title
      description: $description
      category: $category
      difficulty: $difficulty
      xpReward: $xpReward
      frequency: $frequency
      streak: $streak
    ) {
      ...HabitFields
    }
  }
  ${HABIT_FIELDS_FRAGMENT}
`;

export const UPDATE_HABIT_MUTATION = gql`
  mutation UpdateHabit(
    $id: ID!
    $title: String
    $description: String
    $category: String
    $difficulty: String
    $xpReward: Int
    $frequency: String
    $streak: Int
    $isArchived: Boolean
  ) {
    updateHabit(
      id: $id
      title: $title
      description: $description
      category: $category
      difficulty: $difficulty
      xpReward: $xpReward
      frequency: $frequency
      streak: $streak
      isArchived: $isArchived
    ) {
      ...HabitFields
    }
  }
  ${HABIT_FIELDS_FRAGMENT}
`;

export const DELETE_HABIT_MUTATION = gql`
  mutation DeleteHabit($id: ID!) {
    deleteHabit(id: $id)
  }
`;

export const COMPLETE_HABIT_MUTATION = gql`
  mutation CompleteHabit($id: ID!, $userId: ID!) {
    completeHabit(id: $id, userId: $userId) {
      ...HabitFields
    }
  }
  ${HABIT_FIELDS_FRAGMENT}
`;
