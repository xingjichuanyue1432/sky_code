<template>
  <div class="img">
    <div>
      <el-container style="height:70vh;background-color:white;width:80vw">
      <el-container >
        <el-header style="height:40%;padding: 20px;">
          <div style="display:flex;align-items:center">
            <div> <el-image style="width: 100px; height: 100px;margin:20px;" :src="url" :fit="fit" /></div>
            <div><el-button  type="primary" :icon="Edit" circle  @click="dialogFormVisible = true"></el-button>  </div>
          </div>       
          <el-dialog v-model="dialogFormVisible">
            <el-form :model="info1">
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="info1.place" >
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
              <el-form-item label="身份" :label-width="formLabelWidth">
                <el-select v-model="info1.remarks" >
                  <el-option label="学生" value="学生" />
                  <el-option label="老师" value="老师" />
                </el-select>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="info1.telephone" autocomplete="off" />
              </el-form-item>
              <el-form-item label="住址" :label-width="formLabelWidth">
                <el-input v-model="info1.address" autocomplete="off" />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="form">
                  确定
                </el-button>
              </span>
            </template>
          </el-dialog>
        </el-header>
        <el-main style="height:60%">
          <el-descriptions
            direction="vertical"
            :column="2"
            size="small"
            border
          >
            <el-descriptions-item label="用户名" :span='2'>{{info.username}}</el-descriptions-item>
            <el-descriptions-item label="电话">{{info.telephone}}</el-descriptions-item>
            <el-descriptions-item label="性别">{{info.place}}</el-descriptions-item>
            <el-descriptions-item label="身份">
              <div v-if="info.remarks"><el-tag size="small">{{info.remarks}}</el-tag></div>         
            </el-descriptions-item>
            <el-descriptions-item label="住址" :span="2"
              >{{info.address}}
            </el-descriptions-item>
          </el-descriptions>
        </el-main>
      </el-container>
      <el-aside width="600px">
        <el-table :data="table" height="100%" style="width: 100%">
    <el-table-column prop="time" label="时间" width="180" />
    <el-table-column prop="type" label="状态" width="180" />
        </el-table>
      </el-aside>
    </el-container>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import {
  Edit
} from '@element-plus/icons-vue'
 import { useStore } from 'vuex'
 import axios from 'axios';
import { onMounted, reactive ,ref} from 'vue';
import moment from 'moment'
 const store=useStore();
 let table=reactive([]);
 let info=reactive({
  username:'',
  telephone:'',
  place:'',
  remarks:'',
  address:''
 })
 let info1=reactive({
  username:'',
  telephone:'',
  place:'',
  remarks:'',
  address:''
 })
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

 const id=store.state.user.user.id||sessionStorage.getItem("userinfo");
const url ='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
const form=()=>{
  dialogFormVisible.value = false
  axios.post('/users/users/userinfo',{userid:id,info1:info1}).then(res => { 
    console.log(res)
  getmove();
            }, err => {
                console.log(err);
                console.log('error');
            });
}
const getmove=()=>{
  axios.post('/users/users/movelook',{userid:id}).then(res => { 
    table.length=0          
                let table1=res.data;
                table1.map((item,index)=>{
                  item.time=moment(item.time).format('YYYY-MM-DD HH:mm')
                  if(index<20)
                  table.push(item)
                })
            }, err => {
                console.log(err);
                console.log('error');
            });
            axios.post('/users/users/userinfolook',{userid:id}).then(res => { 
          res.data.map(item=>{
            info.username=item.username
            info.telephone=item.telephone
            info.place=item.place
            info.remarks=item.remarks
            info.address=item.address
            info1.username=item.username
            info1.telephone=item.telephone
            info1.place=item.place
            info1.remarks=item.remarks
            info1.address=item.address
          })

            }, err => {
                console.log(err);
                console.log('error');
            });
}
onMounted(getmove)

</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.img{
  background:url('../../assets/1.jpg');
  width:100vw;
  height:87vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
