<template>
  <div class="box">
    <div class="fangkuai-box">
      <span class="fangkuai"></span><span class="title">栏目名称</span>
    </div>
    <div class="topbox">
      <div>
        <div class="a1box">
          <span class="a1">调整前:</span
          ><span>{{ partybranch.adjustBefore }}</span>
        </div>
        <div class="a2box">
          <span class="a2">调整后:</span>
          <el-input
            style="width: 2.5rem"
            v-model="partybranch.adjustAfter"
            class="w-50 m-2"
            size="large"
            placeholder="请输入信息"
          />
        </div>
      </div>
      <div>
        <div class="a3box">
          <span class="a3">调整前:</span
          ><span>{{ communistManifesto.adjustBefore }}</span>
        </div>
        <div class="a4box">
          <span class="a4">调整后:</span>
          <el-input
            style="width: 2.5rem"
            v-model="communistManifesto.adjustAfter"
            class="w-50 m-2"
            size="large"
            placeholder="请输入信息"
          />
        </div>
      </div>
      <div>
        <div class="a5box">
          <span class="a5">调整前:</span
          ><span>{{ publicity.adjustBefore }}</span>
        </div>
        <div class="a6box">
          <span class="a6">调整后:</span>
          <el-input
            style="width: 2.5rem"
            v-model="publicity.adjustAfter"
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
          <span class="a7">调整前:</span><span>{{ elegant.adjustBefore }}</span>
        </div>
        <div class="a8box">
          <span class="a8">调整后:</span>
          <el-input
            style="width: 2.5rem"
            v-model="elegant.adjustAfter"
            class="w-50 m-2"
            size="large"
            placeholder="请输入信息"
          />
        </div>
      </div>
    </div>
    <div class="btnBox">
      <el-button @click="reset" class="btn1" type="primary">重置</el-button>
      <el-button @click="saveinfo" class="btn2" type="primary" plain
        >保存</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { partybranchs, savepartybranchs } from "../api/columnoption.js";
import {message} from '../utils/message.js';
const partybranch = ref({}); // 党支部组织架构的值
const communistManifesto = ref({}); // 共产党责任区的值
const publicity = ref({}); //党支部宣传的值
const elegant = ref({}); // 党支部风采的值
const watchpartybranch = ref();
const watchcommunistManifesto = ref();
const watchpublicity = ref();
const watchelegant = ref();
const reset = () => {
  partybranch.value.adjustAfter = "";
  communistManifesto.value.adjustAfter = "";
  publicity.value.adjustAfter = "";
  elegant.value.adjustAfter = "";
};
onMounted(async () => {
  const res = await partybranchs({
    url: "/mgr/subject-info/2",
  });
  if (res) {
    partybranch.value = res.data[1];
    communistManifesto.value = res.data[3];
    publicity.value = res.data[0];
    elegant.value = res.data[2];
    watchpartybranch.value = partybranch.value.adjustAfter;
    watchcommunistManifesto.value = communistManifesto.value.adjustAfter;
    watchpublicity.value = publicity.value.adjustAfter;
    watchelegant.value = elegant.value.adjustAfter;
  }
});
const saveinfo = async() => {
  if (watchpartybranch.value != partybranch.value.adjustAfter) {
    const res1 = await savepartybranchs({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter: partybranch.value.adjustAfter,
        adjustBefore: watchpartybranch.value,
        id: partybranch.value.id,
        sortIndex: partybranch.value.sortIndex
      },
    });
       if (res1.message == "成功") {
      message("保存成功", "success", 1000);
    }
  }
  if (watchcommunistManifesto.value != communistManifesto.value.adjustAfter) {
        const res2 = savepartybranchs({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter: communistManifesto.value.adjustAfter,
        adjustBefore: watchcommunistManifesto.value,
        id: communistManifesto.value.id,
        sortIndex: communistManifesto.value.sortIndex
      },
    });
       if (res2.message == "成功") {
      message("保存成功", "success", 1000);
    }
  }
  if (watchpublicity.value != publicity.value.adjustAfter) {
      const res3 = savepartybranchs({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter: publicity.value.adjustAfter,
        adjustBefore: watchpublicity.value,
        id: publicity.value.id,
        sortIndex: publicity.value.sortIndex
      },
    });
       if (res3.message == "成功") {
      message("保存成功", "success", 1000);
    }
  }
  if (watchelegant.value != elegant.value.adjustAfter) {
          const res4 = savepartybranchs({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter: elegant.value.adjustAfter,
        adjustBefore: watchelegant.value,
        id: elegant.value.id,
        sortIndex: elegant.value.sortIndex
      },
    });
       if (res4.message == "成功") {
      message("保存成功", "success", 1000);
    }
  }
     const res2 = await partybranchs({
    url: "/mgr/subject-info/2",
  });
  if (res2) {
    partybranch.value = res2.data[1];
    communistManifesto.value = res2.data[3];
    publicity.value = res2.data[0];
    elegant.value = res2.data[2];
    watchpartybranch.value = partybranch.value.adjustAfter;
    watchcommunistManifesto.value = communistManifesto.value.adjustAfter;
    watchpublicity.value = publicity.value.adjustAfter;
    watchelegant.value = elegant.value.adjustAfter;
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