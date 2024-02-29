import express from "express";
import config from "config";
import connect from "./utlis/connect";
import logger from "./utlis/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
const app = express();
const port = config.get<number>("port");

app.use(express.json());
app.use(deserializeUser);
app.listen(1337, async () => {
  logger.info(`server is running at http://localhost:${port}`);

  await connect();
  routes(app);
});
