import mongoose from "mongoose";
import config from "config";
import logger from "./logger";
function connect() {
  const dbUri = config.get<string>("dbUri");

  return mongoose
    .connect(dbUri)
    .then(() => {
      logger.info("connect to db");
    })
    .catch((err) => {
      logger.error("cannot connect to DB", err);
      process.exit(1);
    });
}

export default connect;
