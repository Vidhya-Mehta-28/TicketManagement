import mongoose from "mongoose";
const CreateTicketDTOSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    minlength:10
},priority:{
    type:String,
    Enum:['LOW','MEDIUM','HIGH']
}
})
export default mongoose.model('createTicketDTO',CreateTicketDTOSchema);