<template>
    <div class="main">
        <!-- <el-row :span="24">
            <el-col :span="6" class="bar">
                <Nav_Bar/>
            </el-col>  
        </el-row> -->
        <el-row :span="24">
            <el-col :span="6" class='inline'>
                <el-card class="box-card">
                    <h3>{{type}}</h3>
                    <div>项目类型</div>
                </el-card>
            </el-col>
            <el-col :span="6" class='inline'>
                <el-card class="box-card">
                    <h3>{{version}}</h3>
                    <div>版本</div>
                </el-card>
            </el-col>
            <el-col :span="6" class='inline'>
                <el-card class="box-card">
                    <h3>{{updateDate}}</h3>
                    <div>最近更新时间</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="6" class='inline'>
                <el-card class="box-card">
                    <router-link :to="{name: '接口列表'}" style='text-decoration: none;color: #000000;'><h3>{{apiCount}}个接口</h3></router-link>
                    <div>接口数量</div>
                </el-card>
            </el-col>
            <el-col :span="6" class='inline'>
                <el-card class="box-card">
                    <h3>{{statusCount}}条状态码</h3>
                    <div>通用状态码</div>
                </el-card>
            </el-col>
            <el-col :span="6" class='inline'>
                <el-card class="box-card">
                    <router-link :to="{name: '项目动态'}" style='text-decoration: none;color: #000000;'><h3>{{dynamicCount}}条动态</h3></router-link>
                    <div>项目三天内动态</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="6" class='inline'>
                <el-card class="box-card">
                    <router-link :to="{name: '成员管理'}" style='text-decoration: none;color: #000000;'><h3><img src="../../../assets/member.png" class="member">{{memberCount}}人</h3></router-link>
                    <div>项目组成员</div>
                </el-card>
            </el-col>
            <el-col :span="6" class='inline'>
                <el-card class="box-card">
                    <router-link :to="{name: '用例列表'}" style='text-decoration: none;color: #000000;'><h3>自动化测试</h3></router-link>
                    <div>自由测试接口并生成测试报告</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="6" class='inline'>
                <el-card class="box-card">
                    <h3>{{createDate}}</h3>
                    <div>创建时间</div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { getProjectDetail } from '../../../api/api'
    //import Nav_Bar from '@/components/Project'
    export default {
        // components: {
        //     Nav_Bar
        // },
        data() {
            return {
                type: '',
                version: '',
                updateDate: '',
                apiCount: 0,
                statusCount: 0,
                dynamicCount: 0,
                memberCount: 0,
                createDate: '',
            }
        },
        methods: {
            getProjectInfo() {
                var self = this;
                let params = { project_id: this.$route.params.project_id};
                
                getProjectDetail(params).then(_data => {
                   let { msg, code, data } = _data;
                   self.listLoading = false;
                        if (code === '999999') {
                            self.type = data.type;
                            self.version = data.version;
                            self.updateDate = data.LastUpdateTime;
                            self.apiCount = data.apiCount;
                            self.dynamicCount = data.dynamicCount;
                            self.memberCount = data.memberCount;
                            self.createDate = data.createTime;
                        }
                        else {
                            self.$message.error({
                                message: msg,
                                center: true,
                            })
                        }
                });
            }
        },
        mounted() {
            this.getProjectInfo()
        }
    }
</script>

<style lang="scss" scoped>
    .box-card {
        width: 100%;
        height: 100%;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .member {
        width: 7%;
    }
    .main {
        margin: 35px;
        margin-top: 25px;
    }
    .inline {
        margin: 10px;
        margin-left: 0px;
        margin-right: 20px;
    }
    .bar {
        margin: 10px;
        margin-left: 0px;
        margin-bottom: 50px;
    }
</style>
