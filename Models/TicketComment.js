import mongoose from "mongoose";
const TicketCommentSchema = new mongoose.Schema({
    Id:{
        type:Number,
    },
    comment:{
        type:String
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ticket'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});
export default mongoose.model('ticketComment',TicketCommentSchema);