// 数字化项目组件
<template>
  <div class="bbox">
    <el-table
      ref="table"
      :data="tableData0"
      class="table"
      border
      style="width: 200%"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
        prop="serialNum"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="planYear"
        label="计划年度"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="settlementYear"
        label="结算年度"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="projectId"
        label="*项目编码"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="batchName"
        label="下达批次"
        width="120"
      ></el-table-column>
      <el-table-column label="项目名称" width="120" prop="projectName">
      </el-table-column>
      <el-table-column label="执行中心" width="120" prop="implementCenter">
      </el-table-column>
      <el-table-column label="项目负责人" width="120" prop="projectLeader">
      </el-table-column>
      <el-table-column label="项目性质" width="120" prop="projectNature">
      </el-table-column>
      <el-table-column label="项目大类" width="120" prop="projectCategory">
      </el-table-column>
      <el-table-column label="总投资" width="120" prop="totalInvestment">
      </el-table-column>
      <el-table-column
        label="累计已下达计划"
        width="120"
        prop="totalUsedAmount"
      >
      </el-table-column>
      <el-table-column
        label="2022年计划金额"
        width="120"
        prop="planAmountCurYear"
      >
      </el-table-column>
      <el-table-column
        label="累计预算金额"
        width="120"
        prop="totalBuggetedAmount"
      >
      </el-table-column>
      <el-table-column
        label="2022年预算"
        width="120"
        prop="buggetAmountCurYear"
      >
      </el-table-column>
      <el-table-column
        label="业务部门及责任人"
        width="120"
        prop="projectLeader"
      >
      </el-table-column>
      <el-table-column label="采购类别" width="120" prop="projectNature">
      </el-table-column>
      <el-table-column label="定标时间" width="120" prop="determineBidDate">
      </el-table-column>
      <el-table-column
        label="合同签订时间"
        width="120"
        prop="contractSigningTime"
      >
      </el-table-column>
      <el-table-column label="合同名称" width="120" prop="contractName">
      </el-table-column>
      <el-table-column label="合同乙方" width="120" prop="partyb">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="详细进展"
        width="120"
        prop="detailProgress"
      >
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-config-provider :locale="locale">
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
    </el-config-provider>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect,watch,onMounted} from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { getData } from "../api/projectmannet.js"; // 引入请求
const locale = reactive(zhCn);
const tableData0 = ref([]); // 定义表格数据
const projectnames = ref(); // 定义父传递项目名称
const labelnames = ref(); // 定义父传递lablename
const oldvaluenum =  ref(0);
const props = defineProps({
  labelname: {
    type: String,
  },
  projectnames: {
    type: String,
  },
});
watchEffect(() => {
  // watchEffect才可以在父组件中实时传递数据
  labelnames.value = props.labelname;
  projectnames.value = props.projectnames;
});
const currentPage = ref(1); //选中页数
const pagesize = ref(10); // 每页数据大小
const total = ref(20); // 数据总条数
// 每页展示多少条数据
const handleSizeChange = (e) => {};
// 当前第几页
const handleCurrentChange = (e) => {
  currentPage.value = e;
  uuu();
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
// 获取分页数据函数
const uuu = async () => {
  let res = await getData({
    method: "post",
    url: "/mgr/project-milepost/milepost1/page",
    data: {
      data: {
        projectName:projectnames.value,
      },
      pageIndex: currentPage.value,
      pageSize: pagesize.value,
    },
  });
  tableData0.value = res.data.records; //数据赋值
  total.value =parseInt(res.data.total) ; // 总条数赋值
};
// 数据初始化函数
const uuumounted = async () => {
  let res = await getData({
    method: "post",
    url: "/mgr/project-milepost/milepost1/page",
    data: {
      data: {
        projectName:'',
      },
      pageIndex: currentPage.value,
      pageSize: pagesize.value,
    },
  });
  tableData0.value = res.data.records; //数据赋值
  total.value =parseInt(res.data.total) ; // 总条数赋值
};
//  监听是否被点击
watch(()=>labelnames.value,()=>{
 uuumounted();
})
// 监听项目名称是否改变
watch(()=>projectnames.value,(newvalue,oldvalue)=>{
  uuu();
})
onMounted(()=>{
   uuumounted();
})


</script>

<style lang="scss" scoped>
.bbox {
    :deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
    border-bottom: var(--el-table-border);
    text-align: center;
}
  :deep(:root) {
    --el-color-primary: #007165;
  }
  .endbox {
    display: flex;
    margin-top: 0.5rem;
    padding-left: 0.375rem;
    .allset {
      margin-right: 10.25rem;
    }
  }
}
</style>