import { Router } from "express";
import { getBrain, postBrain } from "../controllers/brain";


export const brainRouter = Router()



brainRouter.post('/share',postBrain)
brainRouter.get('/:shareLink',getBrain)
