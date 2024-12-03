"use strict";
// import { Request,Response,NextFunction } from "express"
// import { z} from 'zod'
// import bcrypt from 'bcrypt'
// import { userModel } from "../db"
// import jwt from 'jsonwebtoken'
// export const userAuth = async(req:Request,res:Response,next:NextFunction)=>{
//     const userToken = req.headers.token;
//     if(!userToken){
//         res.status(404).json({
//             "message":"token not foudn"
//         })
//         return;
//     }
//     const isValidToken = jwt.verify(String(userToken),"this is secrete")
//     if(!isValidToken){
//         res.status(404).json({
//             "message":"invalid user"
//         })
//         return;
//     }
//     const userId = jwt.decode(String(userToken))?.id
//     const user = await userModel.findById(userId)
//     req.body.user = user;
//     next()
// }
