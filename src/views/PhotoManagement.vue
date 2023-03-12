<template>
	<div class="box">
		<!-- 删除提示框组件 -->
		<el-dialog top="4rem" v-model="dialogVisible" title="操作确认" width="30%" :before-close="handleClose">
			<div>
				<i style="
            color: #ff9900;
            margin-right: 0.125rem;
            margin-bottom: 0.125rem;
          " class="fa fa-question-circle-o" aria-hidden="true"></i><span
					style="font-family: '微软雅黑'; font-weight: 700; font-size: 0.175rem">是否删除图片?</span>
			</div>
			<div style="color: #999999; padding-left: 0.25rem">是否删除图片?</div>
			<template #footer #default={row}>
				<span class="dialog-footer">
					<el-button @click="closed">取消</el-button>
					<el-button type="primary" @click="deleted"> 确定 </el-button>
					<!-- <span style="display: none">{{ delectindex }}</span> -->
				</span>
			</template>
		</el-dialog>
		<!-- 删除提示框组件 -->
		<!-- 修改提示框组件 -->
		<el-dialog top="4rem" v-model="changeVisible" title="重命名文件" width="30%" :before-close="changeClose">
			<div>
				<span style="color:#999999';
    font-size:  .175rem;
    padding-left:  .075rem;  margin-right: .25rem;">旧的名称:</span>
				<el-input style="width: 3.25rem" disabled v-model="oldvalue" placeholder="Please input" />
			</div>
			<div style="color: #999999; margin-top: 0.25rem">
				*新的名称:
				<el-input style="width: 3.25rem; margin-left: 0.1875rem" v-model="input2" placeholder="输入内容" />
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="changeclosed">取消</el-button>
					<el-button type="primary" @click="changedeleted"> 保存 </el-button>
					<!-- <span style="display: none">{{ changeindex }}</span> -->
				</span>
			</template>
		</el-dialog>
		<!-- end修改提示框组件 -->
		<!-- 展示图片提示框 -->
		<el-dialog class="father" top="4rem" v-model="showVisible" title="展示图片" width="45%" :before-close="showClose">
			<el-checkbox-group class="chirdlen" v-model="showcheckList" @change="changevalue">
				<el-checkbox label="中心" />
				<el-checkbox label="党支部" />
				<el-checkbox label="工会" />
				<el-checkbox label="不展示" />
			</el-checkbox-group>
			<div class="boxboximg">
				<div class="imgbox" v-for="(item,index) in showphtholist" :index="index">
					<!-- <img class="imger" :src="item.icon" alt="" /> -->
					<el-image preview-teleported class="imger" :src="item.icon" 
						hide-on-click-modal :preview-src-list="item.srcList" />
					<div class="text">{{item.name}}</div>
				</div>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="showclosed">取消</el-button>
					<el-button type="primary" @click="showdeleted"> 保存 </el-button>
				</span>
			</template>
		</el-dialog>
		<!-- end展示图片提示框 -->
		<div class="titlebox">
			<div class="imgbox">
				<img class="imgsize" src="../assets/imges/u2126.svg" alt="" />
			</div>
			<div class="inform">
				<div class="manger">照片管理</div>
				<div class="miaoshu">此界面用于维护中心的所有活动所需展示的照片</div>
				<div>
					<div class="aaa">
						<ImgeUpload @getsuccess="getsuccess"></ImgeUpload>

						<el-button @click="showDilog" class="uploading" type="primary">展示图片</el-button>
						<el-button @click="load" class="export" type="success"><i class="fa fa-download"
								aria-hidden="true"></i>批量下载</el-button>
						<el-button @click="alldelect" class="uploading" type="danger"><i class="fa fa-trash"
								aria-hidden="true"></i> 批量删除</el-button>

						<el-select @change="getSelectValue" v-model="selectvalue" class="m-2" placeholder="展示全部"
							size="large">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value" />
						</el-select>
					</div>
				</div>
			</div>
			<div class="numbox">
				<i class="fa fa-picture-o" aria-hidden="true"></i><span class="num" style="color: #999999">{{numberimg}}</span>
				<i class="fa fa-clock-o" aria-hidden="true"></i>
				<span style="color: #999999">8</span><span style="color: #999999">小时前</span>
			</div>
		</div>
		<!-- 表格 -->
		<el-table @selection-change = "selectChange"  ref="table" :data="tableData" class="table" border
			style="width: 96%">
			<el-table-column type="selection" width="50"></el-table-column>
			<el-table-column prop="num" label="编号" width="80"></el-table-column>
			<el-table-column slot-scope="tableData" prop="icon" label="图片展示" width="auto">
				<template #default="{ row }">
					<el-image preview-teleported style="width: 0.625rem; height: 0.625rem" :src="row.icon" fit="fill"
						hide-on-click-modal :preview-src-list="row.srcList" />
				</template>
			</el-table-column>
			<el-table-column prop="name" label="图片名称" width="auto"></el-table-column>
			<el-table-column prop="isShowFront" label="生效" width="auto"></el-table-column>
			<el-table-column prop="gmtCreate" label="上传时间" width="auto" :sortable="true"></el-table-column>
			<el-table-column label="操作" width="auto">
				<template v-slot="scope">
					<el-button @click="showdialog(scope.row)" type="danger">删除</el-button>
					<el-button @click="changedialog(scope)" style="margin-right: 5px; margin-left: 5px" type="warning">
						修改</el-button>
					<el-button @click="downs(scope.row.icon, scope.row.name)" type="success">下载</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- end 表格 -->
		<!-- 分页 -->
		<div class="endbox">
			<el-button size="default" @click="allSelect">选择全部</el-button>
			<el-button class="allset" size="default" @click="opposite">反向选择</el-button>
			<el-config-provider :locale="locale">
				<el-pagination :pager-count="5" background @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]"
					:page-size="pagesize" layout="total,  prev, pager, next, jumper" :total="total">
				</el-pagination>
			</el-config-provider>
		</div>
		<!-- end分页 -->
	</div>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted
	} from "vue";
	import {
		getphotolist,delectimg,changeimginfor
	} from '../api/photomangent.js';
	// 对话框
	import {
		ElMessageBox
	} from "element-plus";
	// 导入上传组件
	import ImgeUpload from '../components/ImageUpload.vue'
	// 时间戳转换
	import {
		createTime
	} from "../tools/timestamp/photomangent.js";
	// 中文转换
	import zhCn from "element-plus/lib/locale/lang/zh-cn";
	import {
		message
	} from "../utils/message";
	const locale = reactive(zhCn);
	const table = ref();
	// 初始化数据
	onMounted(async () => {
	getimglists();
	})
	const numberimg = ref();
	const showphtholist = ref([]);
	const shwophotoarr = ref([]);	// 定义展示图片数组
	// 获取数据列表
	const getimglists = async()=>{
		const res = await getphotolist({
			method: 'post',
			url: '/mgr/pcture-info/list',
			data: {
				orderBy: "gmt_modified",
				packages: packages.value,
				pageNo: currentPage.value,
				pageSize: pagesize.value
			}
		})
		if (res.code == "00000") {
			tableData.value = res.data.records;
			tableData.value.forEach(item => {
				//为base64 数据 添加 头
				const imageDataUrl = 'data:image/png;base64,' + item.icon
				item.icon = imageDataUrl;
				item.srcList = [item.icon];
				if(item.isShowFront == 0){
					item.isShowFront = "未生效";
				}
				if(item.isShowFront == 1){
					item.isShowFront = "生效";
				}
			})
			
			createTime(tableData.value);
			numberimg.value =  res.data.total;
			total.value = res.data.total;
		}
	}
	// 删除提示框组件
	// const delectindex = ref(); // 定义删除弹框的索引
	const dialogVisible = ref(false);
	const handleClose = (done) => {
		done();
	};
	// 点击删除
	const simbalId = ref([])
	const showdialog = (e) => {
		simbalId.value[0] = e.id;
		dialogVisible.value = true;
		// delectindex.value = e;
	};
	const closed = () => {
		dialogVisible.value = false;
	};
	// 点击确定删除
	const deleted = async() => {
		const resdele = await delectimg({
			method:'post',
			url:'/mgr/pcture-info/delByIds',
			data:simbalId.value
		})
		if(resdele.message == "删除成功"){
			message("删除成功","success",1000);
		}
		getimglists();
		dialogVisible.value = false;
	};
	// end删除提示框组件

	// 修改提示框组件
	const changeindex = ref(); // 定义修改弹框的索引
	const input = ref("图片名称.png");
	const input2 = ref("");
	const oldvalue = ref("");
	const changeVisible = ref(false);
	const packages = ref(0) // 0表示默认展示全部
	const changeClose = (done) => {
		done();
	};
	// 修改
	const imgid = ref([]); // 修改ID定义
	const changedialog = (scope) => {
		changeVisible.value = true; // 开启修改弹框
		// 旧的名称赋值
		oldvalue.value = scope.row.name;
		imgid.value[0] = scope.row.id;
		// changeindex.value = scope.$index; // 具体修改的数组索引赋值
	};
	const changeclosed = () => {
		changeVisible.value = false;
	};
	// 点击确定保存
	const changedeleted = async() => {
		if(input2.value == ''){
			message("新的名称不能为空","warning",1000);
			return
		}
		const res = await changeimginfor({
			method:'post',
			url:'/mgr/pcture-info/updateParamerByIds',
			data:{
				ids:imgid.value,
				name:input2.value
			}
		})
		if(res.message == '成功'){
			message("修改成功","success",1000);
			getimglists();
		}
		input2.value = '';
		changeVisible.value = false;
		
		// tableData.value[changeindex.value].imgname = input2.value; //具体修改的数组索引的图片名字，改成修改组件中的名字
		// ;
	};
	// end修改提示框组件
	// 展示图片提示框
	const showcheckList = ref(["中心"]);
	const showVisible = ref(false);
	const showDilog = () => {
		showVisible.value = true;
	};
	const showClose = (done) => {
		done();
	};
	// 保存
	const showdeleted = async() => {
		// 数据处理
		for(let i = 0; i <= showcheckList.value.length;i++){
			if(showcheckList.value[i] == '中心'){
				showcheckList.value[i] = 1;
			}
			if(showcheckList.value[i] == '党支部'){
				showcheckList.value[i] = 2;
			}
			if(showcheckList.value[i] == '工会'){
				showcheckList.value[i] = 3;
			}
			if(showcheckList.value[i] == '不展示'){
				showcheckList.value[i] = 4;
			}
		}
		const arrid = showphtholist.value.map(item=>{
			return item.id;
		})
		// 请求
		const result = await savechange({
			method:'post',
			url:'/mgr/pcture-info/updateParamerByIds',
			data:{
				ids:arrid,
				packages:showcheckList.value
			}
		})
		if(result.message == "成功"){
			message("保存成功","success",1000);
		}
		showVisible.value = false;
	};
	const showclosed = () => {
		showVisible.value = false;
	};
	const changevalue = (e) => {
		showcheckList.value = e;
		
	};
	// end展示图片提示框
