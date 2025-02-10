import * as mongoose from "mongoose";
import envConfig from "../configs/env.config.js";

const { DB_URI, DB_PASW, DB_NAME } = envConfig;

const initDatabase = async () => {
  try {
    if (!DB_URI || !DB_PASW || !DB_NAME) throw new Error("Missing DB connection data");
    const connectionString = DB_URI.replace("<DB_PASW>", DB_PASW).replace(
      "<DB_NAME>",
      DB_NAME
    );
    await mongoose.connect(connectionString);
    console.log("Database connected successfully");
  } catch (err) {
    console.error(err);
  }
};

export default initDatabase;
