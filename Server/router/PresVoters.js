const votersModel = require("../models/PresVotes")
const presidentModel = require("../models/presidentModel")
const express = require("express")
const router = express.Router()

router.post("/vote/:id", async (req, res)=>{
    try{
        const id = req.params.id
        const president = await presidentModel.findById(id)
        const vote = new votersModel(req.body)
        vote.who = president
        vote.save()
        president.Votes.push(vote)
        president.save()

        res.status(200).json({message: "vote registered", data: vote})
    }catch(err){
        res.status(400).json({ message: `error found: ${err.message}`})
    }
})

module.exports = router;