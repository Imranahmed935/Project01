import express, { Application, Request, Response } from "express";
import cors from "cors"; 
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";

export const app: Application = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});


app.use(globalErrorHandler);
app.use(notFound)