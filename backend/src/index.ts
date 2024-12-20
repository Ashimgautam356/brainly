import express from 'express'
import mongoose from 'mongoose';
import {signup} from './controllers/signup'
import { signin } from './controllers/signin';
import { userAuth } from './middleware/userAuth';
import { contentRouter } from './routes/content';
import { brainRouter } from './routes/brain';
import  cors from 'cors';
import dotenv from "dotenv";


const app = express(); 
dotenv.config({ path: './.env' });

app.use(express.json())




// CORS setup
app.use(cors({
    origin: "https://brainly-nu.vercel.app",
    methods: ["POST", "GET", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));


// Handle preflight requests
app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://brainly-nu.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.status(204).end();
});


app.post('/api/v1/signup',signup)


app.post('/api/v1/signin',signin)

app.use(userAuth)

app.use('/api/v1/content',contentRouter)

app.use('/api/v1/brain',brainRouter)





async function main(){
    
    await mongoose.connect(String(process.env.MONGO_URL))
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

    app.listen()
}

main()