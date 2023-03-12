<template>
  <div class="box">
    <div class="card">员工管理</div>
    <div class="handle">
      <el-input
        class="ipt"
        v-model="name"
        size="large"
        placeholder="姓名"
        clearable
      />
      <el-input
        class="ipt"
        v-model="politicSstatus"
        size="large"
        placeholder="政治面貌"
        clearable
      />
      <el-input
        class="ipt3"
        v-model="partyMember"
        size="large"
        placeholder="星级党员"
        clearable
      />
      <el-select v-model="selectvalue" clearable placeholder="状态选项">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button @click="search" type="primary" class="search">
        <i class="fa fa-search"></i>查询</el-button
      >
      <el-button @click="reset" plain class="fs"
        ><i class="fa fa-undo"></i>重置</el-button
      >
    </div>
    <div class="handle2">
      <div style="margin-right: 0 0.125rem;" >
        <el-button type="primary" @click="addUser">
          <i class="fa fa-user-plus" aria-hidden="true"></i>新增员工</el-button
        >
      </div>
      <BatchImport></BatchImport>
      <el-button @click="changeOrganization" class="btnstyle"
        ><i class="fa fa-id-card" aria-hidden="true"></i>修改组织</el-button
      >
      <el-button @click="changeuserInfor" class="btnstyle"
        ><i class="fa fa-pencil-square-o" aria-hidden="true"></i
        >修改信息</el-button
      >
      <el-button @click="setState" class="btnstyle"
        ><i class="fa fa-cog" aria-hidden="true"></i>设置状态</el-button
      >
      <el-button class="btnstyle" @click="handlestar"
        ><i class="fa fa-star-o" aria-hidden="true"></i>星级党员</el-button
      >
      <el-button @click="exports" class="btnstyle"
        ><i class="fa fa-download" aria-hidden="true"></i>导出数据</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table
      ref="table"
      :data="tableData"
      @select-all="selectAll"
	  @selection-change="selectionchange"
      class="table"
      border
      style="width:96%"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
        prop="sortIndex"
        label="序号"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="name"
        :sort-method="sortmethod"
        label="姓名"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="departmentId"
        label="所属组织"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="partyBranch"
        label="党支部"
        width="auto"
      ></el-table-column>
      <el-table-column
        prop="birthday"
        label="出生日期"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="politicalStatus"
        label="政治面貌"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="入党日期"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="starPartyMember"
        label="星级党员"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="gmtCreate"
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
      <el-config-provider :locale="locale">
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
      </el-config-provider>
    </div>
    <!-- end分页 -->
    <!-- 新增员工组件 -->
    <AddUser
      :show="show"
      @getadduser2="getadduser2"
    ></AddUser>
    <!-- 修改组织组件 -->
    <ChangeOringe
      :showchange="showchange"
      :selectdata="selectdata"
      @ifshow="ifshow"
    ></ChangeOringe>
    <!-- 修改员工信息组件 -->
    <ChangeUser :showchanges="showchanges" :changeData="changeData" @getshowValue="getshowValue"  @getdataValue="getdataValue"></ChangeUser>
    <!-- 修改员工状态组件 -->
    <ChangeState :showstate="showstate" :selectdatas="selectdatas" @getstate="getstate" ></ChangeState>
     <!-- 修改星级党员组件 -->
    <ChangeStar :showstar="showstar" :senddata="senddata" @getstar="getstar" ></ChangeStar>
   
  </div>
</template>

