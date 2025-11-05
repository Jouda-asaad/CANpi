import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Gauge from './Gauge';

const socket = io(`${window.location.protocol}//${window.location.hostname}:3001`);

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });

    socket.on('can-data', (newData) => {
      setData((prevData: any) => ({
        ...prevData,
        [newData.name]: newData.value,
      }));
    });

    return () => {
      socket.off('can-data');
      socket.off('connect_error');
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Gauge value={data.EngineRPM || 0} label="RPM" />
    </div>
  );
};

export default Dashboard;
