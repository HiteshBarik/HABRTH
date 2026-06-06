"use client";

import { useMutation } from "@apollo/client";
import { UPDATE_HABIT_MUTATION } from "@/features/habits/graphql/mutations";
import type {
  Habit,
  UpdateHabitInput,
} from "@/features/habits/types/habit.types";

type UpdateHabitResponse = {
  updateHabit: Habit;
};

type UpdateHabitVariables = {
  id: string;
} & UpdateHabitInput;

export function useUpdateHabit() {
  return useMutation<UpdateHabitResponse, UpdateHabitVariables>(
    UPDATE_HABIT_MUTATION,
  );
}
