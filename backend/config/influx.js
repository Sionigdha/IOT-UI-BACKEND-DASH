import { InfluxDB } from "@influxdata/influxdb-client";

export const INFLUX_URL = "http://localhost:8086";
export const INFLUX_ORG = "iot-org";
export const INFLUX_BUCKET = "iot-bucket";

const INFLUX_TOKEN = process.env.INFLUX_TOKEN;

if (!INFLUX_TOKEN) {
  throw new Error("❌ INFLUX_TOKEN missing in .env");
}

export const influxDB = new InfluxDB({
  url: INFLUX_URL,
  token: INFLUX_TOKEN,
});

/**
 * 🔥 IMPORTANT:
 * Use **nanoseconds**
 * DO NOT manually timestamp
 */
export const writeApi = influxDB.getWriteApi(
  INFLUX_ORG,
  INFLUX_BUCKET,
  "ns"
);

export const queryApi = influxDB.getQueryApi(INFLUX_ORG);
