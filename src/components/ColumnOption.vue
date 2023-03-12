<template>
  <div class="box">
    <div class="fangkuai-box">
      <span class="fangkuai"></span><span class="title">栏目名称</span>
    </div>
    <div class="topbox">
      <div>
        <div class="a1box">
          <span class="a1">调整前:</span
          ><span>{{ centerBrief.adjustBefore }}</span>
        </div>
        <div class="a2box">
          <span class="a2">调整后:</span>
          <el-input
            clearable
            style="width: 2.5rem"
            v-model="centerBrief.adjustAfter"
            class="w-50 m-2"
            size="large"
            placeholder="请输入信息"
          />
        </div>
      </div>
      <div>
        <div class="a3box">
          <span class="a3">调整前:</span
          ><span>{{ centeFramework.adjustBefore }}</span>
        </div>
        <div class="a4box">
          <span class="a4">调整后:</span>
          <el-input
            clearable
            style="width: 2.5rem"
            v-model="centeFramework.adjustAfter"
            class="w-50 m-2"
            size="large"
            placeholder="请输入信息"
          />
        </div>
      </div>
      <div>
        <div class="a5box">
          <span class="a5">调整前:</span
          ><span>{{ studyField.adjustBefore }}</span>
        </div>
        <div class="a6box">
          <span class="a6">调整后:</span>
          <el-input
            clearable
            style="width: 2.5rem"
            v-model="studyField.adjustAfter"
            class="w-50 m-2"
            size="large"
            placeholder="请输入信息"
          />
        </div>
      </div>
    </div>
    <div class="bootomBox">
      <div>
        <div class="a7box">
          <span class="a7">调整前:</span
          ><span>{{ performance.adjustBefore }}</span>
        </div>
        <div class="a8box">
          <span class="a8">调整后:</span>
          <el-input
            clearable
            style="width: 2.5rem"
            v-model="performance.adjustAfter"
            class="w-50 m-2"
            size="large"
            placeholder="请输入信息"
          />
        </div>
      </div>
      <div>
        <div class="a9box">
          <span class="a9">调整前:</span
          ><span>{{ centersport.adjustBefore }}</span>
        </div>
        <div class="a10box">
          <span class="a10">调整后:</span>
          <el-input
            clearable
            style="width: 2.5rem"
            v-model="centersport.adjustAfter"
            class="w-50 m-2"
            size="large"
            placeholder="请输入信息"
          />
        </div>
      </div>
    </div>
    <div class="btnBox">
      <el-button @click="reset" class="btn1" type="primary">重置</el-button>
      <el-button @click="savedata" class="btn2" type="primary" plain
        >保存</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { centbrefer, save } from "../api/columnoption.js";
import { message } from "../utils/message.js";
const centerBrief = ref({}); // 中心简介的值
const centeFramework = ref({}); // 中心架构的值
const studyField = ref({}); // 学习园地的值
const performance = ref({}); // 绩效公示的值
const centersport = ref({}); // 中心活动的值
const watchcenterBrief = ref(); // 监听中心简介的值
const watchcenteFramework = ref(); // 监听中心架构的值
const watchstudyField = ref(); // 监听学习园地的值
const watperformance = ref(); // 监听绩效公示的值
const watchcentersport = ref(); // 监听中心活动的值
const reset = () => {
  centerBrief.value.adjustAfter = "";
  centeFramework.value.adjustAfter = "";
  studyField.value.adjustAfter = "";
  performance.value.adjustAfter = "";
  centersport.value.adjustAfter = "";
};
onMounted(async () => {
  const res = await centbrefer({
    url: "/mgr/subject-info/1",
  });
  if (res) {
    centerBrief.value = res.data[0];
    centeFramework.value = res.data[1];
    studyField.value = res.data[2];
    performance.value = res.data[3];
    centersport.value = res.data[4];
    watchcenterBrief.value = centerBrief.value.adjustAfter;
    watchcenteFramework.value = centeFramework.value.adjustAfter;
    watchstudyField.value = studyField.value.adjustAfter;
    watperformance.value = performance.value.adjustAfter;
      watchcentersport.value = centersport.value.adjustAfter;
  }
});
const savedata = async () => {
  if (watchcenterBrief.value != centerBrief.value.adjustAfter) {
    const res1 = await save({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter: centerBrief.value.adjustAfter,
        adjustBefore:  watchcenterBrief.value,
        id: centerBrief.value.id,
        sortIndex: centerBrief.value.sortIndex,
      },
    });
    if (res1.message == "成功") {
      message("保存成功", "success", 1000);
    }
  }
  if (watchcenteFramework.value != centeFramework.value.adjustAfter) {
    const res2 = await save({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter: centeFramework.value.adjustAfter,
        adjustBefore: watchcenteFramework.value,
        id: centeFramework.value.id,
        sortIndex: centeFramework.value.sortIndex,
      },
    });
    if (res2.message == "成功") {
      message("保存成功", "success", 1000);
    }
  }
  if (watchstudyField.value != studyField.value.adjustAfter) {
    const res3 = await save({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter: studyField.value.adjustAfter,
        adjustBefore: watchstudyField.value,
        id: studyField.value.id,
        sortIndex: studyField.value.sortIndex,
      },
    });
    if (res3.message == "成功") {
      message("保存成功", "success", 1000);
    }
  }
  if (watperformance.value != performance.value.adjustAfter) {
    const res4 = await save({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter: performance.value.adjustAfter,
        adjustBefore: watperformance.value,
        id: performance.value.id,
        sortIndex: performance.value.sortIndex,
      },
    });
    if (res4.message == "成功") {
      message("保存成功", "success", 1000);
    }
  }
  if (watchcentersport.value != centersport.value.adjustAfter) {
    const res5 = await save({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter: centersport.value.adjustAfter,
        adjustBefore: watchcentersport.value,
        id: centersport.value.id,
        sortIndex: centersport.value.sortIndex,
      },
    });
    if (res5.message == "成功") {
      message("保存成功", "success", 1000);
    }
  }
   const res2 = await centbrefer({
    url: "/mgr/subject-info/1",
  });
  if (res2) {
    centerBrief.value = res2.data[0];
    centeFramework.value = res2.data[1];
    studyField.value = res2.data[2];
    performance.value = res2.data[3];
    centersport.value = res2.data[4];
    watchcenterBrief.value = centerBrief.value.adjustAfter;
    watchcenteFramework.value = centeFramework.value.adjustAfter;
    watchstudyField.value = studyField.value.adjustAfter;
    watperformance.value = performance.value.adjustAfter;
      watchcentersport.value = centersport.value.adjustAfter;
  }

};
</script>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
  margin: 0 !important;
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
  background: #00bfbf;
  color: #fff;
}
:deep(.demo-tabs) {
  width: 12rem;
}

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
  .bootomBox {
    display: flex;
    margin-top: 1rem;
    margin-left: 0.375rem;
    .a7box {
      .a7 {
        margin-right: 0.125rem;
      }
    }
    .a8box {
      margin-top: 0.125rem;
      .a8 {
        margin-right: 0.125rem;
        color: #e4551b;
      }
    }
    .a9box {
      .a9 {
        margin-right: 0.125rem;
        margin-left: 0.825rem;
      }
    }
    .a10box {
      margin-top: 0.125rem;
      .a10 {
        margin-right: 0.125rem;
        margin-left: 0.825rem;
        color: #e4551b;
      }
    }
  }
  .btnBox {
    width: 12rem;
    display: flex;
    justify-content: center;
    margin-top: 1.15rem;
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