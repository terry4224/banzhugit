<template>
  <div>
    <div class="titlebox">
      <div class="titlename">页面栏目配置</div>
      <div><span class="option">*</span>为必填项目</div>
    </div>
    <div class="main">
      <div class="fangkuai-box">
        <span class="fangkuai"></span><span class="title">责任信息</span>
      </div>
      <div class="topbox">
        <div class="lefttop">
          <div>责任领导 <span style="color: #ff3b30">*</span></div>
          <div>
            <el-input
              style="width: 5.25rem; height: 0.5rem; margin-top: 0.125rem"
              v-model="changecontent.liableLeader"
              placeholder="输入内容"
			  clearable
            />
          </div>
        </div>
        <div class="centertop">
          <div>承包人 <span style="color: #ff3b30">*</span></div>
          <div>
            <el-input
              style="width: 5.25rem; height: 0.5rem; margin-top: 0.125rem"
              v-model="changecontent.contractor"
              placeholder="输入内容"
			  clearable
            />
          </div>
        </div>
        <div class="righttop">
          <div>责任人 <span style="color: #ff3b30">*</span></div>
          <div>
            <el-input
              style="width: 5.25rem; height: 0.5rem; margin-top: 0.125rem"
              v-model="changecontent.liablePerson"
              placeholder="输入内容"
			  clearable
            />
          </div>
        </div>
      </div>
      <div class="centerbox">
        <div class="leftcenter">
          <div>责任范围 <span style="color: #ff3b30">*</span></div>
          <div>
            <el-input
              style="width: 5.25rem; height: 0.5rem; margin-top: 0.125rem"
              v-model="changecontent.liableScope"
              placeholder="输入内容"
			  clearable
            />
          </div>
        </div>
        <div class="centertcenter">
          <div>承包期限 <span style="color: #ff3b30">*</span></div>
          <div>
            <el-input
              style="width: 5.25rem; height: 0.5rem; margin-top: 0.125rem"
              v-model="changecontent.contractPeriod"
              placeholder="输入内容"
			  clearable
            />
          </div>
        </div>
        <div class="centerright">
          <div>是否生效 <span style="color: #ff3b30">*</span></div>
          <div class="check">
            <el-radio-group v-model="changecontent.status" class="ml-4">
              <el-radio label="1" size="large">生效</el-radio>
              <el-radio label="0" size="large">不生效</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="bootoombox">
        <div class="leftBootom">
          <div>基本责任<span style="color: #ff3b30">*</span></div>
          <div>
            <el-input
              style="width: 7.25rem; margin-top: 0.125rem"
              v-model="changecontent.basicResponsibility"
              maxlength="100"
              placeholder="输入内容"
              show-word-limit
              type="textarea"
			  clearable
            />
          </div>
        </div>
        <div class="rightBootom">
          <div>关键责任<span style="color: #ff3b30">*</span></div>
          <div>
            <el-input
              style="width: 7.25rem; margin-top: 0.125rem"
              v-model="changecontent.keyResponsibility"
              maxlength="100"
              placeholder="输入内容"
              show-word-limit
              type="textarea"
			  clearable
            />
          </div>
        </div>
      </div>
      <div class="btnbox">
        <el-button class="btn1" type="primary" @click="submit">提交</el-button>
        <el-button class="btn2" type="primary" plain @click="reset"
          >重置</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { message } from "../utils/message.js";
