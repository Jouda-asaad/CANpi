# CANpi Dashboard

## Project Overview

This project is a web-based vehicle dashboard designed to run on a Raspberry Pi. It displays real-time data from a vehicle's CAN bus.

The project is a monorepo containing two main parts:
- **Backend**: A Node.js application using Express.js and Socket.IO. It connects to the CAN bus (or a mock data generator) using the `socketcan` library, parses the data, and streams it to the frontend.
- **Frontend**: A React application built with Vite and TypeScript. It receives real-time data from the backend via Socket.IO and displays it using gauge components.

The entire application can be orchestrated using Docker Compose.

## Building and Running

There are three ways to run the application:

### 1. Using Docker Compose (Recommended)

This is the easiest way to get both the frontend and backend running.

```bash
docker-compose up
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3001`.

### 2. Running Services Individually

You can run the frontend and backend services in separate terminals.

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### 3. Using the Top-Level Dev Script

The root `package.json` provides a convenience script to run both services concurrently.

```bash
npm install
npm run dev
```

## Development Conventions

- **Linting**: The frontend uses ESLint for code quality. You can run the linter with `npm run lint` in the `frontend` directory.
- **TypeScript**: The frontend is written in TypeScript.
- **Mock Mode**: The backend's `canService.js` includes a mock mode that generates random data. This is useful for frontend development without a physical CAN bus connection. The mock mode is automatically enabled if the CAN interface fails to initialize.
- **Configuration**: CAN signals are defined in `backend/config/signals.json`.

## Key Files

- `docker-compose.yml`: Defines the services for running the application with Docker.
- `package.json` (root): Contains scripts for running the project.
- `backend/server.js`: The main entry point for the backend server.
- `backend/canService.js`: Handles the connection to the CAN bus and includes a mock data generator.
- `backend/config/signals.json`: Configuration file for defining CAN message signals.
- `frontend/src/main.tsx`: The entry point for the React application.
- `frontend/src/App.tsx`: The main React component.
- `frontend/src/components/Dashboard.tsx`: The component that manages the layout of the dashboard and the connection to the backend.
- `frontend/src/components/Gauge.tsx`: The component for visualizing a single data point (like RPM).
