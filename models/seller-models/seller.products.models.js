import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
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
  image: {
    type: String,
    required: true,
  },
  // mrp: {
  //   type: Number,
  //   trim: true,
  //   required: true,
  // },
  // discount: {
  //   type: Number,
  //   trim: true,
  //   required: true,
  // },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const productModel = mongoose.model("Product", productSchema);
