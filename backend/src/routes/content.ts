import { Router } from "express";
import { getContent,postContent } from "../controllers/content";

export const contentRouter = Router()
// fetching all the content
contentRouter.get('/allContent',getContent)

contentRouter.post('/postContent',postContent)
