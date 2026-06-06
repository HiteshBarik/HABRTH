"use client";

import { useMutation } from "@apollo/client";
import { DELETE_HABIT_MUTATION } from "@/features/habits/graphql/mutations";

type DeleteHabitResponse = {
  deleteHabit: boolean;
};

type DeleteHabitVariables = {
  id: string;
};

export function useDeleteHabit() {
  return useMutation<DeleteHabitResponse, DeleteHabitVariables>(
    DELETE_HABIT_MUTATION,
  );
}
