<template>
      <div class="box">
          <div class="fangkuai-box">
            <span class="fangkuai"></span><span class="title">栏目名称</span>
          </div>
          <div class="topbox">
            <div>
              <div class="a1box">
                <span class="a1">调整前:</span><span>{{businessCenter.adjustBefore}}</span>
              </div>
              <div class="a2box">
                <span class="a2">调整后:</span>
                <el-input
                  style="width: 2.5rem"
                  v-model="businessCenter.adjustAfter"
                  class="w-50 m-2"
                  size="large"
                  placeholder="请输入信息"
                />
              </div>
            </div>
            <div>
              <div class="a3box">
                <span class="a3">调整前:</span><span>{{notice.adjustBefore}}</span>
              </div>
              <div class="a4box">
                <span class="a4">调整后:</span>
                <el-input
                  style="width: 2.5rem"
                  v-model="notice.adjustAfter"
                  class="w-50 m-2"
                  size="large"
                  placeholder="请输入信息"
                />
              </div>
            </div>
            <div>
              <div class="a5box">
                <span class="a5">调整前:</span><span>{{runDetail.adjustBefore}}</span>
              </div>
              <div class="a6box">
                <span class="a6">调整后:</span>
                <el-input
                  style="width: 2.5rem"
                  v-model="runDetail.adjustAfter"
                  class="w-50 m-2"
                  size="large"
                  placeholder="请输入信息"
                />
              </div>
            </div>
          </div>
          <div class="btnBox">
            <el-button @click="reset" class="btn1" type="primary"
              >重置</el-button
            >
            <el-button @click="save" class="btn2" type="primary" plain>保存</el-button>
          </div>
        </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import {  projectManger,saveprojectManger} from '../api/columnoption.js';
import {message} from '../utils/message'
const businessCenter = ref({}); // 业务一览表的值
const notice = ref({}); // 项目里程碑提醒的值
const runDetail = ref({}); //项目里程碑执行情况的值
const watchbusinessCenter = ref();
const watchnotice = ref();
const watchrunDetail = ref();
const reset = () => {
  businessCenter.value.adjustAfter = "";
  notice.value.adjustAfter = "";
  runDetail.value.adjustAfter = "";
};
onMounted(async()=>{
  const res = await projectManger({
    url:'/mgr/subject-info/5'
  })
  if(res){
    businessCenter.value = res.data[2];
    notice.value = res.data[1];
    runDetail.value = res.data[0];
    watchbusinessCenter.value = businessCenter.value.adjustAfter;
    watchnotice.value = notice.value.adjustAfter;
    watchrunDetail.value = runDetail.value.adjustAfter;
  }
})
const save = async()=>{
  if(watchbusinessCenter.value != businessCenter.value.adjustAfter){
const res1 = await saveprojectManger({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter:businessCenter.value.adjustAfter,
        adjustBefore:watchbusinessCenter.value,
        id:businessCenter.value.id,
        sortIndex:businessCenter.value.sortIndex
      },
    });
    if(res1.message == "成功"){
      message("保存成功", "success", 1000);
    }
  }
  if(watchnotice.value != notice.value.adjustAfter){
const res2 = await saveprojectManger({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter:notice.value.adjustAfter,
        adjustBefore:watchnotice.value,
        id:notice.value.id,
        sortIndex:notice.value.sortIndex
      },
    });
    if(res2.message == "成功"){
      message("保存成功", "success", 1000);
    }
  }
  if(watchrunDetail.value != runDetail.value.adjustAfter){
const res3 = await saveprojectManger({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter:runDetail.value.adjustAfter,
        adjustBefore:watchrunDetail.value,
        id:runDetail.value.id,
        sortIndex:runDetail.value.sortIndex
      },
    });
    if(res3.message == "成功"){
      message("保存成功", "success", 1000);
    }
  }
   const res = await projectManger({
    url:'/mgr/subject-info/5'
  })
  if(res){
    businessCenter.value = res.data[2];
    notice.value = res.data[1];
    runDetail.value = res.data[0];
    watchbusinessCenter.value = businessCenter.value.adjustAfter;
    watchnotice.value = notice.value.adjustAfter;
    watchrunDetail.value = runDetail.value.adjustAfter;
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 12rem;
  height: 6rem;
  margin-top: 2px;
  background: #fff;
  border: 1px solid #eee;
  span {
    font-family: "微软雅黑";
    font-weight: 400;
    font-size: 0.175rem;
    color: #666666;
  }

  .fangkuai-box {
    margin-top: 0.25rem;
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
    justify-content: space-around;
    .a1box {
      .a1 {
        margin-right: 0.125rem;
      }
    }
    .a2box {
      margin-top: 0.125rem;
      .a2 {
        margin-right: 0.125rem;
        color: #e4551b;
      }
    }
    .a3box {
      .a3 {
        margin-right: 0.125rem;
      }
    }
    .a4box {
      margin-top: 0.125rem;
      .a4 {
        margin-right: 0.125rem;
        color: #e4551b;
      }
    }
    .a5box {
      .a5 {
        margin-right: 0.125rem;
      }
    }
    .a6box {
      margin-top: 0.125rem;
      .a6 {
        margin-right: 0.125rem;
        color: #e4551b;
      }
    }
  }
  .btnBox {
    width: 12rem;
    display: flex;
    justify-content: center;
      margin-top: 3.01rem;
    .btn1 {
      width: 1.5rem;
      margin-right: 0.125rem;
    }
    .btn2 {
      width: 1.5rem;
    }
  }
}
</style>