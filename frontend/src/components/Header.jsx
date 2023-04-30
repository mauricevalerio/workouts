import { Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import { AuthContext, authReducer } from "../context/AuthContext"
import { useContext } from "react"

export default function Header() {
    const { logout } = useLogout()
    const { user } = useContext(AuthContext)

    function handleClick() {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workouts</h1>
                </Link>
            
            <nav>
                {user && <div>
                    <span>Welcome {user.username}</span>
                    <button onClick={handleClick}>Logout</button>
                </div>}

                {!user && <div>
                    <Link to="/login">
                        Login
                    </Link>
                    <Link to="/register">
                        Register
                    </Link>
                </div>}
            </nav>
            </div>


        </header>

    )
}