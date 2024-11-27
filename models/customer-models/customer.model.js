import mongoose from "mongoose";
import { UserRolesEnum, AvailableUserRoles } from "../../constants.js";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
    },
    mobileno: {
      type: Number,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const customerModel = mongoose.model("Customer", userSchema);
