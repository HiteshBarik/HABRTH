import { z } from "zod";

export const habitCategorySchema = z.enum([
  "health",
  "productivity",
  "learning",
  "social",
  "other",
]);

export const habitDifficultySchema = z.enum(["easy", "medium", "hard"]);

export const habitFrequencySchema = z.enum(["daily", "weekly", "monthly"]);

export const createHabitSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  category: habitCategorySchema,
  difficulty: habitDifficultySchema,
  xpReward: z.number().int().min(0),
  frequency: habitFrequencySchema,
  streak: z.number().int().min(0).optional(),
});

export const updateHabitSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  category: habitCategorySchema.optional(),
  difficulty: habitDifficultySchema.optional(),
  xpReward: z.number().int().min(0).optional(),
  frequency: habitFrequencySchema.optional(),
  streak: z.number().int().min(0).optional(),
  isArchived: z.boolean().optional(),
});
