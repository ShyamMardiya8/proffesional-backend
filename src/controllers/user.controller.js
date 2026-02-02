import asyncHandler from "../utils/asyncHandler.js";

const usersController = {
  registerUser: asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      message: "alpha is online",
    });
  }),
};

export default usersController;
