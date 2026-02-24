import mongoose from "mongoose";
const RoleSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String
    }
});
export default mongoose.model('role',RoleSchema);