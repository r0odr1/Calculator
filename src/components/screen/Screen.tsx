import React from 'react';

interface ScreenProps {
  value: string;
}

const Screen: React.FC<ScreenProps> = ({ value }) => {
  return <div className="screen">{value}</div>;
};

export default Screen;
