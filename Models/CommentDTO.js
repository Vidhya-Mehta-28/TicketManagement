import mongoose from "mongoose";
const CommentDTOSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true}});
export default mongoose.model('commentDTO',CommentDTOSchema);