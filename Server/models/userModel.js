const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
{timestamps: true}
)

module.exports = mongoose.model("user", userModel)