import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGoal extends Document {
  user: Types.ObjectId;
  name: string;
  target: number;
  currentProgress: number;
  unit: string;
  completed: boolean;
  createdAt: Date;
}

const GoalSchema = new Schema<IGoal>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  target: { type: Number, required: true },
  currentProgress: { type: Number, default: 0 },
  unit: { type: String, default: "tasks" },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Goal || mongoose.model<IGoal>("Goal", GoalSchema);
