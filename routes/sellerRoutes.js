import { Router } from "express";
import {
  homeController,
  registerController,
  loginController,
  logoutController,
  getprofileController,
  updateprofileController,
  productController,
} from "../controllers/seller-auth-controller.js";
import sellerisLoggedInMiddleware from "../middlewares/seller-isLoggedIn-middleware.js";
import { roleMiddleware } from "../middlewares/role-middleware.js";
const router = Router();

router.get("/", homeController); //for the landing page
router.post("/register", registerController); // create the user
router.post("/login", loginController); //for the user login
router.get("/logout", logoutController); //for the user login
router.get("/getprofile", sellerisLoggedInMiddleware,roleMiddleware("SELLER"), getprofileController); //for the user login
router.get("/updateprofile", sellerisLoggedInMiddleware,roleMiddleware("SELLER"), updateprofileController); //for the user login
router.get("/product", sellerisLoggedInMiddleware,roleMiddleware("SELLER"), productController); //for the user login

export default router;
