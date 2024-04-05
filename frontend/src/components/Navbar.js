import { Link } from 'react-router-dom'
import ReactSwitch from 'react-switch'
import Searchbar from './Searchbar'

const Navbar = ({ toggleTheme, theme }) => {
    return (
        <header>
            <div className = "container">
                <Link to="/">
                    <h1>Workout Tracker</h1>
                </Link>

                <div className="switch">
                <label>{theme === "light" ? "Light Mode " : "Dark Mode "} </label>
                    <ReactSwitch onChange={toggleTheme} checked ={theme === 'dark'}/>
                </div>
            </div>
        </header>
    )
}

export default Navbar