import { buildSchema } from "graphql";
import { connectToMongoDb } from "@/lib/mongodb";
import Habit from "@/models/Habit";

type HabitRecord = {
  _id: { toString(): string } | string;
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  xpReward: number;
  streak: number;
};

const mapHabit = (habit: HabitRecord) => ({
  id: String(habit._id),
  title: habit.title,
  description: habit.description,
  category: habit.category,
  difficulty: habit.difficulty,
  xpReward: habit.xpReward,
  streak: habit.streak,
});

export const habitSchema = buildSchema(`
  type Habit {
    id: ID!
    title: String!
    description: String
    category: String!
    difficulty: String!
    xpReward: Int!
    streak: Int!
  }

  type Query {
    getHabits(userId: ID!): [Habit!]!
    getHabit(id: ID!): Habit!
  }

  type Mutation {
    createHabit(
      userId: ID!
      title: String!
      description: String
      category: String!
      difficulty: String!
      xpReward: Int!
      streak: Int!
    ): Habit!
    updateHabit(
        id: ID!
        title: String
        description: String
        category: String
        difficulty: String
        xpReward: Int
        streak: Int
    ): Habit!
    deleteHabit(id: ID!): Boolean!
    completeHabit(id: ID!, userId: ID!): Habit!
  }
`);

export const habitRootResolver = {
  getHabits: async ({ userId }: { userId: string }) => {
    await connectToMongoDb();

    const habits = (await Habit.find({ userId })
      .sort({ createdAt: -1 })
      .lean()) as HabitRecord[];
    return habits.map(mapHabit);
  },

  createHabit: async ({
    userId,
    title,
    description,
    category,
    difficulty,
    xpReward,
    streak,
  }: {
    userId: string;
    title: string;
    description?: string;
    category: string;
    difficulty: string;
    xpReward: number;
    streak: number;
  }) => {
    await connectToMongoDb();

    const createdHabit = await Habit.create({
      userId,
      title,
      description,
      category,
      difficulty,
      xpReward,
      streak,
    });

    return mapHabit(createdHabit as unknown as HabitRecord);
  },
  updateHabit: async ({
    id,
    title,
    description,
    category,
    difficulty,
    xpReward,
    streak,
  }: {
    id: string;
    title?: string;
    description?: string;
    category?: string;
    difficulty?: string;
    xpReward?: number;
    streak?: number;
  }) => {
    await connectToMongoDb();

    const updateHabit = await Habit.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(difficulty && { difficulty }),
        ...(xpReward !== undefined && { xpReward }),
        ...(streak !== undefined && { streak }),
      },
      { new: true },
    ).lean() as HabitRecord | null;

    if (!updateHabit) {
      throw new Error("Habit not found");
    }

    return mapHabit(updateHabit); 
  },
    deleteHabit: async ({ id }: { id: string }) => {
        await connectToMongoDb();
        const deleted = await Habit.findByIdAndDelete(id);
        return !!deleted;
    },
    completeHabit: async ({ id, userId }: { id: string; userId: string }) => {
        await connectToMongoDb();

        const habit = await Habit.findById(id);

        if (!habit) {
            throw new Error("Habit not found");
        }

        if (habit.userId.toString() !== userId) {
            throw new Error("Unauthorized");
        }

        habit.streak += 1;
        habit.lastCompletedAt = new Date();
        await habit.save();

        return mapHabit(habit as unknown as HabitRecord);
    }
};
