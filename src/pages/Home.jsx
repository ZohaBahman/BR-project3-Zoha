import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'

function Home() {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [diet, setDiet] = useState('')

    useEffect(() => {
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
    }, [search, cuisine, diet])

    if (loading) return <p>Loading recipes...</p>

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
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    )
}

export default Home
