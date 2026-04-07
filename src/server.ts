import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { config } from "./config/env";

let server: Server;



const startserver = async () => {
  try {
    await mongoose.connect(config.DATABASE_URL);

    console.log("Connected to DB!!");

    server = app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startserver();

// Handle SIGTERM signal
process.on("SIGTERM", () => {

  console.log("Sigterm Server closed!!");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
})

// Handle unhandled promise rejections
process.on("unhandledRejection", () => {

  console.log("unhandled Rejection!!");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
})

// Handle uncaught exceptions
process.on("uncaughtException", () => {

  console.log("Uncaught Exception!!");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
})

