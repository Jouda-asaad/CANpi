import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Gauge from './Gauge';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001');

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    socket.on('can-data', (newData) => {
      setData((prevData: any) => ({
        ...prevData,
        [newData.name]: newData.value,
      }));
    });

    return () => {
      socket.off('can-data');
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Gauge value={data.EngineRPM || 0} label="RPM" />
    </div>
  );
};

export default Dashboard;
