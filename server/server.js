import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
 
//Initialize Express
const app = express()

//Middlewares

app.use(cors())

//Routes

app.get('/',(req,res)=>{
     res.send("Api Working")
})

//Port 

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})

 