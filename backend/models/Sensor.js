import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    unit: { type: String, required: true },
    status: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Sensor", sensorSchema);
