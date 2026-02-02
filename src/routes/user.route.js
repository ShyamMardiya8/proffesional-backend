import { Router } from "express";
import usersController from "../controllers/user.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.route("/register").get(usersController.registerUser);

export default router;
