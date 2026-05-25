import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    dob: Date,
    password: String,

    level: {
      type: Number,
      default: 1,
    },

    xp: {
      type: Number,
      default: 0,
    },

    streak: {
      type: Number,
      default: 0,
    },

    stats: {
      discipline: {
        type: Number,
        default: 1,
      },
      strength: {
        type: Number,
        default: 1,
      },
      focus: {
        type: Number,
        default: 1,
      },
      knowledge: {
        type: Number,
        default: 1,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);