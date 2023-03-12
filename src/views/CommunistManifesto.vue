<template>
  <div class="box" v-if="showMain">
    <div class="card">承包责任区</div>
    <div class="handle">
      <el-button
        @click="addInfor"
        class="btn"
        type="primary"
        style="margin-right: 0.125rem"
        ><i class="fa fa-plus" aria-hidden="true"></i> 新增
      </el-button>
      <el-input
        class="ipt"
        v-model="dutyLeader"
        size="small"
        placeholder="责任领导"
        clearable
      />
      <el-input
        class="ipt"
        v-model="contractor"
        size="small"
        placeholder="承包人"
        clearable
      />
      <el-input
        class="ipt"
        v-model="contractDate"
        size="small"
        placeholder="承包期限"
        clearable
      />
      <div class="timebox"></div>
      <el-button @click="search" type="primary" class="serch">
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
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column
        prop="liableLeader"
        :sort-method="sortmethod"
        label="责任领导"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="contractor"
        label="承包人"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="liablePerson"
        label="责任人"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="liableScope"
        label="责任范围"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="contractPeriod"
        label="承包期限"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="basicResponsibility"
        label="基本责任"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="keyResponsibility"
        label="关键责任"
        width="auto"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="100"
        :sortable="true"
      ></el-table-column>
	  <el-table-column
	    prop="createTime"
	    label="更新时间"
	    width="auto"
	    :sortable="true"
	  ></el-table-column>
      <el-table-column fixed="right" label="操作" width="auto">
        <template v-slot="scope">
          <el-button type="danger" @click="deletes(scope)">删除</el-button>
          <el-button
            style="margin-left: 5px"
            type="warning"
            @click="changInfor(scope.row,scope.$index)"
            >修改</el-button
          >
        </template>
      </el-table-column>
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
  </div>
  <div>
    <!-- 新增组件 -->
    <TheComPartyAdd
      @changetableData="changetableData"
      @changeshowAdd="changeshowAdd"
      v-if="showAdd"
    ></TheComPartyAdd>
    <TheComPartyChange
      :changecontent="changecontent"
      @changetableData2="changetableData2"
      v-if="showChange"
    ></TheComPartyChange>
  </div>
</template>

<script setup>
// 中文转换
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import TheComPartyAdd from "../components/TheCommunistPartyDutyAdd.vue";
import TheComPartyChange from "../components/TheCoumunistPartyDutyChange.vue";
import {message} from '../utils/message.js';
import { computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import store from "../store/index.js"; // 引入vuex
import { reactive, ref } from "vue";
import {getdata,delectdata} from '../api/partymemberduty.js'
const router = useRouter();
const locale = reactive(zhCn);
onMounted(async()=>{
	getdatalist();
})
// 获取数据
const getdatalist = async()=>{
	const res = await getdata({
		method:'post',
		url:'/mgr/member-responsibility/page',
		data:{
			data: {
					contractPeriod:contractDate.value,
					contractor: contractor.value,
					liableLeader: dutyLeader.value
				},
				pageIndex:currentPage.value,
				pageSize: pagesize.value
		}
	})
	if(res.message == "成功"){
		tableData.value = res.data.records;
		// 数据处理
		for(let i = 0; i < tableData.value.length; i++){
			if(tableData.value[i].status == "0"){
				tableData.value[i].status = "未生效";
			}
			if(tableData.value[i].status == "1"){
				tableData.value[i].status = "生效";
			}
			if(tableData.value[i].status == "9"){
				tableData.value[i].status = "删除";
			}
		}
		// 数组反转
	// tableData.value = tableData.value.slice().reverse();
		total.value = res.data.total;
	}
}
const showMain = ref(true); //是否展示主页contractor
const showAdd = ref(false); // 是否展示新增组件
const showChange = ref(false); // 是否显示修改组件
// 操作相关
const dutyLeader = ref(""); // 责任领导的值
const contractor = ref(""); // 承包人的值
const contractDate = ref(""); // 承包期限的值
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
const handleSizeChange = () => {};
// 当前第几页
const handleCurrentChange = (e) => {
  currentPage.value = e;
  getdatalist();
}
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
// end全选与反选
// 重置

const reset = () => {
  dutyLeader.value = "";
  contractor.value = "";
  contractDate.value = "";
  store.commit('changeResh',false);
  store.commit('changeResh',true);
};
// 子父通信
const changeshowAdd = (data, data2) => {
  showAdd.value = data; // 关闭新增组件
  showMain.value = data2; // 开启主页
};
// 子父通信 新增表格数据
const changetableData = (data) => {
if(data){
	getdatalist();
}
};
// 修改
// 父子通信
const changecontent = ref();
const changInfor = (row,index) => {
  if (row.status == "生效") {
    row.status = "1";
  }
  if (row.status == "未生效") {
    row.status = "0";
  }
  row.index = index;
  changecontent.value = row; // 传递修改数据
  showChange.value = true; // 开启修改组件
  showMain.value = false; // 关闭主页
  showAdd.value = false; // 关闭新增组件
};
// 子父 通信  关闭修改组件展示 同时 展示修改完成后的数据
const changetableData2 = (data,data2) => {
	if(data){
		getdatalist();
	}
 showChange.value = data2; // 关闭修改组件
   showMain.value = true; // 开启主页
};
// 新增
const addInfor = () => {
  showMain.value = false; // 关闭主页
  showAdd.value = true; // 开启新增组件
};
// 删除
const deletes = async(scope) => {
	
	let obj = ref({
		id:scope.row.id
	})
 const res =  await delectdata({
	 method:'post',
	 url:'/mgr/member-responsibility/delete/' + obj.value.id,
 })
if(res.message == '成功'){
	message("删除成功","success",1000);
	getdatalist();
}
};
// 查询
const search = ()=>{
	getdatalist();
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
  .handle {
    margin: 0.25rem 0.125rem;
    padding-left: 0.25rem;
    display: flex;
    align-items: center;
    width: 14.65rem;
    .btn {
      width: 1rem;
    }
    .timebox {
      margin-left: 0.25rem;
    }
    .ipt {
      width: 2rem;
      height: 0.4rem;
      margin-right: 0.125rem;
      margin-left: 0.125rem;
    }
    .serch {
      margin-right: 0.125rem;
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
      margin-right: 10.35rem;
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