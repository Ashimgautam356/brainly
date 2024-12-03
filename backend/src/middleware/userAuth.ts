import { Request,Response,NextFunction } from "express"
import { userModel } from "../db"
import jwt,{JwtPayload} from 'jsonwebtoken'

export const userAuth = async(req:Request,res:Response,next:NextFunction)=>{
    const userToken = req.headers.token ;

    if(!userToken){
        res.status(404).json({
            "message":"token not foudn"
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

interface Obj extends JwtPayload{
    id:string,
    iat:number
}

    const abc  = jwt.decode(String(userToken)) as Obj | null
    console.log(typeof(abc), abc)
    const user = await userModel.findById({_id:abc?.id})
    req.body.user = user;
    next()

}