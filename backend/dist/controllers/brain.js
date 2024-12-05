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
exports.getBrain = exports.postBrain = void 0;
const db_1 = require("../db");
const utils_1 = require("../utils");
const zod_1 = require("zod");
// CREATE SHAREABLE LINK 
const postBrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shareSchema = zod_1.z.object({
        share: zod_1.z.boolean({ message: "should be either true or false" })
    });
    const isValidate = shareSchema.safeParse({ share: req.body.share });
    if (!isValidate.success) {
        const formatedMessage = isValidate.error.formErrors;
        res.status(411).json({
            "message": "is error comming here",
            "share": formatedMessage.fieldErrors.share
        });
        return;
    }
    const share = req.body.share;
    if (share) {
        const hashLink = (0, utils_1.random)(10);
        try {
            const existingLink = yield db_1.linkModel.findOne({ userId: req.body.id });
            if (existingLink) {
                res.status(200).json({
                    "link": existingLink.hash
                });
                return;
            }
            yield db_1.linkModel.create({
                hash: hashLink,
                userId: req.body.id
            });
            res.status(200).json({
                "link": hashLink
            });
        }
        catch (err) {
            res.status(500).json({
                "message": "internal server errror"
            });
        }
    }
    else {
        yield db_1.linkModel.deleteOne({
            userId: req.body.id
        });
        res.status(200).json({
            "message": "link has been deleted"
        });
    }
});
exports.postBrain = postBrain;
// GET THE BRAIN WITH THE LINK
const getBrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    try {
        const link = yield db_1.linkModel.findOne({
            hash: hash
        });
        if (!link) {
            res.status(411).json({
                "message": "invalid Link"
            });
            return;
        }
        const content = yield db_1.contentModel.findOne({
            userId: link.userId
        });
        if (!content) {
            res.status(411).json({
                "message": "content didin't found, this should not be an error"
            });
            return;
        }
        const user = yield db_1.userModel.findOne({
            _id: link.userId
        });
        if (!user) {
            res.status(411).json({
                "message": "user didin't found, this should not be an error"
            });
            return;
        }
        res.status(200).json({
            "userName": user === null || user === void 0 ? void 0 : user.userName,
            "content": content
        });
    }
    catch (er) {
        res.status(500).json({
            "message": "internal server errror"
        });
    }
});
exports.getBrain = getBrain;
