"use client";

import { useQuery } from "@apollo/client";
import { GET_HABITS_QUERY } from "@/features/habits/graphql/queries";
import type { Habit } from "@/features/habits/types/habit.types";

type GetHabitsResponse = {
  getHabits: Habit[];
};

type GetHabitsVariables = {
  userId: string;
};

export function useHabits(userId: string) {
  return useQuery<GetHabitsResponse, GetHabitsVariables>(GET_HABITS_QUERY, {
    variables: { userId },
    skip: !userId,
  });
}
