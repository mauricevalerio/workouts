const express = require("express")
const { getAllWorkouts,
    createWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout } = require("../controllers/workoutController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)

router.route("/")
    .get(getAllWorkouts)
    .post(createWorkout)

router.route("/:id")
    .get(getSingleWorkout)
    .delete(deleteWorkout)
    .patch(updateWorkout)

module.exports = router