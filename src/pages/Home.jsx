import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import heroImage from '../assets/hero-image.jpg'

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

    const [page, setPage] = useState(1)
    const ITEMS_PER_PAGE = 15

    const [totalResults, setTotalResults] = useState(0)

    const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE)

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
        setPage(1)
    }, [search, cuisine, diet])

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fetchRecipes = async () => {
                try {
                    setLoading(true)
                    const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY
                    const offset = (page - 1) * ITEMS_PER_PAGE

                    const response = await fetch(
                        `https://api.spoonacular.com/recipes/complexSearch?number=${ITEMS_PER_PAGE}&offset=${offset}&query=${search}&cuisine=${cuisine}&diet=${diet}&apiKey=${API_KEY}`
                    )

                    const data = await response.json()
                    setRecipes(data.results || [])
                    setTotalResults(data.totalResults || 0)
                } catch (error) {
                    console.error('Error fetching recipes:', error)
                } finally {
                    setLoading(false)
                }
            }

            fetchRecipes()
        }, 400)

        return () => clearTimeout(timeout)
    }, [search, cuisine, diet, page])

    return (
        <div className="page">
            <section
                className="hero"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className="hero-content">
                    <h1>
                        elevate your culinary <br /> experience
                    </h1>
                    <p>Search, filter, and save your favorite meals</p>
                </div>
            </section>

            <div className="header">
                <h2>SEARCH</h2>

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

            <div className="pagination">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                    &lt;
                </button>


                <button
                    className={page === 1 ? 'active' : ''}
                    onClick={() => setPage(1)}
                >
                    1
                </button>


                {page > 3 && <span className="dots">...</span>}


                {Array.from({ length: 3 }, (_, i) => page - 1 + i)
                    .filter((p) => p > 1 && p < totalPages)
                    .map((num) => (
                        <button
                            key={num}
                            className={page === num ? 'active' : ''}
                            onClick={() => setPage(num)}
                        >
                            {num}
                        </button>
                    ))}


                {page < totalPages - 2 && <span className="dots">...</span>}


                {totalPages > 1 && (
                    <button
                        className={page === totalPages ? 'active' : ''}
                        onClick={() => setPage(totalPages)}
                    >
                        {totalPages}
                    </button>
                )}


                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                    &gt;
                </button>
            </div>

        </div>
    )
}

export default Home
