import { useState } from "react"
import useLogin from "../hooks/useLogin"

export default function Login() {
    const {login, error} = useLogin()
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        await login(loginData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginData(prevLoginData => (
            {...prevLoginData, [name]: value}
        ))
    }
    
    return (
        <form onSubmit={handleLogin} autoComplete="off" className="login">
            <h1>Login</h1>

            <label htmlFor="username">Username</label>
            <input type="text"
            id="username" 
            name="username"
            value={loginData.username}
            onChange={handleChange}
            />

            <label htmlFor="Password">Password</label>
            <input type="password" 
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            />
            {error && <h3>{error}</h3>}
            <button>Login</button>
        </form>
    )
}