<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部 -->
      <el-header class="el-header">
        <div class="title">
          <li class="fa fa-eercast"></li>
          <span class="titname">业务班组作业监控</span>
          <li
            @click="changeCollapse"
            :class="!isCollapse ? 'fa fa-dedent' : 'fa fa-indent'"
          ></li>
        </div>
        <div class="avatar">
          <el-avatar :size="35" :src="circleUrl" />
          <span class="personname">孙津文</span>
        </div>
      </el-header>
      <!--end 头部 -->
      <!-- 主体内容 -->
      <el-container>
        <div class="mainbox">
          <!-- 左侧菜单栏 -->
          <div class="left" :style="{ width: !isCollapse ? '2.5rem' : 'auto' }">
            <el-aside
              class="el-aside"
              :style="{ width: !isCollapse ? '2.5rem' : 'auto' }"
            >
              <el-menu
                active-text-color="#fff"
                background-color="#007165"
                class="el-menu-vertical-demo"
                :default-active="router.currentRoute.value.fullPath"
                text-color="#fff"
                :router="true"
                :collapse="isCollapse"
                @open="handleOpen"
                @select="handleSelect"
              >
                <!-- <el-menu-item
                  @click="columnclick2"
                  index="/visualization"
                  style="background-color: #003933"
                  class="options"
                >
                  <el-icon></el-icon><span class="option">可视化首页</span>
                </el-menu-item>
                <el-menu-item
                  @click="columnclick"
                  index="/column"
                  style="background-color: #003933"
                  class="options"
                >
                  <el-icon></el-icon><span class="option">栏目配置</span>
                </el-menu-item> -->
                <template v-for="item in menulist" :key="item.id">
                  <el-sub-menu :index="item.id">
                    <template #title>
                      <el-icon><li :class="item.icon"></li></el-icon>
                      <span>{{ item.titleName }}</span>
                    </template>
                    <template v-for="initem in item.indexArr">
                      <el-menu-item
                        @click="itemclick(initem.contentName, item.titleName)"
                        :index="initem.index"
                        >{{ initem.contentName }}</el-menu-item
                      >
                    </template>
                  </el-sub-menu>
                </template>
              </el-menu>
            </el-aside>
          </div>
          <!-- end左侧菜单栏 -->
          <!-- 右侧主体 -->
          <el-main class="el-main">
            <div
              v-if="distitle"
              class="breadcrumb"
              :style="{ width: !isCollapse ? '21.5rem' : 'auto' }"
            >
              <el-breadcrumb separator="/">
                <el-breadcrumb-item
                  @click="gohome"
                  :to="{ path: '/centerprofile' }"
                  ><i class="fa fa-home"></i> 首页</el-breadcrumb-item
                >
                <el-breadcrumb-item>{{ nav1 }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ nav2 }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div :class="ifcalss ? main : ''">
              <router-view v-if="isRouterAlive" />
            </div>
          </el-main>
          <!-- end右侧主体 -->
        </div>
      </el-container>
    </el-container>
    <!-- end主体内容 -->
    <!-- <router-view/> -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, provide, computed } from "vue";
import store from "./store/index.js";
import { useRouter, onBeforeRouteLeave } from "vue-router";
const isCollapse = ref(false); //是否开启折叠
const distitle = ref(true);
const nav1 = ref("中心管理"); // 动态导航栏
const nav2 = ref("中心简介"); // 动态导航栏
const router = useRouter();
const defaults = ref("/visualization");
const main = ref("main");
// 头像地址
const circleUrl = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);

