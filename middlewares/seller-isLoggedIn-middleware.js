import jwt from "jsonwebtoken";
import { TOKEN_ACCESS_KEY } from "../constants.js";
export default (req, res, next) => {
  try {
    if (!req.cookies.seller_token) return res.send("You need login first.");
    const user = jwt.verify(req.cookies.seller_token, TOKEN_ACCESS_KEY);
    req.user = user;
    next();
  } catch (error) {
    res.send(error);
  }
};
