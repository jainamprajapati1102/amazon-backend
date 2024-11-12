import mongoose from "mongoose";
import { UserRolesEnum, AvailableUserRoles } from "../../constants.js";
const profileSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
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
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Selleradd",
    },
  },
  { timestamps: true }
);

export const profileModel = mongoose.model("Profile", profileSchema);
