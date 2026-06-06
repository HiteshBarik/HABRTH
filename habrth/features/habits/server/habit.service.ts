import {
  createHabitSchema,
  updateHabitSchema,
} from "@/features/habits/schemas/habit.schema";
import { habitRepository } from "@/features/habits/server/habit.repository";
import type {
  CreateHabitInput,
  Habit,
  UpdateHabitInput,
} from "@/features/habits/types/habit.types";

export const habitService = {
  async getHabits(userId: string): Promise<Habit[]> {
    return habitRepository.findByUserId(userId);
  },

  async getHabit(id: string): Promise<Habit | null> {
    return habitRepository.findById(id);
  },

  async createHabit(input: CreateHabitInput): Promise<Habit> {
    const parsed = createHabitSchema.parse(input);
    return habitRepository.create(parsed);
  },

  async updateHabit(id: string, input: UpdateHabitInput): Promise<Habit> {
    const parsed = updateHabitSchema.parse(input);
    const updatedHabit = await habitRepository.update(id, parsed);

    if (!updatedHabit) {
      throw new Error("Habit not found");
    }

    return updatedHabit;
  },

  async deleteHabit(id: string): Promise<boolean> {
    return habitRepository.delete(id);
  },

  async completeHabit(id: string, userId: string): Promise<Habit> {
    return habitRepository.complete(id, userId);
  },
};