// menu遍历数据
const menulist = reactive([
  {
    icon: "fa fa-bars",
    titleName: "中心管理",
    indexArr: [
      { index: "/centerprofile", contentName: "中心简介" },
      { index: "/centralarchitecture", contentName: "中心架构" },
      { index: "/personmanagement", contentName: "人员管理" },
      { index: "/performancepublicity", contentName: "绩效公式" },
      { index: "/studyfield", contentName: "学习园地" },
      { index: "/photomanagement", contentName: "照片管理" },
    ],
    id: "中心管理",
  },
  {
    icon: "fa fa-file-text-o",
    titleName: "党支部管理",
    indexArr: [{ index: "/communistmanifesto", contentName: "共产党员责任区" }],
    id: "党支部管理",
  },
  {
    icon: "fa fa-user-o",
    titleName: "工会管理",
    indexArr: [{ index: "/unionnotice", contentName: "工会通知" }],
    id: "工会管理",
  },
  {
    icon: "fa fa-suitcase",
    titleName: "生产管控",
    indexArr: [
      { index: "/systemrun", contentName: "系统运行情况" },
      { index: "/overhaulingplan", contentName: "检修计划" },
    ],
    id: "生产管控",
  },
  {
    icon: "fa fa-calculator",
    titleName: "项目管理",
    indexArr: [{ index: "/projectbrowse", contentName: "项目一览表" }],
    id: "项目管理",
  },
  {
    icon: "fa fa-line-chart",
    titleName: "业务提醒",
    indexArr: [
      { index: "/punchcard", contentName: "打卡公示" },
      { index: "/matterwarn", contentName: "事项提醒" },
    ],
    id: "业务提醒",
  },
]);
onMounted(() => {
  // console.log('1111111111111111',router.currentRoute.value.fullPath)
});
// 是否开启折叠
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
// 获取menu菜单父层名字
const handleOpen = () => {};
const columnclick = () => {
  distitle.value = false;
};
const columnclick2 = () => {
  distitle.value = false;
};
// 获取子类名字
const itemclick = (e, d) => {
  nav1.value = d;
  nav2.value = e;
  distitle.value = true;
  console.log("1111111", router.currentRoute.value.fullPath);
};
// 获取路由路径
const handleSelect = () => {};
// 点击首页 重新赋值导航
const gohome = () => {
  nav1.value = "中心管理";
  nav2.value = "中心简介";
};
// 刷新路由
const isRouterAlive = computed({
  get: () => {
    return store.state.refresh; // 这里是获取到的值
  },
  set: (newValue) => {
    // 如果vuex中的数据被修改,在这里重新给 ifShow赋值
    store.commit("changeResh", newValue);
  },
});
const ifcalss = computed({
  get: () => {
    return store.state.ifclass; // 这里是获取到的值
  },
  set: (newValue) => {
    // 如果vuex中的数据被修改,在这里重新给 ifShow赋值
    store.commit("changeIfclass", newValue);
  },
});
if (ifcalss) {
  distitle.value = false;
} else {
  distitle.value = true;
}
</script>

<style lang="scss" scoped>
body,
html {
  width: 100%;
  height: 100%;
  .common-layout {
    .el-header {
      width: 24rem;
      height: 0.75rem;
      display: flex;
      justify-content: space-between;
      background-color: #007165;
      .title {
        height: 0.75rem;
        display: flex;
        align-items: center;
        .fa-eercast {
          color: #fff;
          font-size: 0.5rem;
          margin-right: 0.125rem;
        }
        .titname {
          font-size: 0.2rem;
          font-weight: 700;
          color: #fff;
          margin-right: 0.375rem;
        }
        .fa-dedent {
          color: #fff;
          font-size: 0.325rem;
          padding-top: 0.05rem;
        }
        .fa-indent {
          color: #fff;
          font-size: 0.325rem;
          padding-top: 0.05rem;
        }
        .fa-dedent:hover {
          transform: scale(1.2);
        }
        .fa-indent:hover {
          transform: scale(1.2);
        }
      }
      .avatar {
        display: flex;
        align-items: center;
        height: 0.75rem;
        .personname {
          color: #fff;
          font-size: 0.175rem;
          margin-left: 0.25rem;
        }
      }
    }
    .mainbox {
      height: 12.75rem;
      width: 24rem;
      display: flex;
      .left {
        width: 2.5rem;
        height: 12.75rem;
        .el-aside {
          width: 2.5rem;
          height: 14rem;
          background-color: #007165;
          overflow: hidden;
          .option {
            height: 0.7rem;
          }

          .el-menu {
            border-right: 0;
          }
          .el-menu-item.is-active {
            background-color: #2674c5 !important;
          }
        }
      }
      .el-main {
        width: 21.5rem;
        height: 14rem;
        padding: 0;
        margin: 0;
        flex: 1;
        background-color: #f0f2f5;
        .breadcrumb {
          width: 21.5rem;
          height: 0.7rem;
          padding-left: 0.25rem;
          display: flex;
          align-items: center;
          background-color: #fff;

          :deep(.el-breadcrumb__inner.is-link) {
            font-size: 0.2rem;
            color: #999999;
            font-weight: normal;
          }

          :deep(.el-breadcrumb__inner.is-link:hover) {
            color: #2674c5;
          }
          :deep(.el-breadcrumb__inner) {
            font-size: 0.2rem;
            color: #999999;
          }
        }
      }
      .main {
        height: 15.375rem;
        width: 21.5rem;
        background: #f0f2f5;
        padding-top: 0.25rem;
        padding-left: 0.75rem;
        // padding-right: .5rem;
      }

    }
  }
}
</style>