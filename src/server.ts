import app from "./app";
import { config } from "./config";
import { connectDb } from "./config/db";
import { createAdmin, seedRole } from "./utils/seeder";

const start = async () => {
  connectDb();
  createAdmin();
  seedRole();

  app.listen(config.port, () => {
    console.log(`Server is running on port http://localhost:${config.port}`);
  });
};

start();
