const mongoose= require('mongoose');
const userSChema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        default:null
    },
    lastname:{
        type:String,
    },
    email:{
          type:String,
          required:true,
          unique:true
    },
    password:
    {
        type:String,
        required:true
    },
    token:
    {
        type:String
    }
})
module.exports= mongoose.model("user",userSChema)