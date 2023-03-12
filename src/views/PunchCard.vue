<template>
  <div class="box">
    <div class="card">打卡情况</div>
    <div class="handle">
      <el-button type="primary" style=" margin-right: 1rem"> <i class="fa fa-refresh"></i>刷新 </el-button>
      <el-button type="primary"> 打卡开关 </el-button>
      <el-button type="info" plain>已开启</el-button>
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
      end-placeholder="结束日期">
    </el-date-picker>
      </el-config-provider>
      </div>
     
      <el-input class="ipt" v-model="input" size="small" placeholder="姓名" clearable />
   
        <el-button type="primary" > <i class="fa fa-search"></i>查询</el-button>
         <el-button plain class="fs" @click="reset"><i class="fa fa-undo"></i>重置</el-button>
    </div>
    <!-- 表格 -->
    <el-table
    ref="table"
    :data="tableData"
     class="table"  border style="width: 96%">
      <el-table-column type="selection" width="50" ></el-table-column>
      <el-table-column prop="num" label="序号" width="80" :sortable="true"></el-table-column>
      <el-table-column
        prop="createDate"
        :sort-method="sortmethod"
        label="日期"
        width="auto"
        :sortable="true"
       
      ></el-table-column>
      <el-table-column
        prop="optUserName"
        label="姓名"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="beginCard"
        label="上班打卡"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="endCard"
        label="下班打卡"
        width="auto"
        :sortable="true"
      ></el-table-column>
    </el-table>
    <!-- end 表格 -->
    <!-- 分页 -->
    <div class="endbox">
      <el-button size="default"  @click="allSelect" >选择全部</el-button>
      <el-button class="allset" size="default" @click="opposite">反向选择</el-button>
  <el-pagination
	  :pager-count="5"
        background
   
      @size-change="handleSizeChange"

      @current-change="handleCurrentChange"
	
      :current-page="currentPage"
	
      :page-sizes="[5, 10, 15, 20]"
	
      :page-size="pagesize"
	
      layout="total,  prev, pager, next, jumper"
	
      :total="total">
    </el-pagination>
    </div>
   
    <!-- end分页 -->
  </div>
</template>

<script setup>
// 时间戳转换
import {dateTime,clockIn,clockOut} from '../tools/timestamp/punchcard.js'
// 中文转换
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { reactive, ref ,onMounted} from "vue";
import store from '../store/index.js';
onMounted(()=>{
dateTime(tableData.value);
clockIn(tableData.value);
clockOut(tableData.value);
});
const locale = reactive(zhCn);
// 操作相关
const datePicker = ref();
const input = ref('');// 输入框的值
const value1 = ref([]);// 日期控件的值
const getvalue =(e)=>{
  console.log(value1.value);
}
const reset = ()=>{
  input.value = '';
  value1.value = '';
       store.commit('changeResh',false);
  store.commit('changeResh',true);
}
// end 操作相关
// 表格相关
const tableData = ref([
    {
    createDate: 1170352159000,
    optUserName: "张三",
    beginCard: 1119352159000,
    endCard: 1679352149000,
    num: 1,
  },
  {
    createDate: 1570352159000,
    optUserName: "李四",
    beginCard: 1470352159000,
    endCard: 1679332159000,
    num: 2,
  },
  {
    createDate: 1670352159100,
    optUserName: "王五",
    beginCard: 1370352159000,
    endCard: 1679352129000,
    num: 3,
  },
  {
    createDate: 1670352158000,
    optUserName: "熊六",
    beginCard: 1270352159000,
    endCard: 1659352159000,
    num: 4,
  },
  {
    createDate: 1170352159000,
    optUserName: "张三",
    beginCard: 1119352159000,
    endCard: 1679352149000,
    num: 5,
  },  {
    createDate: 1170352159000,
    optUserName: "张三",
    beginCard: 1119352159000,
    endCard: 1679352149000,
    num: 6,
  },
    {
    createDate: 1670352159100,
    optUserName: "王五",
    beginCard: 1370352159000,
    endCard: 1679352129000,
    num: 7,
  },
  {
    createDate: 1670352158000,
    optUserName: "熊六",
    beginCard: 1270352159000,
    endCard: 1659352159000,
    num: 8,
  },
  {
    createDate: 1170352159000,
    optUserName: "张三",
    beginCard: 1119352159000,
    endCard: 1679352149000,
    num: 9,
  },  {
    createDate: 1170352159000,
    optUserName: "张三",
    beginCard: 1119352159000,
    endCard: 1679352149000,
    num: 10,
  },
]);
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
const pagesize = ref(10);  // 每页数据大小
const total = ref(20);     // 数据总条数
  // 每页展示多少条数据
