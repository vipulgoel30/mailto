// Third party imports
import { connect, connection } from "mongoose";

// User imports
import { retryAsync, INFINITE, errorLogger, generateKey } from "@mono/utils";
import app from "./app";
import Client from "./models/client";
import { cryptoHelper } from "./helpers";

const errTypes = ["uncaughtException", "unhandledRejection"] as const;
errTypes.forEach((errType: (typeof errTypes)[number]) => {
  process.on(errType, (err) => {
    errorLogger(err, `${errType.toUpperCase()} !!!`, true);
    process.exitCode = 0;
  });
});

const initServer = async () => {
  try {
    if (!process.env.MONGO_CONN) throw new Error("Unavailable MONGO_CONN .env variable : server.ts");
    const { connection } = await retryAsync(() => connect(process.env.MONGO_CONN), INFINITE, 5, 20);
    console.log("MongoDB connected successfully");

    // Add listener for disconnection
    connection.on("disconnected", () => {
      errorLogger(new Error("Mongo disconnection error"), true);
    });

    if (!process.env.PORT) throw new Error("Unavailable PORT .env variable : server.ts");
    const port: number = parseInt(process.env.PORT);
    app.listen(port, () => {
      console.log(`App listening on port : ${port}`);
    });
  } catch (err) {
    let message: string = "Error : server.ts";

    if (err instanceof Error && ["MongoParseError", "MongoServerError"].includes(err.name)) {
      message = "MongoDB connection error : server.ts";
    }

    errorLogger(err, message, true);
  }
};

initServer();
