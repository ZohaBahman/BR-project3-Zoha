import { useParams } from 'react-router-dom'

function RecipeDetails() {
    const { id } = useParams()

    return (
        <div>
            <h2>Recipe Details</h2>
            <p>Recipe ID: {id}</p>
        </div>
    )
}

export default RecipeDetails