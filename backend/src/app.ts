import express, { Application, Request, Response } from "express";
import cors from "cors"; 
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes/routes";
import cookieParser from "cookie-parser";

export const app: Application = express();

app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});


app.use(globalErrorHandler);
app.use(notFound)