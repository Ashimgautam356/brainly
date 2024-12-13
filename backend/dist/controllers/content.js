"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.postContent = exports.getContent = void 0;
const db_1 = require("../db");
const zod_1 = require("zod");
// fetching all the content from the database
const getContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allContent = yield db_1.contentModel.find({
            userId: req.body.id
        }).populate("userId", "userName");
        res.status(200).json({
            "data": allContent
        });
        return;
    }
    catch (err) {
        res.status(500).json({
            "message": "internal server error"
        });
    }
});
exports.getContent = getContent;
// post Content 
const postContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentSchema = zod_1.z.object({
        type: zod_1.z.enum(['youtube', 'twitter', 'instagram', 'facebook', "other"], { message: "type should be either image,video,article or audio" }),
        link: zod_1.z.string({ message: "should be sting" }),
        title: zod_1.z.string({ message: "should be sting" }),
        date: zod_1.z.string()
    });
    const isValidSchema = contentSchema.safeParse({
        type: req.body.type,
        link: req.body.link,
        title: req.body.title,
        date: req.body.date
    });
    if (!isValidSchema.success) {
        const formatedMessage = isValidSchema.error.formErrors;
        res.status(411).json({
            type: formatedMessage.fieldErrors.type,
            link: formatedMessage.fieldErrors.link,
            title: formatedMessage.fieldErrors.title,
            date: formatedMessage.fieldErrors.date
        });
        return;
    }
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    const date = req.body.date;
    const id = req.body.id;
    try {
        yield db_1.contentModel.create({
            link: link,
            type: type,
            title: title,
            userId: id,
            date: date
        });
        res.status(200).json({
            "message": "your content has been saved"
        });
    }
    catch (err) {
        res.status(500).json({
            "message": err
        });
    }
});
exports.postContent = postContent;
// deleteContent 
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.id;
    try {
        const deltedContent = yield db_1.contentModel.deleteOne({
            _id: contentId,
            userId: req.body.id
        });
        res.status(200).json({
            "message": "content has been deleted",
            "deletedContent": deltedContent
        });
    }
    catch (err) {
        res.status(500).json({
            "message": err
        });
    }
});
exports.deleteContent = deleteContent;
