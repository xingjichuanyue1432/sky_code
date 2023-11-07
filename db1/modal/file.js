const mongoose=require('mongoose')
let book=new mongoose.Schema({
    userid:{
        type:String
    },
    time:Date,
    type:{
        type:String
    },   
    describe:{
        type:String
    },
    label:{
        type:String
    },
    cash:{
        type:Number
    },
    remark:{
        type:String
    },
    

});

const model=mongoose.model('file',book);
module.exports=model;