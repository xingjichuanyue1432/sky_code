module.exports=function(success,error){
    if(typeof error!=='function'){
        error=()=>{
            console.log('失败')
        }
    }
const mongoose=require('mongoose')
const {DBHOST,DBPORT,DBNAME}=require('../config/config')
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

mongoose.connection.once('open',()=>{
console.log('连接成功');
success()
})

mongoose.connection.on('error',()=>{
error()   
})
}