import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} exact />
    <Route path="/not-found" element={<NotFoundPage />} exact />
    <Route path="/login" element={<LoginPage />} />
    <Route path="*" element={<Navigate to="/not-found" />} />
  </Routes>
)

export default App
