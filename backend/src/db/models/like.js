import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    recipeId: { type: Schema.Types.ObjectId, ref: "recipe", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    date: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true },
);

likeSchema.index({ recipeId: 1, userId: 1 }, { unique: true });

export const Like = mongoose.model("like", likeSchema);
