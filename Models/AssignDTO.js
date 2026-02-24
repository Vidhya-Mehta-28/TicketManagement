import mongoose from "mongoose";
const AssignSchema = new mongoose.Schema({
    userId:{
        type:Number,
        required:true,
        unique:true
    }
});
export default mongoose.model('assign',AssignSchema);