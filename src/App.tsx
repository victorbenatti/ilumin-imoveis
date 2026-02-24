import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import ImoveisPage from '@/pages/ImoveisPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/imoveis" element={<ImoveisPage />} />
      </Routes>
    </BrowserRouter>
  )
}
