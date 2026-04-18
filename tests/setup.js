import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../src/config/db.js";

dotenv.config();

beforeAll(async () => {
  await connectDB();
  // Clear collections before tests
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
