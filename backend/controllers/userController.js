const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" })
}

const loginUser = async (req, res, next) => {
    const { username, password } = req.body
    if (!username) {
        res.status(400)
        return next(new Error("Username required"))
    }
    if (!password) {
        res.status(400)
        return next(new Error("Password required"))
    }

    const exists = await User.findOne({ username })
    if (!exists) {
        res.status(400)
        return next(new Error("No account with specified username exists!"))
    }

    const checkPassword = await bcrypt.compare(password, exists.password)

    if (!checkPassword) {
        res.status(400)
        return next(new Error("Password incorrect!"))
    }
    const token = generateToken(exists._id)
    res.status(200).json({ username, token })
}

const registerUser = async (req, res, next) => {
    const { username, password } = req.body
    if (!username) {
        res.status(400)
        return next(new Error("Username required"))
    }
    if (!password) {
        res.status(400)
        return next(new Error("Password required"))
    }

    const exists = await User.findOne({ username })
    if (exists) {
        res.status(400)
        return next(new Error("Username already exists"))
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({ username, password: hashedPassword })

    const token = generateToken(newUser._id)
    res.status(200).json({ username, token })
}

module.exports = {
    loginUser,
    registerUser
}