import mongoose, { Schema, Document } from "mongoose";

export interface IHabit extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  category: string;
  level: number;
  xp: number;
  xpRequired: number;
  streak: number;
  completedDates: string[];
  createdAt: Date;
}

const HabitSchema = new Schema<IHabit>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  xpRequired: { type: Number, default: 100 },
  streak: { type: Number, default: 0 },
  completedDates: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Habit || mongoose.model<IHabit>("Habit", HabitSchema);
