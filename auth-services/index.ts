import express, { Application, Request, Response } from "express";
import cors from "cors";
import crypto from "crypto";
import { iUser } from "./utils/interfaces";
import auth from '../auth-services/router/authRouter'

const port: number = 3000;
const app: Application = express();

let data: iUser[] = [];

app
  .use(cors())
  .use(express.json())
  .use('/api/auth', auth)
  .get("/", (req: Request, res: Response) => {
    try {
      res.status(200).json({
        message: "You hit the Auth Endpoint",
      });
    } catch (error) {
      res.status(404).json({
        message: "You hit the Auth Endpoint",
        data: error,
      });
    }
  })
  // .get("/api/users")
  // .post("/api/users/login", )
  // .get("/api/users/:id", )
  // .post("/api/register", );

const server = app.listen(port, () => {
  console.log("Server is currently active", port);
});

process.on("uncaughtException", (err: any) => {
  console.log("Server is shutting down because of uncaught exception");
  console.log("uncaught exception", err);

  process.exit(1);
});
process.on("unhandledRejection", (err: any) => {
  console.log("Server is shutting down because of uncaught exception");
  console.log("unhandledRejection", err);

  server.close(() => {
    process.exit(1);
  });
});
