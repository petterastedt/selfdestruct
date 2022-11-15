import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Message from './pages/message'
import About from './pages/about'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/message/:secret" element={<Message />} />
      <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  )
}

export default AppRoutes
