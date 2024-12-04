import { Request,Response } from "express"
import { contentModel } from "../db"


// fetching all the content from the database
export const getContent = async(req:Request,res:Response)=>{
    try{
        const allContent = await contentModel.find()
        res.status(200).json({
            "data":allContent
        })
        return;
    }catch(err){
        res.status(500).json({
            "message":"internal server error"
        })
    }
}

// post Content 
export const postContent = async (req:)