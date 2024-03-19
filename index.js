const express=require('express')
const router = require('./routes/userRoutes')
const app=express()
const cors=require("cors")
const cookieParser=require('cookie-parser')
app.use(cors({
    origin:'http://localhost:3000'
}))
app.use(cookieParser())
const http=require("http")
const server=http.createServer(app)


const dotenv=require("dotenv")
dotenv.config()
app.use(express.json())




const mongoose=require("mongoose")
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("connection established with MONGO")
}).catch((err)=>{
    console.log('connection failed',err)
})
server.listen(5500,console.log(5500))

app.use(router)