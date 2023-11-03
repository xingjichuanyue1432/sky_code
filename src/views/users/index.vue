<template>
  <div class="home">
    <HEADER />
    <div style="display:flex">
    <div><ASIDE/></div>
    <router-view></router-view>
    </div>
    
   
    
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HEADER from '@/components/header.vue'
import ASIDE from '@/components/aside.vue'
export default {
  name: 'Home',
  components: {
    HEADER,
    ASIDE
  }
}
</script>
<script lang="ts" setup>

</script>

