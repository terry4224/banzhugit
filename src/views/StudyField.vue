<template>
	<div class="box">
		<div class="card">学习园地</div>
		<div class="handle">
			<UploadFile @getchange="getchange"></UploadFile>
			<el-button @click="deletsall" style="background-color: #f56c6c;color: #fff;margin-left: 0.125rem;"><i class="fa fa-trash" aria-hidden="true"></i> 批量删除</el-button>
			<div class="timebox">
				<el-config-provider :locale="locale">
					<el-date-picker ref="datePicker" @change="getvalue" :locale="locale" v-model="value1"
						type="daterange" format="YYYY~MM~DD" value-format="YYYY-MM-DD" range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-config-provider>
			</div>

			<el-input class="ipt" v-model="input" size="small" placeholder="资料名称" clearable />

			<el-button class="serchBtn" type="primary" @click="search"> <i class="fa fa-search"></i>查询</el-button>
			<el-button plain class="fs" @click="reset"><i class="fa fa-undo"></i>重置</el-button>
		</div>
		<!-- 表格 -->
		<el-table @selection-change = "selectChange" ref="table" :data="tableData" class="table" border style="width: 96%">
			<el-table-column type="selection" width="50"></el-table-column>
			<el-table-column prop="num" label="序号" width="80" :sortable="true"></el-table-column>
			<el-table-column prop="fileName" :sort-method="sortmethod" label="资料名称" width="auto" :sortable="true">
			</el-table-column>
			<el-table-column label="资料附件" width="auto" :sortable="true" #default={row}>
				<a class="astyle" :href="baseurl+row.id">{{row.dataAccessory}}</a>
			</el-table-column>
			<el-table-column prop="createTime" label="更新时间" width="auto" :sortable="true"></el-table-column>
			<el-table-column label="操作" width="auto" #default={row}>
				<el-button style="margin-right: .0625rem;" type="danger" @click="delets(row)">删除</el-button>
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
	import {
		updateDate
	} from '../tools/timestamp/studyField.js';
	import {
		getdatalist,deletesimbal,deletesimbalss
	} from '../api/studyfield.js';
	// 中文转换
	import zhCn from "element-plus/lib/locale/lang/zh-cn";
	import UploadFile from '../components/StudyImport.vue';
	import {message} from '../utils/message.js';
	import {
		reactive,
		ref,
		onMounted
	} from "vue";
	import store from '../store/index.js';
	const baseurl = 'http://120.46.206.152:29000/mgr/study/download/';
	const starttime = ref("");
	const endtime = ref("");
	onMounted( () => {
		createlist();
	});
	// 获取数据
	const createlist = async()=>{
		const res = await getdatalist({
			method: 'post',
			url: '/mgr/study/page',
			data: {
				data: {
					endDate:endtime.value,
					fileName: input.value,
					startDate: starttime.value
				},
				pageIndex: currentPage.value,
				pageSize: pagesize.value
			}
		})
		if(res.code == "00000"){
			tableData.value = res.data.records;
			// 数据处理
			tableData.value.forEach(item=>{
				// item.id = 'http://120.46.206.152:29000/mgr/study/download/' + item.id;
				item.dataAccessory = "资料下载";
			})
			total.value = res.data.total;
			updateDate(tableData.value)
		}
	}
	const locale = reactive(zhCn);
	// 操作相关
	const datePicker = ref();
	const input = ref(''); // 资料名称输入框的值
	const value1 = ref([]); // 日期控件的值
	const getvalue = (e) => {
		console.log(value1.value);
	}
	const reset = () => {
		value1.value = '';
		input.value = '';
		store.commit('changeResh', false);
		store.commit('changeResh', true);
	}
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
	const handleSizeChange = (e) => {

	}
	// 当前第几页
	const handleCurrentChange = (e) => {
		currentPage.value = e;
		createlist();
	}
	// end 分页相关
	
	// 选项改变促发事件
	const selectlittle = ref(0); // 定义change数量
	const arrlists = ref([]); // 定义批量全删除数组
	
	// 全选与反选
	const table = ref(); // 获取el-table节点
	// 全选
	const allSelect = () => {
		// table.value.toggleAllSelection() // 切换全选与不全选
	}
	// 反选
	const opposite = () => {
		table.value.toggleAllSelection() // 切换全选与不全选
	}
	// 删除
	const delets = async (row)=>{
		const result = await deletesimbal({
			url:'/mgr/study/delete/' + row.id
		})
		if(result.message == "删除成功"){
			message("删除成功","success",1000);
			createlist();
		}
	}
	// 批量删除
	const deletsall = async()=>{
		if(arrlists.value.length <= 0){
			message("复选框不能为空","warning",2000);
			return;
		}
		const numarr = arrlists.value.map(item=>{
			 	return item.id
			})
			const res = await deletesimbalss({
				method:"post",
				url:'/mgr/study/batch/delete',
				data:{
					ids:numarr
				}
			})
			if(res.message == "删除成功"){
				message("批量删除成功","success",1000);
				createlist();
			}
	}
	// 点击复选框事件
	const selectChange = (e)=>{
		arrlists.value = e
	}
	// 查询
	const search = ()=>{
		starttime.value = value1.value[0];
		endtime.value = value1.value[1];
		createlist();
	}
	// 子触发函数
	const getchange = (data)=>{
		if(data == true){
			createlist();
		}
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
				color: #007165;
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
