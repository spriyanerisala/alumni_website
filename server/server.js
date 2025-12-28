import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from "./routes/userRoute.js";
import connectDB from "./config/db.js";
import router from "./routes/alumniRoute.js";
import adminRouter from './routes/adminRoute.js' 
dotenv.config()



const app = express()
const port =process.env.PORT

await connectDB()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Alumni Website is running")
})

app.use('/api/user',userRouter)
app.use('/api/alumni',router)
app.use('/api/admin',adminRouter)

app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
})