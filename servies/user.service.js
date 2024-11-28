import { customerModel } from "../models/customer-models/customer.model.js";

export const registerService = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const existedUser = await customerModel.findOne({ email });
    if (existedUser)
      return res.send("you are already registered. Plz login....");
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.send(err);
        }
        const user = await customerModel.create({
          fullname,
          email,
          password: hash,
        });
        const token = generateToken(user);
        res.cookie("user_token", token);
        res.send(user);
      });
    });
  } catch (error) {
    dbgr("err from user authcontroller-->", error.message);
  }
};
