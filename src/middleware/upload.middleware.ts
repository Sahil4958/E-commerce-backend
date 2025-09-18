import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
});

export const validateFiles = (files: Express.Multer.File[]) => {
  const validExtensions = [".jpg", ".jpeg", ".png", ".jfif"];

  const invalidFiles = files.filter((file) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!validExtensions.includes(ext)) {
      return true;
    }

    if (
      [".jpg", ".jpeg", ".jfif"].includes(ext) &&
      file.mimetype === "image/jpeg"
    ) {
      return false;
    }
    if (ext === ".png" && file.mimetype === "image/png") {
      return false;
    }
    return true;
  });

  if (files.length > 5) {
    return "You can upload a maximum of 5 images.";
  }
  if (invalidFiles.length > 0) {
    return "Only JPG, JPEG, JFIF, and PNG image formats are allowed.";
  }
  return null;
};
