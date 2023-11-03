<template>
  <div>
  <div style="display:flex;justify-content: space-between;align-items: center;">
    <div><SEARCH @search="searchtime"/></div>
    <div><el-button  type="primary"  @click="add">添加</el-button><UPDATE @update="get" :dialogFormVisible1="dialogFormVisible1" :form1="form" :title="title" :idupdate="id"/></div>
  </div>
    <el-table  border style="width: 100%" :data="table2">
      <el-table-column prop="index" label="序号" width="60" ></el-table-column>
      <el-table-column prop="time" label="创建时间" width="110" ></el-table-column>
      <el-table-column prop="label" label="收支类型" width="100" ></el-table-column>
      <el-table-column prop="describe" label="收支描述" width="180"></el-table-column>
      <el-table-column prop="type" label="资金流" width="180"></el-table-column>
      <el-table-column prop="cash" label="现金" width="100"></el-table-column>
      <el-table-column prop="remark" label="备注" width="180"></el-table-column>
      <el-table-column prop="operation" label="操作" width="180">
        <template #default="scope">
        <el-button link type="primary" size="small" @click="remove(scope.$index)">删除</el-button>
        <el-button link type="primary" size="small" @click="edit(scope.$index)">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <div>
        <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[5,10]"
      background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
      </div>
  </div>
  </div>
</template>
  
<script lang="ts" setup>
  import UPDATE from '../../components/moneyupdate.vue'
  import SEARCH from '../../components/moneysearch.vue'
  import {  onMounted, reactive,ref } from 'vue'
  import axios from'axios'
  import { useStore } from 'vuex'
  const store=useStore();
  let table=reactive([]);
  let table2=reactive([]);
  let dialogFormVisible1 = ref(false)
  let title = ref('')
  let time=ref('')
  let form = reactive({
  label: '',
  cash: '',
  type: '',
  remark: '',
  describe: ''});
  let id=ref('')
  const currentPage4 = ref(1)
  const pageSize4 = ref(10)
  const total = ref(10)

  const handleSizeChange = (val: number) => {
    pageSize4.value=val;
    table2.length=0;
          table.map((item,index)=>{
            if(index<pageSize4.value)
            table2.push(item)
          })
  }
  const handleCurrentChange = (val: number) => {
    currentPage4.value=val;
    table2.length=0;
    if(currentPage4.value==1)
    {
      table.map((item,index)=>{
            if(index<pageSize4.value)
            table2.push(item)
          })

    }else{
      table.map((item,index)=>{
            if(index>=(currentPage4.value-1)*pageSize4.value&&index<currentPage4.value*pageSize4.value)
            table2.push(item)
          })
    }
         
   
  }
  const add=()=>{
    dialogFormVisible1.value=true;
    title.value="添加";

  }
  const edit=(index: number)=>{
    console.log('1',table[index])
    dialogFormVisible1.value=true;
    title.value="编辑";
    form = reactive({
    label:table[index].label,
    cash:table[index].cash,
    type:table[index].type,
    remark:table[index].remark,
    describe:table[index].describe});
    id=table[index]._id

  }
  const remove=(index: number)=>{
  let  id=table[index]._id;
    axios.post('/users/users/money/remove',{id:id,}).then(res => {
                console.log(res.data);              
            }, err => {
                console.log(err);
                console.log('error');
            });
   get()
  }


  const get=()=>{
    dialogFormVisible1.value=false;
    form = reactive({
  label: '',
  cash: '',
  type: '',
  remark: '',
  describe: ''});
    const id=store.state.user.user.id||sessionStorage.getItem("userinfo");
    let table1=[];
    axios.get('/users/users/money?id='+id).then(res => {
          console.log('获取数组',res);
         table1=res.data;
         table.length=0
         total.value=table1.length
         table1.map((item,index)=>{   
            item.time=item.time.split('T')[0]
            item.index=index+1
            table.push(item)
          })
          console.log('table',table)
          table2.length=0;
          if(currentPage4.value==1)
    {
      table.map((item,index)=>{
            if(index<pageSize4.value)
            table2.push(item)
          })

    }else{
      table.map((item,index)=>{
            if(index>=(currentPage4.value-1)*pageSize4.value&&index<currentPage4.value*pageSize4.value)
            table2.push(item)
          })
    }
       
});        
  }
  onMounted(get)

  const searchtime=(value)=>{
    time.value=value
    table.length=0
   const id=store.state.user.user.id||sessionStorage.getItem("userinfo")
    axios.post('/users/users/money/search',{userid:id,time:time}).then(res => {
            console.log(res);
          let table1=res.data;
          total.value=table1.length
          table1.map((item,index)=>{   
            item.time=item.time.split('T')[0]
            item.index=index+1
            table.push(item)
          })
          table2.length=0;
          if(currentPage4.value==1)
    {
      table.map((item,index)=>{
            if(index<pageSize4.value)
            table2.push(item)
          })

    }else{
      table.map((item,index)=>{
            if(index>=(currentPage4.value-1)*pageSize4.value&&index<currentPage4.value*pageSize4.value)
            table2.push(item)
          })
    }
       
     
   });}
</script>

<style scoped>
.demo-pagination-block {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>