<script setup>
// 时间戳转换
// import {startTimeStamp,endTimeStamp,updateTimeStamp} from '../tools/timestamp/overhaulingplan.js'
import BatchImport from "../components/BatchImport.vue"; // 导入批量导入组件
import ChangeOringe from "../components/ChangeOrganization.vue"; // 导入修改组织组件
import ChangeState from "../components/ChangeState.vue"; // 导入修改状态组件
import ChangeStar from "../components/ChangeStar.vue"; // 导入修改星级党员组件
import {getdata} from '../api/personmagent.js';
import {exportExcel} from '../tools/download.js';
// 中文转换
import { computed,onMounted } from "vue";
// 引入新增员工组件
import AddUser from "../components/AddUser.vue"; // 导入新增员工组件
import ChangeUser from "../components/ChangeUserInfor.vue"; // 导入修改员工信息组件
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { reactive, ref } from "vue";
import store from '../store/index.js';
onMounted(()=>{
	if(tableData.value.length == 0){
		getdataList();
	}
})
// 获取数据函数
const getdataList = async()=>{
	const res = await getdata({
		method:'post',
		url:'/mgr/employee-info/employee/list',
		data:{
			departmentId: "", // 部门所属ID
				pageNo: currentPage.value,
				pageSize:pagesize.value,
				politicalStatus:politicSstatus.value, //政治面貌
				starPartyMember: partyMember.value,
				status:selectvalue.value,
				user: name.value
		}
	})
	if(res.message = '成功'){
		tableData.value = res.data.records;
		tableData.value.forEach(item=>{
			item.status = item.status == '1'? '显示':'不显示';
		})
		total.value = res.data.total;
	}
}
// 引入信息提示组件
import { message } from "../utils/message.js";
const locale = reactive(zhCn);
const selectlittle = ref([]);// 定义changselect 选中
const selecrList = ref([]);// 表格选中的个数
// 操作相关
const datePicker = ref();
const name = ref(""); // 姓名的值
const politicSstatus = ref(""); // 政治面貌的值
const partyMember = ref(""); // 党员的值
const value1 = ref([]); // 日期控件的值
// 新增员工组件相关
const show = ref(false); // 组件通信
// 子组件通信
const getadduser2 = (a,b) => {
  show.value = a;
  if(b == 8){
	getdataList();  
  }
	  
};
const addUser = () => {
  show.value = true;
};
// 当选择项发生变化时会触发该事件
const selectionchange = (e)=>{
	selecrList.value = e
}
// 复选框全选事件
const selectAll = (e) => {
  selecrList.value = e;
};
// 修改组织组件相关
const showchange = ref(); //是否显示组件
const selectdata = ref([]); // 父子通信勾选数据
// 修改员工信息组件相关
const changeData = ref([]); // 父子通信传递修改数据
const showchanges = ref(false);
const changeuserInfor = ()=>{
  if(selecrList.value.length == 1){
    console.log(selecrList.value);
	const newArr = selecrList.value
	
	newArr.forEach(item=>{
		item.sex = String(item.sex)	
		if(item.status){
		item.status = item.status == '显示'? '1':'0'	
		}
	})
    changeData.value = selecrList.value // 父子通信传递修改数据
    showchanges.value = true; // 开启修改信息组件
  }else{
    message("只允许且必须勾选一个复选框","warning");
  }
}
// 子父 通信 关闭组件
const getshowValue = (a,b)=>{
  showchanges.value = a;
  if(b == 8){
	   getdataList();
  }
}
// 子父 通信 修改完毕的值
const getdataValue = (a,b)=>{
  data.state = data.state=="1"? "显示":"不显示";
  selectlittle.value[0] = data;
}
// 修改组织事件
const changeOrganization = (e) => {
  if (selecrList.value.length <= 0) {
    message("至少勾选一个复选框", "warning");
    return;
  }
  selectdata.value = selecrList.value; // 将选中的数组传递到子组件中
  showchange.value = true; // 开启修改组织组件
};
// 子父通信
const ifshow = (e,a) => {
  showchange.value = e;
  if(a == 8){
	  getdataList();
  }
};
// end修改组织组件相关
// 设置员工状态相关
const showstate =  ref(false); // 修改组件显示与否
const selectdatas = ref([]);
const setState = ()=>{ // 开启组件
  if (selecrList.value.length <= 0) {
    message("至少勾选一个复选框", "warning");
    return;
  }
  selectdatas.value = selecrList.value; // 将选中的数组传递到子组件中
  showstate.value = true; // 开启修改组织组件
}
const getstate =(a,b)=>{  // 显示与否回传
showstate.value = a;
if(b == 8){
	getdataList();
}
}
// 设置员工星级党员相关
const showstar = ref(false); // 组件显示与否
const senddata =  ref([]) // 父传子数据
const getstar = (a,b)=>{ // 子传父 显示与否
showstar.value = a;
if(b == 8){
	getdataList();
}
}
const handlestar = ()=>{
 if (selecrList.value.length <= 0) {
    message("至少勾选一个复选框", "warning");
    return;
  }
  senddata.value = selecrList.value; // 父传子数据
showstar.value =true; // 开启组件
}
//下拉框
const selectvalue = ref("");
const options = [
  {
    value: "1",
    label: "启用状态",
  },
  {
    value: "0",
    label: "禁用状态",
  },
];
// 查询
const search = ()=>{
	getdataList();
}
// 重置
const reset = () => {
  name.value = "";
  politicSstatus.value = "";
  partyMember.value = "";
  selectvalue.value = "";
         store.commit('changeResh',false);
  store.commit('changeResh',true);
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
const currentPage = ref(1); //选中页数
const pagesize = ref(10); // 每页数据大小
const total = ref(0); // 数据总条数
// 每页展示多少条数据
const handleSizeChange = (e) => {};
// 当前第几页
const handleCurrentChange = (e) => {
  currentPage.value = e;
  getdataList();
};
// end 分页相关
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
// 导出数据
const exports = ()=>{
	if(selecrList.value.length <= 0){
		message("至少勾选一个复选框", "warning")
		return
	}
	const arr = ref([]);
	for(let i =0; i < selecrList.value.length;i++){
		arr.value.push({
			index:selecrList.value[i].sortIndex,
			name:selecrList.value[i].name,
			zuzhi:selecrList.value[i].departmentId,
			dangzhibu:selecrList.value[i].partyBranch,
			brithday:selecrList.value[i].birthday,
			zhengzhimiaoma:selecrList.value[i].politicalStatus,
			rudang:selecrList.value[i].gmtCreate,
			satr:selecrList.value[i].starPartyMember,
			stae:selecrList.value[i].status,
			time:selecrList.value[i].gmtCreate,
		})
	}
const titleArr = ref(['序号','姓名','所属组织','党支部','出生日期','政治面貌','入党日期','星级党员','状态','更新时间']) //表头中文名
exportExcel(arr.value, '员工信息', titleArr.value, 'sheetName');
}
</script>

<style lang="scss" scoped>
.box {
  width: 20rem;
  // height:20rem;
  padding-bottom: 1rem;
  overflow: hidden;
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
    padding-left: 0.05rem;
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
      margin-right: 0.001rem;
      margin-left: 0.2rem;
    }
    .ipt3 {
      width: 1.575rem;
      height: 0.4rem;
      margin-right: 0.4rem;
      margin-left: 0.2rem;
    }
    .checkPlanName {
      width: 3.6rem;
      height: 0.4rem;
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
  .handle2 {
    margin: 0.25rem 0.125rem;
    padding-left: 0.25rem;
    display: flex;
    align-items: center;
    width: 17rem;
    .btnstyle {
      margin: 0 0.125rem;
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