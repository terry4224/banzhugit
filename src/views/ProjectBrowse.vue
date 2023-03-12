<template>
  <div>
    <div class="box">
      <!-- <el-button class="import" type="primary">
        <i class="fa fa-plus" aria-hidden="true"></i>批量导入</el-button
      > -->
      <Batchlmport></Batchlmport>
      <el-button class="export" type="primary"
        ><i class="fa fa-download" aria-hidden="true"></i>导出数据</el-button
      >
      <el-input
      clearable
        style="width: 1.375rem"
        v-model="projectname"
        placeholder="项目名称"
      />
      <el-button
        class="search"
        style="width: 1.375rem"
        type="primary"
        @click="search"
      >
        <i class="fa fa-search"></i> 查询</el-button
      >
      <el-button style="width: 1.375rem" type="primary" plain @click="reset">
        <i class="fa fa-undo"></i> 重置</el-button
      >
    </div>

    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      style="width: 96%"
      @tab-click="handleClick"
    >
      <el-tab-pane label="数字化项目" name="0">
        <NumProject
          :labelname="labelname"
          :projectnames="projectnames"
        ></NumProject>
      </el-tab-pane>
      <el-tab-pane label="数字化专项" name="1">
        <NumSpecial
          :labelname2="labelname2"
          :projectnames2="projectnames2"
        ></NumSpecial>
      </el-tab-pane>
      <el-tab-pane label="三方运维" name="2">
        <TriparOpera
          :labelname3="labelname3"
          :projectnames3="projectnames3"
        ></TriparOpera>
      </el-tab-pane>
      <el-tab-pane label="成本专项" name="3">
        <CostSpecial
          :labelname4="labelname4"
          :projectnames4="projectnames4"
        ></CostSpecial>
      </el-tab-pane>
      <el-tab-pane label="大修" name="4">
        <BigRepair
           :labelname5="labelname5"
          :projectnames5="projectnames5"
        ></BigRepair>
      </el-tab-pane>
      <el-tab-pane label="小修" name="5">
        <SmallRepair
            :labelname6="labelname6"
          :projectnames6="projectnames6"
        ></SmallRepair>
      </el-tab-pane>
      <el-tab-pane label="营销成本" name="6">
        <MarkrtingCoast
                 :labelname7="labelname7"
          :projectnames7="projectnames7"
        ></MarkrtingCoast>
      </el-tab-pane>
      <el-tab-pane label="技改" name="7">
        <TechImprove
          :labelname8="labelname8"
          :projectnames8="projectnames8"
        ></TechImprove>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import NumProject from "../components/NumProject.vue"; // 引入数字化项目组件
