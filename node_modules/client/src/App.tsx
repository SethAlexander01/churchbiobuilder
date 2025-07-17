import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home'
import BioPage from './pages/bio'
import CheckoutPage from './pages/checkout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bio" element={<BioPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  )
}

export default App
