# Project Name: CANpi Dashboard
## Title: Build a Raspberry Pi Vehicle Dashboard WebApp using React + SocketCAN  

Create a **modern React-based web application** similar in functionality to **OnBoardPi** (https://github.com/bgunson/onboardpi).  

The goal is to build a **customizable digital dashboard** for a **Raspberry Pi 4/5** connected to a **PiCAN2 or PiCAN3 board** using **SocketCAN**. The dashboard must visualize real-time vehicle telemetry (speed, RPM, temperature, etc.) with smooth animated gauges and a clean touchscreen interface optimized for in-car use.  

---

## System Architecture  

**Hardware Layer:**  
- Raspberry Pi 4 or 5  
- PiCAN2/PiCAN3 board using the MCP2515 CAN controller  
- Touchscreen display (7″ official Raspberry Pi or Waveshare 10″ IPS HDMI)  

**OS Configuration:**  
Enable SPI and MCP2515 overlay in `/boot/config.txt`:  
```bash
dtparam=spi=on  
dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25  
```
Bring up the CAN interface:  
```bash
sudo ip link set can0 up type can bitrate 500000
```
Verify using `ip link show can0` or `candump can0`.  

**Backend (Node.js):**  
- Use **Express.js** + **Socket.IO** to handle data streaming.  
- Access SocketCAN using the **node-can** library.  
- Parse and forward live CAN frames to the React frontend in JSON format.  
- Maintain a configurable signal map (e.g. `config/signals.json`) to decode CAN IDs into readable values (e.g., RPM, Speed).  
- Include optional logging using `fs` (CSV) or InfluxDB.  

Sample backend flow:  
```js
import can from "socketcan";
import { Server } from "socket.io";
import express from "express";
const app = express();
const io = new Server(3001);
const channel = can.createRawChannel("can0", true);
channel.addListener("onMessage", (msg) => {
  const data = parseCAN(msg);  
  io.emit("can-data", data);
});
channel.start();
```

---

##  Frontend (React)  

- Built with **React + Vite** or **Next.js** for fast performance on Raspberry Pi.  
- Use **TypeScript** for maintainability.  
- Integrate WebSocket client for real-time updates.  
- Fullscreen kiosk-friendly UI for Chromium.  

**UI Components:**  
- Gauges: `react-canvas-gauges` or `react-gauge-component`  
- Charts: `recharts` for trends and history  
- Tabs or Layout: `react-router-dom` + `@mui/material` for navigation and panels  
- Settings Modal: `react-hook-form` for user configuration  
- Live status indicator (CAN connected/disconnected)  

**Suggested UI Layout:**  
- **Home Tab:** Large RPM and Speed gauges, smaller Temperature & Fuel.  
- **Data Tab:** Live values in numeric cards.  
- **Logs Tab:** Scrolling data viewer + export button.  
- **Settings Tab:** Layout and signal selection (stored in localStorage or JSON file).  

---

##  Customization & Config  

Allow users to:
- Select which CAN signals to display  
- Assign signals to specific gauge widgets  
- Switch between dark/light themes  
- Save preferred layout (JSON config)  

Include `config/default-layout.json` and a layout manager component.  

---

##  Data Logging  

Optional CAN frame logger (backend side):  
- Local CSV file (`logs/YYYYMMDD.csv`)  
- InfluxDB time-series DB for advanced analytics (optional)  

Include API endpoint `/export-log` to download logs from frontend.  

---

##  Performance Optimization  

- Use **WebSocket streaming** instead of HTTP polling.  
- Cap UI updates to ~20 Hz for smooth visuals.  
- Use GPU acceleration (enable Fake KMS/OpenGL).  
- Implement socket reconnection handling for network drops.  

---

##  Folder Structure Example  

```
├── backend/
│   ├── server.js
│   ├── canService.js
│   ├── logger.js
│   └── config/signals.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Gauge.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Settings.jsx
│   │   └── App.jsx
│   ├── public/
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

---

##  Optional Features  

- **OBD-II fallback**: integrate `python-OBD` or ELM327 via USB for legacy cars.  
- **MQTT Streaming**: allow remote monitoring of CAN data.  
- **Diagnostics**: read and clear DTCs.  
- **Auto-start on boot** via systemd service or kiosk script.  

---

##  Deliverables  

- Complete React + Node.js webapp runnable on Raspberry Pi  
- Real-time dashboard connected to SocketCAN  
- Configurable layout, gauge selection, and logging  
- Instructions for deployment (README with setup guide)  

Output should be a ready-to-deploy project structure with working demo data, mock CAN input (for development), and production build for Raspberry Pi touchscreen kiosk.
