import {userModel } from '../db'
import bcrypt from 'bcrypt'
import  {z }  from 'zod';
import {Request,Response } from 'express';

export const signup = async(req:Request,res:Response)=>{
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
        const hashedPassword = String(await bcrypt.hash(password,5));
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
                 "message":"server error",
                 "error":e
             })
        }
    }
    else{
        res.status(403).json({
            "message":"user already exists with the userName"
        })
    }
}