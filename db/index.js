import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import debug  from "debug";

const dbgr = debug("development:database");
// // export let dbInstance = undefined;
// console.log("hii");

// const connectDb = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGO_URI}/${DB_NAME}`
//     );
//     // dbInstance = connectionInstance;
//     console.log("connected!!");
//   } catch (error) {
//     console.log(error);
//   }
// };
const connectDb = async () => {
  try {
    let constr = await mongoose.connect(`mongodb://127.0.0.1:27017/amazon`);
    if (constr) {
      dbgr(`db connected port 5000`);
    } else {
      dbgr("not connected");
    }
  } catch (error) {
    dbgr("error=>", error.message);
  }
};
export default connectDb;
