import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from "../src/routes/users.routes.js";

const app = express();
app.use(cors());
const port  = 8000;
app.use(express.json())

app.use("/api/v1",UserRoutes); 





const start = async ()=>{
        const connectionDb = await mongoose.connect("mongodb+srv://nithin:ps3p3DROtpinx8rD@resumes.tr8fkkq.mongodb.net/");
        console.log(`Connected to MongoDB host:${connectionDb.connection.host}`)
        app.listen(port,()=>{
            console.log(`Server listening on port ${port}`)
        })
}
start();