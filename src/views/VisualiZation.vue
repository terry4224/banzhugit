<template>
	<div class="box">
	可视化
	</div>
</template>

<script setup>
	import store from '../store/index.js'
import { useRouter ,onBeforeRouteLeave} from "vue-router";
const router = useRouter();
if(router.currentRoute.value.fullPath == '/visualization'){
	 store.commit("changeIfclass", false);
}
 onBeforeRouteLeave((to, from, next)=>{ 
     const path = '/visualization'  
     // 判断两个路径是否一致
     if (to.path != path) { 
		  store.commit("changeIfclass", true)
     } 
	   if (to.path == path) { 
		   console.log(123);
     } 
       next(); 
     
   })
	

</script>

<style lang="scss" scoped>
.box{
	width: 24rem;
	height: 24rem;
	background-color: skyblue;
}
</style>
