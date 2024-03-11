import express, { Request, Response } from "express";
import config from "config";
import cors from "cors";
import deserializeUser from "../middleware/deserializeUser";
import routes from "../routes";
import cookieParser from "cookie-parser";
import responseTime from "response-time";
import { restResponseTimeHistogram } from "./metrics";

function createServer() {
  const app = express();
  app.use(
    cors({
      origin: config.get("origin"),
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(deserializeUser);
  app.use(
    responseTime((req: Request, res: Response, time: number) => {
      if (req?.route.path) {
        restResponseTimeHistogram.observe(
          {
            methods: req.method,
            route: req.route.path,
            status_code: res.statusCode,
          },
          time / 1000
        );
      }
    })
  );
  routes(app);
  return app;
}

export default createServer;
