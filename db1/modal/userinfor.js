const mongoose=require('mongoose')
let book=new mongoose.Schema({
    userid:{
        type:String
    },
    username:{
        type:String
    },   
    telephone:{
        type:String
    },
    place:{
        type:String
    },
    remarks:{
        type:String
    },
    address:{
        type:String
    },
    

});

const model=mongoose.model('userinformation',book);
module.exports=model;