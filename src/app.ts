import config from "config";
import connect from "./utlis/connect";
import logger from "./utlis/logger";
import createServer from "./utlis/server";

const port = config.get<number>("port");
const app = createServer();
app.listen(1337, async () => {
  logger.info(`server is running at http://localhost:${port}`);

  await connect();
});
