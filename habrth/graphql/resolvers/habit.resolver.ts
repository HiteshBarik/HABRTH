import { habitService } from "@/features/habits/server/habit.service";
import type {
  CreateHabitInput,
  UpdateHabitInput,
} from "@/features/habits/types/habit.types";

type CreateHabitArgs = CreateHabitInput;

type UpdateHabitArgs = { id: string } & UpdateHabitInput;

type DeleteHabitArgs = { id: string };

type GetHabitsArgs = { userId: string };

type GetHabitArgs = { id: string };

type CompleteHabitArgs = { id: string; userId: string };

export const habitResolver = {
  Query: {
    getHabits: async (_parent: unknown, args: GetHabitsArgs) => {
      return habitService.getHabits(args.userId);
    },
    getHabit: async (_parent: unknown, args: GetHabitArgs) => {
      return habitService.getHabit(args.id);
    },
  },
  Mutation: {
    createHabit: async (_parent: unknown, args: CreateHabitArgs) => {
      return habitService.createHabit(args);
    },
    updateHabit: async (_parent: unknown, args: UpdateHabitArgs) => {
      const { id, ...input } = args;
      return habitService.updateHabit(id, input);
    },
    deleteHabit: async (_parent: unknown, args: DeleteHabitArgs) => {
      return habitService.deleteHabit(args.id);
    },
    completeHabit: async (_parent: unknown, args: CompleteHabitArgs) => {
      return habitService.completeHabit(args.id, args.userId);
    },
  },
};
