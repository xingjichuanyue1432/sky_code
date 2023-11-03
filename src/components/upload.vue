<template>
    <div>
        <el-dialog v-model="formshow" title="Shipping address">
            <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.tele" autocomplete="off" />
            </el-form-item>
            <el-form-item label="住址" :label-width="formLabelWidth">
                <el-input v-model="form.adress" autocomplete="off" />
            </el-form-item>
            <el-upload
                    class="avatar-uploader"
                    action="https://localhost:3000/users/money"
                    :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                    >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                Confirm
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
  </template>
  
  <script lang="ts">
  export default{
  name:'UPLOAD',
  }
  </script>

  <script lang="ts" setup>
  import {defineProps} from 'vue'
  import {reactive,ref, toRefs, VueElement,watch } from 'vue'
  import { useStore } from 'vuex'
  import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import axios from'axios'
import type { UploadProps } from 'element-plus'
  const store=useStore();
  let url='htttp://localhost:3000/users/information'
  let formshow=ref(false)
  const props=defineProps({show:Boolean,})
  let {show}=toRefs(props)
  formshow=show;
  const dialogTableVisible = ref(false)
  const dialogFormVisible = ref(false)
  const formLabelWidth = '140px'
  
  const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  })
  
  const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
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
  .avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
  </style>