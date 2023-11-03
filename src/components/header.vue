<template>
    <div >
      <div class="header">
      <div class="header">
      <div style="margin-right:1vw;margin-left:1vw"><img src="https://element-plus.org/images/element-plus-logo.svg" class="img"/></div>
      <div >后台系统</div>
      </div>
      <div class="header">
        <div style="margin-right:10px;"><el-avatar :size="size"  :src="url"/></div>
      <div style="width:100px">
        <el-dropdown split-button type="primary" @click="handleClick">
        欢迎
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="out">退出</el-dropdown-item>
            <el-dropdown-item @click="remove">注销账号</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      </div>
      </div>
    </div>
    </div>
   
  </template>
  
  <script lang="ts">
  export default {
  name: 'HEADER',

}
  </script>
<script lang="ts" setup>
 import { useStore } from 'vuex'
 import axios from 'axios';
 import { useRouter } from "vue-router";
 const router = useRouter();
  const store=useStore();
  const url ='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
const out=()=>{
  localStorage.removeItem('app1_token')
  sessionStorage.removeItem('userinfo')
  const id=store.state.user.user.id
  axios.post('/users/users/move',{userid:id,type:"退出"}).then(res => {
                console.log(res.data);
            }, err => {
                console.log(err);
                console.log('error');
            });
  router.push('/users')

}
const remove=()=>{
  localStorage.removeItem('app1_token')
  sessionStorage.removeItem('userinfo')
  const id=store.state.user.user.id
  axios.post('/users/users/remove',{userid:id}).then(res => {
                console.log(res.data);
            }, err => {
                console.log(err);
                console.log('error');
            });
  router.push('/users')

}
  </script>
  <style scoped>
  .img{
    width:80px;
    height: 60px;
  }
  .header{
    background-color:#545c64;
    color:white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 10vh;
  }
  
  </style>