const getsuccess = (data)=>{
	if(data){
		getimglists();
	}
}
	// 全选
	const allSelect = () => {
		table.value.toggleAllSelection();
	};
	// 反选
	const opposite = () => {
		table.value.toggleAllSelection();
	};
	// 下拉框
	const selectvalue = ref("展示全部");
	const options = [{
			value: "展示全部",
			label: "展示全部",
		},
		{
			value: "中心",
			label: "中心",
		},
		{
			value: "党支部",
			label: "党支部",
		},
		{
			value: "工会",
			label: "工会",
		},
		{
			value: "不展示",
			label: "不展示",
		},
	];
	const getSelectValue = (e) => {
		if(selectvalue.value == "展示全部"){
			packages.value = 0;
			getimglists();
		}
		if(selectvalue.value == "中心"){
			packages.value = 1;
			getimglists();
		}
		if(selectvalue.value == "党支部"){
			packages.value = 2;
			getimglists();
		}
		if(selectvalue.value == "工会"){
			packages.value = 3;
			getimglists();
		}
		if(selectvalue.value == "不展示"){
			packages.value = 4;
			getimglists();
		}
		
	};
	// end下拉框板块
	// 表格相关
	const imgUrl = ref("");
	const tableData = ref([]);
	const downloadIamge = (imgsrc, name) => {
		var image = new Image();
		// 解决跨域 Canvas 污染问题
		image.setAttribute("crossOrigin", "anonymous");
		image.onload = function() {
			var canvas = document.createElement("canvas");
			canvas.width = image.width;
			canvas.height = image.height;
			var context = canvas.getContext("2d");
			context.drawImage(image, 0, 0, image.width, image.height);
			var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
			var a = document.createElement("a"); // 生成一个a元素
			var event = new MouseEvent("click"); // 创建一个单击事件
			a.download = name || "photo"; // 设置图片名称
			a.href = url; // 将生成的URL设置为a.href属性
			a.dispatchEvent(event); // 触发a的单击事件
		};
		image.src = imgsrc;
	};
	// 单个下载
	const downs = (url, name) => {
		imgUrl.value = url;
		if (imgUrl.value !== undefined) {
			downloadIamge(imgUrl.value, name);
		} else {
			message("下载失败", "warning");
		}

	};
	// 当选择项发生变化时会触发该事件
	const simbalnum = ref([]); //用来进行批量下载和删除
	const selectChange = (e) => {
	shwophotoarr.value = e;
	simbalnum.value = e;
	showphtholist.value = e;
	};

	// 多个下载
	const load = () => {
		if(simbalnum.value.length <= 0){
			message("必须勾选复选框","warning",2000);
			return;
		}
			simbalnum.value.forEach((item) => {
				if (item.icon !== undefined) {
					downloadIamge(item.icon, item.name);
				}
			});
	};
	// end表格相关
	// 批量删除
	const alldelect = async() => {
	if(simbalnum.value.length <= 0){
		message("必须勾选复选框","warning",2000);
		return;
	}
	const arrdeletidlist =  simbalnum.value.map(item=>{
			return item.id;
	})
	// 数据请求
	const resdata = await delectimg({
		method:'post',
		url:'/mgr/pcture-info/delByIds',
		data:arrdeletidlist
	})
	if(resdata.message == "删除成功"){
		message("批量删除成功", "success",1000);
	}
	getimglists();
	}
	// 分页相关
	const currentPage = ref(1); //选中页数
	const pagesize = ref(10); // 每页数据大小
	const total = ref(20); // 数据总条数
	// 每页展示多少条数据
	const handleSizeChange = (e) => {
	};
	// 当前第几页
	const handleCurrentChange = (e) => {
		currentPage.value = e;
	    getimglists()
	};
	// end 分页相关
