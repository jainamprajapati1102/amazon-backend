import mongoose from "mongoose";
import {
  AvailablePaymentProviders,
  PaymentProvidersEnum,
} from "../../constants.js";
// impoort {paymentProvider} from "../../}
const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      lowercase: true,
    },
    address: {
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      country: { type: String },
      pincode: { type: String },
      state: { type: String },
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    orderprice: {
      type: Number,
    },
    paymentProvider: {
      type: String,
      enum: AvailablePaymentProviders,
      default: PaymentProvidersEnum.UNKNOWN,
    },
    paymentId: {
      type: String,
    },
    // This field shows if the payment is done or not
    isPaymentDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("order", orderSchema);
