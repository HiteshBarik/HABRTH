import { habitService } from "@/features/habits/server/habit.service";
import type {
  CreateHabitInput,
  UpdateHabitInput,
} from "@/features/habits/types/habit.types";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

type CreateHabitArgs = CreateHabitInput;

type UpdateHabitArgs = { id: string } & UpdateHabitInput;

type DeleteHabitArgs = { id: string };

type GetHabitsArgs = { userId: string };

type GetHabitArgs = { id: string };

type CompleteHabitArgs = { id: string; userId: string };

type HabitResolverContext = {
  req: NextRequest;
};

const getAuthenticatedUserId = (context: HabitResolverContext): string => {
  const token = context.req.cookies.get("authToken")?.value;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || !jwtSecret) {
    throw new Error("Unauthorized");
  }

  let payload: { userId?: string };

  try {
    payload = jwt.verify(token, jwtSecret) as { userId?: string };
  } catch {
    throw new Error("Unauthorized");
  }

  if (!payload.userId) {
    throw new Error("Unauthorized");
  }

  return payload.userId;
};

export const habitResolver = {
  Query: {
    getHabits: async (_parent: unknown, args: GetHabitsArgs) => {
      return habitService.getHabits(args.userId);
    },
    getHabit: async (
      _parent: unknown,
      args: GetHabitArgs,
      context: HabitResolverContext,
    ) => {
      return habitService.getHabit(args.id, getAuthenticatedUserId(context));
    },
  },
  Mutation: {
    createHabit: async (_parent: unknown, args: CreateHabitArgs) => {
      return habitService.createHabit(args);
    },
    updateHabit: async (
      _parent: unknown,
      args: UpdateHabitArgs,
      context: HabitResolverContext,
    ) => {
      const { id, ...input } = args;
      return habitService.updateHabit(id, getAuthenticatedUserId(context), input);
    },
    deleteHabit: async (
      _parent: unknown,
      args: DeleteHabitArgs,
      context: HabitResolverContext,
    ) => {
      return habitService.deleteHabit(args.id, getAuthenticatedUserId(context));
    },
    completeHabit: async (_parent: unknown, args: CompleteHabitArgs) => {
      return habitService.completeHabit(args.id, args.userId);
    },
  },
};
