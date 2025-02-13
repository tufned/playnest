import { PrismaClient } from "@prisma/client";

class Database {
  private static readonly prisma = new PrismaClient();
  private static isConnected = false;

  static get client() {
    return this.prisma;
  }

  static async connect() {
    if (this.isConnected) return;

    await this.prisma.$connect();
    this.isConnected = true;
    console.log("✅Database connected successfully");
  }

  static async disconnect() {
    if (!this.isConnected) return;

    console.log("\n🔌Closing database connection...");
    await this.prisma.$disconnect();
    this.isConnected = false;
    console.log("🚪Database connection closed.");
  }
}

export default Database;
