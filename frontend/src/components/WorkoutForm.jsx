import { useContext, useState } from "react"
import useWorkoutContext from "../hooks/useWorkoutContext"
import {AuthContext} from "../context/AuthContext"

export default function WorkoutForm() {
    const { dispatch } = useWorkoutContext()
    const { user } = useContext(AuthContext)
    const [workoutData, setWorkoutData] = useState({
        title: '',
        reps: '',
        load: ''
    })

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    function handleWorkoutDataChange(e) {
        const { name, value } = e.target
        setWorkoutData(prevWorkoutData => ({
                ...prevWorkoutData,
                [name]: value
            }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError("You must be logged in")
            return
        }

        const workout = {
            title: workoutData.title,
            reps: workoutData.reps,
            load: workoutData.load
        }
        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setWorkoutData({
                title: '',
                reps: '',
                load: ''
            })
            setError(null)
            setEmptyFields([])
            console.log("New workout added")
            dispatch({type: "CREATE_WORKOUT", payload: json})
        }
    }

    return (
        <form className="create" autoComplete="off" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label htmlFor="title">Exercise Title: </label>
            <input type="text" 
            id="title"
            name="title"
            value={workoutData.title}
            onChange={handleWorkoutDataChange}
            className={emptyFields.includes("title") ? "error" : ""}/>

            <label htmlFor="reps">Reps: </label>
            <input type="number" 
            id="reps"
            name="reps"
            value={workoutData.reps}
            onChange={handleWorkoutDataChange}
            className={emptyFields.includes("reps") ? "error" : ""}/>

            <label htmlFor="load">Load (KG): </label>
            <input type="number" 
            id="load"
            name="load"
            value={workoutData.load}
            onChange={handleWorkoutDataChange}
            className={emptyFields.includes("load") ? "error" : ""}/>
            
            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}