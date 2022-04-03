const presidentModel = require("../models/presidentModel");
// const NewVote = require("../models/PresVotes");
const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const jwt = require("jsonwebtoken");

//To create Storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  }
});

//to create an upload function for multer
const upload = multer({ storage: storage }).single("avatar");

//to set a verification function for only admins to carry out functions
const verified = (req, res, next) => {
  const authChecker = req.headers.authorization;

  try {
    if (authChecker) {
      const token = authChecker.split(" ")[1];

      jwt.verify(token, "ApiTestSecret", (err, payload) => {
        if (err) {
          res.status(400).json({ message: "Please check your Token again" });
        }
        req.user = payload;
        next();
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "You don't have right for this Operation" });
  }
};

// to display all the candidates
router.get("/candidate", async (req, res) => {
  try {
    const getVoters = await presidentModel.find();
    res.status(200).json({
      message: "Presential candidate found successfully",
      data: getVoters
    });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

//to display a particular candidate using id
router.get("/candidate/:id", async (req, res) => {
  try {
    const getVoters = await presidentModel.findById(req.params.id);
    res.status(200).json({
      message: "Presential candidate found successfully",
      data: getVoters
    });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

//to create new candidates, only admins are allowed to carryout this function
router.post("/candidate/create", verified, upload, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const { name, voteCount, NumberOfVotes} = req.body;
      const createVoters = await presidentModel.create({
        name,
        voteCount,
        NumberOfVotes,
        avatar: req.file.path
      });
      res.status(200).json({
        message: "Presential candidate created successfully",
        data: createVoters
      });
    } else {
      res
        .status(400)
        .json({ message: "You have to be an Admin to do this Operation" });
    }
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});


// router.post("/vote", async(req, res)=>{
//   try{
//     const addVoter = await NewVote.create({
//       name: req.body.name,
//       email: req.body.email
//     })
//     res.status(200).json({message:"new voter:", data: addVoter})
//   }catch(err){
//     res.status(400).json({ message: `error found: ${err.message}` });
//   }
// })

//to add a new voter into the votecount array, new voter should be an object
router.post("/candidate/:id", async (req, res) => {
  try {
    const voteCount = {
      who: req.body.who,
      toggle: true
    };

    const createVoters = await presidentModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { voteCount }
      },
      { new: true }
    );

    res.status(200).json({
      message: "Presential voter added successfully",
      data: createVoters,
    });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});


//to delete a particular voter from the votecount array using it's id
router.delete("/candidate/:id/:presID", async (req, res) => {
  try {
    const createVoters = await presidentModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { voteCount: { _id: req.params.presID } }
      },
      { new: true }
    );

    res.status(200).json({
      message: "Presidential voter deleted successfully",
      data: createVoters
    });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

//to get the id of a voter in the votecount array
router.get("/seeID/:id", async(req, res)=>{
  try{
      const id = req.params.id
      // const voteID = req.params.voteID

      const voter = await presidentModel.findById(id)
      // const len = await voter.voteCount.length
      // const set = Number(len)

      const see = await voter._id
      res.status(200).json({message: "This is the President's Id:", data: see})
  }catch(err){
      res.status(400).json({message: err.message})
  }
})

router.get("/candidates/:candidatesId/voters/:voterId", async(req, res)=>{
  try{
      const id = req.params.candidatesId
      const voterID = req.params.voterID

      const voter = await presidentModel.findById(id)
      const len = await voter.voteCount.length
      const set = Number(len)

      const see = await voter.voteCount[0]
      res.status(200).json({message: "This is the voter's ID:", data: see})
  }catch(err){
      res.status(400).json({message: err.message})
  }
})
// router.post("/addVoter/:id", async (req, res)=>{
//   try{
//     const id = req.params.id
//     const voter = await presidentModel.findById(id)
//     const update = await voter.updateOne({
//       NumberOfVotes: req.body.NumberOfVotes
//     })
//     res.status(200).json({message: "Voter added", data:update})
//   }catch(err){
//     res.status(400).json({ message: `error found: ${err.message}` });
//   }
// })

// router.get("/seeVoter/:id", async (req, res)=>{
//   try{
//     const id = req.params.id
//     const check = await presidentModel.where(`${id}`).populate("NumberOfVotes")
//     res.status(200).json({message:"Voter found", data: check})
//   }catch(err){
//     res.status(400).json({ message: `error found: ${err.message}`})
//   }
// })

router.get("/seeID/:id", async(req, res)=>{
  try{
      const id = req.params.id
      const see = id
      res.status(200).json({message: "This is the ID:", data: see})
  }catch(err){
      res.status(400).json({message: err.message})
  }
})

module.exports = router;
