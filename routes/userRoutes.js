import { Router } from "express";
import {
  homeController,
  registerController,
  loginController,
  profileGateController,
  profileUpdateController,
  logoutController,
} from "../controllers/user-auth-controller.js";
import isLoggedInMiddleware from "../middlewares/user-isLoggedIn-middleware.js";
import {roleMiddleware} from '../middlewares/role-middleware.js'
const router = Router();

router.get("/", homeController); //for the landing page
router.post("/register", registerController); // create the user
router.post("/login", loginController); //for the user login
router.get("/logout", logoutController); //for the user login
router.post("/profileupdate", isLoggedInMiddleware,roleMiddleware(['USER']), profileUpdateController); //user can update him profile
router.get("/profileget", isLoggedInMiddleware,roleMiddleware(['USER']), profileGateController); //user can seen him profile

// user.js
export default router;
