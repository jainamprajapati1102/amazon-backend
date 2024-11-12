import mongoose from "mongoose";
import { UserRolesEnum, AvailableUserRoles } from "../../constants.js";
const sellerSchema = new mongoose.Schema(
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
      default: UserRolesEnum.SELLER,
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
    produts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  },
  { timestamps: true }
);

export const sellerModel = mongoose.model("Seller", sellerSchema);
