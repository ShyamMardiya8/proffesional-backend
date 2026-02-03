import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadFileCloudinary } from "../services/cloudinary.service.js";
import userService from "../services/users.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mediaService from "../services/mediaService.service.js";

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
};

export default usersController;
