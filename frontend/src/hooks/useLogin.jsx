import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"


export default function useLogin() {
    const { dispatch } = useContext(AuthContext)
    const [error, setError] = useState(null)

    async function login({ username, password }) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
    
        const json = await response.json()
    
        if (!response.ok) {
            setError(json.message)
        }
        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
        }
    }

    return { login, error }
}