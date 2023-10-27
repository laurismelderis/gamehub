import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'
import theme from './theme/theme'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes>
      <Route path="/not-found" element={<NotFoundPage />} exact />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
        exact
      />

      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  </ThemeProvider>
)

export default App
