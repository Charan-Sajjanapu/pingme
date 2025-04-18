import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Authenticate: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const navigate = useNavigate();

  const handleAuthenticate = () => {
    if (mobileNumber) {
      // Add authentication logic here if needed
      navigate('/vibe');
    } else {
      alert('Please enter a valid mobile number.');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Welcome</h1>
      <input
        type="text"
        placeholder="Enter your mobile number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px' }}
      />
      <br />
      <button onClick={handleAuthenticate} style={{ padding: '8px 16px' }}>
        Authenticate
      </button>
    </div>
  );
};

export default Authenticate;
