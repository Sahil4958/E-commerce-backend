import { v2 as cloudinaryV2 } from "cloudinary";
import { Readable } from "stream";
import { config } from "../config";

export namespace Cloudinary {
  cloudinaryV2.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
  });
  export const uploadToCloudinary = async (
    file: Express.Multer.File,
    isBeingCalled?: string
  ): Promise<any> => {
    try {
      return new Promise((resolve, reject) => {
        const folderMap: Record<string, string> = {
          emp: "ecommerce",
        };

        const folderValue =
          isBeingCalled && folderMap[isBeingCalled]
            ? folderMap[isBeingCalled]
            : undefined;
        const stream = cloudinaryV2.uploader.upload_stream(
          { folder: folderValue, public_id: file.originalname.split(".")[0] },
          (error, result: any) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);
        readableStream.pipe(stream);
      });
    } catch (error) {
      console.error("Cloudinary error:", error);
      throw new Error("Cloudinary upload failed");
    }
  };
}
