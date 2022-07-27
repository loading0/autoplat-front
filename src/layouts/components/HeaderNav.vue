<template>
  <div>
    <!-- 左侧返回和首页 -->
    <div class="left-caozuoicon">
      <div @click="goBack">
        <i class="el-icon-back"></i>
      </div>
      <div @click="goHome">
        <i class="el-icon-s-home"></i>
      </div>
      <!-- <div class="pgeas-tab">
        <el-tag effect="dark" closable @close="goBack">
          <i :class="nowRouteIcon"></i>
          <span style="margin-left: 5px">{{ nowRouteName }}</span>
        </el-tag>
      </div> -->
      <div>
        <el-breadcrumb >
          <el-breadcrumb-item v-for="(route, index) in breadcrumbItems" :key="index">
            <i :class="route.icon"></i>
            <span>{{ route.meta.title }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- 右侧用户登录图标 -->
    <div class="user-logininfo">
      <!-- 顶部搜索框 -->
      <HeaderSeach />
      <el-dropdown @command="clickmenu">
        <span class="el-dropdown-link right-userName">
          <div class="image">
            <img src="../../assets/logo/userimg.jpeg" alt="" srcset="" />
          </div>
          <div>{{ userInfo.number }}</div>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="outlogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { outLoginFun } from '@/api/login'
import HeaderSeach from './HeaderSearch'
export default {
  components: {
    HeaderSeach,
  },
  data() {
    return {
      // 获取当前页面名称
      nowRouteName: '',
      nowRouteIcon: '',
      userInfo: '',
      breadcrumbItems: [],
    }
  },
  mounted() {
    // 设置标题
    this.setNowRouteName(this.$route)
    // 获取用户信息
    this.getUserInfo()
    this.getBreadcrumbItems(this.$route)
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    // 获取当前页面标题
    // setNowRouteName(route) {
    //   this.nowRouteName = route.meta.title
    //   this.nowRouteIcon = route.meta.icon
    // },
    // getBreadcrumbItems(route) {
    //   // 获取当前页面的路由组
    //   this.breadcrumbItems = route.matched;
    //   // 从下标为1的位置开始获取路由，去除了最外层定义的根路由信息，并且获取到的数组里面只有meta数据，方便我们取值
    //   this.breadcrumbItems = this.breadcrumbItems
    //     .map((item) => item.meta)
    //     .splice(1);
    // },
    // 关闭标签事件
    goBack() {
      // 判断路由是否能返回
      if (window.history.length <= 2) {
        this.goHome()
      } else {
        this.$router.go(-1)
      }
    },
    // 回到首页
    goHome() {
      this.$router.replace('/home')
    },
    // 点击下拉菜单回调
    clickmenu(e) {
      if (e === 'outlogin') {
        this.outLogin()
      }
    },
    // 退出登录
    outLogin() {
      outLoginFun().then(() => {
        // 回到首页
        this.$router.replace('/login')
      })
    },
  },
  watch: {
    $route: function (newRoute) {
      // this.setNowRouteName(newRoute)
      //this.getBreadcrumbItems(newRoute)
    },
  },
}
</script>

<style lang="less" scoped>
// 左侧操作图标
.left-caozuoicon {
  display: flex;
  align-items: center;
  gap: 30px;
  padding-left: 20px;
  box-sizing: border-box;
  .pgeas-tab {
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
}
// 右侧用户头像
.user-logininfo {
  display: flex;
  align-items: center;
  position: fixed;
  right: 20px;
  gap: 10px;
  cursor: pointer;
  .image {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.right-userName {
  display: flex;
  align-items: center;
  gap: 10px;
}
.active {
  display:inline;
  text-decoration: none;
  //color: none;
  //color: #608bd2;
  //pointer-events: none;
  //opacity: 1;
  width: 40px;
  height: 40px;
  //border: 1px solid black;
  //border-radius: 20px;
  margin: auto ;
  margin-left: 40px;
}
</style>