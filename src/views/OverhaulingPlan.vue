<template>
  <div class="box">
    <div class="card">检修计划</div>
    <div class="handle">
      <el-button @click="refresh" type="primary">
        <i class="fa fa-refresh"></i>刷新
      </el-button>
      <el-input
        class="ipt"
        v-model="informant"
        size="large"
        placeholder="填报人"
        clearable
      />
      <div class="timebox">
        <el-config-provider :locale="locale">
          <el-date-picker
            ref="datePicker"
            @change="getvalue"
            :locale="locale"
            v-model="value1"
            type="daterange"
            format="YYYY~MM~DD"
            value-format="YYYY-MM-DD"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-config-provider>
      </div>
      <el-input
        class="checkPlanName"
        v-model="checkPlanName"
        size="large"
        placeholder="检修计划名称"
        clearable
      />
      <el-input
        class="checktype"
        v-model="checktype"
        size="large"
        placeholder="检修类型"
        clearable
      />
      <el-input
        class="checktype"
        v-model="checkrank"
        size="large"
        placeholder="检修级别类型"
        clearable
      />

      <el-button type="primary" class="search" @click="search">
        <i class="fa fa-search"></i>查询</el-button
      >
      <el-button @click="reset" plain class="fs"
        ><i class="fa fa-undo"></i>重置</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table
      ref="table"
      :data="tableData"
      class="table"
      border
      style="width: 96%"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
        prop="num"
        label="编号"
        width="80"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="writePerson"
        :sort-method="sortmethod"
        label="填报人"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="planBeginTime"
        label="计划开始时间"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="planEndTime"
        label="计划结束时间"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="检修计划名称"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="overhauledPlanType"
        label="检修类型"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="overhauledLevelType"
        label="检修级别类型"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="auto"
        :sortable="true"
      ></el-table-column>
    </el-table>
    <!-- end 表格 -->
    <!-- 分页 -->
    <div class="endbox">
      <el-button size="default" @click="allSelect">选择全部</el-button>
      <el-button class="allset" size="default" @click="opposite"
        >反向选择</el-button
      >
      <el-pagination
        :pager-count="5"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total,  prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- end分页 -->
  </div>
</template>

<script setup>
// 时间戳转换
import {
  startTimeStamp,
  endTimeStamp,
  updateTimeStamp,
} from "../tools/timestamp/overhaulingplan.js";
// 中文转换
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { getdatacheck } from "../api/overhaulingplans.js";
import { message } from "../utils/message.js";
import { reactive, ref,onMounted } from "vue";
import store from "../store/index.js";
const locale = reactive(zhCn);
  const endDatetime0 = ref(); // 结束时间
  const startDatetime0 = ref(); // 开始时间
// 数据初始化
onMounted(async() => {
createdata()
})
// 初始化数据函数
const createdata = async()=>{
	const res = await getdatacheck({
	    method: "post",
	    url: "/mgr/overhauled-plan/page",
	    data: {
	      data: {
	        endDate: endDatetime0.value, // 结束日期(yyyy-MM-dd)
	        name: checkPlanName.value, // 检修计划名称
	        overhauledLevelType: checkrank.value, // 检修级别
	        overhauledPlanType: checktype.value, //  检修类型
	        startDate: startDatetime0.value, // 开始日期(yyyy-MM-dd)
	        writePerson: informant.value, // 填报人
	      },
	      pageIndex: currentPage.value,
	      pageSize: pagesize.value,
	    },
	  });
	  if(res.code == '00000'){
	tableData.value = res.data.records;
	  startTimeStamp(tableData.value); // 开始时间转换
	endTimeStamp(tableData.value); // 结束时间转换
	total.value = res.data.total;
	  }
}
// 操作相关
const datePicker = ref();
const informant = ref(""); // 填报人的值
const checkPlanName = ref(""); // 检修计划名称的值
const checktype = ref(""); // 检修类型的值
const checkrank = ref(""); // 检修级别类型的值
const value1 = ref([]); // 日期控件的值
const getvalue = (e) => {
  console.log(value1.value);
};
// 重置
const reset = () => {
  informant.value = ""; // 填报人的值
  checkPlanName.value = ""; // 检修计划名称的值
  checktype.value = ""; // 检修类型的值
  checkrank.value = ""; // 检修级别类型的值
  value1.value = ""; // 日期控件的值
};
// end 操作相关
// 表格相关
const tableData = ref([]);
// 表格排序
const sortmethod = (a, b) => {
  if (a.createDate - b.createDate > 0) {
    return 1;
  } else {
    return -1;
  }
};
updateTimeStamp(tableData.value); // 更新时间转换
// end表格相关
// 分页相关
const currentPage = ref(1); //选中页数
const pagesize = ref(10); // 每页数据大小
const total = ref(0); // 数据总条数
// 每页展示多少条数据
const handleSizeChange = (e) => {};
// 当前第几页
const handleCurrentChange = (e) => {
  currentPage.value = e;
    if(value1.value.length != 0){
    endDatetime0.value = value1.value[1];
    startDatetime0.value = value1.value[0];
  }
	createdata()
};
// end 分页相关
// 查询
const search =  () => {
    if(value1.value.length != 0){
    endDatetime0.value = value1.value[1];
    startDatetime0.value = value1.value[0];
  }
	createdata()
};
// 全选与反选
const table = ref(); // 获取el-table节点
// 全选
const allSelect = () => {
  table.value.toggleAllSelection();
};
// 反选
const opposite = () => {
  table.value.toggleAllSelection();
};
// 刷新
const refresh = () => {
  store.commit("changeResh", false);
  store.commit("changeResh", true);
  
};
</script>

<style lang="scss" scoped>
.box {
  width: 20rem;
  height: 11.6rem;
  background-color: #fff;

  // 动态标签
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
  // 操作按钮
  .handle {
    margin: 0.25rem 0.125rem;
    padding-left: 0.25rem;
    display: flex;
    align-items: center;
    width: 17rem;
    .timebox {
      width: 2.5rem;
      margin-left: 0.125rem;
      margin-right: 0.4rem;
    }
    .ipt {
      width: 1.575rem;
      height: 0.4rem;
      margin-right: 0.125rem;
      margin-left: 0.2rem;
    }
    .checkPlanName {
      width: 3.6rem;
      height: 0.4rem;
      margin-left: 0.375rem;
    }
    .checktype {
      width: 2.35rem;
      height: 0.4rem;
      margin-left: 0.25rem;
    }
    .search {
      margin-left: 0.25rem;
      margin-right: 0.25rem;
    }

    .fs {
      color: #909399;
    }
  }
  // 表格
  .table {
    margin-left: 0.375rem;
    // 样式覆盖
  }
  .endbox {
    display: flex;
    margin-top: 0.5rem;
    padding-left: 0.375rem;
    .allset {
      margin-right: 10.25rem;
      
    }
  }

  :deep(.el-table th.el-table__cell) {
    background-color: #f2f2f2;
  }
  :deep(.el-table th.el-table__cell) {
    text-align: center;
  }
  :deep(.el-table .el-table__cell) {
    text-align: center;
  }
  :deep(.el-button + .el-button) {
    margin-left: 0;
  }
  :deep(.el-date-editor) {
    --el-date-editor-width: 2.825rem;
  }
  :deep(.el-table__body-wrapper::-webkit-scrollbar) {
    /*width: 0;宽度为0隐藏*/
    width: 0;
  }
}
</style>