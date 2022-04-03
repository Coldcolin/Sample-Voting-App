const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./uploads")
    },
    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage}).single("avatar")


router.get("/user", async (req, res)=>{
    try {
        const getUsers = await userModel.find()
        res.status(200).json({
            message: "All Users Found", 
            totalUsers: getUsers.length,
        data: getUsers
        })
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.get("/user/:id", async (req, res)=>{
    try {
        const getUsers = await userModel.findById(req.params.id)
        res.status(200).json({
            message: "Single User Found",
            data: getUsers
        })
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.post("/register", upload, async (req, res)=>{
    try {
        const {name, email, password} = req.body
        const hidepassword = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, hidepassword)

        const register = await userModel.create({
            name,
            email,
            password: hashpassword,
            avatar: req.file.path
        })
        res.status(200).json({message: "Registration Successful", 
        data: register
    })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post("/LogIn", async (req, res)=>{
    try {
        const signed = await userModel.findOne({email: req.body.email})
        if(signed){
            const checkPassword = await bcrypt.compare(req.body.password, signed.password)
            if(checkPassword){
                const {password, ...data} = signed._doc
                const token = jwt.sign({
                    id: signed._id,
                    email: signed.email,
                    isAdmin: signed.isAdmin
                },
                "ApiTestSecret",
                {expiresIn: "2d"})
                res.status(201).json({
                    message: `Welcome Back ${signed.name}`,
                    data: {...data, token}
            })
            }else{
                res.status(400).json({message: "Your Password is Incorrect"})
            }
        }else{
            res.status(400).json({message: "User not found in this database"})
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.patch("/user/:id", async (req, res)=>{
    try {
        const updateUser = await userModel.findByIdAndUpdate(
            req.params.id, 
            {name: req.body.name},
            {new: true}
        )
        res.status(200).json({
            message: "Updated Successfully",
            data: updateUser})
    } catch (error) {
        res.status(401).json({message: error.message})
    }
})

router.delete("/user/:id", async (req, res)=>{
    try {
        const deleteUser = await userModel.findByIdAndRemove(req.params.id)
        res.status(200).json({message: "User Deleted Successfully", data: deleteUser})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router;