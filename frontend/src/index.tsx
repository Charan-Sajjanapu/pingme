import React from 'react';
import { createRoot } from 'react-dom/client';

// A simple functional component
const App: React.FC = () => {
  const [text, setText] = React.useState<string>("Hello from nowhere!");
  
  React.useEffect(() => {
    let setString = async () => {
        let response = await fetch("http://localhost:3000/");
        console.log(response);
        if(response.ok) {
            let text = await response.text();
            console.log(text);
            setText(text);
        }
    }
    setString();
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>{text}</h1>
    </div>
  );
};

// Get the root element from the HTML
const rootElement = document.getElementById('root');

if (rootElement) {
  // If using React 18 or later:
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found');
}
