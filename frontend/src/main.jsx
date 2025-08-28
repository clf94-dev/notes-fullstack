import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import './loaders/i18nLoader.js'
import Router from './Router.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
