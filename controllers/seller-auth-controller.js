import * as bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import debug from "debug";
import { sellerModel } from "../models/seller-models/sellers.models.js";

const dbgr = debug("development:seller-auth-Controller");

export const homeController = (req, res) => {
  res.send("hello landing page for seller");
};

export const registerController = async (req, res) => {
  try {
    const { name, storename, email, password } = req.body;
    const existedUser = await sellerModel.findOne({ email });
    if (existedUser)
      return res.send("you are already registered. Plz login....");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err);
        const seller = await sellerModel.create({
          name,
          storename,
          email,
          password: hash,
        });
        const token = generateToken(seller);
        res.cookie("token", token);
        res.send(seller);
      });
    });
  } catch (error) {
    dbgr("err from seller authcontroller-->", error.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const chqUser = await sellerModel.findOne({ email });
    if (!chqUser) return res.send("something went wrong");
    const decodepass = await bcrypt.compare(password, chqUser.password);
    dbgr(decodepass);
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

export const logoutController = async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     const chqUser = await userModel.findOne({ email });
  //     if (!chqUser) return res.send("something went wrong");
  //     const decodepass = await bcrypt.compare(password, chqUser.password);
  //     dbgr(decodepass);
  //     if (decodepass) {
  //       const token = generateToken(chqUser);
  //       res.cookie("token", token);
  //       res.status(200).send("you can login!!");
  //     } else {
  //       res.send("password was incorrect!!");
  //     }
  //   } catch (error) {
  //     dbgr("err from login user-->", error);
  //   }
};
export const getprofileController = async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     const chqUser = await userModel.findOne({ email });
  //     if (!chqUser) return res.send("something went wrong");
  //     const decodepass = await bcrypt.compare(password, chqUser.password);
  //     dbgr(decodepass);
  //     if (decodepass) {
  //       const token = generateToken(chqUser);
  //       res.cookie("token", token);
  //       res.status(200).send("you can login!!");
  //     } else {
  //       res.send("password was incorrect!!");
  //     }
  //   } catch (error) {
  //     dbgr("err from login user-->", error);
  //   }
};
export const updateprofileController = async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     const chqUser = await userModel.findOne({ email });
  //     if (!chqUser) return res.send("something went wrong");
  //     const decodepass = await bcrypt.compare(password, chqUser.password);
  //     dbgr(decodepass);
  //     if (decodepass) {
  //       const token = generateToken(chqUser);
  //       res.cookie("token", token);
  //       res.status(200).send("you can login!!");
  //     } else {
  //       res.send("password was incorrect!!");
  //     }
  //   } catch (error) {
  //     dbgr("err from login user-->", error);
  //   }
};
export const productController = async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     const chqUser = await userModel.findOne({ email });
  //     if (!chqUser) return res.send("something went wrong");
  //     const decodepass = await bcrypt.compare(password, chqUser.password);
  //     dbgr(decodepass);
  //     if (decodepass) {
  //       const token = generateToken(chqUser);
  //       res.cookie("token", token);
  //       res.status(200).send("you can login!!");
  //     } else {
  //       res.send("password was incorrect!!");
  //     }
  //   } catch (error) {
  //     dbgr("err from login user-->", error);
  //   }
};
