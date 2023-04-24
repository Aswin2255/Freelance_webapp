import mongoose from "mongoose";
const Userschema = new mongoose.Schema(
    {
        username:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true,
            unique : true
        },
        phonenumber:{
            type:Number,
            require:true,
            unique : true
        },
        pass:{
            type:String,
            require:true
        },
        role:{
            type:String,
            require:true
        }
    },
    { timestamps: true }
)
const usermodel = mongoose.model("User",Userschema)
export default usermodel;