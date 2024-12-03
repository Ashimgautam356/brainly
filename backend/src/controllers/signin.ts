import { Request,Response} from "express"
import { z} from 'zod'
import bcrypt from 'bcrypt'
import { userModel } from "../db"
import jwt from 'jsonwebtoken'

export const signin = async(req:Request,res:Response)=>{
    const userLoginSchema = z.object({
        userName:z.string().email(),
        password:z.string()
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
        id: String(user._id)
    },"this is secrete")

    res.status(200).json({
        "token":token
    })

}