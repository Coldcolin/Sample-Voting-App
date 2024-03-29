const vicePresidentModel = require("../models/vicePresidentModel");
const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const jwt = require("jsonwebtoken");

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

const upload = multer({ storage: storage }).single("avatar");

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

router.get("/candidate", async (req, res) => {
  try {
    const getVoters = await vicePresidentModel.find();
    res.status(200).json({
      message: "Vice Presential candidate found successfully",
      data: getVoters
    });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

router.get("/candidate/:id", async (req, res) => {
  try {
    const getVoters = await vicePresidentModel.findById(req.params.id);
    res.status(200).json({
      message: "Vice Presential candidate found successfully",
      data: getVoters
    });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

router.post("/candidate/create", verified, upload, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const { name, voteCount } = req.body;

      const createVoters = await vicePresidentModel.create({
        name,
        voteCount,
        avatar: req.file.path
      });
      res.status(200).json({
        message: "Vice Presential candidate created successfully",
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

router.post("/candidate/:id", async (req, res) => {
  try {
    const voteCount = {
      who: req.body.who,
      toggle: true
    };

    const createVoters = await vicePresidentModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { voteCount }
      },
      { new: true }
    );

    res.status(200).json({
      message: "Vice Presential candidate created successfully",
      data: createVoters
    });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

router.delete("/candidate/:id/:presID", async (req, res) => {
  try {
    const createVoters = await vicePresidentModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { voteCount: { _id: req.params.presID } }
      },
      { new: true }
    );

    res.status(200).json({
      message: "Vice Presential candidate created successfully",
      data: createVoters
    });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

module.exports = router;
