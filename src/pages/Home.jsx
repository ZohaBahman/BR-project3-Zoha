import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'


function Home() {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [diet, setDiet] = useState('')

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites')
        return saved ? JSON.parse(saved) : []
    })



    const toggleFavorite = (recipe) => {
        const exists = favorites.find((item) => item.id === recipe.id)

        let updated
        if (exists) {
            updated = favorites.filter((item) => item.id !== recipe.id)
        } else {
            updated = [...favorites, recipe]
        }

        setFavorites(updated)
        localStorage.setItem('favorites', JSON.stringify(updated))
    }




    useEffect(() => {
        const timeout = setTimeout(() => {
            const fetchRecipes = async () => {
                try {
                    setLoading(true)
                    const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY

                    const response = await fetch(
                        `https://api.spoonacular.com/recipes/complexSearch?number=10&query=${search}&cuisine=${cuisine}&diet=${diet}&apiKey=${API_KEY}`
                    )

                    const data = await response.json()
                    setRecipes(data.results)
                } catch (error) {
                    console.error('Error fetching recipes:', error)
                } finally {
                    setLoading(false)
                }
            }

            fetchRecipes()
        }, 400)

        return () => clearTimeout(timeout)
    }, [search, cuisine, diet])




    return (
        <div>
            <h2>Recipes</h2>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                    <option value="">All Cuisines</option>
                    <option value="italian">Italian</option>
                    <option value="mexican">Mexican</option>
                    <option value="french">French</option>
                    <option value="chinese">Chinese</option>
                    <option value="indian">Indian</option>
                </select>

                <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                    <option value="">All Diets</option>
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="gluten free">Gluten Free</option>
                </select>
            </div>

            <div className="recipe-list">
                {loading && <p>Loading recipes...</p>}

                {!loading &&
                    recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onToggleFavorite={toggleFavorite}
                            isFavorite={favorites.some((f) => f.id === recipe.id)}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Home
