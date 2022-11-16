import React from 'react'
import AppRoutes from './routes'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)
