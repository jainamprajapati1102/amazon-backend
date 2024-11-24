import { Router } from "express";
import {
  homeController,
  registerController,
  loginController,
  profileGateController,
  profileUpdateController,
  logoutController,
  deleteAccountController,pr
} from "../controllers/user-auth-controller.js";
import { roleMiddleware } from "../middlewares/role-middleware.js";
import { upload } from "../middlewares/user-img-middleware.js";
import userIsLoggedInMiddleware from "../middlewares/user-isLoggedIn-middleware.js";
import multer from "multer";
const router = Router();

router.get("/", homeController); //for the landing page
router.post("/register", registerController); // create the user
router.post("/login", loginController); //for the user login
router.get("/logout", logoutController); //for the user login
router.put("/profileupdate",userIsLoggedInMiddleware,roleMiddleware(["USER"]),upload.single('image'),profileUpdateController); //user can update him profile
router.get("/profileget",userIsLoggedInMiddleware,roleMiddleware(["USER"]),profileGateController); //user can seen him profile
router.get("/pr",pr); //user can seen him profile

router.delete("/deleteaccount",userIsLoggedInMiddleware,deleteAccountController);// user.js
export default router;
