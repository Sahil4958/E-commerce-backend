import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API Task",
      version: "1.0.0",
      description: "API documentation for the Ecommerce API",
    },
    servers: [
      {
        url: "http://localhost:5002",
      },
      {
        url: "https://e-commerce-backend-1-konv.onrender.com/"
      }
    ],
  },
  apis: ["./src/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
