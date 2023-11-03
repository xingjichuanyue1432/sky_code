<template>
  <div >
  <router-view/>
  </div>
  
</template>
<script>
import jwt_decode from "jwt-decode"
import { useStore } from 'vuex'
import { isEmpty } from 'element-plus/es/utils';

export default{
  setup(){
    if(localStorage.app1_token){
      console.log(localStorage.app1_token);
      const decode=jwt_decode(localStorage.app1_token);
      const store=useStore();
      console.log("app",decode)
      sessionStorage.setItem('userinfo',decode.id)
      store.dispatch('upgetauth',!isEmpty(decode));
      store.dispatch('upgetuser',decode);
    }
    
  }
}
</script>


