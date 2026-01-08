import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<h1>Favorites Page</h1>} />
    </Routes>
  )
}

export default App