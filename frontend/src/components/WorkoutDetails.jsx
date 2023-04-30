import useWorkoutContext from "../hooks/useWorkoutContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import {AuthContext} from "../context/AuthContext"
import { useContext } from "react"


export default function WorkoutDetails({ workout }) {
    const { dispatch } = useWorkoutContext()
    const { user } = useContext(AuthContext)

    async function handleDelete() {
        if (!user) {
            return
        }

        const response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: json })
        }
    }
    
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            
            <span onClick={handleDelete} className="material-symbols-outlined">delete</span>
        </div>
    )
}