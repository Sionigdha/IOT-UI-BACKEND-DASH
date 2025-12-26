import express from "express";
import { queryApi, INFLUX_BUCKET } from "../config/influx.js";

const router = express.Router();

/**
 * GET /api/trends/:sensor?minutes=10
 */
router.get("/:sensor", async (req, res) => {
  const sensor = req.params.sensor;
  const minutes = Number(req.query.minutes || 10);

  const fluxQuery = `
    from(bucket: "${INFLUX_BUCKET}")
      |> range(start: -${minutes}m)
      |> filter(fn: (r) => r._measurement == "sensor_data")
      |> filter(fn: (r) => r.sensor == "${sensor}")
      |> filter(fn: (r) => r._field == "value")
      |> keep(columns: ["_time", "_value"])
      |> sort(columns: ["_time"])
  `;

  const results = [];

  try {
    queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        results.push({
          time: o._time,
          value: o._value,
        });
      },
      error(error) {
        console.error("INFLUX TREND ERROR ❌", error);
        res.status(500).json({
          error: "trend fetch failed",
          details: error.message,
        });
      },
      complete() {
        res.json(results);
      },
    });
  } catch (err) {
    console.error("TREND API CRASH ❌", err);
    res.status(500).json({
      error: "trend fetch failed",
      details: err.message,
    });
  }
});

export default router;
