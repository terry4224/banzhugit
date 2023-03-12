<template>
	<div class="box">
		<div class="card">月度绩效公示</div>
		<div class="handle">
			<PerformPbly @getstate="getstate"></PerformPbly>
			<el-button @click="allimport" type="success"
				style="margin-left: 0.125rem; margin-right: 1rem; background-color: #67c23a; color: #fff;"> <i
					class="fa fa-download" aria-hidden="true"></i>批量导出 </el-button>
			<el-button type="success"
				style="margin-left: 0.125rem; margin-right: 1rem; background-color: #67c23a; color: #fff;">
				<i class="fa fa-download" aria-hidden="true"></i> <a style="color: #fff;" :href="url">模板下载</a>
			</el-button>
			<div class="timebox">
				<el-config-provider :locale="locale">
					<el-date-picker ref="datePicker" @change="getvalue" :locale="locale" v-model="value1"
						type="daterange" format="YYYY~MM~DD" value-format="YYYY-MM-DD" range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-config-provider>
			</div>

			<el-input class="ipt" v-model="input" size="small" placeholder="姓名" clearable />

			<el-button @click="search" class="serchBtn" type="primary"> <i class="fa fa-search"></i>查询</el-button>
			<el-button plain class="fs" @click="reset"><i class="fa fa-undo"></i>重置</el-button>
		</div>
		<!-- 表格 -->
		<el-table @selection-change = "selectionchange" ref="table" :data="tableData" class="table" border style="width: 96%">
			<el-table-column type="selection" width="50"></el-table-column>
			<el-table-column prop="kpiDate" :sort-method="sortmethod" label="年月" width="auto" :sortable="true">
			</el-table-column>
			<el-table-column prop="userName" :sort-method="sortmethod" label="姓名" width="auto" :sortable="true">
			</el-table-column>
			<el-table-column prop="kpiScore" label="积分" width="auto" :sortable="true"></el-table-column>
			<el-table-column prop="gmtModified" label="更新时间" width="auto" :sortable="true"></el-table-column>
			<el-table-column label="操作" width="auto" #default={row}>
				<el-button @click="exports(row)" style="margin-right: .0625rem;color: #fff;background-color: #67c23a;">
					<i class="fa fa-download" aria-hidden="true"></i>导出</el-button>
				<el-button @click="delet(row)" style="margin-right: .0625rem;" type="danger">删除</el-button>
			</el-table-column>
		</el-table>
		<!-- end 表格 -->
		<!-- 分页 -->
		<div class="endbox">
			<el-button size="default" @click="allSelect">选择全部</el-button>
			<el-button class="allset" size="default" @click="opposite">反向选择</el-button>
			<el-pagination :pager-count="5" background @size-change="handleSizeChange"
				@current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]"
				:page-size="pagesize" layout="total,  prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>

		<!-- end分页 -->
	</div>
</template>

<script setup>
	// 时间戳转换
	import PerformPbly from '../components/PerformPbly.vue';
	import { message } from "../utils/message.js";
	import {exportExcel} from '../tools/download.js';
	import {searchdata,delectinfor} from '../api/performpbly.js';
	// 中文转换
	import zhCn from "element-plus/lib/locale/lang/zh-cn";
	import {
		reactive,
		ref,
		onMounted
	} from "vue";
	import store from '../store/index.js';
	onMounted(() => {
		getdata();
	});
	// 分页数据获取
	const getdata = async () => {
		const res = await searchdata({
			method: 'post',
			url: '/mgr/kpi-info/page',
			data: {

				endTime: endtime.value,
				pageNo: currentPage.value,
				pageSize: pagesize.value,
				startTime: starttime.time,
				userName: input.value

			}
		})
		if (res.message == "成功") {
			tableData.value = res.data.records;
			total.value = res.data.total;
			message("数据获取成功","success",1000)
		}
	}
	const locale = reactive(zhCn);
	// 操作相关
	const datePicker = ref();
	const input = ref(''); // 姓名输入框的值
	const value1 = ref([]); // 日期控件的值
	const starttime = ref("");
	const endtime = ref("");
	const getvalue = (e) => {
		if (value1.value != null) {
			starttime.value = value1.value[0];
			endtime.value = value1.value[1];
		}
	}
	const reset = () => {
		value1.value = '';
		input.value = '';
		store.commit('changeResh', false);
		store.commit('changeResh', true);
	}
	// end 操作相关
	// 表格相关
	// 单个导出
	const exports = (row) => {
		const importarr = ref([]); // 定义单个导出数组
		importarr.value.push({
			nianyue:row.kpiDate,
			name:row.userName,
			jifen:row.kpiScore,
			update:row.gmtModified,
		})
		const titleArr = ref(['年月','姓名','积分','更新时间']);
		exportExcel(importarr.value, 'KPT模板', titleArr.value, 'sheetName');
	}
	// 	当选择项发生变化时会触发该事件
	const appimportArrs = ref([]);
	const selectionchange = (e)=>{
		appimportArrs.value = e;
	}
	// 批量下载
	const allimport = ()=>{
		if(appimportArrs.value.length <= 0){
			message("复选框勾选不能为空","warning",2000);
			return;
		}
		const newarr = ref([]);
		for(let i = 0;i <appimportArrs.value.length;i++ ){
			newarr.value.push({
				nianyue:appimportArrs.value[i].kpiDate,
				name:appimportArrs.value[i].userName,
				jifen:appimportArrs.value[i].kpiScore,
				update:appimportArrs.value[i].gmtModified,
			})
			
		}
		const titleArr = ref(['年月','姓名','积分','更新时间']);
		exportExcel(newarr.value, 'KPT模板', titleArr.value, 'sheetName');
	}
	// 单个删除
	const delet = (row)=>{
		console.log(row)
	}
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
	const handleSizeChange = (e) => {

	}
	// 当前第几页
	const handleCurrentChange = (e) => {
		currentPage.value = e;
		getdata();
	}
	// 子父通信
	const getstate = (data)=>{
		if(data){
			getdata();
		}
	}
	// end 分页相关
	// 全选与反选
	const table = ref(); // 获取el-table节点
	// 全选
	const allSelect = () => {
		table.value.toggleAllSelection()
	}
	// 反选
	const opposite = () => {
		table.value.toggleAllSelection()
	}
	// 查询
	const search = ()=>{
		getdata();
	}
	// 下载模板
	const url = ref('http://120.46.206.152:29000/mgr/kpi-info/download/template');
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
			margin: .25rem .125rem;
			padding-left: .25rem;
			display: flex;
			align-items: center;
			width: 14.65rem;

			.timebox {
				width: 2.5rem;

				margin-left: .25rem;
			}

			.ipt {
				width: 2.575rem;
				height: .4rem;
				margin-right: .325rem;
				margin-left: 1rem;
			}

			.serchBtn {
				margin-right: .125rem;
			}

			.fs {
				color: #909399;
			}
		}

		// 表格
		.table {
			margin-left: 0.375rem;

			// 样式覆盖
			.astyle {
				color: #8ffeff;
				text-decoration: underline;
			}
		}

		.endbox {
			display: flex;
			margin-top: .5rem;
			padding-left: .375rem;

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

		:deep(.el-button+.el-button) {
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
