import { Router } from "express";
import { getContent,postContent,deleteContent } from "../controllers/content";

export const contentRouter = Router()
// fetching all the content
contentRouter.get('/allContent',getContent)
// adding 
contentRouter.post('/postContent',postContent)
// deleting
contentRouter.delete('/delete',deleteContent)
