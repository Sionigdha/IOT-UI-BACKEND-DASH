# IoT Monitoring Dashboard (Mock Machine Setup)

A full-stack IoT monitoring dashboard that simulates machine sensor data and visualizes it in real time using a backend API and a web-based UI.

This project uses a **mock machine** to generate telemetry data, which is ingested into a time-series database and displayed on a live dashboard.

---

## Features
- Real-time sensor data ingestion (mock machine)
- Backend API for telemetry handling
- Time-series storage using InfluxDB
- Interactive dashboard UI
- Modular and extensible architecture

---

## Tech Stack
**Frontend**
- React / Next.js
- Tailwind CSS
- Chart-based visualizations

**Backend**
- Node.js
- Express.js
- InfluxDB client

**Database**
- InfluxDB (time-series data)

---

## Project Structure

---

## How It Works
1. The mock machine generates sensor readings (e.g., temperature, vibration).
2. Data is sent to the backend API.
3. Backend writes telemetry data to InfluxDB.
4. Frontend queries the backend and displays live sensor trends.

---

## Setup (Local)
1. Clone the repository
2. Install dependencies for backend and frontend
3. Start InfluxDB locally
4. Run backend server
5. Start frontend dashboard
6. Run mock machine script to generate data

---

## Status
🚧 **Work in Progress**

Planned improvements:
- Authentication
- Alerting & thresholds
- Historical analytics
- Deployment setup

---

## Purpose
This project was built to understand:
- IoT data pipelines
- Backend–database communication
- Real-time dashboards
- System design for sensor-based applications
