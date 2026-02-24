import mongoose, { mongo } from 'mongoose';
const UpdateStatusSchema = new mongoose.Schema({
    status:{
        type:String,
        Enum:['OPEN','IN_PROGRESS','RESOLVED','CLOSED']
    }
})
export default mongoose.model('updateStatus',UpdateStatusSchema);