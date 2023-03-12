<template>
  <div class="box">
    <div class="card">中心架构管理</div>
    <div class="handle">
      <el-button
        @click="addnode('add')"
        type="primary"
        style="margin-right: 0.2rem"
        color="#008476"
      >
        新增节点
      </el-button>
      <el-button
        @click="addnode('update')"
        type="warning"
        style="margin-right: 0.2rem"
      >
        修改节点
      </el-button>
      <el-button @click="deletnode" type="danger" style="margin-right: 0.2rem">
        删除节点
      </el-button>
      <el-button style="margin-right: 0.2rem" @click="fold">全部展开</el-button>
      <el-button @click="unfold">全部折叠</el-button>
      <el-input
        class="ipt"
        v-model="input"
        size="small"
        placeholder="节点名称"
        clearable
      />
      <el-button style="margin-right: 0.2rem" type="primary" color="#008476">
        查询
        <!-- <i class="fa fa-search"></i>查询 -->
      </el-button>
      <el-button plain class="fs" @click="load"> 重置</el-button>
    </div>
    <el-table
      ref="xTree"
      :data="tableData"
      style="width: 96%; margin-left: 0.375rem"
      row-key="id"
      border
      highlight-current-row
      @current-change="singochoose"
      :default-expand-all="expandall"
      :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="部门名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="level" label="层级" sortable width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="countEmployeeByDepartmentId" label="成员数量">
      </el-table-column>
      <el-table-column prop="principal" label="主管人员"> </el-table-column>
      <el-table-column prop="remark" label="部门描述"> </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog
      top="3rem"
      v-model="changeVisible"
      :title="dialogstate == 'add' ? '新建部门' : '修改部门'"
      width="30%"
      :before-close="changeClose"
    >
      <!-- 自定义表单 -->
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        status-icon
      >
        <!-- 部门名称 -->
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <!-- 分组编号 -->
        <el-form-item label="分组编号" prop="groupid">
          <el-input v-model="ruleForm.groupid" />
        </el-form-item>
        <!-- 上级部门 -->
        <!-- <el-form-item label="上级部门" prop="chusheng">
          <el-select v-model="ruleForm.chusheng" placeholder="请选择">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item> -->
        <!-- 是否主分支 -->
        <el-form-item label="是否主分支" prop="groupMajor">
          <el-select v-model="ruleForm.groupMajor" placeholder="请选择">
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" prop="statess">
          <el-select v-model="ruleForm.statess" placeholder="请选择">
            <el-option label="启用" value="1" />
            <el-option label="未启用" value="0" />
          </el-select>
        </el-form-item>
        <!-- 主管人员 -->
        <el-form-item label="主管人员" prop="niuma">
          <el-cascader
            :options="ruleForm.Supervisor"
            :props="props"
            :show-all-levels="false"
            collapse-tags
            clearable
            v-model="ruleForm.niuma"
            placeholder="请选择"
          />
        </el-form-item>
        <!-- 部门描述 -->
        <el-form-item label="部门描述" prop="remark">
          <el-input v-model="ruleForm.remark" type="textarea" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button style="margin-right: 0.125rem" @click="changeClose"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="saveform(ruleFormRef)"
            color="#008476"
          >
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  gettreedata,
  save,
  update,
  findAllAndEmployee,
  delet,
} from "../api/centralarcyure.js";
import { ElMessage } from "element-plus";
onMounted(async () => {
  const res = await gettreedata({
    url: "/mgr/department-info/department/findAllAndCountEmployee",
  }).then((res) => {
    if (res.message == "成功") {
      console.log("请求成功", res);
      tableData.value = res.data;
      tableData.value = treeToFlat(tableData.value); //整理参数
    }
  });
});
const expandall = ref(false); // 是否展开
const props = { multiple: true }; //开启多选
const changeVisible = ref(false); // 弹框显示
const input = ref(""); // 节点名称
const tableData = ref([]); // 表格数据
const xTree = ref(""); //注册
const ruleFormRef = ref();
const currentTap = ref(""); //当前点击的行项目
const ruleForm = reactive({
  //表单数据
  name: "", //部门名称
  // chusheng: "", //上级部门
  niuma: "", //主管人员
  remark: "", //部门描述
  groupMajor: "", //是否主分支
  groupid: "", //分组编号
  Supervisor: [], //主管人员
  statuss: "", //是否启用
});
const rules = reactive({
  //表单验证规则
  name: [
    { required: true, message: "请输入部门名称", trigger: "blur" },
    { min: 1, max: 15, message: "字符长度在1到15之间", trigger: "blur" },
  ],
  groupId: [
    { required: true, message: "请输入分组编号", trigger: "blur" },
    { min: 1, max: 15, message: "字符长度在1到15之间", trigger: "blur" },
  ],
  chusheng: [
    {
      required: false,
      message: "请选择上级部门",
      trigger: "change",
    },
  ],
  groupMajor: [
    {
      required: false,
      message: "请选择是否主分支",
      trigger: "change",
    },
  ],
  niuma: [
    {
      required: false,
      message: "请选择主管人员",
      trigger: "change",
    },
  ],
  desc: [{ required: true, message: "请填写部门描述", trigger: "blur" }],
});
const dialogstate = ref(""); //弹窗状态
const Supervisor = ref(""); //主管人员
function treeToFlat(data) {
  // 20230309优化后
  let queue = [];
  queue = queue.concat(data);
  return queue;
}
const singochoose = (currentRow) => {
  // 表格单选
  currentTap.value = currentRow;
  console.log("11111111", currentRow);
};
// 打开弹框
const addnode = (e) => {
  console.log(currentTap.value);
  if (currentTap.value == "") {
    ElMessage.warning("请选择行项目");
    return;
  } else {
    changeVisible.value = true;
    dialogstate.value = e;
    // 为修改页面赋值
    if (e == "update") {
      console.log("2222222", ruleForm, currentTap);
      ruleForm.name = currentTap.value.name;
      ruleForm.groupid = currentTap.value.groupId;
      ruleForm.remark = currentTap.value.remark;
    }
    // 请求主管人员信息
    findAllAndEmployee({
      url: "/mgr/department-info/department/findAllAndEmployee",
      method: "get",
    }).then((res) => {
      console.log("主管人员数据", res);
      Supervisor.value = res;
      changechilds(Supervisor.value);
    });
  }
};
// 删除行项目
const deletnode = () => {
  if (currentTap.value == "") {
    ElMessage.warning("请选择行项目");
    return;
  } else {
    console.log("333333333333333", currentTap.value.id);
    delet({
      url: "mgr/department-info/delete/" + currentTap.value.id,
    }).then((res) => {
      console.log(res);
      if (res.message == "删除成功") {
        ElMessage.success("删除成功");
        gettreedata({
          url: "/mgr/department-info/department/findAllAndCountEmployee",
        }).then((res) => {
          if (res.message == "成功") {
            tableData.value = res.data;
            tableData.value = treeToFlat(tableData.value); //整理参数
          }
        });
      } else {
        ElMessage.error("删除失败");
      }
    });
  }
};
// 关闭弹窗
const changeClose = () => {
  changeVisible.value = false;
  formEl.resetFields(); //清空表单
};
// 保存校验
const saveform = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      //校验通过
      if (dialogstate.value == "add") {
        //  保存节点
        save({
          url: "/mgr/department-info/department/save",
          method: "post",
          data: {
            fid: currentTap.value.id,
            groupid: ruleForm.groupid,
            groupMajor: ruleForm.groupMajor,
            name: ruleForm.name,
            remark: ruleForm.remark,
            statisticType: "",
            status: ruleForm.statuss,
          },
        }).then((res) => {
          if (res.message == "服务异常") {
            ElMessage.error(res.message);
          } else {
            ElMessage.success("保存成功");
            formEl.resetFields(); //清空表单
            changeVisible.value = false;
            gettreedata({
              //重新刷新
              url: "/mgr/department-info/department/findAllAndCountEmployee",
            }).then((res) => {
              if (res.message == "成功") {
                console.log("请求成功", res);
                tableData.value = res.data;
                tableData.value = treeToFlat(tableData.value); //整理参数
              }
            });
          }
        });
      } else if (dialogstate.value == "update") {
        //  修改节点
        update({
          url: "/mgr/department-info/department/updateById",
          method: "post",
          data: {
            fid: currentTap.value.fid,
            groupid: ruleForm.groupid,
            groupMajor: ruleForm.groupMajor,
            id: currentTap.value.id,
            name: ruleForm.name,
            remark: ruleForm.remark,
            statisticType: "",
            status: ruleForm.statuss,
          },
        }).then((res) => {
          if (res.message == "服务异常") {
            ElMessage.error(res.message);
          } else {
            ElMessage.success("修改成功");
            formEl.resetFields(); //清空表单
            changeVisible.value = false;
            gettreedata({
              //重新刷新
              url: "/mgr/department-info/department/findAllAndCountEmployee",
            }).then((res) => {
              if (res.message == "成功") {
                console.log("请求成功", res);
                tableData.value = res.data;
                tableData.value = treeToFlat(tableData.value); //整理参数
              }
            });
          }
        });
      }
    } else {
      console.log("error submit!", fields);
      for (let key in fields) {
        ElMessage.error(fields[key][0].message);
      }
    }
  });
};
//全部展开
const fold = () => {
  TabData(tableData.value, true);
};
//全部关闭
const unfold = () => {
  TabData(tableData.value, false);
};
//递归整理
const TabData = (data, status) => {
  //递归赋值
  data.forEach((i) => {
    xTree.value.toggleRowExpansion(i, status);
    if (i.child) {
      TabData(i.child, status);
    }
  });
};
// 递归整理主管人员数据
const changechilds = (e) => {
  e.data.map((item) => {
    item.label = item.name;
    item.value = item.id;
    delete item.name;
    delete item.id;
    if (item.employeeVos) {
      item.children = item.employeeVos;
      delete item.employeeVos;
      item.children.map((items) => {
        items.label = items.name;
        items.value = items.id;
        delete items.name;
        delete items.id;
      });
    }
  });
  ruleForm.Supervisor = e.data;
  console.log("整理后的数据", ruleForm);
};
// 重置
const load = () => {
  gettreedata({
    //重新刷新
    url: "/mgr/department-info/department/findAllAndCountEmployee",
  }).then((res) => {
    if (res.message == "成功") {
      console.log("请求成功", res);
      tableData.value = res.data;
      tableData.value = treeToFlat(tableData.value); //整理参数
    }
  });
};
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
  color: #7e6666;
  font-size: 0.2rem;
  background-color: #eee;
}

:deep(.el-dialog__headerbtn) {
  top: 0;
  background: none;
  background-color: #eee;
}

.box {
  width: 20rem;
  // height: 100%;
  padding-bottom: 1rem;
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
      width: 2.2rem;
      height: 0.4rem;
      margin-right: 0.2rem;
      margin-left: 0.2rem;
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
