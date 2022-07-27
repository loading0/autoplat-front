<template>
  <div>
    <el-select
      ref="headerSearchSelect"
      v-model="selectVal"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="onChangeSelect"
    >
      <el-option
        v-for="option in selectList"
        :key="option.item.path"
        :value="option.item.path"
        :label="option.item.title"
      />
    </el-select>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import path from 'path'
export default {
  name: 'HeaderSearch',
  data() {
    return {
      // fuse配置信息
      fuse: null,
      // 输入框绑定值
      selectVal: '',
      // 下拉框列表
      selectList: [],
      // 用于存放模糊搜索的路由数据
      allRouter: [],
    }
  },
  mounted() {
    // 获取全部的路由数据
    let allRouter = this.$router.options.routes[0].children
    this.resolvePath('/', '', allRouter)
    this.initFuse(this.allRouter)
  },
  methods: {
    // 递归初始化path
    resolvePath(basePath = '/', baseName = '', routers) {
      routers.forEach((route) => {
        let routeName = path.resolve(baseName, route.meta.title).slice(1)
        let routePath = path.resolve(basePath, route.path)
        if (!route.children) {
          // 页面不是隐藏的才会push到数据中
          !route.meta.hide &&
            this.allRouter.push({
              title: routeName,
              path: routePath,
            })
        } else {
          // 递归调用获取嵌套数据
          this.resolvePath(routePath, routeName, route.children)
        }
      })
    },
    // 初始化配置Fuse
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: 'title',
            weight: 0.7,
          },
          {
            name: 'path',
            weight: 0.3,
          },
        ],
      })
    },
    // 模糊搜索路径
    querySearch(query) {
      if (query !== '') {
        console.log(this.fuse.search(query))
        this.selectList = this.fuse.search(query)
      } else {
        this.selectList = []
      }
    },
    // 选中某一项时触发
    onChangeSelect(path) {
      this.$router.push(path)
    },
    // 判断是否是外部连接
    ishttp(url) {
      return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
    },
  },
}
</script>


