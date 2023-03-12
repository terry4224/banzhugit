<template>
  <div>
    <div class="titlebox">
      <div class="card">
        工会通知 <span class="write" style="color: #ff3b30">*</span>为必填项
      </div>
    </div>
    <div class="noticeName">
      <span
        style="
          color: #ff3b30;
          font-weight: 700;
          font-style: normal;
          font-size: 0.3125rem;
          margin-left: 80px;
        "
        >*</span
      ><span class="ttile">通知标题:</span>
      <el-input
        class="titleinput"
        v-model="changeData.title"
        placeholder="请输入内容"
      />
    </div>
    <div class="box">
      <div class="text"><span style="color: #ff3b30">*</span>简介内容:</div>
      <div>
        <Toolbar
          style="width: 16.25rem; margin-top: 0.125rem"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          ref="editor"
          style="
            height: 5.5rem;
            width: 16.25rem;
            overflow-y: hidden;
            border: 1px solid #eee;
          "
          v-model="changeData.content"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
        />
        <div class="btnbox">
          <el-button @click="submit" class="btn1" type="primary"
            >提交</el-button
          >
          <el-button @click="reset" class="btn2" type="primary" plain
            >重置</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, watchEffect } from "vue";
import {message} from "../utils/message.js";
import {getappointlist,changesavebref} from '../api/unionnotice.js';
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { ElMessage } from "element-plus"; // 引入消息提示
const emit = defineEmits(["changeshowInfor"]);
const noticeName = ref(""); // 输入框的值
const changeId =  ref(""); // 修改的ID
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref(
  "数字业务服务中心(简称:业务中心)成立于2022年5月9日,是公司为进一步适应公司数字化发展，按照“信息通信分开、建运一体化运作”原则，整合公司人力资源，建立“专业、高效、规范”的业务流程而新成立的中心。主要负责公司范围内业务应用系统建设运维运营工作；负责全重庆公司信息系统客户应用服务，市公司范围桌面终端及无纸化会议服务；负责信通公司生产项目及项目组规范性管控等。"
);
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
// 重置
const reset = () => {
  valueHtml.value = "";
  noticeName.value = "";
};
const props = defineProps({
  changeData: {
    type: Object,
  },
});
const changeData = ref({});
watchEffect(() => {
  // watchEffect才可以在父组件中实时传递数据
  changeData.value = props.changeData;
});
const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const mode = ref("default");
const editor = ref();

// vuex

const submit = async() => {
  // 检验必填项是否为空
  if (changeData.value.title == "" || null) {
    ElMessage({
      message: "请填写通知标题",
      type: "warning",
    });
    return;
  }
  if (changeData.value.content.includes("br")) {
    ElMessage({
      message: "请填写简介内容",
      type: "warning",
    });
    return;
  }
  const startIndex = valueHtml.value.indexOf(">") + 1; //截取起点索引
  const endIndex = valueHtml.value.indexOf("/") - 1; // 截取重点索引
  // console.log(valueHtml.value.slice(startIndex, endIndex)); // 截取后的值
  const result = await changesavebref({
	  method:'post',
	  url:'/mgr/cms-info/union/updateById',
	  data:{
		  content:changeData.value.content,
		  id:changeData.value.id,
		  title:changeData.value.title
	  }
  })
  if(result.code == "00000"){
	  message("修改成功","success",1000)
  }
  emit("changeshowInfor", false, true,changeData.value);
};
</script>

<style lang="scss" scoped>
.titlebox {
  width: 20rem;
  display: flex;
  align-items: center;
  .card {
    height: 0.75rem;
    line-height: 0.75rem;
    width: 19.75rem;
    background-color: #f9f9f9;
    font-weight: 700;
    font-style: normal;
    font-size: 25px;
    padding-left: 0.25rem;
    color: #666666;
  }
  .write {
    margin-left: 16.75rem;
  }
}
.noticeName {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 1600px;
  display: flex;
  align-items: center;
  background-color: #fff;
  .ttile {
    font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑;
    font-weight: 700;
    font-style: normal;
    font-size: 25px;
    margin-right: 20px;
  }
  .titleinput {
    width: 778px;
    height: 50px;
  }
}
.box {
  display: flex;
  width: 20rem;
  height: 12rem;
  background: #fff;
  overflow: hidden;
  .btnbox {
    width: 16.25rem;
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
    .btn1 {
      width: 1.5rem;
      margin-right: 0.125rem;
    }
    .btn2 {
      width: 1.5rem;
    }
  }
  .text {
    margin-top: 3rem;
    margin-left: 0.95rem;
    margin-right: 0.25rem;
    font-weight: 700;
    font-style: normal;
    font-size: 0.3125rem;
  }
}
:deep(.w-e-bar) {
  border: 1px solid #eee;
}
:deep(w-e-text-container [data-slate-editor]) {
  border: 2px solid #eee;
  border-top: 0;
}
</style>
