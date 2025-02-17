import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const rootElement = document.getElementById('root');
rootElement.style.position = 'absolute';
rootElement.style.top = '0';
rootElement.style.width = '100%';
