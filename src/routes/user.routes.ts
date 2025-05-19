import express from "express";
import auth from "../middlewares/auth";
import { userController } from "../controllers/user.controller";
import { enums } from "../common/constants";

const router = express.Router();

//? POST
//* Register user API
router.post("/register", userController.registerUser.validation, userController.registerUser.handler);

//? POST
//* Login user API
router.post("/login", userController.loginUser.validation, userController.loginUser.handler);

export default router;
