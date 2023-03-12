<template>
  <div class="box">
    <el-dialog
      v-model="showchanges"
      title="修改信息"
      width="40%"
      show-close
      @close="close"
    >
      <div class="blueBox">
        <span class="blue"></span> <span>基本信息</span>
      </div>
      <div class="imger"></div>
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
        :on-change="changFile"
        accept="image/jpeg,image/jpg,image/png"
      >
        <div class="upload"> <el-button type="primary">修改头像</el-button></div>
      </el-upload>
      <el-image
        class="image"
        :initial-index="0"
        :src="changeData[0].headerPic || base64"
        fit="fill"
      />
      <!-- 表单 -->
      <el-form
        ref="ruleFormRef"
        status-icon
        :model="form"
        label-width=".9rem"
      >
        <div style="width: 5.75rem; overflow: hidden">
          <el-form-item label="姓名:" prop="name">
            <el-input
              clearable
              v-model="changeData[0].name"
              autocomplete="off"
              placeholder="输入内容"
            />
          </el-form-item>
        </div>
        <div style="width: 5.75rem; overflow: hidden">
          <el-form-item label="所属组织:">
            <el-select
              clearable
              style="width: 7.5rem"
              v-model="changeData[0].organization"
              class="m-2"
              placeholder="选择组织"
              size="large"
            >
              <el-option @click="cilicitem(item.id)"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div style="width: 5.75rem; overflow: hidden">
          <el-form-item label="党支部:" prop="partyBranch">
            <el-input
              clearable
              v-model="changeData[0].partyBranch"
              autocomplete="off"
              placeholder="输入内容"
            />
          </el-form-item>
        </div>
        <el-form-item label="出生日期:">
          <el-config-provider :locale="locale">
            <el-date-picker
              clearable
              v-model="changeData[0].birthday"
              :locale="locale"
              placeholder="选择日期"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY/MM/DD"
            >
            </el-date-picker>
          </el-config-provider>
        </el-form-item>
        <div style="width: 5.75rem; overflow: hidden">
          <el-form-item label="政治面貌:" prop="politicalStatus">
            <el-input
              clearable
              v-model="changeData[0].politicalStatus"
              autocomplete="off"
              placeholder="输入内容"
            />
          </el-form-item>
        </div>
        <el-form-item label="入党日期:">
          <el-config-provider :locale="locale">
            <el-date-picker
              clearable
               v-model="changeData[0].gmtCreate"
              placeholder="选择日期"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY/MM/DD"
            >
            </el-date-picker>
          </el-config-provider>
        </el-form-item>
        <div style="width: 5.75rem; overflow: hidden">
          <el-form-item label="星级党员:" prop="starParty">
            <el-input
              clearable
              v-model="changeData[0].starPartyMember"
              autocomplete="off"
              placeholder="输入内容"
            />
          </el-form-item>
        </div>
        <el-form-item label="性别:">
          <el-radio-group v-model="changeData[0].sex">
            <el-radio
              style="margin-right: 0.1rem"
              label="1"
              size="large"
              border
            >
              男性<i class="fa fa-mars"
            /></el-radio>
            <el-radio label="0" size="large" border
              >女性<i class="fa fa-venus"
            /></el-radio>
          </el-radio-group>
          <span style="margin: 0 0.125rem">显示:</span>
          <el-radio-group v-model="changeData[0].status">
            <el-radio
              style="margin-right: 0.1rem"
              label="1"
              size="large"
              border
            >
              显示</el-radio
            >
            <el-radio label="0" size="large" border>不显示 </el-radio>
          </el-radio-group>
        </el-form-item>
        <div style="width: 5.75rem; overflow: hidden">
          <el-form-item label="个人简介:">
            <el-input
              v-model="changeData[0].personalProfile"
              maxlength="100"
              placeholder="输入内容"
              show-word-limit
              type="textarea"
            />
          </el-form-item>
        </div>
      </el-form>
      <!-- end表单 -->
      <template #footer>
        <el-button
          class="submit"
          @click="sure"
          type="primary"
          style="margin-right: 0.25rem"
          >提交</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script  setup>
import { computed, ref, watchEffect,onMounted } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
// 引入消息提示
import { message } from "../utils/message.js";
// 引入转换base64
import { getBase64 } from "../utils/toBase64.js";
import store from "../store/index";
import { Loading } from "element-plus/es/components/loading/src/service";
import {bas64imgrur,belongorganization,changeuser} from '../api/personmagent.js';
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
const emit = defineEmits(["getshowValue"]);
// 图片相关
const srcList = ref([]);
const base64 = ref("");
base64.value = bas64imgrur();
const radio = ref("1");
const radio2 = ref("1");
const changeData = ref([]);
const props = defineProps({
  changeData: {
    type: Array,
  },
  showchanges: {
    type: Boolean,
  },
});
const showchanges = ref();
watchEffect(() => {
  // watchEffect才可以在父组件中实时传递数据
  showchanges.value = props.showchanges;
  changeData.value = props.changeData;
});
// 数据处理
const locale = ref(zhCn);
const value1 = ref(""); //出生日期的值
const value2 = ref(""); //入党日期的值
const textarea = ref(""); // 文本输入框
const options = ref([]);
// 表单数据
const form = ref({
  name: "娃娃鱼",
  organization: "", // 所属组织
  partyBranch: "", // 党支部
  politicsStatus: "", // 政治面貌
  starParty: "", // 星级党员
});
const handleAvatarSuccess = () => {};
const beforeAvatarUpload = () => {};
// 点击下拉框
const idorigin = ref(''); // 所属组织ID
const cilicitem = (id)=>{
	idorigin.value = id;
}
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
	changeData.value[0].headerPic = res;
  });
};
// end 图片相关

// 提交
const sure = async() => {
		const sortIndex = Math.round(Math.random()*100+900);
	const res =  await changeuser({
		method:'post',
		url:'/mgr/employee-info/employee/updateById',
		data:{
				birthday: changeData.value[0].birthday, // 出生日期
				departmentId: idorigin.value == ''?  changeData.value[0].organization:idorigin.value, // 所属组织部门id
				headerPic:changeData.value[0].headerPic, // 头像文件id
				id: changeData.value[0].id, // 用户ID
				joinPartyDate: changeData.value[0].gmtCreate, // 入党日期
				name: changeData.value[0].name, // 姓名
				partyBranch: changeData.value[0].partyBranch, // 党支部
				personalProfile: changeData.value[0].personalProfile, // 个人介绍
				politicalStatus: changeData.value[0].politicalStatus, // 政治面貌
				postJob: "", // 职务
				sex: changeData.value[0].sex, // 性别 0女 1男
				sortIndex, // 序号
				starPartyMember: changeData.value[0].starPartyMember, // 星级党员
				status: changeData.value[0].status // 0不显示 1显示
		}
	})
	if(res.message == '成功'){
		message("修改成功","success",2000);
		emit("getshowValue", false,8);
	}
  }

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
  emit("getshowValue", false);
};
</script>
<style lang="scss" scoped>
.box {
  :deep(.el-textarea__inner) {
    height: 1.25rem;
  }
  :deep(.el-radio.is-bordered.el-radio--large) {
    width: 1rem;
    height: 0.4rem;
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
      font-size: 0.2rem;
      font-weight: bold;
      top: 2.2875rem;
      right: 0.75rem;
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
