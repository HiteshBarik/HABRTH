import { gql } from "@apollo/client";
import { HABIT_FIELDS_FRAGMENT } from "@/features/habits/graphql/fragments";

export const GET_HABITS_QUERY = gql`
  query GetHabits($userId: ID!) {
    getHabits(userId: $userId) {
      ...HabitFields
    }
  }
  ${HABIT_FIELDS_FRAGMENT}
`;

export const GET_HABIT_QUERY = gql`
  query GetHabit($id: ID!) {
    getHabit(id: $id) {
      ...HabitFields
    }
  }
  ${HABIT_FIELDS_FRAGMENT}
`;
