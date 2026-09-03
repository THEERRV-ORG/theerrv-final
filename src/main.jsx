import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* First-party privacy-friendly analytics — beacons hit /_vercel/insights
          (same origin), so it needs no cookie banner and passes the CSP. */}
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)
