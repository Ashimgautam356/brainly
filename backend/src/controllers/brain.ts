import { Request, Response } from "express"
import { contentModel, linkModel, userModel } from "../db";
import { random } from "../utils";
import { z } from "zod";


// CREATE SHAREABLE LINK 
export const postBrain = async (req:Request, res:Response)=>{
    const shareSchema = z.object({
        share: z.boolean({message:"should be either true or false"})
    })

    const isValidate = shareSchema.safeParse({share:req.body.share})
    if(!isValidate.success){
        const formatedMessage = isValidate.error.formErrors;
        res.status(411).json({
            "message":"is error comming here",
            "share": formatedMessage.fieldErrors.share
        })
        return;
    }

    const share = req.body.share;

    if(share){
        const hashLink =  random(10)
        try{
            const existingLink = await linkModel.findOne({userId:req.body.id})
            
            if(existingLink){
                res.status(200).json({
                    "link": existingLink.hash
                })
                return;
            }
            await linkModel.create({
                hash: hashLink,
                userId:req.body.id
            })

            res.status(200).json({
                "link": hashLink
            })

        }catch(err){
            res.status(500).json({
                "message":"internal server errror"
            })
        }
    }else{
        await linkModel.deleteOne({
            userId: req.body.id
        })
        res.status(200).json({
            "message":"link has been deleted"
        })
    }
}



// GET THE BRAIN WITH THE LINK
export const getBrain = async(req:Request,res:Response)=>{
    const hash:string = req.params.shareLink; 

    try{
        const link = await linkModel.findOne({
            hash:hash
        })
        if(!link){
            res.status(411).json({
                "message":"invalid Link"
            })
            return;
        }

        const content = await contentModel.find({
            userId: link.userId
        })
        if(!content){
            res.status(411).json({
                "message":"content didin't found, this should not be an error"
            })
            return 
        }


        const user  = await userModel.findOne({
            _id: link.userId
        })
        if(!user){
            res.status(411).json({
                "message":"user didin't found, this should not be an error"
            })
            return 
        }

        res.status(200).json({
            "userName":user?.userName,
            "content":content

        })


    }catch(er){
        res.status(500).json({
            "message":"internal server errror"
        })
    }
    
}