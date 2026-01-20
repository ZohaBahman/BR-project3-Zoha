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

    return (
        <div className="page">
            <div className="favorites-header">
                <h2>Your Favorites</h2>
            </div>

            {favorites.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '3rem', color: '#666' }}>
                    You haven’t added any recipes yet.
                </p>
            ) : (
                <div className="recipe-list">
                    {favorites.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            isFavorite={true}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favorites
