import { Router } from "express";
import {
  homeController,
  registerController,
  loginController,
  logoutController,
} from "../controllers/seller-auth-controller.js";
import sellerisLoggedInMiddleware from "../middlewares/seller-isLoggedIn-middleware.js";
const router = Router();

router.get("/", homeController); //for the landing page
router.post("/register", registerController); // create the user
router.post("/login", loginController); //for the user login
router.get("/logout", logoutController); //for the user login
// user.js
export default router;
