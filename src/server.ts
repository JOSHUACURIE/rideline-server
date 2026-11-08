
import "dotenv/config";

import app from "./app";
import prisma from "./config/database";

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`RideLine API running on port ${PORT}`);
});


const shutdown = async () => {
  console.log("Shutting down RideLine...");

  server.close(async () => {
    try {
      await prisma.$disconnect();
      console.log("Database disconnected");

      process.exit(0);
    } catch (error) {
      console.error("Shutdown error:", error);
      process.exit(1);
    }
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
