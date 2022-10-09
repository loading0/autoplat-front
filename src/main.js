import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import axios from 'axios';
import ElementUI from "element-ui";
import echarts from 'echarts';
import "element-ui/lib/theme-chalk/index.css";

//axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.baseURL = 'http://47.94.233.53:8000'
// axios请求拦截
axios.interceptors.request.use(config => {
  // console.log(config)
  // NProgress.start()
  // 为请求头对象，添加Token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须return config
  return config
})

// response拦截器
// axios.interceptors.response.use(
//   response => {
//       return response;
//   },
//   error => {
//       if (error.response) {
//           switch (error.response.status) {
//               case 401:
//                   // 返回 401 清除token信息并跳转到登录页面
//                   // store.commit(types.LOGOUT);
//                   router.replace({
//                       path: '/login',
//                       query: {redirect: router.currentRoute.fullPath}
//                   })
//           }
//       }
//       return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//   });
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
