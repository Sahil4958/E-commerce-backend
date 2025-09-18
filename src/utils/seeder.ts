import fs from "fs";
import path from "path";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

const filePathOfRole = path.join(__dirname, "..", "seeds", "role.json");
const filePathOfAdmin = path.join(__dirname, "..", "seeds", "admin.json");
const createRole = JSON.parse(fs.readFileSync(filePathOfRole, "utf-8"));
const adminInfo = JSON.parse(fs.readFileSync(filePathOfAdmin, "utf-8"));

export const seedRole = async () => {
  try {
    const roleData = await Role.find();
    if (roleData.length === 0) {
      await Role.create(createRole);
    } else {
      console.log("Role exist");
    }
  } catch (error: unknown) {
    return error instanceof Error ? error.message : "An unknown error occurred";
  }
};

export const createAdmin = async () => {
  try {
    const adminRole = await Role.findOne({
      role: "ADMIN",
      isDeleted: false,
    });
    const existingAdmin = await User.findOne({ email: adminInfo.email });
    if (existingAdmin) {
      console.log("admin already exist");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminInfo.password, salt);

    await User.create({
      ...adminInfo,
      password: hashedPassword,
      role: adminRole?._id,
    });
  } catch (error: unknown) {
    return error instanceof Error ? error.message : "An unknown error occurred";
  }
};
