import * as bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import debug from "debug";
import { sellerModel } from "../models/seller-models/sellers.models.js";
import { profileModel } from "../models/seller-models/seller.profile.models.js";
import { productModel } from "../models/seller-models/seller.products.models.js";

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
        res.cookie("seller_token", token);
        res.status(200).send(seller);
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
    console.log(chqUser);

    if (!chqUser) return res.send("something went wrong");
    const decodepass = await bcrypt.compare(password, chqUser.password);
    if (decodepass) {
      const token = generateToken(chqUser);
      res.cookie("seller_token", token);
      res.status(200).send("you can login!!");
    } else {
      res.send("password was incorrect!!");
    }
  } catch (error) {
    dbgr("err from login user-->", error);
  }
};

export const logoutController = async (req, res) => {
  res.cookie("seller_token", "");
  res.redirect("/seller/");
};
export const getprofileController = async (req, res) => {
  try {
    const getSeller = await profileModel.findOne({ seller: req.user.userid });
    // .populate("address")
    // .populate("Product");
    res.json(getSeller);
  } catch (error) {
    res.send(error);
  }
};
export const updateprofileController = async (req, res) => {
  try {
    const {
      addLine1,
      addLine2,
      city,
      state,
      pincode,
      mobileno,
      category,
      gstin,
      pan,
    } = req.body;

    const seller = await profileModel.findOne({ seller: req.user.userid });
    console.log(seller);
    if (seller) {
      console.log("update");
    } else {
      console.log("created");
    }

    if (seller) {
      const updateSeller = await profileModel.findOneAndUpdate(
        { seller: req.user.userid },
        {
          addLine1,
          addLine2,
          city,
          state,
          pincode,
          mobileno,
          category,
          gstin,
          pan,
        },
        { new: true }
      );
      const seller = await sellerModel.findById({ _id: req.user.userid });
      seller.profile = updateSeller._id;
      await seller.save();
      res.status(200).send("updated successfully");
    } else {
      const updateprofile = await profileModel.create({
        addLine1,
        addLine2,
        city,
        state,
        pincode,
        seller: req.user.userid,
        mobileno,
        category,
        gstin,
        pan,
      });
      const seller = await sellerModel.findById({ _id: req.user.userid });
      seller.profile = updateprofile._id;
      await seller.save();
      res.status(200).send("profile created successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
export const productController = async (req, res) => {
  try {
    const { name, description, image, price, stock } = req.body;
    const product = await productModel.create({
      name,
      description,
      image: req.file.filename,
      price,
      stock,
      seller: req.user.userid,
    });

    const seller = await sellerModel.findOne({ _id: req.user.userid });
    seller.produts.push(product._id);
    await seller.save();
    res.status(200).send(product);
  } catch (error) {
    dbgr("err from seller product-->", error);
  }
};
