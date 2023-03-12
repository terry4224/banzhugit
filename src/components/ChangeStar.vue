<template>
	<div class="app">
		<el-dialog v-model="showstar" title="设置星级党员" width="40%" @close="close" :close-on-click-modal="false">
			<div class="box">
				<div class="left"> <span class="s1">*</span><span class="s2">已选员工:</span></div>
				<div class="right">
					<div class="content" v-for="(item,index) in senddata" :key="index">

						<div>
							<i class="fa fa-user-circle" aria-hidden="true"></i>
							<span>{{item.name}}</span> <span class="zuzhi">{{item.departmentId}}</span>
						</div>
						<div> <i @click="deletes(index)" class="fa fa-minus-square" aria-hidden="true"></i></div>
					</div>
				</div>
			</div>
			<div class="select">
				<div class="l1"> <span class="d1">*</span><span class="d2">星级称号:</span></div>
				<el-input v-model="starvalue" style="width:6.025rem" placeholder="输入内容" clearable />
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button style="width:1rem" @click="cancel">取消</el-button>
					<el-button style="width:1rem" type="primary" @click="save">
						保存
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>

</template>

<script setup>
	import {
		ref,
		computed,
		watchEffect
	} from "vue";
	import {
		message
	} from '../utils/message.js';
	import {changeuserinfor} from '../api/personmagent.js';
	const emit = defineEmits(["getstar"]);
	// 接收父组件数据  控制对话框显示与否
	const props = defineProps({
		showstar: {
			type: Boolean,
		},
		senddata: {
			type: Array
		}
	})
	const showstar = ref(); // 定义父传递的显示与否
	const senddata = ref(); //定义父传递的数据
	watchEffect(() => {
		// watchEffect才可以在父组件中实时传递数据
		showstar.value = props.showstar;
		senddata.value = props.senddata;
	});
	// 删除事件
	const deletes = (index) => {
		if (senddata.value.length == 1) {
			message("至少保留一项,不可删除此项", "warning");
			return
		}
		senddata.value.splice(index, 1); // 删除选项
	}
	// 关闭按钮事件
	const close = () => {
		emit("getstar",false)
	}
	// 保存事件
	const starvalue = ref(''); // 定义星级称号的值
	const stater = ref(); // 显示与不显示
	const save = async() => {
		if (starvalue.value == '') {
			message("星级称号为必填选项", "warning")
			return;
		}
		const idarr = ref([]);// 人员ID
		idarr.value = senddata.value.map(item=>{
			return item.id
		})
		const res = await changeuserinfor({
			method:'post',
			url:'/mgr/employee-info/employee/updateParamByIds',
			data:{
				ids:idarr.value,
				starPartyMember:starvalue.value
			}
		})
		if(res.message == '成功'){
			message("修改成功","success",1000);
			emit("getstar", false,8); // 回传显示与否
		}
		return
		
	}
	// 选择状态事件
	const handlestate1 = () => {
		stater.value = "显示";
	}
	const handlestate2 = () => {
		stater.value = "不显示";
	}
	// 取消事件
	const cancel = () => {
		emit("getstar", false)
	}
</script>
<style lang="scss" scoped>
	.app {
		.box {
			display: flex;
			align-items: center;

			.left {
				.s1 {
					color: #ff4a40;
				}

				.s2 {
					margin-left: 0.05rem;
				}
			}

			.right {
				.content {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-left: .125rem;
					width: 6rem;
					height: .5rem;
					border: 1px solid #eee;

					.fa-user-circle {
						color: #cccccc;
						font-size: .25rem;
						margin: 0 .125rem;
					}

					.fa-minus-square {
						color: #cccccc;
						font-size: .2rem;
						margin-right: .375rem;
					}

					.zuzhi {
						color: #999999;
						margin-left: .125rem;
						margin-right: 0.88rem;
					}
				}
			}
		}

		.select {
			display: flex;
			margin-top: .25rem;
			align-items: center;

			.l1 {
				margin-right: .125rem;

				.d1 {
					color: #ff4a40;
				}

				.d2 {
					margin-left: 0.05rem;
				}
			}
		}

		:deep(.el-dialog__body) {
			padding-left: .625rem;
			border-bottom: 2px solid #eee;
			min-height: 3.5rem;
		}

		:deep(.el-select .el-input__wrapper) {
			width: 4.75rem;
			height: .5rem;
		}

		:deep(.el-textarea__inner) {
			height: 1.25rem;
		}

		:deep(.el-dialog__header) {
			padding: var(--el-dialog-padding-primary);
			padding-bottom: 0.125rem;
			margin-right: 0;
			word-break: break-all;
			background-color: #eee;
		}

		:deep(.el-dialog__title) {
			font-weight: bolder;
		}

		:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
			width: var(--el-date-editor-width);
			height: var(--el-input-height, var(--el-component-size));
			width: 4.84rem;
		}

		:deep(.el-dialog__footer) {
			text-align: right;
			margin-top: .125rem;
		}
	}
</style>