import {changedata} from '../api/partymemberduty.js';
import { ref, watchEffect } from "vue";
const props = defineProps({
  changecontent: {
    type: Object,
  },
});
const changecontent = ref("");
console.log(props.changecontent);
watchEffect(() => {
  // watchEffect才可以在父组件中实时传递数据
  changecontent.value = props.changecontent;
});
const emit = defineEmits(["changetableData2"]);
const dutyLeader = ref(""); // 责任领导的值
const contract = ref(""); // 承包人的值
const dutyperson = ref(""); // 责任人的值
const dutyRange = ref(""); // 责任范围的值
const termcontract = ref(""); // 承包期限的值
const radio1 = ref("1"); // 单选框
const textarea1 = ref(""); // 基本责任文本框
const textarea2 = ref(""); // 关键责任文本框
// 重置
const reset = () => {
  emit("changetableData2");
};
// 提交
const submit = async() => {
  if (changecontent.value.liableLeader == "") {
    message("责任领导为必填选项", "warning");
    return;
  }
  if (changecontent.value.contractor == "") {
    message("承包人为必填选项", "warning");
    return;
  }
  if (changecontent.value.liablePerson == "") {
    message("责任人为必填选项", "warning");
    return;
  }
  if (changecontent.value.liableScope == "") {
    message("责任范围为必填选项", "warning");
    return;
  }
  if (changecontent.value.contractPeriod == "") {
    message("承包期限为必填选项", "warning");
    return;
  }
  if (changecontent.value.status == "") {
    message("是否生效为必填选项", "warning");
    return;
  }
  if (changecontent.value.basicResponsibility == "") {
    message("基本责任为必填选项", "warning");
    return;
  }
  if (changecontent.value.keyResponsibility == "") {
    message("关键责任为必填选项", "warning");
    return;
  }
const res = await changedata({
	method:'post',
	url:'/mgr/member-responsibility/update',
	data:{
			basicResponsibility:changecontent.value.basicResponsibility, // 基本责任
			contractPeriod: changecontent.value.contractPeriod, // 承包期限
			contractor: changecontent.value.contractor, // 承包人
			id:changecontent.value.id, // 主键(新增时为null,更新时必填)
			keyResponsibility: changecontent.value.keyResponsibility, // 关键责任
			liableLeader: changecontent.value.liableLeader, // 责任领导
			liablePerson:changecontent.value.contractor, // 责任人
			liableScope: changecontent.value.liableScope, // 责任范围
			status: changecontent.value.status // 状态(0:未生效;1:生效;9:删除)
	}
})
if(res.message == "成功"){
	message("修改成功","success",1000);
	emit("changetableData2", true,false);
}
  
};
</script>

<style lang="scss" scoped>
:deep(.el-textarea__inner) {
  height: 1.875rem;
}
.titlebox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 17.75rem;
  height: 0.75rem;
  box-shadow: 1px 1px 3px #aaaaaa;
  padding: 0 0.25rem;
  .titlename {
    font-size: 0.2rem;
    font-weight: bold;
  }
  .option {
    color: #ff3b30;
  }
}
.main {
  width: 18.25rem;
  min-height: 8rem;
  background-color: #fff;
  margin-top: 1px;
  .fangkuai-box {
    padding-top: 0.5rem;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    .fangkuai {
      width: 0.075rem;
      height: 0.25rem;
      display: inline-block;
      background: #409eff;
    }
    .title {
      margin-left: 0.075rem;
      font-size: 0.175rem;
      letter-spacing: normal;
      color: #666666;
      font-weight: 700;
      font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
    }
  }
  .topbox {
    margin-top: 0.5rem;
    display: flex;
    .lefttop {
      margin: 0 0.625rem;
    }
    .centertop {
      margin-right: 0.625rem;
    }
  }
  .centerbox {
    margin-top: 0.5rem;
    display: flex;
    .leftcenter {
      margin: 0 0.625rem;
    }
    .centertcenter {
      margin-right: 0.625rem;
    }
    .centerright {
      .check {
        margin-top: 0.125rem;
      }
    }
  }
  .bootoombox {
    display: flex;
    margin-top: 0.5rem;
    padding-left: 0.625rem;
    .leftBootom {
      margin-right: 2.5rem;
    }
  }
  .btnbox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    .btn1 {
      width: 1.6rem;
      height: 0.5rem;
    }
    .btn2 {
      width: 1.6rem;
      height: 0.5rem;
    }
  }
}
</style>