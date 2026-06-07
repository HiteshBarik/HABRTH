import mongoose, {Schema} from "mongoose";

const HabitSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: String,
        category: {
            type: String,
            enum: ["health", "productivity", "learning", "social", "other"],
            default: "other",
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "easy",
        },
        xpReward: {
            type: Number,
            default: 0,
        },
        frequency: {
            type: String,
            enum: ["daily", "weekly", "monthly"],
            default: "daily",
        },
        currentStreak: {
            type: Number,
            default: 0,
        },
        longestStreak: {
            type: Number,
            default: 0,
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
        lastCompletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Habit ||
    mongoose.model("Habit", HabitSchema);