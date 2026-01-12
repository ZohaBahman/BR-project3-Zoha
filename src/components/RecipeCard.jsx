import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'


function RecipeCard({ recipe, onToggleFavorite, isFavorite }) {
    return (
        <div className="recipe-card">
            <button
                className={`fav-btn ${isFavorite ? 'active' : ''}`}
                onClick={(e) => {
                    e.stopPropagation()
                    onToggleFavorite(recipe)
                }}
            >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>


            <Link to={`/recipe/${recipe.id}`} className="card-link">
                <img src={recipe.image} alt={recipe.title} />
                <h3>{recipe.title}</h3>
            </Link>
        </div>
    )
}

export default RecipeCard