import React from 'react';
import GaugeComponent from 'react-gauge-component';

interface GaugeProps {
  value: number;
  label: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, label }) => {
  return (
    <div style={{ width: '250px' }}>
      <GaugeComponent
        value={value}
        type="radial"
        labels={{
          tickLabels: {
            type: 'inner',
            ticks: [
              { value: 20 },
              { value: 40 },
              { value: 60 },
              { value: 80 },
              { value: 100 },
            ],
          },
        }}
        arc={{
          colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
          subArcs: [{ limit: 40 }, { limit: 70 }, { limit: 100 }],
          padding: 0.02,
          width: 0.3,
        }}
        pointer={{
          elastic: true,
          animationDelay: 0,
        }}
      />
      <h3 style={{ textAlign: 'center', marginTop: '-20px' }}>{label}</h3>
    </div>
  );
};

export default Gauge;
