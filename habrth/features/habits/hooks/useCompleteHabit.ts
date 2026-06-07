"use client";

import { useMutation } from "@apollo/client";
import { COMPLETE_HABIT_MUTATION } from "@/features/habits/graphql/mutations";
import type { Habit } from "@/features/habits/types/habit.types";

type CompleteHabitResponse = {
  completeHabit: Habit;
};

type CompleteHabitVariables = {
  id: string;
  userId: string;
};

export function useCompleteHabit() {
  return useMutation<CompleteHabitResponse, CompleteHabitVariables>(
    COMPLETE_HABIT_MUTATION,
  );
}
