<template>
	<div>
		<input type="file" multiple @change="changeFiles" class="showipt" ref="ipt" accept="image/*" />
		<el-button style="margin-bottom: 10px;" type="primary" @click="btnclick">
			<i class="fa fa-chevron-circle-up" aria-hidden="true"></i>上传图片
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
	} from '../api/photomangent.js';
	import {
		message
	} from '../utils/message.js';
	const emit = defineEmits(["getsuccess"]);
	const ipt = ref(); // 获取dom
	const btnclick = () => {
		ipt.value.click(); // 执行input的点击事件 开启文件选取
	}
	// 文件上传时的回调函数 获取具体文件
	const changeFiles = async (e) => {
		let inputDom = e.target;
		let files = inputDom.files;
		// 如果文件列表不存在,终止操作
		if (!files) {
			return;
		}
		// fileData获取到的文件
		const formdata = new window.FormData(); // 创建formdata对象 追加数据
		for (let i = 0; i < files.length; i++) {
			formdata.append('files', files[i]);
		}
		// 添加节点flie 内容为fileData
		// 然后调用上传方法将 formdata作为内容传输
		const res = await upload({
			method: "post",
			url: "/mgr/pcture-info/save",
			data: formdata,
		});

		if(res.code = "00000"){
			message("上传成功","success",2000);
			emit('getsuccess',true);
		}
	
	

	};
</script>

<style lang="scss" scoped>
	.showipt {
		display: none;
	}
</style>
