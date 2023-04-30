const mongoose = require("mongoose")

exports.connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(connect.connection.host)
    } catch (e) {
        console.error(e)
    }
}

