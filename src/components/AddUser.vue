<template>
	<div class="box">
		<el-dialog v-model="show" title="新增员工" width="40%" show-close @close="close">
			<div class="blueBox">
				<span class="blue"></span> <span>基本信息</span>
			</div>
			<div class="imger"></div>
			<el-upload class="avatar-uploader"
				 :show-file-list="false"
				:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :auto-upload="false"
				:on-change="changFile" accept="image/jpeg,image/jpg,image/png">
				<el-button type="success" class="upload">上传头像</el-button>
			</el-upload>
			<el-image class="image" :preview-src-list="srcList" :initial-index="0"
				:src="base64" fit="fill" />
			<!-- 表单 -->
			<el-form ref="ruleFormRef" status-icon :rules="rules" :model="form" label-width=".9rem">
				<div style="width: 5.75rem; overflow: hidden">
					<el-form-item label="姓名:" prop="name">
						<el-input clearable v-model="form.name" autocomplete="off" placeholder="输入内容" />
					</el-form-item>
				</div>
				<div style="width: 5.75rem; overflow: hidden">
					<el-form-item label="所属组织:">
						<el-select clearable style="width: 7.5rem" v-model="form.organization" class="m-2"
							placeholder="选择组织" size="large">
							<template #default={row}>
								<el-option @click="clickrow(item.id)" v-for="item in options" :key="item.value"
									:label="item.label" :value="item.value" />
							</template>
						</el-select>
					</el-form-item>
				</div>
				<div style="width: 5.75rem; overflow: hidden">
					<el-form-item label="党支部:" prop="partyBranch">
						<el-input clearable v-model="form.partyBranch" autocomplete="off" placeholder="输入内容" />
					</el-form-item>
				</div>
				<el-form-item label="出生日期:">
					<el-config-provider :locale="locale">
						<el-date-picker clearable v-model="value1" :locale="locale" placeholder="选择日期" type="date"
							format="YYYY/MM/DD" value-format="YYYY/MM/DD">
						</el-date-picker>
					</el-config-provider>
				</el-form-item>
				<div style="width: 5.75rem; overflow: hidden">
					<el-form-item label="政治面貌:" prop="politicsStatus">
						<el-input clearable v-model="form.politicsStatus" autocomplete="off" placeholder="输入内容" />
					</el-form-item>
				</div>
				<el-form-item label="入党日期:">
					<el-config-provider :locale="locale">
						<el-date-picker clearable placeholder="选择日期" v-model="value2" type="date" format="YYYY/MM/DD"
							value-format="YYYY/MM/DD">
						</el-date-picker>
					</el-config-provider>
				</el-form-item>
				<div style="width: 5.75rem; overflow: hidden">
					<el-form-item label="星级党员:" prop="starParty">
						<el-input clearable v-model="form.starParty" autocomplete="off" placeholder="输入内容" />
					</el-form-item>
				</div>
				<el-form-item label="性别:">
					<el-radio-group v-model="radio">
						<el-radio style="margin-right:.1rem" label="1" size="large" border>
							男性<i class="fa fa-mars" /></el-radio>
						<el-radio label="0" size="large" border>女性<i class="fa fa-venus" /></el-radio>
					</el-radio-group>
					<span style="margin:0 .125rem">显示:</span>
					<el-radio-group v-model="radio2">
						<el-radio style="margin-right:.1rem" label="1" size="large" border>
							显示</el-radio>
						<el-radio label="0" size="large" border>不显示
						</el-radio>
					</el-radio-group>
				</el-form-item>
				<div style="width: 5.75rem; overflow: hidden">
					<el-form-item label="个人简介:">
						<el-input v-model="textarea" maxlength="100" placeholder="输入内容" show-word-limit
							type="textarea" />
					</el-form-item>
				</div>
			</el-form>
			<!-- end表单 -->
			<template #footer>
				<el-button class="submit" @click="sure" type="primary" style="margin-right: 0.25rem">提交</el-button>
				<el-button class="reset" type="primary" plain @click="reset">
					重置
				</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
	import {
		computed,
		ref,
		watchEffect,
		onMounted
	} from "vue";
	import {
		adduserinfor,
		belongorganization,
		bas64imgrur
	} from '../api/personmagent.js';
	import zhCn from "element-plus/lib/locale/lang/zh-cn";
	// 引入消息提示
	import {
		message
	} from "../utils/message.js";
	// 引入转换base64
	import {
		getBase64
	} from "../utils/toBase64.js";
	import store from "../store/index";
		const emit = defineEmits(["getadduser2"]);
	onMounted(async () => {
		const res = await belongorganization({
			url: '/mgr/department-info/department/findAllAndEmployee'
		})
		if (res.message == "成功") {
			for (let i = 0; i < res.data.length; i++) {
				options.value.push({
					value: res.data[i].name,
					label: res.data[i].name,
					id: res.data[i].id,
				})
			}
		}
	})
	const props = defineProps({
		show: {
			type: Boolean
		},
	});
	const show = ref(false);
	watchEffect(() => {
		// watchEffect才可以在父组件中实时传递数据
		show.value = props.show;
	});
	const locale = ref(zhCn);
	const value1 = ref(""); //出生日期的值
	const value2 = ref(""); //入党日期的值
	const textarea = ref(""); // 文本输入框
	const radio = ref('1');
	const radio2 = ref('1');
	const options = ref([]); // 下拉框
	const asd = ref("");
	// 表单数据
	const form = ref({
		name: "",
		organization: "", // 所属组织
		partyBranch: "", // 党支部
		politicsStatus: "", // 政治面貌
		starParty: "", // 星级党员
	});
	const orginid = ref('');
	const clickrow = (row) => {
		orginid.value = row;
	}
	// 姓名验证
	const validateName = (rule, value, callback) => {
		if (value === "") {
			callback(new Error("此选项为必填选项"));
		} else {
			callback();
		}
	};
	// 党支部验证
	const validatePartyBranch = (rule, value, callback) => {
		if (value === "") {
			callback(new Error("此选项为必填选项"));
		} else {
			callback();
		}
	};
	// 政治面貌验证
	const validatePoliticsStatus = (rule, value, callback) => {
		if (value === "") {
			callback(new Error("此选项为必填选项"));
		} else {
			callback();
		}
	};
	// 星级党员
	const validateStarParty = (rule, value, callback) => {
		if (value === "") {
			callback(new Error("此选项为必填选项"));
		} else {
			callback();
		}
	};
	// 校验字段
	const rules = ref({
		name: [{
			validator: validateName,
			trigger: "blur"
		}], // 姓名
		partyBranch: [{
			validator: validatePartyBranch,
			trigger: "blur"
		}], // 党支部
		politicsStatus: [{
			validator: validatePoliticsStatus,
			trigger: "blur"
		}], // 政治面貌
		starParty: [{
			validator: validateStarParty,
			trigger: "blur"
		}], // 星级党员
	});
	// 图片相关
	const base64 = ref(bas64imgrur());
	const srcList = ref([
		"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
	]);
	const handleAvatarSuccess = () => {};
	const beforeAvatarUpload = () => {};
	// 文件改动处理
	const changFile = (file) => {
		if (!file) {
			return;
		}
		if (file.raw.size / 1024 > 500) {
			message("上传图片大小不能超过500kB", "warning");
			return;
		}
		getBase64(file).then((res) => {
			// 赋值base64 进行网络请求成功后 使用返回的base64 进行回填头像  上传失败给出相应提示
			base64.value = res;
		});
	};
	// end 图片相关
	// 提交
	const sure = async() => {
		if (form.value.organization == "") {
			message("所属组织为必填选项", "warning");
			return;
		} else if (form.value.partyBranch == "") {
			message("党支部为必填选项", "warning");
			return;
		} else if (value1.value == "") {
			message("出生日期为必填选项", "warning");
			return;
		} else if (form.value.politicsStatus == "") {
			message("政治面貌为必填选项", "warning");
			return;
		} else if (value2.value == "") {
			message("入党日期为必填选项", "warning");
			return;
		} else {
			// 提交数据
			const sortIndex = Math.round(Math.random()*100+900);
			const res = await adduserinfor({
				method: 'post',
				url: '/mgr/employee-info/employee/save',
				data: {
					birthday: value1.value, // 出生日期
					departmentId: orginid.value, // 所属组织部门id
					headerPic: base64.value,  // 头像文件base64字符串
					joinPartyDate: value2.value,  // 入党日期
					name: form.value.name, // 性名
					partyBranch: form.value.partyBranch, // 党支部
					personalProfile: textarea.value, // 个人简介
					politicalStatus: form.value.politicsStatus, // 政治面貌
					postJob: "", // 职务
					sex: radio.value, // 性别
					sortIndex, // 序号
					starPartyMember: form.value.starParty, // 星级党员
					status: radio2.value // 状态0-不显示；1-显示
				}
			})
			console.log(res)
			if(res.message == '成功'){
				message("提交成功","success",1000);
				emit("getadduser2",false,8);
			}
			
		}
	};
	// 重置
	const reset = () => {
		form.value.name = "";
		form.value.organization = "";
		form.value.partyBranch = "";
		value1.value = "";
		form.value.politicsStatus = "";
		value2.value = "";
		form.value.starParty = "";
		radio.value = "";
		textarea.value = "";
	};
	// 男性
	const man = () => {
		radio.value = 1;
	};
	// 女性
	const sex = () => {
		radio.value = 2;
	};
	// 关闭弹窗事件
	const close = () => {
		emit("getadduser2", false);
	}
