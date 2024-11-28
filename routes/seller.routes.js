import { Router } from "express";
import {
  homeController,
  registerController,
  loginController,
  logoutController,
  getprofileController,
  updateprofileController,
  productController,
  fakeseller,
} from "../controllers/seller-auth-controller.js";
import sellerisLoggedInMiddleware from "../middlewares/seller-isLoggedIn-middleware.js";
import { roleMiddleware } from "../middlewares/role-middleware.js";
import { upload } from "../middlewares/product-img.js";
export const router = Router();

router.get("/", homeController); //for the landing page
router.post("/register", registerController); // create the user
router.post("/login", loginController); //for the user login
router.get("/logout", logoutController); //for the user login
router.get("/fakeseller", fakeseller); //for the user login
router.get(
  "/getprofile",
  sellerisLoggedInMiddleware,
  roleMiddleware("SELLER"),
  getprofileController
); //for the user login
router.post(
  "/updateprofile",
  sellerisLoggedInMiddleware,
  roleMiddleware("SELLER"),
  updateprofileController
); //for the user login
router.post(
  "/productcreate",
  sellerisLoggedInMiddleware,
  roleMiddleware("SELLER"),
  upload.single("image"),
  productController
); //for add the product

export default router;
