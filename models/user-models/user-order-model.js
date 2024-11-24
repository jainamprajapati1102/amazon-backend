import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      lowercase: true,
    },
    address: {
      addressLine1: {
        required: true,
        type: String,
      },
      addressLine2: {
        type: String,
      },
      city: {
        required: true,
        type: String,
      },
      country: {
        required: true,
        type: String,
      },
      pincode: {
        required: true,
        type: String,
      },
      state: {
        required: true,
        type: String,
      },
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    orderprice: {
      type: Number,
      required: true,
    },
    paymentProvider: {
      type: String,
      enum: AvailablePaymentProviders,
      default: PaymentProviderEnum.UNKNOWN,
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