</script>
<style lang="scss" scoped>
	.box {
		:deep(.el-textarea__inner) {
			height: 1.25rem;
		}

		:deep(.el-radio.is-bordered.el-radio--large) {
			width: 1rem;
			height: .4rem;
			margin: 0;
			/* padding: 0 19px 0 11px; */
			border-radius: var(--el-border-radius-base);
		}

		:deep(.el-dialog__header) {
			padding: var(--el-dialog-padding-primary);
			padding-bottom: 0.125rem;
			margin-right: 0;
			word-break: break-all;
			background-color: #eee;
		}

		:deep(.el-dialog__title) {
			font-weight: bold;
		}

		:deep(.el-dialog__body) {
			position: relative;

			.imger {
				position: absolute;
				background: url("../assets/imges/u5162.svg") no-repeat;
				background-size: cover;
				margin: 0.15rem;
				top: 0;
				right: 0;
				width: 2.2rem;
				height: 2.125rem;
			}

			.upload {
				position: absolute;
				top: 2.2875rem;
				right: 0.65rem;
				width: 1rem;
				height: 0.375rem;
			}

			.image {
				position: absolute;
				z-index: 10;
				width: 1.9rem;
				height: 1.825rem;
				top: 0.3rem;
				right: 0.3rem;
			}
		}

		:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
			width: var(--el-date-editor-width);
			height: var(--el-input-height, var(--el-component-size));
			width: 4.84rem;
		}

		:deep(.el-dialog__footer) {
			text-align: center;
		}

		.blueBox {
			display: flex;
			align-items: center;
			font-size: 0.2rem;
			font-weight: bold;
			margin-bottom: 0.125rem;

			.blue {
				width: 0.075rem;
				height: 0.25rem;
				display: inline-block;
				background: #409eff;
				margin-right: 0.05rem;
			}
		}

		.submit {
			width: 1.75rem;
		}

		.reset {
			width: 1.75rem;
		}

		.show {
			display: none;
		}
	}
</style>
