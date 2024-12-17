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



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://brainly-nu.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// CORS setup
const corsOptions = {
    origin: "https://brainly-nu.vercel.app",
    methods: ["POST", "GET", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

mongoose.connect(`${process.env.MONGO_URL}`)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));


app.post('/api/v1/signup',signup)


app.post('/api/v1/signin',signin)

app.use(userAuth)

app.use('/api/v1/content',contentRouter)

app.use('/api/v1/brain',brainRouter)



// async function main(){
//     await mongoose.connect('mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/brainly')
//     app.listen(3001,()=>{
//         console.log("server is up!!!!!")
//     })
// }

// main()