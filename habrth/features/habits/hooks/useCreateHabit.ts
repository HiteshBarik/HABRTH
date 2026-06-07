"use client";

import { useMutation } from "@apollo/client";
import { CREATE_HABIT_MUTATION } from "@/features/habits/graphql/mutations";
import type {
  CreateHabitInput,
  Habit,
} from "@/features/habits/types/habit.types";

type CreateHabitResponse = {
  createHabit: Habit;
};

export function useCreateHabit() {
  return useMutation<CreateHabitResponse, CreateHabitInput>(
    CREATE_HABIT_MUTATION,
  );
}
