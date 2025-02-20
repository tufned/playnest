import Database from "../lib/db-facade.js";
import process from "node:process";
import envConfig from "../configs/env.config.js";

const { DATABASE_URL } = envConfig;

const initDatabase = async () => {
  try {
    if (!DATABASE_URL) throw new Error("❌Missing database connection string");
    await Database.connect();
  } catch (err) {
    console.error(err);
    await Database.disconnect();
  }
};

const shutdownDatabase = async () => {
  await Database.disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdownDatabase);
process.on("SIGTERM", shutdownDatabase);
process.on("exit", shutdownDatabase);
process.on("beforeExit", shutdownDatabase);
process.on("disconnect", shutdownDatabase);

export default initDatabase;
