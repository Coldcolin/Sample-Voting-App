const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const port = 2044;
const app = express()
const path = require("path")

const url = "mongodb://localhost/INECVoteApp"

mongoose.connect(url).then(()=>{
    console.log("Database is now connected and ready to GO...!>>>");
}).catch((err)=>{
    console.log(err.message)
})

app.use(cors({origin: "*"}))
app.use(express.json())
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")))

app.get("/", (req, res)=>{
    res.send("This is a very simple Vote API.")
})

app.use("/api", require("./router/userRoute"));
app.use("/api/president", require("./router/presidentRouter"));
app.use("/api/vicePresident", require("./router/vicePresidentRouter"));
app.use("/api/publicity", require("./router/publicityRouter"));
app.use("/api/welfare", require("./router/welfareRouter"));
app.use("/api/treasurer", require("./router/treasurerRouter"));

app.use("/api/president", require("./router/PresVoters"))

app.listen(port, () => {
    console.log(`Server is now live on Port: ${port}`);
})