<template>
  <div>
    <el-row :span="24"  v-if="targetPath == 1">
      <el-col :span="6" class="bar">
        <Api_Nav_Bar/>
      </el-col>  
    </el-row>
    <el-row :span="24">
      <!-- <el-col>
        <p>TEST:{{targetPath}}</p>
      </el-col> -->
      <el-col :span="24">
			  <transition name="fade" mode="out-in">
				  <router-view></router-view>
			  </transition>
		  </el-col>    
    </el-row>

    <!-- <router-view /> -->
  </div>
</template>

<script>
    import Api_Nav_Bar from '@/components/project/ProjectBar'
    export default {
        components: {
          Api_Nav_Bar
        },
        data() {
          return {
            targetPath: ""
          }
        },
        // 监听route变化
        // $route: function (val) {
        //   if(val.path.includes('project=')) {
        //     this.targetPath = 1;
        //   }
        //   else {
        //     this.targetPath = 0;
        //   }
        //   immediate = true
        // },
      //},
      watch: {
        $route:{
          handler(newValue,oldValue){
            //curPath = this.$route.path
            if(this.$route.path.includes('project=')) {
              this.targetPath = 1;
            }
            else {
              this.targetPath = 0;
            }
          },
          immediate:true
        }
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
        margin-top: 10px;
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
