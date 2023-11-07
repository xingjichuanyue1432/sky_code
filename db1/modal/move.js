const mongoose=require('mongoose')
let book=new mongoose.Schema({
    userid:{
        type:String
    },
    time:Date,
    type:{
        type:String
    }
});

const model=mongoose.model('move',book);
module.exports=model;