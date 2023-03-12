<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="中心简介" name="0">
        <Coulunm></Coulunm>
      </el-tab-pane>
      <el-tab-pane label="党支部" name="1">
          <PartyBranch></PartyBranch>
      </el-tab-pane>
      <el-tab-pane label="工会" name="2">
     <LaborUnion></LaborUnion>
      </el-tab-pane>
      <el-tab-pane label="生产管控" name="3">
        <ProductContor></ProductContor>
      </el-tab-pane>
      <el-tab-pane label="项目管理" name="4">
        <ProjectMang></ProjectMang>
      </el-tab-pane>
      <el-tab-pane label="业务提醒" name="5">
        <BusinessReminder></BusinessReminder>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Coulunm from "../components/ColumnOption.vue"; // 中心简介
import PartyBranch from "../components/PartyBranch.vue"; // 党支部
import LaborUnion from "../components/LaborUnion.vue"; // 工会
import ProductContor from "../components/ProductionControl.vue";// 生产管控
import ProjectMang from "../components/ProjectManagement.vue";// 项目管理
import BusinessReminder from "../components/BusinessReminder.vue";// 业务提醒
const activeName = ref("0");

const handleClick = (a, b) => {
  
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
  .demo-tabs {
    width: 12rem;
  }


</style>