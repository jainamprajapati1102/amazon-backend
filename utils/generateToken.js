import jwt from "jsonwebtoken";
import {TOKEN_ACCESS_KEY} from "../constants.js";
export const generateToken = (user) => {
  try {
    return jwt.sign({ userid: user._id, email: user.email }, TOKEN_ACCESS_KEY);
  } catch (error) {
    console.log("err from  genToken-->", error);
  }
};
