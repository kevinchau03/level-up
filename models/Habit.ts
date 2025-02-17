import mongoose, { Schema, Document, Types } from "mongoose";

export interface IHabit extends Document {
  user: Types.ObjectId;
  name: string;
  category: "Health" | "Learning" | "Productivity" | "Other";
  level: number;
  xp: number;
  xpRequired: number;
  streak: number;
  completedDates: Date[];
  createdAt: Date;
}

const HabitSchema = new Schema<IHabit>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  category: { type: String, enum: ["Health", "Learning", "Productivity", "Other"], default: "Other" },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  xpRequired: { type: Number, default: 100 },
  streak: { type: Number, default: 0 },
  completedDates: [{ type: Date }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Habit || mongoose.model<IHabit>("Habit", HabitSchema);
