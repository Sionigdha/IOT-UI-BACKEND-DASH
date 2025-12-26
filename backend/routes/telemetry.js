import express from "express";
import { writeApi } from "../config/influx.js";
import { Point } from "@influxdata/influxdb-client";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("🚨 TELEMETRY RECEIVED:", req.body);

  try {
    const { sensor, value } = req.body;

    if (!sensor || value === undefined) {
      return res.status(400).json({ error: "sensor and value required" });
    }

    const point = new Point("sensor_data")
      .tag("sensor", sensor)
      .floatField("value", Number(value));

    writeApi.writePoint(point);
    await writeApi.flush();

    res.json({ success: true, sensor, value });
  } catch (err) {
    console.error("INFLUX WRITE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
