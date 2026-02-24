import mongoose, { mongo } from "mongoose";
const AuthSchema = new mongoose.Schema({
    token:{
        type:String
    }
})
export default mongoose.model('auth',AuthSchema);