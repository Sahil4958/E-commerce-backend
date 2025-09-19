import app from "./app";
import { config } from "./config";
import { connectDb } from "./config/db";
import { createAdmin, seedRole } from "./utils/seeder";
import { setupSwagger } from "./utils/swagger";

const start = async () => {
  connectDb();
  createAdmin();
  seedRole();
  setupSwagger(app);
  app.listen(config.port, () => {
    console.log(`Server is running on port http://localhost:${config.port}`);
    console.log(`Swagger docs on http://localhost:${config.port}/api-docs`);
  });
};

start();
