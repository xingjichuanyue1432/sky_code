<template>
    <div class="demo-date-picker">
        <div><span style="margin:20px">时间筛选</span></div>
      <div class="block">
        <el-date-picker
          v-model="value2"
          type="date"
          :disabled-date="disabledDate"
          :shortcuts="shortcuts"
          size="defalut"
          value-format="YYYY-MM-DD"
        />
      </div>
      <div style="margin:20px">     
        <el-button type="primary" @click="date">
            确定
        </el-button></div>
    </div>
  </template>
  
  <script lang="ts">
  export default{
  name:'SEARCH',
  }
  </script>

  <script lang="ts" setup>
  import { ref } from 'vue'
  import {defineEmits} from 'vue'
  const emit=defineEmits(['search'])
  const value2 = ref('')
  const shortcuts = [
    {
      text: '今天',
      value: new Date(),
    },
    {
      text: '昨天',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        return date
      },
    },
    {
      text: '一周前',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        return date
      },
    },
  ]
  
  const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
  }
  const date=()=>{
    emit('search',value2);
  }
  </script>
  
  <style scoped>
  .demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
    align-items: center;
  }
  
  .demo-date-picker .block:last-child {
    border-right: none;
  }
  
  .demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }
  </style>