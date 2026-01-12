import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'

function Favorites() {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const saved = localStorage.getItem('favorites')
        if (saved) {
            setFavorites(JSON.parse(saved))
        }
    }, [])

    if (favorites.length === 0) {
        return <p>No favorites yet.</p>
    }

    return (
        <div>
            <h2>Your Favorites</h2>
            <div className="recipe-list">
                {favorites.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        isFavorite={true}
                    />
                ))}
            </div>
        </div>
    )
}

export default Favorites