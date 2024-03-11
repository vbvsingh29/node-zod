import express from "express";
import client from "prom-client";
import log from "./logger";

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API Response Time In Seconds",
  labelNames: ["methods", "route", "status_code"],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: "db_response_time_duration_seconds",
  help: "Database Response Time In Seconds",
  labelNames: ["operation", "success"],
});

export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics();
  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    log.info("Metics server started at http://localhost:9100");
  });
}
