import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


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


    if (loading) {
        return <p>Loading recipe details...</p>
    }


    if (!recipe) {
        return <p>Recipe not found.</p>
    }

    return (
        <div>
            <button onClick={() => navigate('/')}>
                ← Back to Home
            </button>

            <h2>{recipe.title}</h2>

            <img
                src={recipe.image}
                alt={recipe.title}
                style={{ width: '100%', maxWidth: '500px' }}
            />

            <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>

            <p><strong>Summary:</strong></p>
            <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        </div>
    )
}

export default RecipeDetails