const handleSizeChange = (e)=>{

}
  // 当前第几页
const handleCurrentChange = (e)=>{
    currentPage.value = e;
  if(e == 2){
 currentPage.value = e;
tableData.value = [
      {
    createDate: 1170352159000,
    optUserName: "张三",
    beginCard: 1119352159000,
    endCard: 1679352149000,
    num: 1,
  },
  {
    createDate: 1570352159000,
    optUserName: "李四",
    beginCard: 1470352159000,
    endCard: 1679332159000,
    num: 2,
  },
  {
    createDate: 1670352159100,
    optUserName: "王五",
    beginCard: 1370352159000,
    endCard: 1679352129000,
    num: 3,
  },
  {
    createDate: 1670352158000,
    optUserName: "熊六",
    beginCard: 1270352159000,
    endCard: 1659352159000,
    num: 4,
  },
  {
    createDate: 1170352159000,
    optUserName: "张三",
    beginCard: 1119352159000,
    endCard: 1679352149000,
    num: 5,
  },  {
    createDate: 1170352159000,
    optUserName: "张三",
    beginCard: 1119352159000,
    endCard: 1679352149000,
    num: 6,
  },
    {
    createDate: 1670352159100,
    optUserName: "王五",
    beginCard: 1370352159000,
    endCard: 1679352129000,
    num: 7,
  },
  {
    createDate: 1670352158000,
    optUserName: "熊六",
    beginCard: 1270352159000,
    endCard: 1659352159000,
    num: 8,
  },
  {
    createDate: 1170352159000,
    optUserName: "张三",
    beginCard: 1119352159000,
    endCard: 1679352149000,
    num: 9,
  },  {
    createDate: 1170352159000,
    optUserName: "张三",
    beginCard: 1119352159000,
    endCard: 1679352149000,
    num: 10,
  },
]
dateTime(tableData.value);
clockIn(tableData.value);
clockOut(tableData.value);
  }
   
}
// end 分页相关
// 全选与反选
const table = ref(); // 获取el-table节点
// 全选
const allSelect=()=>{
table.value.toggleAllSelection()
}
// 反选
const opposite=()=>{
 table.value.toggleAllSelection()
}





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
  .handle{
    margin: .25rem .125rem;
    padding-left: .25rem;
    display: flex;
    align-items: center;
    width: 14.65rem;
    .timebox{
      width: 2.5rem;
 
      margin-left: .25rem;
    }
    .ipt{
      width: 1.575rem;
      height: .4rem;
      margin-right: .125rem;
      margin-left: 1rem;
    }
    .fs{
      color: #909399;
    }
  }
  // 表格
  .table {
    margin-left: 0.375rem;
      // 样式覆盖

  }
  .endbox{
    display: flex;
    margin-top: .5rem;
    padding-left: .375rem;
    .allset{
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
    :deep(.el-button+.el-button) {
    margin-left: 0;
}
    :deep(.el-date-editor) {
--el-date-editor-width: 2.825rem;
    }
:deep(.el-table__body-wrapper::-webkit-scrollbar){
     /*width: 0;宽度为0隐藏*/
    width: 0;
  }
  
}
</style>