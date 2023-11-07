const mongoose=require('mongoose')
let book=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    time:Date,
    identity:{
        type:String
    }
});

const model=mongoose.model('useraccount',book);
module.exports=model;