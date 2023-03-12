<template>
	<div>
		<input type="file" multiple @change="changeFiles" class="showipt" ref="ipt"/>
		<el-button  type="primary" @click="btnclick">
			<i class="fa fa-plus" aria-hidden="true"></i>批量导入
		</el-button>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue";
	import {
		upload
	} from '../api/studyfield.js';
	import {
		message
	} from '../utils/message.js';
	const ipt = ref(); // 获取dom
	const btnclick = () => {
		ipt.value.click(); // 执行input的点击事件 开启文件选取
	}
	// 子父通信
	const emit = defineEmits(["getchange"]);
	// 文件上传时的回调函数 获取具体文件
	const changeFiles = async (e) => {
		let inputDom = e.target;
		let files = inputDom.files
		// 如果文件列表不存在,终止操作
		if (!files) {
			return;
		}
		console.log(ipt.value.files); // 获取节点后的文件列表
		// fileData获取到的文件
		const formdata = new window.FormData(); // 创建formdata对象 追加数据
		for (let i = 0; i < files.length; i++) {
			if(files[i].size >= 50 * 1024 * 1024){
				message("单个文件大小,最大不能超过50MB","warning",2000);
				return;
			}
			formdata.append('files', files[i]);
		}
		// 添加节点flie 内容为fileData
		// 然后调用上传方法将 formdata作为内容传输
		const res = await upload({
			method: "post",
			url: "/mgr/study/uploads",
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
			data: formdata,
		});
		if(res.message = "成功"){
			 emit("getchange",true);
			message("上传成功","success",2000)
		}


	};
</script>

<style lang="scss" scoped>
	.showipt {
		display: none;
	}
</style>
