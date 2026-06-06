export const habitTypeDefs = /* GraphQL */ `
  type Habit {
    id: ID!
    userId: ID!
    title: String!
    description: String
    category: String!
    difficulty: String!
    xpReward: Int!
    frequency: String!
    streak: Int!
    longestStreak: Int!
    isArchived: Boolean!
    lastCompletedAt: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getHabits(userId: ID!): [Habit!]!
    getHabit(id: ID!): Habit
  }

  type Mutation {
    createHabit(
      userId: ID!
      title: String!
      description: String
      category: String!
      difficulty: String!
      xpReward: Int!
      frequency: String!
      streak: Int
    ): Habit!

    updateHabit(
      id: ID!
      title: String
      description: String
      category: String
      difficulty: String
      xpReward: Int
      frequency: String
      streak: Int
      isArchived: Boolean
    ): Habit!

    deleteHabit(id: ID!): Boolean!
    completeHabit(id: ID!, userId: ID!): Habit!
  }
`;
