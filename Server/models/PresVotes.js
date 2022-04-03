const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NewVote = new Schema({ 
    name: String,
    email: String,
    who: {
        type: Schema.Types.ObjectId,
        ref:"presidents"
    }
}, {timestamps: true})

module.exports = mongoose.model("PresidentCount", NewVote)