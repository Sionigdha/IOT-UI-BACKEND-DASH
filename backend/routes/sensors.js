import express from "express";
import { queryApi, INFLUX_BUCKET } from "../config/influx.js";

const router = express.Router();

/**
 * 🔥 CORRECT latest-value query
 */
router.get("/", (req, res) => {
  const fluxQuery = `
from(bucket: "${INFLUX_BUCKET}")
  |> range(start: -24h)
  |> filter(fn: (r) => r._measurement == "sensor_data")
  |> filter(fn: (r) => r._field == "value")
  |> sort(columns: ["_time"], desc: true)
  |> unique(column: "sensor")
`;

  const results = [];

  queryApi.queryRows(fluxQuery, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      results.push({
        sensor: o.sensor,
        value: o._value,
        time: o._time,
      });
    },
    error(err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    },
    complete() {
      res.json(results);
    },
  });
});

export default router;
