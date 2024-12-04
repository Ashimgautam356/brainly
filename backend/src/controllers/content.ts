import { Request,Response } from "express"
import { contentModel, contentTypes } from "../db"
import {z} from 'zod'

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
export const postContent = async (req:Request,res:Response)=>{

    const contentSchema = z.object({
        type: z.enum(['image', 'video', 'article', 'audio'],{message:"type should be either image,video,article or audio"}),
        link:z.string({message:"should be sting"}),
        title:z.string({message:"should be sting"}),
        tags: z.array(z.string())
    })

    
    const isValidSchema = contentSchema.safeParse({
        type:req.body.type,
        link:req.body.link,
        title:req.body.title,
        tags:req.body.tags
    })

    if(!isValidSchema.success){
        const formatedMessage = isValidSchema.error.formErrors;
        res.status(411).json({
            type:formatedMessage.fieldErrors.type,
            link:formatedMessage.fieldErrors.link,
            title:formatedMessage.fieldErrors.title,
            tags:formatedMessage.fieldErrors.tags,
            
        })
        return; 
    }
    const link = req.body.link
    const title =req.body.title
    const tags = req.body.tags
    const type = req.body.type
    const id = req.body.id
    try{
        await contentModel.create({
            link:link,
            type:type,
            title:title,
            tags:tags,
            userId:id
        })
        res.status(200).json({
            "message":"your content has been saved"
        })

    }catch(err){
        res.status(500).json({
            "message":err
        })
    }

}