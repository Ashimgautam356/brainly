import express from 'express'
import mongoose from 'mongoose';
import {signup} from './controllers/signup'
import { signin } from './controllers/signin';
import { userAuth } from './middleware/userAuth';
import { contentRouter } from './routes/content';
import { brainRouter } from './routes/brain';
import  cors from 'cors';
import dotenv from 'dotenv'

dotenv.config()

const app = express(); 

app.use(express.json())

app.use(cors(
    {
        origin:["https://brainly-nu.vercel.app/"],
        methods:["POST","GET","DELETE"],
        credentials:true
    }
))

mongoose.connect(`${process.env.MONGO_URL}`)


app.post('/api/v1/signup',signup)


app.post('/api/v1/signin',signin)

app.use(userAuth)

app.use('/api/v1/content',contentRouter)

app.use('/api/v1/brain',brainRouter)





app.listen(3001,()=>{
    console.log("server is up!!!!!")
})

// async function main(){
//     await mongoose.connect('mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/brainly')
//     app.listen(3001,()=>{
//         console.log("server is up!!!!!")
//     })
// }

// main()