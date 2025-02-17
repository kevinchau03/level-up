import mongoose, { Schema, Document, Types } from "mongoose";

export interface IQuest extends Document {
  user: Types.ObjectId;
  description: string;
  xpReward: number;
  completed: boolean;
  createdAt: Date;
}

const QuestSchema = new Schema<IQuest>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  xpReward: { type: Number, default: 50 },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Quest || mongoose.model<IQuest>("Quest", QuestSchema);
