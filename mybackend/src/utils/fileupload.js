import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileupload = async (file) => {
  try {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const randomName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    const response = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      public_id: randomName,
    });
    console.log("File uploaded to cloudinary", response.url);
    return response;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { fileupload };
