import { userModel } from "../models/user-models/user.model.js";
import { addressModel } from "../models/user-models/user.address.model.js";
import * as bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import debug from "debug";

const dbgr = debug("development:user-auth-Controller");
export const homeController = (req, res) => {
  res.send("hello landing page");
};
export const registerController = async (req, res) => {
  try {
    const { name, email, password, mobileno } = req.body;
    const existedUser = await userModel.findOne({ email });
    if (existedUser)
      return res.send("you are already registered. Plz login....");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err);
        const user = await userModel.create({
          name,
          email,
          password: hash,
          mobileno,
        });
        const token = generateToken(user);
        res.cookie("token", token);
        res.send(user);
      });
    });
  } catch (error) {
    dbgr("err from user authcontroller-->", error.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const chqUser = await userModel.findOne({ email });
    if (!chqUser) return res.send("something went wrong");
    const decodepass = await bcrypt.compare(password, chqUser.password);
    if (decodepass) {
      const token = generateToken(chqUser);
      res.cookie("token", token);
      res.status(200).send("you can login!!");
    } else {
      res.send("password was incorrect!!");
    }
  } catch (error) {
    dbgr("err from login user-->", error);
  }
};

export const profileGateController = async (req, res) => {
  try {
    const getUser = await userModel
      .findOne({ email: req.user.email })
      .populate("address");
    res.json(getUser);
  } catch (error) {}
};
export const profileUpdateController = async (req, res) => {
  try {
    const { addLine1, addLine2, city, state, pincode } = req.body;
    const address = await addressModel.create({
      addLine1,
      addLine2,
      city,
      state,
      pincode,
      user: req.user.userid,
    });
    const user = await userModel.findById({ _id: req.user.userid });
    if (address) {
      const updateUser = await userModel.findByIdAndUpdate(
        { _id: req.user.userid },
        { address: address._id },
        { new: true }
      );
    }
    res.send("address updated");
  } catch (error) {
    dbgr(error);
    // res.send(error.message);
  }
};
export const logoutController = (req, res) => {
  res.cookie("token", "");
  res.redirect("/user/");
};