</script>
<style lang="scss" scoped>
	.box {
		width: 20rem;
		height: 17rem;
		background-color: #fff;

		.titlebox {
			display: flex;
			padding-top: 0.75rem;
			margin-left: 0.375rem;

			.imgbox {
				width: 1.5rem;
				height: 1.5rem;
				background-color: rgb(227, 240, 252);
				display: flex;
				align-items: center;
				justify-content: center;

				.imgsize {
					width: 1.1125rem;
					height: 0.95rem;
				}
			}

			.inform {
				width: 700px;
				margin-left: 0.25rem;

				.manger {
					color: #8ea1b3;
					font-weight: 700;
					font-size: 0.225rem;
					margin: 0.125rem 0;
				}

				.miaoshu {
					font-family: "微软雅黑";
					font-weight: 400;
					text-decoration: none;
					color: #999999;
					font-size: 0.175rem;
					margin-bottom: 0.3rem;
				}

				.aaa {
					display: flex;
				}

				.uploading {
					margin-right: 0.125rem;
					margin-left: 0.125rem;
				}

				.export {
					margin-right: 0.125rem;
				}
			}

			.numbox {
				margin-left: 4.25rem;

				.fa-picture-o {
					color: #999999;
				}

				.fa-clock-o {
					color: #999999;
				}

				.num {
					margin-right: 0.75rem;
				}
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

		.father {
			position: relative;

			.chirdlen {
				position: absolute;
				left: 1.1rem;
				top: 0.2rem;
			}

			.boxboximg {
				width: 11.8rem;
				display: flex;
				flex-flow: wrap;

				.imgbox {
					width: 1.875rem;
					margin-right: 0.25rem;

					.imger {
						width: 1.875rem;
						height: 1.875rem;
						display: block;
					}

					.text {
						width: 1.85rem;
						text-align: center;
						border: 1px solid #f2f2f2;
					}
				}
			}
		}

		:deep(.el-dialog__header) {
			background-color: #f5f5f5;
		}

		:deep(.el-dialog__headerbtn) {
			background-color: #f5f5f5;
			top: 0;
		}

		:deep(.dialog-footer button:first-child) {
			margin-right: 0.125rem;
		}

		:deep(.el-dialog__title) {
			font-size: 0.175rem;
			color: #666666;
			font-weight: bold;
			font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
		}

		:deep(el-table th.el-table__cell) {
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

		:deep(.el-input--large .el-input__wrapper) {
			width: 1.25rem;
			height: 0.4rem;
		}

		:deep(.el-dialog__body) {
			border-bottom: 2px solid #f2f2f2;
		}
	}
</style>
