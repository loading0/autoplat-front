<template>
	<section>
		<el-col :span="24" style="height: 46px">
			<el-form :inline="true" :model="filters" @submit.native.prevent>
				<el-form-item>
					<el-input v-model.trim="filters.name" placeholder="名称" @keyup.enter.native="getApiList"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getApiList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<router-link :to="{ name: '新增接口', params: {project_id: this.$route.params.project_id}}" style='text-decoration: none;color: aliceblue;'>
						<el-button type="primary">新增</el-button>
					</router-link>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :disabled="update" @click="changeGroup">修改分组</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="DownloadApi">下载接口文档</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="loadSwaggerApi = true">导入接口</el-button>
					<el-dialog title="导入swagger接口" :visible.sync="loadSwaggerApi" :close-on-click-modal="false" append-to-body>
						<el-input v-model.trim="swaggerUrl" placeholder="请输入swagger接口地址" style="width:90%"></el-input>
						<el-button type="primary" @click="addSubmit" :loading="addLoading">导入</el-button>
						<P v-if="!swaggerUrl" style="color: red; margin: 0px">不能为空</P>
					</el-dialog>
				</el-form-item>
			</el-form>
		</el-col>
		<el-dialog title="修改所属分组" :visible.sync="updateGroupFormVisible" :close-on-click-modal="false" append-to-body style="width: 60%; left: 20%">
			<el-form :model="updateGroupForm" label-width="80px" :rules="updateGroupFormRules" ref="updateGroupForm">
				<el-form-item label="分组名称" prop="firstGroup">
					<el-select v-model="updateGroupForm.firstGroup" placeholder="请选择">
						<el-option v-for="(item,index) in group" :key="index+''" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="updateGroupFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="updateGroupSubmit" :loading="updateGroupLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--列表-->
		<el-table :data="api" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" min-width="5%">
			</el-table-column>
			<el-table-column prop="name" label="接口名称" min-width="17%" sortable show-overflow-tooltip>
				<template slot-scope="scope">
					<el-icon name="name"></el-icon>
					<router-link :to="{ name: '基础信息', params: {api_id: scope.row.id}}" style='text-decoration: none;'>{{ scope.row.name }}</router-link>
				</template>
			</el-table-column>
			<el-table-column prop="requestType" label="请求方式" min-width="11%" sortable show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="apiAddress" label="接口地址" min-width="19%" sortable show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="userUpdate" label="最近更新者" min-width="13%" sortable show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="lastUpdateTime" label="更新日期" min-width="15%" sortable show-overflow-tooltip>
			</el-table-column>
			<el-table-column label="Mock" min-width="8%">
				<template slot-scope="scope">
					<el-button v-if="scope.row.mockStatus" type="success" size="small" @click="checkMockStatus(scope.row)">关闭</el-button>
					<el-button v-if="!scope.row.mockStatus" type="info" size="small"  @click="checkMockStatus(scope.row)">启动</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="13%">
				<template slot-scope="scope">
					<el-button type="danger" style="margin-right: 5px;" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					<router-link :to="{ name: '修改', params: {api_id: scope.row.id}}" style='text-decoration: none;color: aliceblue;'>
						<el-button type="info" size="small">修改</el-button>
					</router-link>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :page-count="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
    import { base_url } from '../../../api/api'
    // import { base_url, getApi, updateGroup } from '../../../api/api'
    // import Nav_Bar from '@/components/Project'
    import $ from 'jquery'
    export default {
        // components: {
        //     Nav_Bar
        // },
        data() {
            return {
                filters: {
                    name: ''
                },
                api: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                updateGroupFormVisible: false,
                updateGroupForm: {
                    firstGroup: "",
                },
                updateGroupFormRules: {
                    firstGroup : [{ type: 'number', required: true, message: '请选择分组', trigger: 'blur'}],
                },
                group: [],
                updateGroupLoading: false,
                update: true,
                loadSwaggerApi: false,
                addLoading: false,
                //新增界面数据
                swaggerUrl: "",
            }
        },

     
        methods: {
            // 修改mock状态
            checkMockStatus(row){
                let self = this;
                let param = JSON.stringify({
                    project_id:Number(this.$route.params.project_id),
                    id:Number(row.id)
                });
              
                $.ajax({
                    type: "post",
                    url: base_url+"/api/api/updateMock",
                    async: true,
                    data: param,
                    headers: {
                            "Content-Type": "application/json",
                            Authorization:sessionStorage.getItem('token')
                        },
                    timeout: 5000,
                    success: function(data) {
                        self.listLoading = false;
                        if (data.code === '999999') {
                            self.$message.success({
                                message: data.msg,
                                center: true,
                            });
                            self.getApiList();
                        }
                        else {
                            self.$message.error({
                                message: data.msg,
                                center: true,
                            })
                        }
                    },
                })
			},
            // 获取接口列表
            getApiList() {
                this.listLoading = true;
                let self = this;
                let param = { project_id: this.$route.params.project_id, page: self.page, name: self.filters.name};
                // getApi( params).then((res) => {
                //     self.listLoading = false;
                //     var { msg, code, data } = res;
                //     if (code === '999999') {
                //         self.total = data.total;
                //         self.api = data.data;
                //     }
                //     else {
                //         self.$message.error({
                //             message: msg,
                //             center: true
                //         });
                //     }
                // });
                $.ajax({
                    type: "get",
                    url: base_url+"/api/api/api_list",
                    async: true,
                    data: param,
                    headers: {
                            "Content-Type": "application/json",
                            Authorization: sessionStorage.getItem('token')
                        },
                    timeout: 5000,
                    success: function(data) {
                        self.listLoading = false;
                        if (data.code === '999999') {
                            self.total = data.data.total;
                            self.api = data.data.data
                        }
                        else {
                            self.$message.error({
                                message: data.msg,
                                center: true,
                            })
                        }
                    },
                })
            },
            // 修改接口所属分组
            updateGroupSubmit() {
                let ids = this.sels.map(item => item.id);
                let self = this;
                this.$confirm('确认修改所属分组吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    self.updateGroupLoading = true;
                    //NProgress.start();
                    let params = JSON.stringify({
						project_id:Number(this.$route.params.project_id),
						apiGroupLevelFirst_id: Number(self.updateGroupForm.firstGroup),
						ids: ids,
                    });
                    $.ajax({
                        type: "post",
                        url: base_url+"/api/api/update_group",
                        async: true,
                        data: params,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization:sessionStorage.getItem('token')
                        },
                        timeout: 5000,
                        success: function(data) {
                            self.updateGroupLoading = false;
                            if (data.code === '999999') {
                                self.$message({
                                    message: '修改成功',
                                    center: true,
                                    type: 'success'
                                });
								self.$router.push({ name: '分组接口列表', params: { project_id: self.$route.params.project_id, firstGroup: self.updateGroupForm.firstGroup}});
                            }
                            else {
                                self.$message.error({
                                    message: data.msg,
                                    center: true,
                                })
                            }
                            self.updateGroupFormVisible = false;
                            self.getApiList();
                        },
                    })
                }).catch(() => {

                });
            },
            // 获取api分组
            getApiGroup() {
                let self = this;
                $.ajax({
                    type: "get",
                    url: base_url+"/api/api/group",
                    async: true,
                    data: { project_id: this.$route.params.project_id},
                    headers: {
                            "Content-Type": "application/json",
                            Authorization: sessionStorage.getItem('token')
                        },
                    timeout: 5000,
                    success: function(data) {
                        if (data.code === '999999') {
                            self.group = data.data;
                            self.updateGroupForm.firstGroup = self.group[0].id
                        }
                        else {
                            self.$message.error({
                                message: data.msg,
                                center: true,
                            })
                        }
                    },
                })
            },
			// 修改分组弹窗
            changeGroup() {
                this.getApiGroup();
                this.updateGroupFormVisible = true
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let self = this;
                    $.ajax({
                        type: "post",
                        url: base_url+"/api/api/del_api",
                        async: true,
                        data: JSON.stringify({ project_id: Number(this.$route.params.project_id), ids: [row.id] }),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: sessionStorage.getItem('token')
                        },
                        timeout: 5000,
                        success: function(data) {
                            if (data.code === '999999') {
                                self.$message({
                                    message: '删除成功',
                                    center: true,
                                    type: 'success'
                                })
                            } else {
                                self.$message.error({
                                    message: data.msg,
                                    center: true,
                                })
                            }
                            self.getApiList();
                        },
                    })

                }).catch(() => {
                });
            },
			// 下载接口文档
            DownloadApi() {
                $.ajax({
                    type: "get",
                    url: base_url+"/api/api/Download",
                    async: true,
                    data: { project_id: this.$route.params.project_id},
                    headers: {
                        Authorization: sessionStorage.getItem('token')
                    },
                    timeout: 5000,
                    success: function(data) {
                        if (data.code === "999999") {
                            window.open(base_url+"/api/api/download_doc?url="+data.data)
                        }
                    },
                })
            },
			// 翻页
            handleCurrentChange(val) {
                this.page = val;
                this.getApiList()
            },
            selsChange: function (sels) {
                if (sels.length>0) {
                    this.sels = sels;
                    this.update = false
                } else {
                    this.update = true
                }
            },
            //批量删除
            batchRemove: function () {
                let ids = this.sels.map(item => item.id);
                let self = this;
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    self.listLoading = true;
                    //NProgress.start();
                    $.ajax({
                        type: "post",
                        url: base_url+"/api/api/del_api",
                        async: true,
                        data:JSON.stringify({ project_id: Number(this.$route.params.project_id), ids: ids}),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: sessionStorage.getItem('token')
                        },
                        timeout: 5000,
                        success: function(data) {
                            self.listLoading = false;
                            if (data.code === '999999') {
                                self.$message({
                                    message: '删除成功',
                                    center: true,
                                    type: 'success'
                                })
                            }
                            else {
                                self.$message.error({
                                    message: data.msg,
                                    center: true,
                                })
                            }
                            self.getApiList();
                        },
                    })
                }).catch(() => {
                });
            },
			addSubmit(){
                let self = this;
				this.addLoading = true;
				console.log(this.swaggerUrl);
				if (this.swaggerUrl){
				    $.ajax({
                        type: "post",
                        url: base_url+"/api/api/lead_swagger",
                        async: true,
                        data:JSON.stringify({ project_id: Number(this.$route.params.project_id), url: this.swaggerUrl}),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: sessionStorage.getItem('token')
                        },
                        // timeout: 5000,
                        success: function(data) {
                            if (data.code === '999999') {
                                self.$message({
                                    message: '添加成功',
                                    center: true,
                                    type: 'success'
                                });
                                self.listLoading = true;
                                self.addLoading = false;
                                self.loadSwaggerApi =false;
                                self.getApiList()
                            }
                            else {
                                self.addLoading = false;
                                self.$message.error({
                                    message: "导入失败，请检查地址是否正确",
                                    center: true,
                                })
                            }
                            self.getApiList();
                        },
                    })
				} else {
				    this.addLoading = false
				}
			},
        },
        mounted() {
            this.getApiList();

        }
    }
</script>

<style lang="scss" scoped>
	.api-title {
		padding: 15px;
		margin: 0px;
		text-align: center;
		border-radius:5px;
		font-size: 15px;
		color: aliceblue;
		background-color: rgb(32, 160, 255);
		font-family: PingFang SC;
	}
	.group .editGroup {
		float:right;
	}
	.row-title {
		margin: 35px;
	}
	.addGroup {
		margin-top: 0px;
		margin-bottom: 10px;
		border-radius: 25px;
	}
	.api-view-a {
		margin-left: 15px;
		margin-right: 15px;
		display: block;
	}
	.api-view-b {
		margin-left: 15px;
		margin-right: 15px;
		display: none;
	}
    .bar {
        margin: 10px;
        margin-left: 0px;
        margin-bottom: 50px;
    }
</style>