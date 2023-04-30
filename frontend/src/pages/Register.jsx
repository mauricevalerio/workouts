import { useState } from "react"
import useRegister from "../hooks/useRegister"

export default function Register() {
    const {register, error} = useRegister()
    const [registerData, setRegisterData] = useState({
        username: "",
        password: ""
    })

    const handleRegister = async (e) => {
        e.preventDefault()
        await register(registerData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterData(prevRegisterData => (
            {...prevRegisterData, [name]: value}
        ))
    }
    
    return (
        <form onSubmit={handleRegister} autoComplete="off" className="register">
            <h1>Register</h1>

            <label htmlFor="username">Username</label>
            <input type="text" 
            id="username"
            name="username"
            value={registerData.username}
            onChange={handleChange}
            />

            <label htmlFor="Password">Password</label>
            <input type="password" 
            id="password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
            />
            {error && <h3>{error}</h3>}
            <button>Register</button>
        </form>
    )
}