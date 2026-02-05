import { Router } from "express";
import usersController from "../controllers/user.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  usersController.registerUser
);

router.route("/login").post(usersController.loginUser);

router.route("/logout").post(verifyJwt, usersController.logOutUser);

export default router;
