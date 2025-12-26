import express from "express";
import cors from "cors";
import "dotenv/config";

import telemetryRoutes from "./routes/telemetry.js";
import sensorRoutes from "./routes/sensors.js";
import trendRoutes from "./routes/trends.js";

const app = express();

app.use(cors());
app.use(express.json());

// 🔌 API ROUTES (InfluxDB-backed)
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/trends", trendRoutes);

app.get("/", (req, res) => {
  res.send("IoT Backend is running");
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
