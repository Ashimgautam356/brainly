import {userModel } from '../db'
import bcrypt from 'bcrypt'
import  {z }  from 'zod';
import {Request,Response } from 'express';

export const signup = async(req:Request,res:Response)=>{
    const UserSchema = z.object({
        userName:z.string().min(3,{message:"min length should be 3"}).max(10,{message:"max length should be 8"}),
        email:z.string().email({message:"should be in a email format"}),
        password:z.string().min(8,{message:"minimum length should be 8"}).max(20).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), {
            message:
            'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number'
        })
    })
    
    const isValidInput  = UserSchema.safeParse({
         userName:req.body.userName,
         email:req.body.email,
         password:req.body.password
    })
    
    if(!isValidInput.success){
        const validationError = isValidInput.error.formErrors;
        res.status(411).json({
            "email":validationError.fieldErrors.email,
            "userName":validationError.fieldErrors.userName,
            "passwrod":validationError.fieldErrors.password
        })
        return;
        
    }
    const {userName,password,email}  = req.body;

    const isUserNameAlreadyExists =  await userModel.findOne({userName:userName})
    const isEmailAlreadyExists =  await userModel.findOne({email:email})
    
    if(!isEmailAlreadyExists && ! isUserNameAlreadyExists){
        const hashedPassword = String(await bcrypt.hash(password,5));
        try{
            await userModel.create({
                userName:userName,
                email:email,
                password:hashedPassword
            })
     
             res.status(200).json({
                 "message":"signed up sucessfully"
             })
        }catch(e){
             res.status(500).json({
                 "message":"server error",
                 "error":e
             })
        }
    }
    if(isEmailAlreadyExists){
        res.status(403).json({
            "message":"Email Already Exists"
        })
        return ;
    }
    if(isUserNameAlreadyExists){
        res.status(403).json({
             "message":"UserName Already Exists"
        })
        return 
    }
}