<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="changFile"
      accept=".xls, .xlsx"
    >
      <el-button type="primary" class="btnstyle"
        ><i class="fa fa-plus" aria-hidden="true"></i>数据导入</el-button
      >
    </el-upload>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { message } from "../utils/message.js";
import { importData } from "../api/projectmannet.js";
const changFile = async(file) => {
  // 如果文件列表不存在,终止操作
  if (!file.raw) {
    return;
  }
  //   if (file.rawsize > 1024 * 500) {
  //     message("上传文件不能超过500KB",'warning');
  //   return;
  // }
    // fileData获取到的文件
    const fileData = file.raw;
    const formdata = new window.FormData(); // 创建formdata对象
    formdata.append("file", fileData); // 添加节点flie 内容为fileData
    // 然后调用上传方法将 formdata作为内容传输
    const res = await importData({
      method: "post",
      url: "/mgr/project-milepost/upload",
      data: formdata,
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
    });
    console.log(res);
};


</script>

<style lang="scss" scoped>
.btnstyle {
	margin-left: 0.125rem;
  margin-right: 0.125rem;
}
</style>