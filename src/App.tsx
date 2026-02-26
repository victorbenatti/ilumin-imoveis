import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import ImoveisPage from '@/pages/ImoveisPage'

// Admin Pages
import AdminLayout from '@/layouts/AdminLayout'
import PropertyDashboard from '@/pages/admin/PropertyDashboard'
import PropertyForm from '@/pages/admin/PropertyForm'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/imoveis" element={<ImoveisPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/imoveis" replace />} />
          <Route path="imoveis" element={<PropertyDashboard />} />
          <Route path="imoveis/novo" element={<PropertyForm />} />
          <Route path="imoveis/:id" element={<PropertyForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
