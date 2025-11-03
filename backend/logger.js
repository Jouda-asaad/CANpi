const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, 'logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const getLogFileName = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return path.join(logDirectory, `${year}${month}${day}.csv`);
};

const logData = (data) => {
  const fileName = getLogFileName();
  const timestamp = new Date().toISOString();
  const csvData = `${timestamp},${data.name},${data.value}\n`;

  fs.appendFile(fileName, csvData, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
};

module.exports = {
  logData,
};
