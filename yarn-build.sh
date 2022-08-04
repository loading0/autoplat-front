#!/bin/bash
 
# 构建目录-Jenkinsfile定义的环境变量 ${TARGET_HOME_DIR}
build_dir=${TARGET_HOME_DIR}
 
echo "构建目录-Jenkinsfile定义的环境变量 'build_dir' >>> ${build_dir}"
 
echo -e "\n--------------- npm开始构建打包 start ---------------\n"
 
# 删除以前构建的dist文件
sh "rm -rf ${build_dir}/dist"
sh "rm -rf ${build_dir}/node_modules"
echo "删除以前构建的dist文件目录 >>> ${build_dir}/dist"
 
# 进入工程打包构建的目录，构建
cd ${build_dir}
npm install
npm run build
 
echo -e "\n--------------- npm开始构建打包 end ---------------\n"