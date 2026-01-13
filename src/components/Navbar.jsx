import { Link } from 'react-router-dom'
import logo from '../assets/spoon-logo.png'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/favorites">Favorites</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar