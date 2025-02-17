import mongoose, { Schema, Document } from "mongoose";

export interface IBadge extends Document {
  name: string;
  description: string;
  icon: string;
  criteria: string;
  createdAt: Date;
}

const BadgeSchema = new Schema<IBadge>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "/badges/default.png" },
  criteria: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Badge || mongoose.model<IBadge>("Badge", BadgeSchema);
