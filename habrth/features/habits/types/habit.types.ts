export type Habit = {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  category: "health" | "productivity" | "learning" | "social" | "other";
  difficulty: "easy" | "medium" | "hard";
  xpReward: number;
  frequency: "daily" | "weekly" | "monthly";
  streak: number;
  longestStreak: number;
  isArchived: boolean;
  lastCompletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type HabitListFilters = {
  category?: Habit["category"];
  difficulty?: Habit["difficulty"];
  frequency?: Habit["frequency"];
  isArchived?: boolean;
};

export type CreateHabitInput = {
  userId: string;
  title: string;
  description?: string;
  category: Habit["category"];
  difficulty: Habit["difficulty"];
  xpReward: number;
  frequency: Habit["frequency"];
  streak?: number;
};

export type UpdateHabitInput = {
  title?: string;
  description?: string;
  category?: Habit["category"];
  difficulty?: Habit["difficulty"];
  xpReward?: number;
  frequency?: Habit["frequency"];
  streak?: number;
  isArchived?: boolean;
};
