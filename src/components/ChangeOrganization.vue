<template>
<div class="app">
 <el-dialog v-model="dialogVisible" title="修改组织" width="40%" @close="close" :close-on-click-modal="false">
      <div class="box">
        <div class="left"> <span class="s1">*</span><span class="s2">已选员工:</span></div>
        <div class="right">
          <div class="content"  v-for="(item,index) in selectdata" :key="index">
           
            <div>
                  <i class="fa fa-user-circle" aria-hidden="true"></i>
            <span>{{item.name}}</span> <span class="zuzhi">{{item.departmentId}}</span>
            </div>
            <div> <i @click="deletes(index)" class="fa fa-minus-square" aria-hidden="true"></i></div>
          </div>
        </div>
      </div>
      <div class="select">
         <div class="l1"> <span class="d1">*</span><span class="d2">选择组织:</span></div>
         <el-select @change ="changeValue" v-model="value" clearable placeholder="选择组织">
    <el-option @click="clickitem(item.id)"
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button style="width:1rem" @click="cancel">取消</el-button>
        <el-button style="width:1rem" type="primary" @click="save">
          保存
        </el-button>
      </span>
    </template>
    </el-dialog>
</div>
   
</template>

<script  setup>
import { ref ,computed,watchEffect,onMounted} from "vue";
import {message} from '../utils/message.js';
import {belongorganization,changeuserinfor} from '../api/personmagent.js'
onMounted(async()=>{
	const res = await belongorganization({
		url: '/mgr/department-info/department/findAllAndEmployee'
	})
	if (res.message == "成功") {
		for (let i = 0; i < res.data.length; i++) {
			options.value.push({
				value: res.data[i].name,
				label: res.data[i].name,
				id: res.data[i].id,
			})
		}
	}
})
const value =  ref('') // 下拉框的值
const emit = defineEmits(["ifshow"]);
const ids = ref([]); // 定义id数组
 const selectdata = ref([]); // 数据
 const departmentId = ref(''); // 所属组织ID
// 接收父组件数据  控制对话框显示与否
const props = defineProps({
       showchange:{
           type:Boolean,
      },
      selectdata:{
        type:Array
      }
  })
 const dialogVisible = ref();
     watchEffect(()=>{ // watchEffect才可以在父组件中实时传递数据
        dialogVisible.value = props.showchange;
    })

     watchEffect(()=>{ // watchEffect才可以在父组件中实时传递数据
        selectdata.value = props.selectdata;
    })
const options = ref([]);
// 获取下拉框选中的值
const changeValue = (e)=>{
  value.value = e;
}
// 删除事件
const deletes =(index)=>{
    if( selectdata.value.length == 1){
message("至少保留一项,不可删除此项","warning");
return
  }
  selectdata.value.splice(index,1); // 删除选项
}
// 关闭按钮事件
const close = ()=>{
emit("ifshow",false,3) 
}
// 点击下拉框事件
const clickitem = (id)=>{
	departmentId.value = id;
}
// 保存事件
const save = async()=>{
  if(value.value == ''){
    message("选择组织为必填选项",'warning');
	return;
  }
  selectdata.value.forEach(item=>{
  	ids.value.push(item.id);
  })
  const res = await changeuserinfor({
  	  method:'post',
  	  url:'/mgr/employee-info/employee/updateParamByIds',
  	  data:{
  		  departmentId: departmentId.value, // 所属组织ID
  		  	ids:ids.value, // 人员ID
  	  }
  })
  if(res.message == '成功'){
	  message("保存成功","success",1000);
	  emit("ifshow",false,8); // 回传显示与否
  }
}
// 取消事件
const cancel = ()=>{
emit("ifshow",false,3) 
}
</script>
<style lang="scss" scoped>
.app{
.box {
  display: flex;
  align-items: center;
  .left {
    .s1 {
      color: #ff4a40;
    }
    .s2 {
      margin-left: 0.05rem;
    }
  }
  .right{
    .content{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: .125rem;
      width: 5rem;
      height: .5rem;
      border: 1px solid #eee;
      .fa-user-circle{
        color: #cccccc;
        font-size: .25rem;
        margin: 0 .125rem;
      }
      .fa-minus-square{
           color: #cccccc;
           font-size: .2rem;
           margin-right: .375rem;
      }
      .zuzhi{
        color: #999999;
        margin-left: .125rem;
        margin-right: 0.88rem;
      }
    }
  }
}

.select{
  display: flex;
  margin-top: .25rem;
  align-items: center;
  .l1 {
    margin-right: .125rem;
    .d1 {
      color: #ff4a40;
    }
    .d2 {
      margin-left: 0.05rem;
    }
  }
}
:deep(.el-dialog__body) {
    padding-left: .625rem;
    border-bottom: 2px solid #eee;
    min-height: 3.5rem;
}
:deep(.el-select .el-input__wrapper) {
    width: 4.75rem;
    height: .5rem;
}
:deep(.el-textarea__inner) {
  height: 1.25rem;
}
:deep(.el-dialog__header) {
  padding: var(--el-dialog-padding-primary);
  padding-bottom: 0.125rem;
  margin-right: 0;
  word-break: break-all;
  background-color: #eee;
}
:deep(.el-dialog__title) {
  font-weight: bolder;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
  width: var(--el-date-editor-width);
  height: var(--el-input-height, var(--el-component-size));
  width: 4.84rem;
}
:deep(.el-dialog__footer) {
  text-align: right;
  margin-top: .125rem;
}
}

</style>
