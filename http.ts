import axios from 'axios'
import { ElLoading,ElMessage } from 'element-plus'

let loadingInstance;
function start(){
loadingInstance=ElLoading.service({
    lock:true,
    text:'加载中'
})
}
function end(){
    loadingInstance.close();
    }


axios.interceptors.request.use(config =>{
    start();
    if(localStorage.app1_token){
        config.headers.Authorization=localStorage.app1_token
    }
    return config;
},error=>{
    return Promise.reject(error)
})

axios.interceptors.response.use(Response=>{
    end();
    return Response;
},error=>{
    end();
    const {status}=error.response;
    if(status==401){
        ElMessage.error('token失效')
    }
    
    return Promise.reject(error)
})
    



export default axios;