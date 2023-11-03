<template>
    <div>    
    <el-dialog v-model="dialogFormVisible" :title="title" @closed="off">
        <el-form :model="form">
            <el-form-item label="资金流" :label-width="formLabelWidth">
            <el-select v-model="form.type">
            <el-option label="支出" value="支出" />
            <el-option label="收入" value="收入" />
            </el-select>
        </el-form-item>
        <el-form-item label="收支类型" :label-width="formLabelWidth">
            <el-select v-model="form.label">
            <el-option label="转账" value="转账" />
            <el-option label="杂费" value="杂费" />
            <el-option label="生活费" value="生活费" />
            <el-option label="医药费" value="医药费" />
            <el-option label="购物费" value="购物费" />
            <el-option label="房租" value="房租" />
            </el-select>
        </el-form-item>
        <el-form-item label="收支描述" :label-width="formLabelWidth">
            <el-input v-model="form.describe" autocomplete="off" />
        </el-form-item>
        <el-form-item label="现金" :label-width="formLabelWidth">
            <el-input v-model="form.cash" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remark" autocomplete="off" />
        </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="off">取消</el-button>
            <el-button type="primary" @click="dialogForm">
            确定
            </el-button>
        </span>
        </template>
    </el-dialog>
    </div>
</template>


<script lang="ts">
export default{
name:'UPDATE',
}
</script>

<script lang="ts" setup>
  import {reactive,ref, toRefs, VueElement,watch } from 'vue'
  import axios from'axios'
  import { useStore } from 'vuex'
  import {defineEmits,defineProps} from 'vue'
  const emit=defineEmits(['update'])
  const store=useStore();
  const props=defineProps({dialogFormVisible1:Boolean,form1:Object,title:String,idupdate:String})
  let form = reactive({
  label: '',
  cash: '',
  type: '',
  remark: '',
  describe: ''});
  let {dialogFormVisible1}=toRefs(props);
  let {form1}=toRefs(props)
  let {title}=toRefs(props)
  let {idupdate}=toRefs(props)
  let dialogFormVisible=ref(false);
  dialogFormVisible=dialogFormVisible1
  form=form1;
   const dialogForm=()=>{
    if(title.value=="添加"){
        const id=store.state.user.user.id
        axios.post('/users/users/money',{
            userid:id,form:form
        }).then(res => {
                console.log(res.data);
                emit('update',res.data);
                
            }, err => {
                console.log(err);
                console.log('error');
            });
    }else if(title.value=="编辑"){
        let id=ref('')
        id=idupdate
        console.log('111',id)
        axios.post('/users/users/money/update',{id:id,form:form,label:form.label,cash:form.cash,type:form.type,remark:form.remark,describe:form.describe}).then(res => {
                console.log(res.data);
                emit('update',res.data);
            }, err => {
                console.log(err);
                console.log('error');
            });
     }     
    }       
     const off=()=>{
                emit('update');
     }
        
</script>
