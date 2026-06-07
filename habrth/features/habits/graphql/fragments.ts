import { gql } from "@apollo/client";

export const HABIT_FIELDS_FRAGMENT = gql`
  fragment HabitFields on Habit {
    id
    userId
    title
    description
    category
    difficulty
    xpReward
    frequency
    streak
    longestStreak
    isArchived
    lastCompletedAt
    createdAt
    updatedAt
  }
`;
