import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadFileCloudinary } from "../services/cloudinary.service.js";
import userService from "../services/users.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mediaService from "../services/mediaService.service.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating access and generate token"
    );
  }
};
const usersController = {
  registerUser: asyncHandler(async (req, res) => {
    const { userName, email, fullName, password } = req.body;
    const avatarImage = req.files?.avatar[0]?.path;
    const coverImage = req.files?.coverImage[0]?.path;

    if (![userName, email, fullName, password].every(Boolean)) {
      throw new ApiError(400, "all field is required");
    }

    const isExistingUser = await userService.findUser({ userName, email });

    if (isExistingUser) {
      throw new ApiError(400, "user already exist");
    }

    const { avatarUrl, coverImageUrl } = await mediaService.uploadMedia({
      avatarImage,
      coverImage,
    });

    const response = await userService.createUser({
      userName,
      email,
      fullName,
      password,
      avatar: avatarUrl.url,
      coverImage: coverImageUrl.url,
    });

    if (!response) {
      throw new ApiError(400, "something wrong went creating user");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, "user registered successfully", response));
  }),
  loginUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (![email, password].every((field) => Boolean(field))) {
      throw new ApiError(400, "all field is required");
    }

    const findUserByEmail = await userService.findUserByEmail(email);
    if (!findUserByEmail) {
      throw new ApiError(404, "user is not existed, register first");
    }

    const isPasswordValid = await findUserByEmail.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(400, "password is not valid");
    }

    const idForTokenGeneration = findUserByEmail._id;
    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(idForTokenGeneration);

    return res.status(201).cookie
  }),
};

export default usersController;
