var express = require('express');
var router = express.Router();
const model1=require('../modal/modal1')
const model2=require('../modal/file')
const model3=require('../modal/move')
const model4=require('../modal/userinfor')
const moment=require('moment')
const md5=require("md5")
const jwt=require('jsonwebtoken')
const {SECRET}=require('../config/config')

let checktoken=(req,res,next)=>{
  let token=req.get('token')
  if(!token){
    return res.json({msg:'token缺失'})
  }
  jwt.verify(token,SECRET,(err,data)=>{
    if(err){
      return res.json({msg:'token校验失败'})
    }
  })
  next()
}
/*
登陆
*/
router.post('/login', async(req, res)=> {
    try{
    const username=req.body.username
    const password=md5(req.body.password)
    model1.findOne({username:username}).then(
      (result)=>{
        if(!result)
        {return res.send('用户不存在')}
        console.log('result',result)
        if(result.password==password)
        {
          const rule={id:result._id,name:result.name};
          jwt.sign(rule,SECRET,{expiresIn:3600*6},(err,token)=>{
            if(err)
            {
              throw err;
            }
            res.json({
              success:true,
              token:token
            })
          })
          const userid=result._id
          const username=result.username
          model4.findOne({userid:userid}).then(
            (result)=>{
              if(!result){
                model4.create({userid:userid,username:username,address:'',teleohone:'',place:'',remarks:''})
              }
            }
          )

        }
        else
        {return res.send('密码错误')}
      })

    }catch(err){
      console.log(err)
    }
});
/*
注册
*/
router.post('/register', async(req, res) =>{
  try{
    console.log(req.body)
    model1.findOne({username:req.body.username}).then(
      (result)=>{
        if(result){
          return res.send('用户名重复')
        }else{
          model1.create({...req.body,time:moment(req.body.time).toDate(),password:md5(req.body.password)})
          res.send("注册成功")
        }
      }
    )
    }catch(err){
    console.log(err)
    }
});
/*
资金
*/
router.get('/users/money', async(req, res) =>{
  try{
    const {id}=req.query
    model2.find({userid:id}).then(
      (result)=>{
        if(result){
          return res.send(result)
        }else{
          res.send("")
        }
      }
    )
    }catch(err){
    console.log(err)
    }
});
/*
资金添加
*/
router.post('/users/money', async(req, res) =>{
  try{
    let form=req.body.form._object.form1
    form.userid=req.body.userid
    console.log('添加',form)
    model2.create({...form,time:moment().startOf('day').format("YYYY-MM-DD")})
    res.send("添加成功")
    }catch(err){
    console.log(err)
    }
});
/*
资金时间查询
*/
router.post('/users/money/search', async(req, res) =>{
  try{
    const userid=req.body.userid
    const time=req.body.time._value._value
    if(time){
      model2.find({userid:userid,time:time}).then(
        (result)=>{
          if(result){
            return res.send(result)
          }else{
            res.send("")
          }
        }
      )  
    }else{
      model2.find({userid:userid}).then(
        (result)=>{
          if(result){
            return res.send(result)
          }else{
            res.send("")
          }
        }
      )  
    }
    }catch(err){
    console.log(err)
    }
});
/*
资金修改
*/
router.post('/users/money/update', async(req, res) =>{
  try{
    const form=req.body.id._object.form1;
    const idupdate=req.body.id._object.idupdate;
   console.log('id',idupdate,form.label,form.cash,form.type,form.remark,form.describe);
   model2.updateOne({_id:idupdate},{$set:{label:form.label,cash:form.cash,type:form.type,remark:form.remark,describe:form.describe}}).
   then((profile)=>{
    return res.send(profile)
  })
    }catch(err){
    console.log(err)
    }
});
/*
资金删除
*/
router.post('/users/money/remove', async(req, res) =>{
  try{
    const id=req.body.id;
   console.log('删除',id);
   model2.deleteOne({_id:id}).
   then((profile)=>{
    console.log(profile)
    return res.send(profile)
  })
    }catch(err){
    console.log(err)
    }
});
/*
用户行为
*/
router.post('/users/move', async(req, res) =>{
  try{
    console.log(req.body)
    let form=req.body
    model3.create({...form,time:moment(moment().toDate()).format("YYYY-MM-DD HH:mm")})
    res.send("")
    }catch(err){
    console.log(err)
    }
});
router.post('/users/movelook', async(req, res) =>{
  try{
    console.log(req.body)
    let {userid}=req.body
    model3.find({userid:userid}).sort({time:-1}).then(
      (result)=>{
        if(result){
          return res.send(result)
        }else{
          res.send("")
        }
      })
    }catch(err){
    console.log(err)
    }
});
/*
用户资料
*/
router.post('/users/userinfolook', async(req, res) =>{
  try{
    let {userid}=req.body
    model4.find({userid:userid}).then(
      (result)=>{
        if(result){
          return res.send(result)
        }else{
          res.send("")
        }
      })
    }catch(err){
    console.log(err)
    }
});
router.post('/users/userinfo', async(req, res) =>{
  try{
  const userid=req.body.userid
  const form=req.body.info1
  const username=req.body.info1.username;
  model4.updateOne({userid:userid},{$set:form}).
  then((profile)=>{
    model1.updateOne({_id:userid},{$set:{username:username}})
   return res.send(profile)
 })
    }catch(err){
    console.log(err)
    }
});
router.post('/users/moneylook', async(req, res) =>{
  try{
  const userid=req.body.userid
  const type=req.body.type
  model2.find({userid:userid,type:type}).then(
    (result)=>{
      if(result){
        return res.send(result)
      }else{
        res.send("")
      }
    }
  )
    }catch(err){
    console.log(err)
    }
});
router.post('/users/remove', async(req, res) =>{
  try{
  const userid=req.body.userid
 model1.deleteOne({_id:userid}).
 then((profile)=>{
  return res.send(profile)
})
model2.deleteMany({userid:userid}).
then((profile)=>{
 return res.send(profile)
})
model3.deleteMany({userid:userid}).
then((profile)=>{
 return res.send(profile)
})
model4.deleteMany({userid:userid}).
then((profile)=>{
 return res.send(profile)
})
    }catch(err){
    console.log(err)
    }
});
module.exports = router;


