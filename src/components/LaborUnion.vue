<template>
  <div>
    <div class="box">
      <div class="fangkuai-box">
        <span class="fangkuai"></span><span class="title">栏目名称</span>
      </div>
      <div class="topbox">
        <div>
          <div class="a1box">
            <span class="a1">调整前:</span
            ><span>{{ unionNotice.adjustBefore }}</span>
          </div>
          <div class="a2box">
            <span class="a2">调整后:</span>
            <el-input
              style="width: 2.5rem"
              v-model="unionNotice.adjustAfter"
              class="w-50 m-2"
              size="large"
              placeholder="请输入信息"
            />
          </div>
        </div>
        <div>
          <div class="a3box">
            <span class="a3">调整前:</span
            ><span>{{ staffMien.adjustBefore }}</span>
          </div>
          <div class="a4box">
            <span class="a4">调整后:</span>
            <el-input
              style="width: 2.5rem"
              v-model="staffMien.adjustAfter"
              class="w-50 m-2"
              size="large"
              placeholder="请输入信息"
            />
          </div>
        </div>
      </div>

      <div class="btnBox">
        <el-button @click="reset" class="btn1" type="primary">重置</el-button>
        <el-button @click="save" class="btn2" type="primary" plain
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getlabor, savegetlabor } from "../api/columnoption.js";
import { message } from "../utils/message.js";
const unionNotice = ref({}); // 工会通知的值
const staffMien = ref({}); // 员工风采的值
const watchunionNotice = ref();
const watchstaffMien = ref();
const reset = () => {
  unionNotice.value.adjustAfter = "";
  staffMien.value.adjustAfter = "";
};
onMounted(async () => {
  const res = await getlabor({
    url: "/mgr/subject-info/3",
  });
  if (res) {
    unionNotice.value = res.data[1];
    staffMien.value = res.data[0];
    watchunionNotice.value = unionNotice.value.adjustAfter;
    watchstaffMien.value = staffMien.value.adjustAfter;
  }
});
const save = async() => {
  if (watchunionNotice.value != unionNotice.value.adjustAfter) {
    const res1 = await savegetlabor({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter: unionNotice.value.adjustAfter,
        adjustBefore: watchunionNotice.value,
        id: unionNotice.value.id,
        sortIndex: unionNotice.value.sortIndex,
      },
    });
    if (res1.message == "成功") {
      message("保存成功", "success", 1000);
    }
  }
  if (watchstaffMien.value != staffMien.value.adjustAfter) {
    const res2 = await savegetlabor({
      method: "post",
      url: "/mgr/subject-info/save",
      data: {
        adjustAfter: staffMien.value.adjustAfter,
        adjustBefore: watchstaffMien.value,
        id: staffMien.value.id,
        sortIndex: staffMien.value.sortIndex,
      },
    });
    if (res2.message == "成功") {
      message("保存成功", "success", 1000);
    }
  }
  const newres = await getlabor({
    url: "/mgr/subject-info/3",
  });
  if (newres) {
    unionNotice.value = newres.data[1];
    staffMien.value = newres.data[0];
    watchunionNotice.value = unionNotice.value.adjustAfter;
    watchstaffMien.value = staffMien.value.adjustAfter;
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 12rem;
  height: 6rem;
  margin-top: 2px;
  background: #fff;
  border: 1px solid #eee;
  span {
    font-family: "微软雅黑";
    font-weight: 400;
    font-size: 0.175rem;
    color: #666666;
  }

  .fangkuai-box {
    margin-top: 0.25rem;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    .fangkuai {
      width: 0.075rem;
      height: 0.25rem;
      display: inline-block;
      background: #409eff;
    }
    .title {
      font-size: 0.175rem;
      letter-spacing: normal;
      color: #666666;
      font-weight: 700;
      font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
    }
  }
  .topbox {
    margin-top: 0.5rem;
    display: flex;
    margin-left: 0.375rem;
    .a1box {
      .a1 {
        margin-right: 0.125rem;
      }
    }
    .a2box {
      margin-top: 0.125rem;
      .a2 {
        margin-right: 0.125rem;
        color: #e4551b;
      }
    }
    .a3box {
      .a3 {
        margin-right: 0.125rem;
        margin-left: 0.825rem;
      }
    }
    .a4box {
      margin-top: 0.125rem;
      .a4 {
        margin-right: 0.125rem;
        color: #e4551b;
        margin-left: 0.825rem;
      }
    }
  }
  .btnBox {
    width: 12rem;
    display: flex;
    justify-content: center;
    margin-top: 3.01rem;
    .btn1 {
      width: 1.5rem;
      margin-right: 0.125rem;
    }
    .btn2 {
      width: 1.5rem;
    }
  }
}
</style>