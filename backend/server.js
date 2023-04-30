require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const { connectDB } = require("./config/db")
const { errorHandler } = require("./middleware/errorHandler")

const app = express()
connectDB()

app.use(express.json({ extended: false }))

app.use(morgan("tiny"))
app.use("/api/workouts", require("./routes/workouts"))
app.use("/api/users", require("./routes/users"))

app.use(errorHandler)

app.listen(process.env.PORT, () => console.log(`Connected to the database and listening on port ${process.env.PORT}`))