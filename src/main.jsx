import React from 'react'
import { createRoot } from 'react-dom/client'
import ChatWidget from './components/ChatWidget'
import './styles/widget.css'

// Find or create the container
let container = document.getElementById('centralino-ai-widget-root');
if (!container) {
  container = document.createElement('div');
  container.id = 'centralino-ai-widget-root';
  document.body.appendChild(container);
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ChatWidget />
  </React.StrictMode>
);
