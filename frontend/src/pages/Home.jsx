import { useContext, useEffect } from "react"
import useWorkoutContext from "../hooks/useWorkoutContext"
import {AuthContext} from "../context/AuthContext"

import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"


export default function Home() {
    const { workouts, dispatch } = useWorkoutContext()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            
            if (response.ok) {
                dispatch({type: "SET_WORKOUTS", payload: json})
            }
        }

        if (user) {
            fetchWorkouts()
        }
        
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails 
                    key={workout._id}
                    workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}