import NumSpecial from "../components/NumSpecial.vue"; // 引入数字化专项组件
import TriparOpera from "../components/TripartiteOperation.vue"; // 引入三方运维组件
import CostSpecial from "../components/CostSpecial.vue"; // 引入成本专项组件
import BigRepair from "../components/BigRepair.vue"; // 引入大修组件
import SmallRepair from "../components/SmallRepair.vue"; // 引小修组件
import MarkrtingCoast from "../components/MarketingCoast.vue"; // 营销成本组件
import TechImprove from "../components/TechnicallyImprove.vue"; // 技改组件
import Batchlmport from "../components/BatchImport.vue" // 引入批量上传组件
import store from "../store/index.js";
import { ref, onMounted } from "vue";
const activeName = ref("0"); // 默认选中项
const clickname = ref(""); // 点击某一项名字赋值
const labelname = ref("16543"); // 数字化项目父传子 具体点击项
const projectname = ref(); // 选中的项目名称
const projectnames = ref(); // 数字化项目父传子 项目名称
const projectnames2 = ref();// 数字化专项父传子 项目名称
const labelname2 = ref("465"); // 数字化专项父传子 具体点击项
const projectnames3 = ref();// 三方运维父传子 项目名称
const labelname3 = ref("1256465"); // 三方运维父传子 具体点击项
const projectnames4 = ref();// 成本专项父传子 项目名称
const labelname4= ref("555"); // 成本专项父传子 具体点击项
const projectnames5 = ref();// 大修父传子 项目名称
const labelname5= ref("666"); // 大修父传子 具体点击项
const projectnames6 = ref();// 小修父传子 项目名称
const labelname6= ref("777"); // 小修父传子 具体点击项
const projectnames7 = ref();// 营销成本父传子 项目名称
const labelname7= ref("888"); // 营销成本父传子 具体点击项
const projectnames8 = ref();// 技改父传子 项目名称
const labelname8= ref("999"); // 技改父传子 具体点击项
const handleClick = (a) => {
  clickname.value = a.props.label;
  if (a.props.label == "数字化项目") {
    labelname.value = String(Math.random() * 1000); // 选中的label名赋值
    projectnames.value = ""; // 将传递的项目名称滞空
  }
  if (a.props.label == "数字化专项") {
    labelname2.value = String(Math.random() * 1000); // 选中的label名赋值
    projectnames2.value = ""; // 将传递的项目名称滞空
  }
  if (a.props.label == "三方运维") {
    labelname3.value = String(Math.random() * 1000); // 选中的label名赋值
    projectnames3.value = ""; // 将传递的项目名称滞空
  }
  if (a.props.label == "成本专项") {
    labelname4.value = String(Math.random() * 1000); // 选中的label名赋值
    projectnames4.value = ""; // 将传递的项目名称滞空
  }
  if (a.props.label == "大修") {
    labelname5.value = String(Math.random() * 1000); // 选中的label名赋值
    projectnames5.value = ""; // 将传递的项目名称滞空
  }
  if (a.props.label == "小修") {
    labelname6.value = String(Math.random() * 1000); // 选中的label名赋值
    projectnames6.value = ""; // 将传递的项目名称滞空
  }
  if (a.props.label == "营销成本") {
    labelname7.value = String(Math.random() * 1000); // 选中的label名赋值
    projectnames7.value = ""; // 将传递的项目名称滞空
  }
  if (a.props.label == "技改") {
    labelname8.value = String(Math.random() * 1000); // 选中的label名赋值
    projectnames8.value = ""; // 将传递的项目名称滞空
  }
};
// 重置
const reset = () => {
  projectname.value = "";
  store.commit("changeResh", false);
  store.commit("changeResh", true);
};
// 查询
const search = () => {
  if (projectname.value != "" && activeName.value == "0") {
    projectnames.value = projectname.value; // 父传子 项目名称
  }
  if (projectname.value != "" && clickname.value == "三方运维") {
    projectnames3.value = projectname.value; // 父传子 项目名称
  }
  if (projectname.value != "" && clickname.value == "数字化专项") {
    projectnames2.value = projectname.value; // 父传子 项目名称
  }
  if (projectname.value != "" && clickname.value == "成本专项") {
    projectnames4.value = projectname.value; // 父传子 项目名称
  }
  if (projectname.value != "" && clickname.value == "大修") {
    projectnames5.value = projectname.value; // 父传子 项目名称
  }
  if (projectname.value != "" && clickname.value == "小修") {
    projectnames6.value = projectname.value; // 父传子 项目名称
  }
  if (projectname.value != "" && clickname.value == "营销成本") {
    projectnames7.value = projectname.value; // 父传子 项目名称
  }
  if (projectname.value != "" && clickname.value == "技改") {
    projectnames8.value = projectname.value; // 父传子 项目名称
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  .export {
    margin-right: 1.5rem;
    margin-top: .05rem;
  }
  .search {
    margin-left: 0.125rem;
  }
}
.endbox {
  display: flex;
  margin-top: 0.5rem;
  padding-left: 0.375rem;
  .allset {
    margin-right: 3.25rem;
  }
}
:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
  border-bottom: var(--el-table-border);
  text-align: center;
}
:deep(.demo-tabs[data-v-b78f148e]) {
  width: 20rem;
}
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