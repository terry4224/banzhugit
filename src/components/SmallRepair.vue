// 小修组件
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
        prop="projectCategory"
        label="项目类别"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="projectContent"
        label="项目内容"
        width="1000"
      ></el-table-column>
      <el-table-column
        prop="projectYear"
        label="项目年度"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="implementCenter"
        label="执行中心"
        width="120"
      ></el-table-column>
      <el-table-column label="项目负责人" width="120" prop="projectLeader">
      </el-table-column>
      <el-table-column label="上会时间" width="120" prop="meetingDate">
      </el-table-column>
      <el-table-column label="总计划金额(万元，不含税)" width="120" prop="totalPlanAmountExcTax">
      </el-table-column>
      <el-table-column label="当年计划金额(万元，不含税)" width="120" prop="planAmountExcTaxCurYear">
      </el-table-column>
      <el-table-column label="税率" width="120" prop="taxRate">
      </el-table-column>
      <el-table-column label="合同签订时间" width="120" prop="contractSigningTime">
      </el-table-column>
      <el-table-column
        label="服务期限"
        width="120"
        prop="serviceTimeLimit"
      >
      </el-table-column>
      <el-table-column
        label="合同单位"
        width="120"
        prop="partyb"
      >
      </el-table-column>
      <el-table-column
        label="联系人及联系方式"
        width="120"
        prop="contactor"
      >
      </el-table-column>
      <el-table-column
        label="合同(采购)金额(万元,含税)"
        width="120"
        prop="contractAmount"
      >
      </el-table-column>
      <el-table-column
        label="合同(采购)金额(万元,不含税)"
        width="120"
        prop="contractAmountExcTax"
      >
      </el-table-column>
      <el-table-column label="计划启(评审)时间" width="120" prop="planAuditDate">
      </el-table-column>
      <el-table-column label="实际启(评审)时间" width="120" prop="actualAutitDate">
      </el-table-column>
      <el-table-column
        label="计划到货时间(如涉及)"
        width="120"
        prop="planArrivalTime"
      >
      </el-table-column>
      <el-table-column label="实际到货时间(如涉及)" width="120" prop="actualArrivalTime">
      </el-table-column>
      <el-table-column label="是否完工" width="120" prop="finishFlag">
      </el-table-column>
      <el-table-column
        label="计划验收时间"
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
        label="结算报告时间"
        width="120"
        prop="settlementReportDate"
      >
      </el-table-column>
            <el-table-column
        label="第一次开票时间"
        width="120"
        prop="firstInvoiceDate"
      >
      </el-table-column>
      <el-table-column
        label="第一次开票金额"
        width="120"
        prop="firstInvoiceAmount"
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
import { ref, reactive, watchEffect,watch,onMounted} from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { getData } from "../api/projectmannet.js"; // 引入请求
const locale = reactive(zhCn);
const tableData0 = ref([]); // 定义表格数据
const projectnames6 = ref(); // 定义父传递项目名称
const labelname6 = ref(); // 定义父传递lablename
const oldvaluenum =  ref(0);
const props = defineProps({
  labelname6: {
    type: String,
  },
  projectnames6: {
    type: String,
  },
});
watchEffect(() => {
  // watchEffect才可以在父组件中实时传递数据
  labelname6.value = props.labelname6;
  projectnames6.value = props.projectnames6;
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
    url: "/mgr/project-milepost/milepost6/page",
    data: {
      data: {
        projectName:projectnames6.value,
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
    url: "/mgr/project-milepost/milepost6/page",
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
watch(()=>labelname6.value,()=>{
 uuumounted();
})
// 监听项目名称是否改变
watch(()=>projectnames6.value,(newvalue,oldvalue)=>{
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