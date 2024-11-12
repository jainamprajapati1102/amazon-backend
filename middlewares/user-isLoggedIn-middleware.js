import jwt from "jsonwebtoken";
import { TOKEN_ACCESS_KEY } from "../constants.js";
export default (req, res, next) => {
  try {
    console.log(req.cookies.token);

    if (!req.cookies.token) return res.send("You need login first.");

    const user = jwt.verify(req.cookies.token, TOKEN_ACCESS_KEY);
    console.log(user);

    req.user = user;
    next();
  } catch (error) {
    res.send(error);
  }
};
