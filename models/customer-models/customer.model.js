import mongoose from "mongoose";
import { UserRolesEnum, AvailableUserRoles } from "../../constants.js";
const customerSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String },
    address: {
      addLine1: { type: String },
      addLine2: { type: String },
      city: { type: String },
      country: { type: String },
      pincode: { type: String },
      state: { type: String },
    },
    profileImage: { type: String },
    orders: [{ orderId: String, date: Date }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);
export const customerModel = mongoose.model("Customer", customerSchema);
