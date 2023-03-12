<template>
  <div>
    <div class="card">中心简介</div>
    <div class="box" style="border: 1px solid #ccc">
      <div class="text"><span style="color: #ff3b30">*</span>简介内容:</div>
      <div>
        <Toolbar
          style="
            border-bottom: 1px solid #ccc;
            width: 16.25rem;
            margin-top: 0.125rem;
          "
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 5.5rem; width: 16.25rem; overflow-y: hidden"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
        />
        <div class="btnbox">
          <el-button :disabled="disabled" class="btn1" type="primary" @click="submit"
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
import { saveData } from "../api/centerbrief.js"; // 引入提交接口
import { getBref } from "../api/centerbrief.js"; // 引入获取简介内容接口
import { onBeforeUnmount, ref, shallowRef, onMounted} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { message } from "../utils/message.js";
const editorRef = shallowRef();
const disabled =  ref(false); // 是否禁用按钮
// 简介内容 HTML
const valueHtml = ref();
onMounted(async () => {
  // 获取简介内容
  const dd = await getBref({
    url:'/mgr/cms-info/center'
  })
  valueHtml.value = dd.content;
});
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
};
// 提交
const submit =async () => {
  const startIndex = valueHtml.value.indexOf(">") + 1; //截取起点索引
  const endIndex = valueHtml.value.indexOf("/") - 1; // 截取重点索引
valueHtml.value = valueHtml.value.slice(startIndex, endIndex); // 截取后的简介内容
const breftiitle =ref(valueHtml.value.slice(0,6));  // 截取后的标题名称
if(valueHtml.value == '<br>'){
  message("简介内容不能为空","warning")
  return;
}
disabled.value = true;
  let res = await saveData({
    method: "post",
    url: "/mgr/cms-info/center/save",
    data: {
      content: valueHtml.value,
      title: breftiitle.value,
    },
  });
if(res.message = "成功"){
  message("提交成功","success");
  disabled.value = false;
}

};
const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const mode = ref("default");
</script>

<style lang="scss" scoped>
.card {
  height: 0.75rem;
  line-height: 0.75rem;
  width: 19.75rem;
  background-color: #f9f9f9;
  font-weight: 700;
  font-style: normal;
  font-size: 0.2rem;
  padding-left: 0.25rem;
  color: #666666;
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
  border: 1px solid #eee;
}
</style>