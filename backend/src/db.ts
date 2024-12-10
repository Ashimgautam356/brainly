import mongoose from "mongoose";
import { Types } from "mongoose";
import { Schema } from "zod";

const userSchema= new mongoose.Schema({
    userName: {type:String, require:true, unique:true},
    email:{type:String,require:true,unique:true},
    password: {type:String, require:true}
})

const tagSchema = new mongoose.Schema({
    tags:{type:String, require:true,unique:true}
})


 export const contentTypes = ['youtube', 'twitter', 'instagram', 'facebook',"other"]


const contentSchema = new mongoose.Schema({
    link:{type:String, require:true},
    type:{type:String, enum:contentTypes, require:true},
    title:{type:String, require:true},
    userId:{type:Types.ObjectId, ref:'User', require:true},

})

const link = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true ,unique:true},
})


export const userModel = mongoose.model('User',userSchema);
export const tagModel = mongoose.model('Tag',tagSchema);
export const contentModel = mongoose.model('Content',contentSchema);
export const linkModel= mongoose.model('Link',link)

// module.exports={
//     userModel:userModel,
//     tagModel:tagModel,
//     contentModel:contentModel,
//     linkModel:linkModel
// }