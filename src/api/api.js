import axios from 'axios'

export const base_url = 'http://47.94.233.53:8000'
//${test}
// 登录
export const requestLogin = params => { return axios.post(`/api/user/login`, params).then(res => res.data) }
// 记录访客
export const recordVisitor = params => { return axios.post(`/api/user/VisitorRecord`, params).then(res => res.data) }
// 获取项目
export const getProject = (params) => {
    return axios.get(`/api/project/project_list`, { params: params}).then(res => res.data); };
// 删除项目
export const delProject = (params) => {
    return axios.post(`/api/project/del_project`, params).then(res => res.data); };
// 禁用项目
export const disableProject = ( params) => {
    return axios.post(`/api/project/disable_project`, params).then(res => res.data); };
// 启用项目
export const enableProject = ( params) => {
    return axios.post(`/api/project/enable_project`, params).then(res => res.data); };
// 修改项目
export const updateProject = ( params) => {
    return axios.post(`/api/project/update_project`, params).then(res => res.data); };
// 添加项目
export const addProject = ( params) => {
    return axios.post(`/api/project/add_project`, params,).then(res => res.data); };
// 获取项目详情
export const getProjectDetail = (params) => {
    return axios.get(`/api/title/project_info`, { params: params}).then(res => res.data); };
// 获取测试地址列表
export const getHost = ( params) => {
    return axios.get(`/api/global/host_total`, { params: params}).then(res => res.data); };
// 删除测试地址列表
export const delHost = (params) => {
    return axios.post(`/api/global/del_host`, params).then(res => res.data); };
// 禁用测试地址列表
export const disableHost = (params) => {
    return axios.post(`/api/global/disable_host`, params).then(res => res.data); };
// 启用测试地址列表
export const enableHost = ( params) => {
    return axios.post(`/api/global/enable_host`, params).then(res => res.data); };
// 修改测试地址列表
export const updateHost = ( params) => {
    return axios.post(`/api/global/update_host`, params).then(res => res.data); };
// 添加测试地址列表
export const addHost = ( params) => {
    return axios.post(`/api/global/add_host`, params,).then(res => res.data); };
// 获取项目动态
export const getProjectDynamicList = (params) => {
    return axios.get(`/api/dynamic/dynamic`, { params: params}).then(res => res.data); };
// 获取项目成员
export const getProjectMemberList = (params) => {
    return axios.get(`/api/member/project_member`, { params: params}).then(res => res.data); };
// 获取发送邮件配置
export const getEmailConfigDetail = (params) => {
    return axios.get(`/api/member/get_email`, { params: params}).then(res => res.data); };
// 删除邮件配置
export const delEmailConfig = ( params) => {
    return axios.post(`/api/member/del_email`, params).then(res => res.data); };
// 添加邮件配置
export const addEmailConfig = ( params) => {
    return axios.post(`/api/member/email_config`, params).then(res => res.data); };
// 获取自动化测试结果
export const getTestResultList = ( params) => {
    return axios.get(`/api/report/auto_test_report`, { params: params}).then(res => res.data); };
// 获取最近10次测试时间
export const getTestTenTime = ( params) => {
    return axios.get(`/api/report/test_time`, { params: params}).then(res => res.data); };
// 获取最近10次测试比例结果
export const getTestTenResult = ( params) => {
    return axios.get(`/api/report/lately_ten`, { params: params }).then(res => res.data); };
// 添加接口
export const addApiDetail = ( params) => {
    return axios.post(`/api/api/add_api`, params).then(res => res.data); };
// 获取接口分组列表
export const getApiGroupList = (params) => {
    return axios.get(`/api/api/group`, { params: params}).then(res => res.data); };
// 添加接口分组
export const addApiGroup = (params) => { return axios.post(`/api/api/add_group`, params).then(res => res.data); };
// 修改接口分组
export const updateApiGroup = (params) => {
    return axios.post(`/api/api/update_name_group`, params).then(res => res.data); };
// 删除接口分组
export const delApiGroup = ( params) => {
    return axios.post(`/api/api/del_group`, params).then(res => res.data); };
//修改mock状态
// export const updateMock = (params) =>{
//     return axios.post(`/api/api/updateMock`, params).then(res => res.data); };
// // 获取api接口
// export const getApi = (params) => {
//     return axios.get(`api/api/api_list`, {params: params}).then(res => res.data);};
// // 修改接口所属分组
// export const updateGroup = (params) => {
//     return axios.post(`api/api/update_group`, {params}).then(res => res.data);
// };
// // 获取api分组
// export const getApiGroup = (params) => {
//     return axios.get('api/api/group', {params:params}).then(res => res.data);
// };
// // 删除api
// export const delApi = (params) => {
//     return axios.post(`/api/api/del_api`, params).then(res => res.data);
// };
