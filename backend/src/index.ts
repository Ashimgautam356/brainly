import express from 'express'
import mongoose from 'mongoose';
import {signup} from './controllers/signup'
import { signin } from './controllers/signin';
import { userAuth } from './middleware/userAuth';

const app = express(); 

app.use(express.json())

mongoose.connect('mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/brainly')


app.post('/api/v1/signup',signup)


app.post('/api/v1/signinn',userAuth)
app.post('/api/v1/signin',signin)

app.get('api/v1/content',async(req,res)=>{

})
app.delete('api/v1/content',async(req,res)=>{

})
app.post('api/v1/brain/share',async(req,res)=>{

})
app.get('api/v1/brain/:shareLink',async(req,res)=>{

})
app.post('api/v1/signup',async(req,res)=>{

})



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