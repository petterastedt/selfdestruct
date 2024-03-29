import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Message from './pages/message'
import About from './pages/about'
import './main.css'

const AppRoutes = () => {
  return (
    <div className="container centerComponent">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/message/:secret" element={<Message />} />
        <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </div>
  )
}

export default AppRoutes
