// 数字化专项组件
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
      <el-table-column label="项目大类" width="120" prop="projectCategory">
      </el-table-column>
      <el-table-column label="总投资" width="120" prop="totalInvestment">
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
      <el-table-column
        label="采购提报时间"
        width="120"
        prop="purchaseCommitTime"
      >
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
      <el-table-column label="合同编号" width="120" prop="contractId">
      </el-table-column>
      <el-table-column label="合同乙方" width="120" prop="partyb">
      </el-table-column>
      <el-table-column
        label="合同金额(成本/元)"
        width="120"
        prop="contractAmount"
      >
      </el-table-column>
      <el-table-column
        label="合同金额(不含税)"
        width="120"
        prop="contractAmountExcRate"
      >
      </el-table-column>
      <el-table-column
        label="计划启动(评审时间)"
        width="120"
        prop="planStartDate"
      >
      </el-table-column>
      <el-table-column
        label="实际启动(评审)时间"
        width="120"
        prop="actualStartDate"
      >
      </el-table-column>
      <el-table-column
        label="计划预验收时间"
        width="120"
        prop="planPreinspectTime"
      >
      </el-table-column>
      <el-table-column label="计划验收时间" width="120" prop="planInspectTime">
      </el-table-column>
      <el-table-column
        label="实际验收时间"
        width="120"
        prop="actualInspectTime"
      >
      </el-table-column>
      <el-table-column
        label="实际验收时间"
        width="120"
        prop="actualInspectTime"
      >
      </el-table-column>
      <el-table-column
        label="第一次开票金额"
        width="120"
        prop="firstInvoiceAmount"
      >
      </el-table-column>
      <el-table-column
        label="第一次开票时间"
        width="120"
        prop="firstInvoiceDate"
      >
      </el-table-column>
      <el-table-column
        label="第二次开票时间"
        width="120"
        prop="secondInvoiceDate"
      >
      </el-table-column>
      <el-table-column
        label="第二次开票金额"
        width="120"
        prop="secondInvoiceAmount"
      >
      </el-table-column>
      <el-table-column
        label="第三次开票时间"
        width="120"
        prop="thirdInvoiceDate"
      >
      </el-table-column>
      <el-table-column
        label="第三次开票金额"
        width="120"
        prop="thirdInvoiceAmount"
      >
      </el-table-column>
      <el-table-column
        label="第四次开票时间"
        width="120"
        prop="forthInvoiceDate"
      >
      </el-table-column>
      <el-table-column
        label="第四次开票金额"
        width="120"
        prop="forthInvoiceAmount"
      >
      </el-table-column>
      <el-table-column
        label="第一次付款时间"
        width="120"
        prop="firstPaymentDate"
      >
      </el-table-column>
      <el-table-column
        label="第一次付款金额"
        width="120"
        prop="firstPaymentAmount"
      >
      </el-table-column>
      <el-table-column
        label="第二次付款时间"
        width="120"
        prop="secondPaymentDate"
      >
      </el-table-column>
      <el-table-column
        label="第二次付款金额"
        width="120"
        prop="secondPaymentAmount"
      >
      </el-table-column>
            <el-table-column
        label="第三次付款时间"
        width="120"
        prop="thirdPaymentDate"
      >
      </el-table-column>
      <el-table-column
        label="第三次付款金额"
        width="120"
        prop="thirdPaymentAmount"
      >
      </el-table-column>
                  <el-table-column
        label="第四次付款时间"
        width="120"
        prop="forthPaymentDate"
      >
      </el-table-column>
      <el-table-column
        label="第四次付款金额"
        width="120"
        prop="forthPaymentAmount"
      >
        </el-table-column>
      <el-table-column
        label="累计开票金额"
        width="120"
        prop="totalInvoiceAmount"
      >
      </el-table-column>
        <el-table-column
        fixed="right"
        label="累计付款比例"
        width="120"
        prop="totalPaymentScale"
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
import { ref, reactive, watchEffect, watch, onMounted } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { getData } from "../api/projectmannet.js"; // 引入请求
const locale = reactive(zhCn);
const tableData0 = ref([]); // 定义表格数据
const projectnames2 = ref(); // 定义父传递项目名称
const labelnames2 = ref(); // 定义父传递lablename
const oldvaluenum = ref(0);
const props = defineProps({
  labelname2: {
    type: String,
  },
  projectnames2: {
    type: String,
  },
});
watchEffect(() => {
  // watchEffect才可以在父组件中实时传递数据
  labelnames2.value = props.labelname2;
  projectnames2.value = props.projectnames2;
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
    url: "/mgr/project-milepost/milepost2/page",
    data: {
      data: {
        projectName: projectnames2.value,
      },
      pageIndex: currentPage.value,
      pageSize: pagesize.value,
    },
  });
  tableData0.value = res.data.records; //数据赋值
  total.value = parseInt(res.data.total); // 总条数赋值
};
// 数据初始化函数
const uuumounted = async () => {
  let res = await getData({
    method: "post",
    url: "/mgr/project-milepost/milepost2/page",
    data: {
      data: {
        projectName: "",
      },
      pageIndex: currentPage.value,
      pageSize: pagesize.value,
    },
  });
  tableData0.value = res.data.records; //数据赋值
  total.value = parseInt(res.data.total); // 总条数赋值
};
//  监听是否被点击
watch(
  () => labelnames2.value,
  () => {
    uuumounted();
  }
);
// 监听项目名称是否改变
watch(
  () => projectnames2.value,
  (newvalue, oldvalue) => {
    uuu();
  }
);
onMounted(() => {
  uuumounted();
});
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