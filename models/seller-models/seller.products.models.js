import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  prductname: {
    type: String,
    required: true,
    trim: true,
  },
  seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"seller"
  },
  type:{
    type:String,
  }
});
