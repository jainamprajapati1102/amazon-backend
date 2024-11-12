import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
  {
    addLine1: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    addLine2: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const addressModel = mongoose.model("address", addressSchema);
