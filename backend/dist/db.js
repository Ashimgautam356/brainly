"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.contentModel = exports.tagModel = exports.userModel = exports.contentTypes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_1.default.Schema({
    userName: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});
const tagSchema = new mongoose_1.default.Schema({
    tags: { type: String, require: true, unique: true }
});
exports.contentTypes = ['youtube', 'twitter', "other"];
const contentSchema = new mongoose_1.default.Schema({
    link: { type: String, require: true },
    type: { type: String, enum: exports.contentTypes, require: true },
    title: { type: String, require: true },
    userId: { type: mongoose_2.Types.ObjectId, ref: 'User', require: true },
    date: { type: Date, require: true }
});
const link = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
});
exports.userModel = mongoose_1.default.model('User', userSchema);
exports.tagModel = mongoose_1.default.model('Tag', tagSchema);
exports.contentModel = mongoose_1.default.model('Content', contentSchema);
exports.linkModel = mongoose_1.default.model('Link', link);
// module.exports={
//     userModel:userModel,
//     tagModel:tagModel,
//     contentModel:contentModel,
//     linkModel:linkModel
// }
