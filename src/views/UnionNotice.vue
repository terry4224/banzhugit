<template>
	<div class="box" v-if="showMain">
		<div class="card">工会通知记录</div>
		<div class="handle">
			<el-button @click="addInfor" class="btn" type="primary" style=" margin-right: .125rem"><i class="fa fa-plus"
					aria-hidden="true"></i> 新增 </el-button>
					<el-button @click="alldelect" class="uploading" type="danger"><i class="fa fa-trash"
							aria-hidden="true"></i> 批量删除</el-button>
			<el-input class="ipt" v-model="issuer" size="small" placeholder="发布人" clearable />
			<el-input class="ipt" v-model="noticeTitle" size="small" placeholder="通知标题" clearable />
			<div class="timebox">
				<el-config-provider :locale="locale">
					<el-date-picker ref="datePicker" @change="getvalue" :locale="locale" v-model="value1" type="date"
						placeholder="选择日期" format="YYYY~MM~DD" value-format="YYYY-MM-DD">
					</el-date-picker>
				</el-config-provider>
			</div>
			<el-button type="primary" class="serch" @click="serch"> <i class="fa fa-search"></i>查询</el-button>
			<el-button plain class="fs" @click="reset"><i class="fa fa-undo"></i>重置</el-button>
		</div>
		<!-- 表格 -->
		<el-table @selection-change="selectionchange" ref="table" :data="tableData" class="table" border style="width: 96%">
			<el-table-column type="selection" width="60"></el-table-column>
			<el-table-column prop="num" label="序号" width="90" :sortable="true"></el-table-column>
			<el-table-column prop="createUserName" :sort-method="sortmethod" label="发布人" width="auto" :sortable="true">
			</el-table-column>
			<el-table-column prop="title" label="通知标题" width="auto" :sortable="true"></el-table-column>
			<el-table-column prop="publishTime" label="发布日期" width="auto" :sortable="true"></el-table-column>
			<el-table-column label="操作" width="auto">
				<template v-slot="scope">
					<el-button type="danger" @click="declets(scope.row,scope)">删除</el-button>
					<el-button style="margin-left: 5px;" type="warning" @click="changInfor(scope.row,scope.$index)">修改
					</el-button>
				</template>
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
	<NoticeAdd @changeNoticeAdd="changeNoticeAdd" v-if="showNoticeAdd"></NoticeAdd>
	<NoticeChange @changeshowInfor="changeshowInfor" v-if="showChangeInfor" :changeData="changeData"></NoticeChange>
</template>

