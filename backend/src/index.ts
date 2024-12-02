import express from 'express'
import mongoose from 'mongoose';
import  {z}  from 'zod';
import {userModel } from './db'

const app = express(); 

app.use(express.json())
mongoose.connect('mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/brainly')


app.post('/api/v1/signup',async(req,res)=>{
    const {userName,password}  = req.body;
   
    const UserSchema = z.object({
        userName:z.string(),
        password:z.string().min(4,"minimum length should be 4")
    })

    UserSchema.safeParse({userName:userName,password:password})
    try{
        userModel.insertMany({
            userName:userName,
            password:password
        })
        
        res.json({
            "suss":"sucess"
        })
    }catch(e){
        res.json({
            err:"error"
        })
    }
    
    

})
app.post('api/v1/signin',async(req,res)=>{

})
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