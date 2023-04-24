import mongoose, { Mongoose } from "mongoose";
const Jobschema = new mongoose.Schema({
    jobtitle:{
        type:String,
        require:true
    },
    jobdescription:{
        type:String,
        require:true

    },
    technologies:{
        type:Array,
        require:true
    },
    budget:{
        type:Number,
        require:true
    },
   client:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    require:true
   },
   
},
{ timestamps: true })
const jobmodel = mongoose.model("Job",Jobschema)
export default jobmodel