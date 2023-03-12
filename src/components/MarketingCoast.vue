// 营销成本组件
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
        prop="projectId"
        label="*项目编码"
        width="150"
      ></el-table-column>
      <el-table-column label="项目名称" width="120" prop="projectName">
      </el-table-column>
      <el-table-column label="项目内容" width="1000" prop="projectContent">
      </el-table-column>
      <el-table-column
        prop="planYear"
        label="计划年度"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="totalInvestmentExcTax"
        label="总投资不含税(万元)"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="determineBidDate"
        label="批次定标时间"
        width="120"
      ></el-table-column>
      <el-table-column label="合同乙方" width="120" prop="partyb">
      </el-table-column>
      <el-table-column label="合同编号" width="120" prop="contractId">
      </el-table-column>
      <el-table-column label="税率%" width="120" prop="taxRate">
      </el-table-column>
      <el-table-column label="签订时间" width="120" prop="contractSigningTime">
      </el-table-column>
      <el-table-column label="计划金额万元" width="120" prop="planAmount">
      </el-table-column>
      <el-table-column
        label="合同金额(成本含税万元)"
        width="120"
        prop="contractAmount"
      >
      </el-table-column>
      <el-table-column
        label="合同金额(成本不含税万元)"
        width="120"
        prop="contractAmountExcRate"
      >
      </el-table-column>
      <el-table-column label="计划开工时间" width="120" prop="planStartDate">
      </el-table-column>
      <el-table-column label="实际开工时间" width="120" prop="actualStartDate">
      </el-table-column>
      <el-table-column label="是否完工" width="120" prop="finishFlag">
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
        label="计划结算审计时间"
        width="120"
        prop="planSettlementAuditDate"
      >
      </el-table-column>
      <el-table-column label="结余(万元)" width="120" prop="partyb">
      </el-table-column>
      <el-table-column
        label="已挂账(不含税，万元)"
        width="120"
        prop="detailProgress"
      >
      </el-table-column>
      <el-table-column
        label="待挂账(不含税，万元)"
        width="120"
        prop="creditingAmount"
      >
      </el-table-column>
      <el-table-column label="挂账计划(不含税)" width="120" prop="creditPlan">
      </el-table-column>
      <el-table-column label="5月" width="120" prop="may"> </el-table-column>
      <el-table-column label="6月" width="120" prop="june"> </el-table-column>
      <el-table-column label="7月" width="120" prop="july"> </el-table-column>
      <el-table-column label="8月" width="120" prop="august"> </el-table-column>
      <el-table-column label="9月" width="120" prop="september">
      </el-table-column>
      <el-table-column label="10月" width="120" prop="october">
      </el-table-column>
      <el-table-column label="11月" width="120" prop="november">
      </el-table-column>
      <el-table-column label="12月" width="120" prop="december">
      </el-table-column>
      <el-table-column label="执行中心" width="120" prop="implementCenter">
      </el-table-column>
      <el-table-column label="项目负责人" width="120" prop="projectLeader">
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
const projectnames7 = ref(); // 定义父传递项目名称
const labelname7 = ref(); // 定义父传递lablename
const oldvaluenum = ref(0);
const props = defineProps({
  labelname7: {
    type: String,
  },
  projectnames7: {
    type: String,
  },
});
watchEffect(() => {
  // watchEffect才可以在父组件中实时传递数据
  labelname7.value = props.labelname7;
  projectnames7.value = props.projectnames7;
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
    url: "/mgr/project-milepost/milepost7/page",
    data: {
      data: {
        projectName: projectnames7.value,
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
    url: "/mgr/project-milepost/milepost7/page",
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
  () => labelname7.value,
  () => {
    uuumounted();
  }
);
// 监听项目名称是否改变
watch(
  () => projectnames7.value,
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