# CANpi Dashboard

A Raspberry Pi vehicle dashboard web application using React and SocketCAN.

## Setup

### Backend

1.  Navigate to the `backend` directory: `cd backend`
2.  Install dependencies: `npm install`
3.  Start the server: `node server.js`

### Frontend

1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`

The application will be available at `http://localhost:5173`.

## Deployment

To deploy the application on a Raspberry Pi, you will need to configure the CAN interface and set up the application to run on boot.

### CAN Interface Setup

1.  Enable SPI and the MCP2515 overlay in `/boot/config.txt`:

    ```bash
    dtparam=spi=on
    dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25
    ```

2.  Bring up the CAN interface:

    ```bash
    sudo ip link set can0 up type can bitrate 500000
    ```

### Autostart on Boot

You can use a `systemd` service to automatically start the application on boot. Create a service file at `/etc/systemd/system/canpi.service`:

```
[Unit]
Description=CANpi Dashboard
After=network.target

[Service]
ExecStart=/usr/bin/node /path/to/canpi/backend/server.js
WorkingDirectory=/path/to/canpi
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```
