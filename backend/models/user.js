import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username :{
        type:String,
        required : true,
        unique:true,
    },
    email:{
        type:String,
        required : true,
        unique:true,
    },
    password:{
        type:String,
    },
    
    

});

export default mongoose.model("User", UserSchema);
 