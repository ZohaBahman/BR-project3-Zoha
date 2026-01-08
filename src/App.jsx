import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/favorites" element={<h1>Home Page</h1>} />
      </Routes>
    </div>
  )
}

export default App