import { ApiError } from "../utils/ApiError.js";
import { uploadFileCloudinary } from "./cloudinary.service.js";

const mediaService = {
  uploadMedia: async (files) => {
    try {
      const { avatarImage, coverImage } = files;
      const [avatarUrl, coverImageUrl] = await Promise.all([
        uploadFileCloudinary(avatarImage),
        uploadFileCloudinary(coverImage),
      ]);

      if (!avatarUrl || !coverImageUrl) {
        throw new ApiError(500, "media upload failed image is missing");
      }
      return {
        avatarUrl,
        coverImageUrl,
      };
    } catch (error) {
      throw new ApiError(
        500,
        "something wrong when file is uploading in cloudinary"
      );
    }
  },
};
export default mediaService;
