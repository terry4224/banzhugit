<template>
  <div class="box">
    <div class="card">系统运行情况</div>
    <div class="handle">
      <el-button @click="refresh" type="primary" style="margin-right: 0.5rem">
        <i class="fa fa-refresh"></i>刷新
      </el-button>
      <div class="f">
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
        class="ipt"
        v-model="systemName"
        size="small"
        placeholder="系统名称"
        clearable
      />
      <el-input
        class="ipt"
        v-model="nextwork"
        size="small"
        placeholder="所属网络"
        clearable
      />
      <el-input
        class="ipt2"
        v-model="systeState"
        size="small"
        placeholder="系统状态"
        clearable
      />
      <el-button @click="serch" type="primary" class="serch">
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
        label="序号"
        width="80"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="appName"
        :sort-method="sortmethod"
        label="系统名称"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="pushTypeName"
        label="建设类型"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="secZoneName"
        label="所属网络"
        width="auto"
      ></el-table-column>
      <el-table-column
        prop="alertStatus"
        label="系统状态"
        width="auto"
      ></el-table-column>
      <el-table-column
        prop="createDate"
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
import { updateDate } from "../tools/timestamp/systemrun.js";
import { getData } from "../api/systemrun.js";
// 中文转换
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { reactive, ref, onMounted } from "vue";
import store from "../store/index.js";
onMounted(async() => {
  updateDate(tableData.value);
   const res0 = await getData({
    method: "post",
    url: "/mgr/system-running-info/page",
    data: {
      data: {
        alertStatus: '', // 系统状态
        appName: '', // 系统名称
        endDate: '', // 结束日期(yyyy-MM-dd)
        secZoneName: '', // 所属网络
        startDate: '', // 开始日期(yyyy-MM-dd)
      },
      pageIndex: currentPage.value,
      pageSize: pagesize.value,
    },
  });
  if(res0.data.records.length > 0){
    tableData.value = res0.data.records;
	tableData.value.forEach(item=>{
		if(item.alertStatus == 'NORMAL'){
			item.alertStatus = "正常状态";
		}
		if(item.alertStatus == 'UNKNOWN'){
			item.alertStatus = "位置状态";
		}
		if(item.alertStatus == 'WARN'){
			item.alertStatus = "警告状态";
		}
		if(item.alertStatus == 'ERROR'){
			item.alertStatus = "严重警告";
		}
	})
    total.value = res0.data.total;
  }
});
const locale = reactive(zhCn);
// 操作相关
const datePicker = ref();
const systemName = ref(""); // 系统名称的值
const nextwork = ref(""); // 所属网络的值
const systeState = ref(""); // 系统状态的值
const value1 = ref([]); // 日期控件的值
const getvalue = (e) => {
  console.log(value1.value);
};
const reset = () => {
  systemName.value = "";
  nextwork.value = "";
  systeState.value = "";
  value1.value = "";
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
// end表格相关
// 分页相关
const currentPage = ref(1); //选中页数
const pagesize = ref(10); // 每页数据大小
const total = ref(0); // 数据总条数
// 每页展示多少条数据
const handleSizeChange = (e) => {};
// 当前第几页
const handleCurrentChange = async(e) => {
  currentPage.value = e;
   const newstarttime2 = ref();
  const endtime2 = ref();
  if(value1.value){
endtime2.value = value1.value[1];
newstarttime2.value = value1.value[0];
  }
  const res2 = await getData({
    method: "post",
    url: "/mgr/system-running-info/page",
    data: {
      data: {
        alertStatus: systeState.value, // 系统状态
        appName: systemName.value, // 系统名称
        endDate: endtime2.value, // 结束日期(yyyy-MM-dd)
        secZoneName: nextwork.value, // 所属网络
        startDate: newstarttime2.value, // 开始日期(yyyy-MM-dd)
      },
      pageIndex: currentPage.value,
      pageSize: pagesize.value,
    },
  });
  if(res2.data.records.length > 0){
    tableData.value = res2.data.records;
	tableData.value.forEach(item=>{
		if(item.alertStatus == 'NORMAL'){
			item.alertStatus = "正常状态";
		}
		if(item.alertStatus == 'UNKNOWN'){
			item.alertStatus = "位置状态";
		}
		if(item.alertStatus == 'WARN'){
			item.alertStatus = "警告状态";
		}
		if(item.alertStatus == 'ERROR'){
			item.alertStatus = "严重警告";
		}
	})
    total.value = res2.data.total;
  }
};
// end 分页相关
// 查询
const serch = async() => {
  currentPage.value = 1;
  const newstarttime1 = ref();
  const endtime1 = ref();
  if(value1.value){
endtime1.value = value1.value[1];
newstarttime1.value = value1.value[0];
  }
  const res = await getData({
    method: "post",
    url: "/mgr/system-running-info/page",
    data: {
      data: {
        alertStatus: systeState.value, // 系统状态
        appName: systemName.value, // 系统名称
        endDate: endtime1.value, // 结束日期(yyyy-MM-dd)
        secZoneName: nextwork.value, // 所属网络
        startDate: newstarttime1.value, // 开始日期(yyyy-MM-dd)
      },
      pageIndex: currentPage.value,
      pageSize: pagesize.value,
    },
  });
  if(res.code == "00000" ){
    tableData.value = res.data.records;
    total.value = res.data.total;
  }
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
    width: 14.65rem;
    .timebox {
      width: 2.5rem;
    }
    .ipt {
      width: 1.575rem;
      height: 0.4rem;
      margin-right: 0.125rem;
      margin-left: 0.125rem;
    }
    .serch {
      margin-right: 0.125rem;
    }
    .ipt2 {
      width: 1.575rem;
      height: 0.4rem;
      margin-right: 0.3rem;
      margin-left: 0.125rem;
    }
    .fs {
      color: #909399;
    }
  }

  .table {
    margin-left: 0.375rem;
    // 样式覆盖
  }
  .endbox {
    display: flex;
    margin-top: 0.5rem;
    padding-left: 0.375rem;
    .allset {
      margin-right: 10.2rem;
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