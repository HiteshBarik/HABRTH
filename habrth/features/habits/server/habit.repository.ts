import { connectToMongoDb } from "@/lib/mongodb";
import HabitModel from "@/models/Habit";
import type {
  CreateHabitInput,
  Habit,
  UpdateHabitInput,
} from "@/features/habits/types/habit.types";

type HabitDoc = {
  _id: { toString(): string } | string;
  userId: { toString(): string } | string;
  title: string;
  description?: string | null;
  category: Habit["category"];
  difficulty: Habit["difficulty"];
  xpReward: number;
  frequency: Habit["frequency"];
  currentStreak: number;
  longestStreak: number;
  isArchived: boolean;
  lastCompletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

const mapHabit = (doc: HabitDoc): Habit => ({
  id: String(doc._id),
  userId: String(doc.userId),
  title: doc.title,
  description: doc.description ?? null,
  category: doc.category,
  difficulty: doc.difficulty,
  xpReward: doc.xpReward,
  frequency: doc.frequency,
  streak: doc.currentStreak,
  longestStreak: doc.longestStreak,
  isArchived: doc.isArchived,
  lastCompletedAt: doc.lastCompletedAt?.toISOString() ?? null,
  createdAt: doc.createdAt?.toISOString(),
  updatedAt: doc.updatedAt?.toISOString(),
});

export const habitRepository = {
  async findByUserId(userId: string): Promise<Habit[]> {
    await connectToMongoDb();

    const habits = (await HabitModel.find({ userId })
      .sort({ createdAt: -1 })
      .lean()) as HabitDoc[];

    return habits.map(mapHabit);
  },

  async findById(id: string, userId: string): Promise<Habit | null> {
    await connectToMongoDb();

    const habit = (await HabitModel.findOne({ _id: id, userId }).lean()) as HabitDoc | null;
    return habit ? mapHabit(habit) : null;
  },

  async create(input: CreateHabitInput): Promise<Habit> {
    await connectToMongoDb();

    const created = (await HabitModel.create({
      userId: input.userId,
      title: input.title,
      description: input.description,
      category: input.category,
      difficulty: input.difficulty,
      xpReward: input.xpReward,
      frequency: input.frequency,
      currentStreak: input.streak ?? 0,
      longestStreak: input.streak ?? 0,
    })) as HabitDoc;

    return mapHabit(created);
  },

  async update(
    id: string,
    userId: string,
    input: UpdateHabitInput,
  ): Promise<Habit | null> {
    await connectToMongoDb();

    const updated = (await HabitModel.findOneAndUpdate(
      { _id: id, userId },
      {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.description !== undefined && {
          description: input.description,
        }),
        ...(input.category !== undefined && { category: input.category }),
        ...(input.difficulty !== undefined && { difficulty: input.difficulty }),
        ...(input.xpReward !== undefined && { xpReward: input.xpReward }),
        ...(input.frequency !== undefined && { frequency: input.frequency }),
        ...(input.streak !== undefined && { currentStreak: input.streak }),
        ...(input.isArchived !== undefined && { isArchived: input.isArchived }),
      },
      { new: true },
    ).lean()) as HabitDoc | null;

    return updated ? mapHabit(updated) : null;
  },

  async delete(id: string, userId: string): Promise<boolean> {
    await connectToMongoDb();

    const deleted = await HabitModel.findOneAndDelete({ _id: id, userId });
    return Boolean(deleted);
  },

  async complete(id: string, userId: string): Promise<Habit> {
    await connectToMongoDb();

    const habit = await HabitModel.findById(id);
    if (!habit) {
      throw new Error("Habit not found");
    }

    if (habit.userId.toString() !== userId) {
      throw new Error("Unauthorized");
    }

    habit.currentStreak += 1;
    habit.longestStreak = Math.max(habit.longestStreak, habit.currentStreak);
    habit.lastCompletedAt = new Date();

    await habit.save();

    return mapHabit(habit as unknown as HabitDoc);
  },
};
