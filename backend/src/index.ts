import express from 'express'
import mongoose from 'mongoose';
import  {isValid, string, z}  from 'zod';
import {userModel } from './db'
import bcrypt from 'bcrypt'
import { Jwt } from 'jsonwebtoken';

const app = express(); 

app.use(express.json())
mongoose.connect('mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/brainly')


app.post('/api/v1/signup',async(req,res)=>{
    
    const UserSchema = z.object({
        userName:z.string().email({message:"should be in a email format"}),
        password:z.string().min(8,{message:"minimum length should be 8"}).max(20).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), {
            message:
            'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number'
        })
    })
    
    const isValidInput  = UserSchema.safeParse(req.body)
    
    if(!isValidInput.success){
        const validationError = isValidInput.error.formErrors;
        res.status(411).json({
            "userName":validationError.fieldErrors.userName,
            "passwrod":validationError.fieldErrors.password
        })
        return;
        
    }
    const {userName,password}  = req.body;

    const isUserAlreadyExists =  await userModel.findOne({userName:userName})
    if(!isUserAlreadyExists){
        const hashedPassword = bcrypt.hash(password,5);
        try{
            await userModel.create({
                userName:userName,
                password:hashedPassword
            })
     
             res.status(200).json({
                 "message":"signed up sucessfully"
             })
        }catch(e){
             res.status(500).json({
                 "message":"server error"
             })
        }
    }
    else{
        res.status(403).json({
            "message":"user already exists with the userName"
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