import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.headers("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError("UnAuthorization request");
    }

    const decodedToken = await jwt.sign(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById({ _id: decodedToken?._id }).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "invalid access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message ?? "Invalid Access Token");
  }
});
