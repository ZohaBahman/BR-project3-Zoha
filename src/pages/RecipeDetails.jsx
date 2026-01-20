import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import prepIcon from '../assets/prep-icon.png'
import cookIcon from '../assets/cook-icon.png'
import serveIcon from '../assets/serve-icon.png'


function RecipeDetails() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY

                const response = await fetch(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
                )

                const data = await response.json()
                setRecipe(data)
            } catch (error) {
                console.error('Error fetching recipe details', error)
            } finally {
                setLoading(false)
            }
        }

        fetchRecipeDetails()
    }, [id])

    if (loading) return <p>Loading recipe details...</p>
    if (!recipe) return <p>Recipe not found.</p>

    return (
        <div className="recipe-page">
            <button className="recipe-back" onClick={() => navigate('/')}>
                ← Back to Home
            </button>

            <h1 className="recipe-title">{recipe.title}</h1>

            <div className="recipe-hero">
                <div className="recipe-meta">
                    <div className="meta-item">
                        <img src={prepIcon} alt="Prep Time" className="meta-icon" />
                        <span className="meta-label">Prep Time</span>
                        <span className="meta-value">{recipe.readyInMinutes} min</span>
                    </div>
                    <div className="meta-item">
                        <img src={cookIcon} alt="Cook Time" className="meta-icon" />
                        <span className="meta-label">Cook Time</span>
                        <span className="meta-value">{recipe.readyInMinutes} min</span>
                    </div>
                    <div className="meta-item">
                        <img src={serveIcon} alt="Serving" className="meta-icon" />
                        <span className="meta-label">Servings</span>
                        <span className="meta-value">{recipe.servings}</span>
                    </div>
                </div>

                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-image"
                />
            </div>

            <div className="recipe-content">
                <div className="ingredients">
                    <h2>Ingredients</h2>
                    <ul>
                        {recipe.extendedIngredients?.map((ing) => (
                            <li key={ing.id}>{ing.original}</li>
                        ))}
                    </ul>
                </div>

                <div className="preparation">
                    <h2>Preparation</h2>
                    <div
                        className="summary"
                        dangerouslySetInnerHTML={{ __html: recipe.summary }}
                    />
                </div>
            </div>
        </div>
    )
}

export default RecipeDetails
