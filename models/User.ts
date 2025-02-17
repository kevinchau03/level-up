import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  profilePicture: string;
  level: number;
  xp: number;
  streak: number;
  currentStreak: number;
  badges: Types.ObjectId[];
  habits: Types.ObjectId[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String, default: "/default-avatar.jpg" },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  badges: [{ type: Schema.Types.ObjectId, ref: "Badge" }],
  habits: [{ type: Schema.Types.ObjectId, ref: "Habit" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
