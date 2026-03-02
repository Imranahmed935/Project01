import dotenv from "dotenv";
import http from "http"
import { app } from "./app";
import config from "./config";
dotenv.config();

async function runServer() {
  try {
    let server = http.createServer(app);
    server.listen(config.port, () => {
      console.log(
        `🚀 Server running on port | ${config.port}`
      );
    });
  } catch (error) {
    console.error("❌ Server failed to start", error);
  }
}

runServer()