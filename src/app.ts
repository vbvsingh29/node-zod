import config from "config";
import connect from "./utlis/connect";
import logger from "./utlis/logger";
import createServer from "./utlis/server";
import { startMetricsServer } from "./utlis/metrics";
import swaggerDocs from "./utlis/swagger";

const port = config.get<number>("port");
const app = createServer();
app.listen(port, async () => {
  logger.info(`server is running at http://localhost:${port}`);

  await connect();
  swaggerDocs(app, port);

  startMetricsServer();
});
