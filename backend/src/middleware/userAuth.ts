import { Request,Response,NextFunction } from "express"
import jwt,{JwtPayload} from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const userAuth = async(req:Request,res:Response,next:NextFunction)=>{
    const userToken = req.headers.token ;
    if(!userToken){
        res.status(404).json({
            "message":"token not found"
        })
        return;
    }
    const isValidToken = jwt.verify(String(userToken),`${process.env.JWT_SECRET}`)

    if(!isValidToken){
        res.status(404).json({
            "message":"invalid user"
        })
        return;
    }


    const abc  = jwt.decode(String(userToken)) as JwtPayload
    req.body.id = abc?.id;
    next()

}