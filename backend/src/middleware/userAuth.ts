import { Request,Response,NextFunction } from "express"
import jwt,{JwtPayload} from 'jsonwebtoken'

export const userAuth = async(req:Request,res:Response,next:NextFunction)=>{
    const userToken = req.headers.token ;
    console.log(userToken)
    if(!userToken){
        res.status(404).json({
            "message":"token not found"
        })
        return;
    }
    const isValidToken = jwt.verify(String(userToken),"this is secrete")

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