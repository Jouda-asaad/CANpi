const EventEmitter = require('events');

const can = require('socketcan');

class CANService extends EventEmitter {
  constructor() {
    super();
    this.channel = null;
  }

  start() {
    try {
      this.channel = can.createRawChannel('can0', true);
      this.channel.addListener('onMessage', (msg) => this.emit('onMessage', msg));
      this.channel.start();
      console.log('CAN service started');
    } catch (e) {
      console.error('Failed to start CAN service:', e);
      console.log('Running in mock mode instead.');
      this.startMockMode();
    }
  }

  startMockMode() {
    this.interval = setInterval(() => {
      const mockMessage = {
        id: 0x123,
        data: Buffer.from([
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
        ]),
      };
      this.emit('onMessage', mockMessage);
    }, 100);
  }

  stop() {
    if (this.channel) {
      this.channel.stop();
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

module.exports = new CANService();
