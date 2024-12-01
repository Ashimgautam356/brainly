import mongoose from "mongoose";
import { Types } from "mongoose";

const userSchema= new mongoose.Schema({
    userName: {type:String, require:true, unique:true},
    password: {type:String, require:true}
})

const tagSchema = new mongoose.Schema({
    tags:{type:String, require:true,unique:true}
})


const contentTypes = ['image', 'video', 'article', 'audio']
const contentSchema = new mongoose.Schema({
    link:{type:String, require:true},
    type:{type:String, enum:contentTypes, require:true},
    title:{type:String, require:true},
    tags:{type: Types.ObjectId, ref:'Tag'},
    userId:{type:Types.ObjectId, ref:'User', require:true}
})

const link = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})


const userModel = mongoose.model('User',userSchema);
const tagModel = mongoose.model('Tag',tagSchema);
const contentModel = mongoose.model('Content',contentSchema);
const linkModel= mongoose.model('Link',link)

module.exports={
    userModel:userModel,
    tagModel:tagModel,
    contentModel:contentModel,
    linkModel:linkModel
}