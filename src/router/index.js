import Vue from 'vue';
import VueRouter from 'vue-router';
import Layouts from '../layouts';
import Login from '../components/Login.vue';
import Projectlist from '../components/Projectlist.vue';
import ProjectInfo from '../components/Project.vue';
//import Home from '../components/Home.vue';
import ProjectTitle from '../components/project/projectTitle/ProjectTitle';
import globalHost from '../components/project/global/Globalhost.vue' ;
const Summary = () => import('../components/project/ApiTestHomePage.vue');
const API = () => import('../components/project/api/API.vue');
const ApiList = () => import('../components/project/api/ApiList.vue');
const ApiListGroup = () => import('../components/project/api/ApiListGroup.vue');
const FestTest = () => import('../components/project/api/FestTest.vue');
const addApi = () => import('../components/project/api/Addapi.vue');
const detail = () => import('../components/project/api/updateApi/ApiForm.vue');
const ApiInfo = () => import('../components/project/api/updateApi/ApiInfo.vue');
const testApi = () => import('../components/project/api/updateApi/TestApi.vue');
const UpdateApi = () => import('../components/project/api/updateApi/UpdateApi.vue');
const ApiDynamic = () => import('../components/project/api/updateApi/ApiDynamic.vue');
const AutomationTest = () => import('../components/project/automation/AutomationTest.vue');
const CaseList = () => import('../components/project/automation/CaseList.vue');
const CaseListGroup = () => import('../components/project/automation/CaseListGroup.vue');
const CaseApiList = () => import('../components/project/automation/CaseApiList.vue');
const AddCaseApi = () => import('../components/project/automation/AddCaseApi.vue');
const UpdateCaseApi = () => import('../components/project/automation/UpdateCaseApi.vue');
const TestReport = () => import('../components/project/automation/TestReport.vue');
const ProjectMember = () => import('../components/project/ProjectMember.vue');
const ProjectDynamic = () => import('../components/project/ProjectDynamic.vue');
const ProjectReport = () => import('../components/project/ProjectReport.vue'); 
const AccountManage = () => import('../components/systemconf/AccountManage.vue');
const LogManage = () => import('../components/systemconf/LogManage.vue');

Vue.use(VueRouter);

const routes = [  
  {
    path: "",
    redirect: "home",
    component: Layouts,
    // name: '',
    meta:{title:"首页"},
    projectHidden: true,
    children: [
      {
        path: "/login",
        name: "Login",
        meta: {
          title: "登录",
          oneself: true,
          hide: true,
        },
        component: Login
        //component: () => import("../views/login"),
      },
      {
        path: "/apitest",
        meta: { title: "接口测试", icon: "el-icon-s-check" },
        component: Layouts,
        children: [
          {
            path: "summary",
            meta: { title: "总体概况", icon: "el-icon-collection" },
            component: Summary,
          },
          { path: 'projectList',
            meta: { title: "项目列表", icon: "el-icon-notebook-2"},
            component: Projectlist,
          },
        ]
      },
      { path: '/projectList', component: Projectlist, iconCls:'el-icon-message', name: '项目列表'},
        // { path: '/robot', component: robot, iconCls:'fa fa-id-card-o', name: '消息机器人', meta: { keepAlive: false }},
        // { path: '/about', component: About, iconCls:'fa fa-address-card', name: '关于我们'},
      {
        path: "/home",
        meta: { title: "首页", icon: "el-icon-s-home",hide: true },
        component: Summary,
        
      },
      
      // {
      //   path: "/datadetail", 
      //   meta: {title: "数据详情", icon: "el-icon-message"},
      //   component: () => import("../views/datadetail"), 
      // },  
      {
        path: "/systemconfig",
        meta: { title: "系统设置", icon: "el-icon-set-up"},
        component: Layouts,
        children: [
          {
            path: "log",
            meta: {title: "日志管理", icon: "el-icon-document"},
            component: LogManage,
          },
          {
            path: "user",
            meta: {title: "账号管理", icon: "el-icon-discover"},
            component: AccountManage
          },
        ]
      },

    ]
  },

  {
    path: '/project/project=:project_id',
    //component: ProjectInfo,
    component: Layouts,
    name: '项目',
    hidden: true,
    children: [
        {   path: '/ProjectTitle/project=:project_id', component: ProjectTitle, name: '项目概况', leaf: true},
        {   path: '/GlobalHost/project=:project_id', component: globalHost, name: 'Host配置', leaf: true},
        {   path: '/api/project=:project_id',
                component: API,
                name: 'API接口',
                leaf: true,
                child: true,
                children: [
                    {   path: '/apiList/project=:project_id', component: ApiList, name: '接口列表'},
                    {   path: '/apiList/project=:project_id/first=:firstGroup', component: ApiListGroup, name: '分组接口列表'},
                    {   path: '/fastTest/project=:project_id', component: FestTest, name: '快速测试'},
                    {   path: '/addApi/project=:project_id', component: addApi, name: '新增接口'},
                    {   path: '/detail/project=:project_id/api=:api_id',
                        component: detail,
                        name: '接口',
                        children: [
                            { path: '/apiInfo/project=:project_id/api=:api_id', component: ApiInfo, name: '基础信息'},
                            { path: '/testApi/project=:project_id/api=:api_id', component: testApi, name: '测试'},
                            { path: '/apiDynamic/project=:project_id/api=:api_id', component: ApiDynamic, name: '历史'},
                        ]
                    },
                    { path: '/updateApi/project=:project_id/api=:api_id', component: UpdateApi, name: '修改'},
                ]},
        {   path: '/automationTest/project=:project_id',
                component: AutomationTest,
                name: '自动化测试',
                leaf: true,
                child: true,
                children: [
                    {   path: '/caseList/project=:project_id', component: CaseList, name: '用例列表'},
                    {   path: '/caseList/project=:project_id/first=:firstGroup', component: CaseListGroup, name: '分组用例列表'},
                    {   path: '/caseApiList/project=:project_id/case=:case_id', component: CaseApiList, name: '用例接口列表'},
                    {   path: '/addCaseApi/project=:project_id/case=:case_id', component: AddCaseApi, name: '添加新接口'},
                    {   path: '/updateCaseApi/project=:project_id/case=:case_id/api=:api_id', component: UpdateCaseApi, name: '修改接口'},
                    {   path: '/testReport/project=:project_id', component: TestReport, name: '测试报告'},
                ]
        },
        {   path: '/projectMember/project=:project_id', component: ProjectMember, name: '成员管理', leaf: true},
        {   path: '/projectDynamic/project=:project_id', component: ProjectDynamic, name: '项目动态', leaf: true},
        {   path: '/projectReport/project=:project_id', component: ProjectReport, name: '自动化测试报告', leaf: true},
          ]
},

 
];

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法，取消路由重复的报错
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: "history", //"history",
  base: process.env.BASE_URL,
  routes
});

// 挂载路由导航守卫
// 如果用户没有登录，但是直接通过url访问特定页面，需要重新导航到登录页面
router.beforeEach((to, from, next) => {
  // 设置当前页签名称
  document.title = to.meta.title;
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //  next() 放行       next('/login') 强制跳转

  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  // 如果没有token，强制跳转到登录页面
  if (!tokenStr) return next('/login');
  // 如果没有return出去，则说明token字符串存在，直接放行
  next();
});
export default router;