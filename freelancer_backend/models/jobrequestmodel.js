import mongoose, { Mongoose } from "mongoose";
const jobRequstschema = new mongoose.Schema({
     userid:{
        type:mongoose.Schema.Types.ObjectId,
         ref:'User',
         require:true
     },
    
     link:{
        type:String,
        require:true
     },
     message:{
        type:String,
        require:true
     },
     jobid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        require:true
     }
},
{ timestamps: true })
const jobreqmodel = mongoose.model("jobrequest",jobRequstschema)
export default jobreqmodel