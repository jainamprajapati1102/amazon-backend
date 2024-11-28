import { customerModel } from "../models/customer-models/customer.model.js";
import { productModel } from "../models/seller-models/seller.products.models.js";
import * as bcrypt from "bcrypt";
import { orderModel } from "../models/customer-models/customer-order-model.js";
import { generateToken } from "../utils/generateToken.js";
import debug from "debug";

const dbgr = debug("development:user-auth-Controller");
export const homeController = (req, res) => {
  res.send("hello landing page");
};

export const registerController = async (req, res) => {
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

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const chqUser = await customerModel.findOne(
      { email },
      "email password role -_id"
    );
    if (!chqUser) {
      return res.send("something went wrong");
    }
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
    const getUser = await customerModel.findOne(
      { email: req.user.email },
      "-_id -__v"
    );
    res.json(getUser);
  } catch (error) {}
};
export const profileUpdateController = async (req, res) => {
  try {
    const { address, profileImage, fullname, email } = req.body;

    const imgupdate = await customerModel.findByIdAndUpdate(
      { _id: req.user.userid },
      { profileImage: req.file.filename, address, fullname, email },
      { new: true }
    );

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
    const {
      status,
      address,
      orderprice,
      paymentProvider,
      paymentId,
      isPaymentDone,
    } = req.body;
    console.log(req.body);
    const order = await orderModel.create({
      status,
      address,
      orderprice,
      paymentProvider,
      paymentId,
      isPaymentDone,
    });

    const cus = await customerModel.findById({ _id: req.user.userid });
    cus.order.push(order._id);
    await cus.save();
    res.json({ order, cus });
  } catch (error) {
    res.send(error.message);
  }
};
