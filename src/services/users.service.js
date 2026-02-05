import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const userService = {
  createUser: async (userData) => {
    try {
      const response = await User.create({
        userName: userData.userName,
        email: userData.email,
        fullName: userData.fullName,
        password: userData.password,
        avatar: userData.avatar,
        coverImage: userData.coverImage,
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  },
  findUser: async (userDetails) => {
    try {
      const { userName, email } = userDetails;
      console.info("🚀 ~ userName:", userName);
      const userData = await User.findOne({
        $or: [{ userName }, { email }],
      });
      return userData;
    } catch (error) {
      console.error(error.message);
    }
  },
  findUserByEmail: async (userEmail) => {
    try {
      const { email } = userEmail;
      console.info("🚀 ~ email:", email);
      const isEmailExisting = await User.findOne({ email: email });
      return isEmailExisting;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default userService;
