import mongoose from "mongoose";
const TicketSchema = new mongoose.Schema({
    id:{
        type:Number,
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String,    
        enum:['OPEN','IN_PROGRESS','RESOLVED','CLOSED']
    },
    priority:{
        type:String,
        enum:['LOW','MEDIUM','HIGH']
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    assigned_to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});
export default mongoose.model('ticket',TicketSchema);