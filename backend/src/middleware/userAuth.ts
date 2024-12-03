import { Request,Response,NextFunction } from "express"
import { z} from 'zod'
import bcrypt from 'bcrypt'
import { userModel } from "../db"
import jwt from 'jsonwebtoken'

export const userAuth = async(req:Request,res:Response,next:NextFunction)=>{
    const userLoginSchema = z.object({
        userName:z.string().email({message:"should be in a email format"}),
        password:z.string().min(8,{message:"minimum length should be 8"}).max(20).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), {
            message:
            'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number'
        })
    })

    const isSchemaValid = userLoginSchema.safeParse(req.body);
    if(!isSchemaValid.success){
        const validationError = isSchemaValid.error.formErrors;
        res.status(411).json({
            "userName":validationError.fieldErrors.userName,
            "passwrod":validationError.fieldErrors.password
        })
        return;
        
    }

    const {userName,password} = req.body
    const user = await userModel.findOne({userName:userName})

    if(!user){
        res.status(404).json({
            "message":"user not found with that userName"
        })
        return;
    }
    const verifyPassword = await bcrypt.compare(password,String(user?.password))
    
    if(!verifyPassword){
        res.status(403).json({
            "message":"wrong password"
        })
        return;
    }

    const token  = jwt.sign({
        id: user._id
    },"this is secrete")

    res.status(200).json({
        "token":token
    })

}