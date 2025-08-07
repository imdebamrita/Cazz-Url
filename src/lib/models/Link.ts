import mongoose, { InferSchemaType } from "mongoose";
const { Schema } = mongoose;

const LinkSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(), // Use ObjectId as string
    },
    userId: {
      type: String, // Store Clerk user ID directly
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      unique: true,
      required: true,
      index: true, // Ensure unique index for fast lookups
    },
    title: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export type LinkType = InferSchemaType<typeof LinkSchema>;

export default mongoose.models.Link || mongoose.model("Link", LinkSchema);
