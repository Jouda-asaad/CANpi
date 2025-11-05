const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const canService = require('./canService');
const signals = require('./config/signals.json');
const { logData } = require('./logger');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3001;

const parseCANMessage = (msg) => {
  const signal = signals[msg.id];
  if (signal) {
    // This is a simplified parser. In a real application, you'd use
    // bitwise operations to extract the actual value based on the signal definition.
    const value = msg.data.readUIntBE(signal.start, signal.length);
    return {
      name: signal.name,
      value: value,
    };
  }
  return null;
};

canService.on('onMessage', (msg) => {
  const parsedData = parseCANMessage(msg);
  if (parsedData) {
    logData(parsedData);
    io.emit('can-data', parsedData);
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/export-log', (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const fileName = `${year}${month}${day}.csv`;
    const filePath = path.join(__dirname, 'logs', fileName);
    res.download(filePath);
});

canService.start();
