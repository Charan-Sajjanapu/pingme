import React, { useEffect, useState } from 'react';
import { fetchVivirApi } from '../utils/api';

const Vibe: React.FC = () => {
  const [text, setText] = useState<string>('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVivirApi();
        setText(data);
      } catch (error) {
        setText('Failed to load data.');
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>{text}</h1>
    </div>
  );
};

export default Vibe;
