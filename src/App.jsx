import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import RecipeDetails from './pages/recipeDetails'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
  )
}

export default App