import mongoose, { InferSchemaType } from "mongoose";

const clickSchema = new mongoose.Schema({
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Link",
    required: true,
  },
  country: {
    type: String,
    default: "Unknown",
  },
  city: {
    type: String,
    default: "Unknown",
  },
  region: {
    type: String,
    default: "Unknown",
  },
  latitude: {
    type: Number,
    default: null,
  },
  longitude: {
    type: Number,
    default: null,
  },
  timezone: {
    type: String,
    default: "Unknown",
  },
  isp: {
    type: String,
    default: "Unknown",
  },
  org: {
    type: String,
    default: "Unknown",
  },
  as: {
    type: String,
    default: "Unknown",
  },
  asname: {
    type: String,
    default: "Unknown",
  },
  deviceType: {
    type: String,
    enum: ["desktop", "mobile", "tablet"],
    default: "desktop",
  },
  ipAddress: {
    type: String,
    required: true,
  },
  referer: {
    type: String,
    default: "",
  },
  userAgent: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Click = mongoose.models.Click || mongoose.model("Click", clickSchema);

export type ClickType = InferSchemaType<typeof clickSchema>;

export default Click;
