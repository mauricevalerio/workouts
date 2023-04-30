import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"


export default function useRegister() {
    const { dispatch } = useContext(AuthContext)
    const [error, setError] = useState(null)

    async function register({ username, password }) {
        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
    
        const json = await response.json()
    
        if (!response.ok) {
            setError(json.message)
        }
        if (response.ok) {
            dispatch({type: 'LOGIN', payload: json})
        }
    }

    return { register, error }
}