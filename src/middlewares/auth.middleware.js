import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    debugger;
    const token =
      req.cookies.accessToken ||
      req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "UnAuthorization request");
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById({ _id: decodedToken?.id }).select(
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
