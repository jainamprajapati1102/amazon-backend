import { customerModel } from "../models/customer-models/customer.model.js";
import { addressModel } from "../models/customer-models/customer.address.model.js";
import { productModel } from "../models/seller-models/seller.products.models.js";
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
    const existedUser = await customerModel.findOne({ email });
    if (existedUser)
      return res.send("you are already registered. Plz login....");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err);
        const user = await customerModel.create({
          name,
          email,
          password: hash,
          mobileno,
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

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const chqUser = await customerModel.findOne({ email });
    if (!chqUser) return res.send("something went wrong");
    const decodepass = await bcrypt.compare(password, chqUser.password);
    if (decodepass) {
      const token = generateToken(chqUser);
      res.cookie("user_token", token);
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
    const getUser = await customerModel
      .findOne({ email: req.user.email })
      .populate("address");
    res.json(getUser);
  } catch (error) {}
};
export const profileUpdateController = async (req, res) => {
  try {
    const { addLine1, addLine2, city, state, pincode, image } = req.body;
    const addressfind = await addressModel.findOne({ user: req.user.userid });
    if (addressfind) {
      const updateUser = await addressModel.findOneAndUpdate(
        { user: req.user.userid },
        { addLine1, addLine2, city, state, pincode },
        { new: true }
      );
      const imgupdate = await customerModel.findByIdAndUpdate(
        { _id: req.user.userid },
        { image: req.file.filename },
        { new: true }
      );
    } else {
      const address = await addressModel.create({
        addLine1,
        addLine2,
        city,
        state,
        pincode,
        user: req.user.userid,
      });
      const user = await customerModel.findById({ _id: req.user.userid });

      if (address) {
        const updateUser = await customerModel.findByIdAndUpdate(
          { _id: req.user.userid },
          { address: address._id, image: req.file.filename },
          { new: true }
        );
      }
    }
    res.status(200).send("address updated");
  } catch (error) {
    dbgr(error);
    // res.send(error.message);
  }
};
export const logoutController = (req, res) => {
  res.cookie("user_token", "");
  res.redirect("/user/");
};

export const pr = async (req, res) => {
  try {
    const viewproduct = await productModel
      .find({}, "-_id")
      .populate("seller", "name");
    // .select("-_id"); //.select('name');
    res.json(viewproduct);
  } catch (error) {
    res.json(error.message);
  }
};

export const deleteAccountController = async (req, res) => {
  try {
    const delUser = await customerModel.findByIdAndDelete({
      _id: req.user.userid,
    });
    res.cookie("user_token", "");
    res.send("user is deleted");
  } catch (error) {
    res.send(error.message);
  }
};

export const orderController = async (req, res) => {
  try {
    console.log(req.params);
    const { status, address } = req.body;
  } catch (error) {}
};
