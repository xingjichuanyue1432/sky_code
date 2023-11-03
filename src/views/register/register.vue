<template>
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
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >注册</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules  } from 'element-plus'
import { ElMessage } from 'element-plus'
import axios from'axios'
import { useRouter } from "vue-router";
const router = useRouter();
const ruleFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("密码不一致!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  username: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  username: [{ required:true,message: '请输入用户名', trigger: 'blur' }],
})

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      axios.post('/users/register',{username:ruleForm.username,password:ruleForm.pass}).then(res => {
        console.log(res);
        if(res.data=="注册成功")
        {
          ElMessage('注册成功');
          router.push('/users');
        }else if(res.data=="用户名重复"){
          ElMessage('用户名重复');
        }
    }, err => {
        // error callback
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