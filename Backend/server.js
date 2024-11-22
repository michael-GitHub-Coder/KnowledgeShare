//tnOVvxGxpwp7ob1a password
import express from "express";
import connectDB from  "./config/db.js"
import dotenv from "dotenv";
import routes  from "./Routes/routes.js"
import guideRoute from "./Routes/GuideRoute.js"
dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/v1/user", routes)
// app.get("/all", (req,res)=>{
//     res.status(200).json({messgae:"hello world 2"})
// })
app.use("/api/v1/guide",guideRoute)
app.listen(process.env.PORT,()=>{
    connectDB();
    console.log(`server started at http://localhost:`+process.env.PORT)
})
