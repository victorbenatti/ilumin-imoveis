import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/layout/ProtectedRoute'

import HomePage from '@/pages/HomePage'
import ImoveisPage from '@/pages/ImoveisPage'

// Admin Pages
import AdminLayout from '@/layouts/AdminLayout'
import PropertyDashboard from '@/pages/admin/PropertyDashboard'
import PropertyForm from '@/pages/admin/PropertyForm'
import LoginPage from '@/pages/admin/LoginPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/imoveis" element={<ImoveisPage />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/imoveis" replace />} />
            <Route path="imoveis" element={<PropertyDashboard />} />
            <Route path="imoveis/novo" element={<PropertyForm />} />
            <Route path="imoveis/:id" element={<PropertyForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
