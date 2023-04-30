import { WorkoutContext } from "../context/WorkoutContext"
import { useContext } from "react"

export default function useWorkoutContext() {
    const context = useContext(WorkoutContext)

    if(!context) {
        throw Error("useWorkoutsContext must be used inside an WorkoutsContext Provider")
    }

    return context
}