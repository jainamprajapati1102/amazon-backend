import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  prductname: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
  },
  MRP: {
    type: Number,
    trim: true,
    required: true,
  },
  discount: {
    type: Number,
    trim: true,
    required: true,
  },
  sellprice: {
    type: Number,
    trim: true,
    required: true,
  },
});

export const productModel = mongoose.model("Product", productSchema);
