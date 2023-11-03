<template>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          style="width:200px;height:87vh"
          
        >
        <el-menu-item>
            <el-icon><document /></el-icon>           
            <router-link to="/users/first"><span><el-menu-item>首页</el-menu-item></span></router-link>
          </el-menu-item>
          <el-sub-menu>
            <template #title>
              <el-icon><location /></el-icon>       
        <span>资金管理</span>
            </template>
            <el-menu-item-group >
              <router-link to="/users/money"><span><el-menu-item>资金流水</el-menu-item></span></router-link>
              
            </el-menu-item-group>    
          </el-sub-menu>
  
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <router-link to="/users/information"><span><el-menu-item>个人信息</el-menu-item></span></router-link>  
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </template>
  
  <script lang="ts" >
  export default {
  name: 'ASIDE',

}
  </script>