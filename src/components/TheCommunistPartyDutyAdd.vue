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
              style="width: 5.25rem; height: .5rem; margin-top: .125rem"
              v-model="dutyLeader"
              placeholder="输入内容"
			  clearable
            />
          </div>
        </div>
        <div class="centertop">
          <div>承包人 <span style="color: #ff3b30">*</span></div>
          <div>
            <el-input
              style="width: 5.25rem; height: .5rem; margin-top: .125rem"
              v-model="contract"
              placeholder="输入内容"
			  clearable
            />
          </div>
        </div>
        <div class="righttop">
          <div>责任人 <span style="color: #ff3b30">*</span></div>
          <div>
            <el-input
              style="width: 5.25rem; height: .5rem; margin-top: .125rem"
              v-model="dutyperson"
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
              style="width: 5.25rem; height: .5rem; margin-top: .125rem"
              v-model="dutyRange"
              placeholder="输入内容"
			  clearable
            />
          </div>
        </div>
        <div class="centertcenter">
          <div>承包期限 <span style="color: #ff3b30">*</span></div>
          <div>
            <el-input
              style="width: 5.25rem; height: .5rem; margin-top: .125rem"
              v-model="termcontract"
              placeholder="输入内容"
			  clearable
            />
          </div>
        </div>
        <div style="display: none;" class="centerright">
          <div>是否生效 <span style="color: #ff3b30">*</span></div>
          <div class="check">
            <el-radio-group v-model="radio1" class="ml-4">
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
              style="width: 7.25rem; margin-top: .125rem"
              v-model="textarea1"
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
              style="width: 7.25rem; margin-top: .125rem"
              v-model="textarea2"
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
         <el-button class="btn2" type="primary" plain @click="reset">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {message} from '../utils/message.js';
import {adddata} from '../api/partymemberduty.js';
import { ref } from "vue";
const emit = defineEmits(["changeshowAdd","changetableData"]);
const dutyLeader = ref(""); // 责任领导的值
const contract = ref(""); // 承包人的值
const dutyperson = ref(""); // 责任人的值
const dutyRange = ref(''); // 责任范围的值
const termcontract =  ref(''); // 承包期限的值
const radio1 = ref("1"); // 单选框
const textarea1 = ref(""); // 基本责任文本框
const textarea2 = ref(""); // 关键责任文本框
// 重置
const reset = ()=>{
dutyLeader.value = '';
contract.value = '';
dutyperson.value = '';
dutyRange.value = '';
termcontract.value = '';
radio1.value = '';
textarea1.value = '';
textarea2.value = '';
}
// 提交
const submit = async()=>{
if(dutyLeader.value == ''){
message("责任领导为必填选项",'warning');
return
}
if(contract.value == ''){
message("承包人为必填选项",'warning');
return
}
if(dutyperson.value == ''){
message("责任人为必填选项",'warning');
return
}
if(dutyRange.value == ''){
message("责任范围为必填选项",'warning');
return
}
if(termcontract.value == ''){
message("承包期限为必填选项",'warning');
return
}
if(radio1.value == ''){
message("是否生效为必填选项",'warning');
return
}
if(textarea1.value == ''){
message("基本责任为必填选项",'warning');
return
}
if(textarea2.value == ''){
message("关键责任为必填选项",'warning');
return
}
// 上传状态处理
radio1.value = radio1.value == "1"? "1":"0";
const res = await adddata({
	method:'post',
	url:'/mgr/member-responsibility/add',
	data:{
		basicResponsibility: textarea1.value, // 基本责任
			contractPeriod: termcontract.value, // 承包期限
			contractor: contract.value, // 承包人
			id: "",
			keyResponsibility: textarea2.value, // 关键责任
			liableLeader: dutyLeader.value, // 责任领导
			liablePerson: dutyperson.value, // 责任人
			liableScope: dutyRange.value, // 责任范围
			status: radio1.value // 状态(0:未生效;1:失效;9:删除)
	}
})
if(res.message == "成功"){
	message("提交成功","success",1000);
	emit('changeshowAdd',false,true);
	emit('changetableData',true);
}


 }
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
  height: .75rem;
  box-shadow: 1px 1px 3px #aaaaaa;
  padding: 0 .25rem;
  .titlename {
    font-size: .2rem;
    font-weight: bold;
  }
  .option {
    color: #ff3b30;
  }
}
.main {
  width: 18.25rem;
  min-height:8rem;
  background-color: #fff;
  margin-top: 1px;
  .fangkuai-box {
    padding-top: .5rem;
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
      margin-left: .075rem;
      font-size: 0.175rem;
      letter-spacing: normal;
      color: #666666;
      font-weight: 700;
      font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
    }
  }
  .topbox {
    margin-top: .5rem;
    display: flex;
    .lefttop {
      margin: 0 .625rem;
    }
    .centertop {
      margin-right: .625rem;
    }
  }
  .centerbox {
    margin-top: .5rem;
    display: flex;
    .leftcenter {
      margin: 0 .625rem;
    }
    .centertcenter {
      margin-right: .625rem;
    }
    .centerright {
      .check {
        margin-top: .125rem;
      }
    }
  }
  .bootoombox {
    display: flex;
    margin-top: .5rem;
    padding-left: .625rem;
    .leftBootom {
      margin-right: 2.5rem;
    }
  }
  .btnbox{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .5rem;
    .btn1{
      width: 1.6rem;
      height: .5rem;
    }
       .btn2{
      width: 1.6rem;
      height: .5rem;
    }
  }
}
</style>