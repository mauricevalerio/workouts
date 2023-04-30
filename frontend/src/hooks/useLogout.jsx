import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import useWorkoutContext from "./useWorkoutContext"


export default function useLogout() {
    const { dispatch } = useContext(AuthContext)
    const { dispatch: workoutDispatch } = useWorkoutContext()

    function logout() {
        localStorage.removeItem("user")

        dispatch({type: "LOGOUT"})
        workoutDispatch({type: "SET_WORKOUTS", payload: null})
    }

    return { logout }
}