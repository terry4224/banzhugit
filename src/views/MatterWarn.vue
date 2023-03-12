<template>
	<div class="box">
		<div class="card">项目里程碑提醒</div>
		<div class="handle">
			<el-button type="primary" style="margin-right: 1rem">
				<i class="fa fa-refresh"></i>刷新
			</el-button>
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
				    end-placeholder="结束日期"
				  >
				  </el-date-picker>
				</el-config-provider>
			</div>

			<el-input class="ipt" v-model="input" size="small" placeholder="公告标题" clearable />

			<el-button type="primary" @click="search"> <i class="fa fa-search"></i>查询</el-button>
			<el-button plain class="fs" @click="reset"><i class="fa fa-undo"></i>重置</el-button>
		</div>
		<!-- 表格 -->
		<el-table ref="table" @select="select" :data="tableData" class="table" border style="width: 96%">
			<el-table-column type="selection" width="50"></el-table-column>
			<el-table-column prop="num" label="序号" width="80" :sortable="true"></el-table-column>
			<el-table-column prop="issuer" :sort-method="sortmethod" label="发布人" width="auto" :sortable="true">
			</el-table-column>
			<el-table-column prop="title" label="公告标题" width="auto" :sortable="true"></el-table-column>
			<el-table-column prop="publishTime" label="发布日期" width="auto" :sortable="true"></el-table-column>
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
	import {
		releaseDate
	} from "../tools/timestamp/matterwarn.js";
	// 中文转换
	import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { message } from "@/utils/message.js";
	const locale = zhCn;
	import {
		getData
	} from '../api/matterwarn.js';
	import {
		reactive,
		ref,
		onMounted
	} from "vue";
	import store from '../store/index.js';
	onMounted(() => {
		createData();
	})
	// 初始化获取数据
	const createData = async()=>{
		const res = await getData({
			method: 'post',
			url: '/mgr/reminder/page',
			data: {
				data: {
					endDate: endtime.value,
					startDate: starttime.value,
					title: input.value
				},
				pageIndex: currentPage.value,
				pageSize: pagesize.value
			}
		})
		if(res.code == "00000"){
			tableData.value = res.data.records;
			releaseDate(tableData.value);
			total.value = res.data.total;
		}
	}
	const starttime = ref(); // 开始时间
	const endtime = ref(); // 结束时间
	// 操作相关
	const datePicker = ref();
	const input = ref(""); // 公告标题的值
	const value1 = ref([]); // 日期控件的值
	const getvalue = (e) => {
		console.log(value1.value);
	};
	const reset = () => {
		input.value = '';
		value1.value = '';
		store.commit('changeResh', false);
		store.commit('changeResh', true);
	}
	// end 操作相关
	// 表格相关
	const ceshi = ref("");
	const tableData = ref([]);
	// 表格排序
	const sortmethod = (a, b) => {
		if (a.createDate - b.createDate > 0) {
			return 1;
		} else {
			return -1;
		}
	};
	const select = (e) => {
		ceshi.value = e[0];
		console.log(ceshi._rawValue);
	};
	// end表格相关
	// 分页相关
	const currentPage = ref(1); //选中页数
	const pagesize = ref(10); // 每页数据大小
	const total = ref(20); // 数据总条数
	// 每页展示多少条数据
	const handleSizeChange = (e) => {};
	// 当前第几页
	const handleCurrentChange = (e) => {
		currentPage.value = e;
		if(value1.value.length != 0){
			starttime.value = value1.value[0];
			endtime.value = value1.value[1];
		}
		createData(); // 初始话选中赋值
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
	// 查询
	const search = ()=>{
		createData();
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

			.timebox {
				width: 2.5rem;

				margin-left: 0.25rem;
			}

			.ipt {
				width: 1.575rem;
				height: 0.4rem;
				margin-right: 0.125rem;
				margin-left: 1rem;
			}

			.fs {
				color: #909399;
			}
		}

		// 表格
		.table {
			margin-left: 0.375rem;
		}

		.endbox {
			display: flex;
			margin-top: 0.5rem;
			padding-left: 0.375rem;

			.allset {
				margin-right:10.25rem;
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