<script setup>
	// 引入添加组件
	import NoticeAdd from '../components/UnionNoticeadd.vue';
	import {
		message
	} from '../utils/message.js';
	import {
		getlist,
		delectuntioce
	} from '../api/unionnotice.js'; // 获取通知列表
	// 引入修改组件
	import NoticeChange from '../components/UnionNoticeaChange.vue';
	// 时间戳转换
	import {
		releaseDate
	} from '../tools/timestamp/matterwarn.js';
	// 中文转换
	import zhCn from "element-plus/lib/locale/lang/zh-cn";
	import {
		computed,
		watch,
		onMounted
	} from "vue";
	import {
		reactive,
		ref
	} from "vue";
	import store from '../store/index.js';
	const locale = reactive(zhCn);
	const showMain = ref(true); //是否展示主页
	// 操作相关
	const datePicker = ref();
	const issuer = ref(''); // 发布人的值
	const noticeTitle = ref(''); // 通知标题的值
	const value1 = ref([]); // 日期控件的值
	// 初始化页面获取工会通知列表
	onMounted( async() => {
		fungetlist();
	})
	// 获取列表函数
	const fungetlist = async () => {
		if(value1.value.length <= 0){
			value1.value = "";
		}
		const res2 = await getlist({
			method: 'post',
			url: '/mgr/cms-info/union/list',
			data: {
				date: value1.value,
				pageNo: currentPage.value,
				pageSize: pagesize.value,
				title: noticeTitle.value,
				user: issuer.value
			}
		})
		if (res2.code == "00000") {
			tableData.value = res2.data.records;
			total.value = res2.data.total;
		}
	}
	const getvalue = () => {

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
	releaseDate(tableData.value);
	// end表格相关
	// 分页相关
	const currentPage = ref(1); //选中页数
	const pagesize = ref(10); // 每页数据大小
	const total = ref(0); // 数据总条数
	// 每页展示多少条数据
	const handleSizeChange = () => {

	}
	// 当前第几页
	const handleCurrentChange = (e) => {
		currentPage.value = e;
		fungetlist();
		if (issuer.value != '' && noticeTitle.value != '' && value1.value != '') {
			serchlist();
		}
	}
	// end 分页相关
	// 全选与反选
	const table = ref(); // 获取el-table节点
	// 全选
	const allSelect = () => {
		table.value.toggleAllSelection();
	}
	// 反选
	const opposite = () => {
		table.value.toggleAllSelection();
	}
	// end全选与反选
	// 新增组件相关
	const showNoticeAdd = ref(false); // 是否显示新增组件
	// 新增按钮事件
	const addInfor = () => {
		showNoticeAdd.value = true; // 开启新增组件
		showMain.value = false // 关闭主页
	}
	// 子传父
	const changeNoticeAdd = async (data, data2) => {
		showNoticeAdd.value = data;
		showMain.value = data2;
		fungetlist();
	}
	// end新增组件相关
	// 修改组件相关
	const showChangeInfor = ref(false); // 是否显示修改组件
	// 开启修改组件
	const changeData = ref({})
	const changInfor = (row, index) => {
		row.index = index
		changeData.value = row;
		showChangeInfor.value = true; // 开启修改组件
		showNoticeAdd.value = false; // 关闭新增组件
		showMain.value = false; // 关闭主页
	}
	// 子传父
	const changeshowInfor = (data, data2, data3) => {
		tableData.value[data3.index].title = data3.title // 修改后的通知标题
		showChangeInfor.value = data;
		showMain.value = data2;
	}
	// end修改组件相关
	// 当选择项发生变化时会触发该事件
	const deletarrs = ref([]); // 定义批量删除数组
	const selectionchange = (e)=>{
		deletarrs.value = e;
	}
	// 删除
	const declets = async (row,scope) => {
		const res = await delectuntioce({
			method: 'post',
			url: '/mgr/cms-info/union/deleteById',
			data:[row.id]
		})
		if(res.data.code == "00000"){
			message("删除成功","success",1000);
			fungetlist();
		}
	}
	// 批量删除
	const alldelect = async()=>{
		if(deletarrs.value.length <= 0){
			message("复选框勾选不能为空","warning",1000);
			return;
		}
		// 数据处理
	const newarr = deletarrs.value.map(item=>{
			return item.id
		})
		const res2 = await delectuntioce({
			method: 'post',
			url: '/mgr/cms-info/union/deleteById',
			data:newarr
		})
		if(res2.data.code == "00000"){
			message("批量删除成功","success",1000);
			fungetlist();
		}
	}
	// 重置
	const reset = () => {
		issuer.value = ''; // 发布人的值
		noticeTitle.value = ''; // 通知标题的值
		value1.value = ''; // 日期控件的值
		store.commit('changeResh', false);
		store.commit('changeResh', true);
	}
	const serchlist = async () => {
		fungetlist();
	}
	// 查询
	const serch = () => {
		serchlist();
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

			.btn {
				width: 1rem;
					.uploading{
						margin-right: 0.125rem;
						margin-left: 0.125rem;
					}
						
			}

			.timebox {
				width: 2.5rem;

				margin-left: .25rem;
			}

			.ipt {
				width: 2rem;
				height: .4rem;
				margin-right: .125rem;
				margin-left: .125rem;
			}

			.serch {
				margin-left: .5rem;
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

		}

		.endbox {
			display: flex;
			margin-top: .5rem;
			padding-left: .375rem;

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
