// Third party imports
import express, { Express, Request, Response, NextFunction } from "express";

// User imports
import { createNotFoundErr } from "@mono/utils";
import mailRouter from "./routes/mail";
import globalErrController from "./controllers/globalErrController";

const app: Express = express();

// Parsing the incoming payload if the 'content-type' : 'application-json'
app.use(express.json({ limit: 100 }));

app.use("/api/v1/mail", mailRouter);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(createNotFoundErr(`We don't handle this route ${req.method} : ${req.originalUrl}`));
});

app.use(globalErrController);

export default app;
