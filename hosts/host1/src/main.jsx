import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PropertySite from './PropertySite.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PropertySite />
  </StrictMode>,
)

