import mongoose from "mongoose";
import { UserRolesEnum, AvailableUserRoles } from "../../constants.js";
const profileSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
    },
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
    mobileno: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    gstin: {
      type: String,
      required: true,
      trim: true,
    },
    pan: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const profileModel = mongoose.model("Profile", profileSchema);
