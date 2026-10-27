import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App.jsx';

// StrictMode is omitted on purpose: it double-mounts the WebGL canvas in dev
// and makes the GSAP / R3F hand-off confusing for beginners.
createRoot(document.getElementById('root')).render(<App />);
