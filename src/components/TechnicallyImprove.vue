// 技改组件
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
        prop="projectType"
        label="项目类型"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="projectId"
        label="企业级编码"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名称"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="projectContent"
        label="项目主要内容"
        width="1000"
      ></el-table-column>
      <el-table-column label="执行中心" width="120" prop="implementCenter">
      </el-table-column>
      <el-table-column label="项目负责人" width="120" prop="projectLeader">
      </el-table-column>
      <el-table-column label="项目进度" width="120" prop="projectProgress">
      </el-table-column>
      <el-table-column label="总投资" width="120" prop="totalInvestment">
      </el-table-column>
      <el-table-column label="到去年底累计下达计划" width="120" prop="totalUsedAmountLastYear">
      </el-table-column>
      <el-table-column label="当年投入计划" width="120" prop="investPlanAmountCurYear">
      </el-table-column>
      <el-table-column
        label="开工年月"
        width="120"
        prop="startDate"
      >
      </el-table-column>
      <el-table-column
        label="投产年月"
        width="120"
        prop="operationDate"
      >
      </el-table-column>
      <el-table-column
        label="类别"
        width="120"
        prop="projectCategory"
      >
      </el-table-column>
      <el-table-column
        label="采购资料审查(除通信类项目外填写)"
        width="120"
        prop="purchaseDataReviewDate"
      >
      </el-table-column>
      <el-table-column
        label="采购提报截止时间"
        width="120"
        prop="purchaseCommitEndDate"
      >
      </el-table-column>
      <el-table-column label="乙方" width="120" prop="partyb">
      </el-table-column>
      <el-table-column label="合同金额" width="120" prop="contractAmount">
      </el-table-column>
      <el-table-column
        label="采购订单号"
        width="120"
        prop="purchaseOrderId"
      >
      </el-table-column>
      <el-table-column label="初设审查计划时间" width="120" prop="predesignAuditDate">
      </el-table-column>
      <el-table-column label="初设审查实际完成时间" width="120" prop="predesignAuditFinishDate">
      </el-table-column>
      <el-table-column
        label="施设审查计划时间"
        width="120"
        prop="implementAuditPlanDate"
      >
      </el-table-column>
            <el-table-column
        label="施设审查实际完成时间"
        width="120"
        prop="implementAuditFinishDate"
      >
      </el-table-column>
            <el-table-column
        label="物资计划到货时间"
        width="120"
        prop="planArrivalDate"
      >
      </el-table-column>
            <el-table-column
        label="物资实际到货时间"
        width="120"
        prop="actualArrivalDate"
      >
      </el-table-column>
            <el-table-column
        label="现场计划开工时间"
        width="120"
        prop="planStartDate"
      >
      </el-table-column>
            <el-table-column
        label="现场实际开工时间"
        width="120"
        prop="actualStartDate"
      >
      </el-table-column>
            <el-table-column
        label="计划完工时间"
        width="120"
        prop="planFinishDate"
      >
      </el-table-column>
            <el-table-column
        label="实际完工时间"
        width="120"
        prop="actualFinishDate"
      >
      </el-table-column>
            <el-table-column
        label="计划验收时间(和二上时间一致，请注意过程管控)"
        width="120"
        prop="planInspectTime"
      >
      </el-table-column>
            <el-table-column
        label="实际验收时间"
        width="120"
        prop="actualInspectTime"
      >
      </el-table-column>
            <el-table-column
        label="计划结算审计送审时间"
        width="120"
        prop="planSettlementAuditDate"
      >
      </el-table-column>
               <el-table-column
        label="计划决算转资时间"
        width="120"
        prop="planSettlementTransferDate"
      >
      </el-table-column>
               <el-table-column
        label="结算金额"
        width="120"
        prop="settlementAmount"
      >
      </el-table-column>
               <el-table-column
        label="开票时间"
        width="120"
        prop="invoiceDate"
      >
      </el-table-column>
               <el-table-column
        label="开票金额(含税)"
        width="120"
        prop="invoiceAmount"
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
const projectnames8 = ref(); // 定义父传递项目名称
const labelname8 = ref(); // 定义父传递lablename
const oldvaluenum =  ref(0);
const props = defineProps({
  labelname8: {
    type: String,
  },
  projectnames8: {
    type: String,
  },
});
watchEffect(() => {
  // watchEffect才可以在父组件中实时传递数据
  labelname8.value = props.labelname8;
  projectnames8.value = props.projectnames8;
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
    url: "/mgr/project-milepost/milepost8/page",
    data: {
      data: {
        projectName:projectnames8.value,
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
    url: "/mgr/project-milepost/milepost8/page",
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
watch(()=>labelname8.value,()=>{
 uuumounted();
})
// 监听项目名称是否改变
watch(()=>projectnames8.value,(newvalue,oldvalue)=>{
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