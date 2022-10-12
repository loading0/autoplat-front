<template>
        <div class="homeBox">
            <div style="width:32%;height: auto;margin-left: 30%">
                <div class="title0">接口自动化测试平台</div>
                <div class="title1">项目配置、接口管理、用例管理、测试报告、任务设置</div>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm login-container">
                <h3 class="title">系统登录</h3>
                <el-form-item prop="account">
                    <el-input type="text" v-model.trim="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model.trim="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
                <el-button  type="text" @click.native.prevent="handleReset">重置</el-button>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </template>
<script>
    
/* eslint-disable */
        import { requestLogin, recordVisitor } from '../api/api';
        export default {
            data () {
                return {
                   

                    logining: false,
                    ruleForm: {
                        // account: 'root',
                        // checkPass: 'root1234'
                        account: '',
                        checkPass: ''
                    },
                    rules: {
                        account: [
                            { required: true, message: '请输入账号', trigger: 'blur' }
                            // { validator: validaePass }
                        ],
                        checkPass: [
                            { required: true, message: '请输入密码', trigger: 'blur' }
                            // { validator: validaePass2 }
                        ]
                    },
                    checked: true
                }
            },
         

            mounted (){
           
            },      


                        
            methods: {
                //重置
                handleReset () {
                    this.$refs.ruleForm.resetFields()
                },
                // 登录校验
                handleSubmit() {
                    var _this = this;
                    this.$refs.ruleForm.validate((valid) => {
                        if (valid) {
                            // _this.$router.replace('/table');
                            this.logining = true;
                            var loginParams = { username: this.ruleForm.account, password: this.ruleForm.checkPass };
                            requestLogin(loginParams).then(_data => {
                                _this.logining = false;
                                let { msg, code, data } = _data;
                                console.log(_data);
                                if (code === '201') {
                                    _this.$message.success({
                                        message: msg,
                                        center: true
                                    })
                                    sessionStorage.setItem('username', JSON.stringify(data.first_name));
                                    sessionStorage.setItem('token', 'Token '+data.key);
                                    console.log(_this.$route);
                                    _this.$router.push('/Summary');
                                    // if (_this.$route.query.url) {
                                    //     _this.$router.push(_this.$route.query.url);
                                    // } else {
                                    //     // _this.$router.push('/projectList');
                                    //     _this.$router.pus h('../views/userportrait');
                                    // }
                                }
                                else {
                                    _this.$message.error({
                                        message: msg,
                                        center: true
                                    })
                                }
                            });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                },
                
              
                
    
            },
         
        }
        
    

      
    </script>
    
    <style lang="scss" scoped>
        .homeBox {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0px;
            background-color: #191c2c;
        }
      .login-container {
    
        position: absolute;
        opacity: .8;

        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
      
        width: 300px;
        
        padding: 35px 35px 15px 35px;
        /* background: #23305a; */
        background: radial-gradient(#374566,#1a1f30);
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        z-index: 1000;
        float: right;
        right: 42%;
        top: 40%;
   
        .title {
          margin: 0px auto 40px auto;
          text-align: center;
          color: #2ec0f6;
        }
        .remember {
          margin: 0px 15px 35px 0px;
            color: #eaeaea;
        }
      }
        .img-login {
            margin-top: -35%;
            width: 100%;
            height: auto;
        }
        .title0 {
            position: absolute;
            top: 10%;
            left: -41px;
            width: 100%;
            text-align: center;
            color: #2ec0f6;
            font-size: 40px;
            height: 70px;
            line-height: 70px;
            /*<!--margin: -300px 0 0 0;-->*/
            z-index: 1000;
        }
        .title1 {
            position: absolute;
         
            top: 16%;
            left: -41px;
            width: 100%;
            text-align: center;
            color: #eaeaea;
            font-size: 20px;
            height: 70px;
            line-height: 70px;
            /*<!--margin: -300px 0 0 0;-->*/
            z-index: 1000;
            margin-top: 25px;
        }
        .tyg-div {
            color: #0ab0ec;
            text-shadow:0 0 10px #FFFFFF;
            z-index: -1000;
            float: left;
            position: absolute;
            left: 5%;
            top: 20%;
            font-size: 30px;
            list-style-type:none
        }
        .lun-container{
            width: 210px;
            height:140px;
            position: relative;
            font-size: 32px;
            color: #FFFFFF;
            text-align: center;
            line-height: 90px;
            margin: 200px auto;
            margin-bottom: 0px;
            margin-top:48%;
            perspective: 1000px;
            z-index: 1000;
        }
        .carouse{
            transform-style:preserve-3d;
    
        }
        .carouse div{
            display: block;
            position: absolute;
            width: 140px;
            height: 90px;
        }
    
        .carouse .pic1{
            transform: rotateY(0deg) translateZ(160px);
        }
        .carouse .pic2{
            transform: rotateY(120deg) translateZ(160px);
        }
        .carouse .pic3{
            transform: rotateY(240deg) translateZ(160px);
        }
    
        /*=== 下一个动画 ===*/
        @keyframes to-scroll1 {
            0%{
                transform: rotateY(0deg);
            }
    
            33%{
                transform: rotateY(-120deg);
    
            }
            66%{
                transform: rotateY(-240deg);
    
            }
            100%{
                transform: rotateY(-360deg);
    
            }
    
        }
        #carouse1{
            animation: to-scroll1  10s ease infinite;
            /*animation-fill-mode: both;*/
        }
        .canvas {
                position: fixed;
                z-index: -1;
                top: 0;
                height: 100%;
                width: 100%;
                background: radial-gradient(#374566, #010203);
            }
        
    </style>
    