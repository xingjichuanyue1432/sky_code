<template>
  <div>
    <div class='section1'>
      <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username"  />
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >登陆</el-button
      >
      <router-link to="/register" id="word">没有登陆？立即注册</router-link>
    </el-form-item>
       </el-form>
    </div>
  </div>
 
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules  } from 'element-plus'
import { ElMessage } from 'element-plus'
import axios from'axios'
import { useRouter } from "vue-router";
import jwt_decode from "jwt-decode"
import { useStore } from 'vuex'
import { isEmpty } from 'element-plus/es/utils';
const router = useRouter();
const ruleFormRef = ref<FormInstance>()
const store=useStore();

const ruleForm = reactive({
  pass: '',
  username: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{  required:true,message: '请输入密码', trigger: 'blur' }],
  username: [{ required:true,message: '请输入用户名', trigger: 'blur' }],
})

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      axios.post('/users/login',{username:ruleForm.username,password:ruleForm.pass}).then(res => {
        console.log('login',res);
        if(res.data=="用户不存在"){
          ElMessage('用户不存在');
        }else if(res.data=="密码错误"){
          ElMessage('密码错误');
        }else {
          ElMessage('登陆成功');
          router.push('/users/index');
          const {token}=res.data;
          localStorage.setItem('app1_token',token);
          const decode=jwt_decode(token)
          console.log(decode)
          store.dispatch('upgetauth',!isEmpty(decode))
          store.dispatch('upgetuser',decode)
          router.push('/users/first')
          let {id}=decode
          axios.post('/users/users/move',{userid:id,type:"登录"}).then(res => {
                        console.log(res.data);
                    }, err => {
                        console.log(err);
                        console.log('error');
                    });
              }
    }, err => {
        console.log(err);
        console.log('error');
    });
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>


<style scoped>
.section1{
  background-color: bisque;
  width: 40vw;
  height: 40vh;
  max-width:500px ;
  max-height: 500px;
  padding: 20px;
}
#word{
  margin-left: 20px;
}
</style>