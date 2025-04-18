import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Authenticate from './components/Authenticate';
import Vibe from './components/Vibe';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authenticate />} />
        <Route path="/vibe" element={<Vibe />} />
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found');
}
