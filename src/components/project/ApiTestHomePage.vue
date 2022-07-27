<template>
    <div class="main" :span="50">
        <!-- <el-row :span="24">
            <el-col :span="6" class="bar">
                <Nav_Bar/>
            </el-col>  
        </el-row> -->
        <el-row :span="24" >
            <el-col :span="7" class='inline'>
                <el-card class="box-card">
                    <h3 style="margin-top:0px">项目数据统计</h3>
                    <div id="project" style="width: 300px;height:300px; margin-left: 10px;"></div>
                    <div style="font-size:12px">本周新增：1个</div>
                </el-card>
            </el-col>
            <el-col :span="7" class='inline'>
                <el-card class="box-card">
                    <h3 style="margin-top:0px">接口数据统计</h3>
                    <div id="interface" style="width: 300px;height: 300px; margin-left: 10px;"></div>
                    <div style="font-size:12px">本周新增：3个</div>
                </el-card>
            </el-col>
            <el-col :span="7" class='inline'>
                <el-card class="box-card">
                    <h3 style="margin-top:0px">用例数据统计</h3>
                    <div id="testcase" style="width: 300px;height: 300px; margin-left: 10px;"></div>
                    <div style="font-size:12px">本周新增：5个</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :span="24" >
          <el-col :span="11" class="secondline">
            <el-card class="box-card">
              <h3 style="margin-top:0px">过去7天失败用例TOP 10</h3>
              <!-- <div id="interface" style="width: 450px;height: 300px; margin-left: 10px;"></div> -->
              <el-tabs type="border-card">
                <el-table :data="tableCase" style="width: 100%; height: 285px;" >
                  <!-- <el-table-column type="selection" min-width="5%">
                  </el-table-column> -->
                  <el-table-column prop="name" label="用例名称" min-width="25%" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-icon name="name"></el-icon>
                      <router-link v-if="scope.row.status" :to="{ name: '项目概况', params: {project_id: scope.row.id}}"
                        style='text-decoration: none;color: #000000;'>
                        {{ scope.row.name }}
                      </router-link>
                      {{ !scope.row.status?scope.row.name:""}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="type" label="用例类型" min-width="25%" >
                  </el-table-column>
                  <el-table-column prop="plan" label="所属计划" min-width="25%" >
                  </el-table-column>
                  <el-table-column prop="count" label="失败次数" min-width="25%" >
                  </el-table-column>
                  <!-- <el-table-column prop="LastUpdateTime" label="最后修改时间" min-width="16%" sortable>
                  </el-table-column>
                  <el-table-column prop="status" label="状态" min-width="9%" sortable>
                    <template slot-scope="scope">
                      <img v-show="scope.row.status" src="../assets/icon-yes.svg" />
                      <img v-show="!scope.row.status" src="../assets/icon-no.svg" />
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" min-width="19%">
                    <template slot-scope="scope">
                      <el-button type="success" plain size="small" @click="handleEdit(scope.$index, scope.row)">编辑
                      </el-button>
                      <el-button type="danger" plain size="small" @click="handleDel(scope.$index, scope.row)">删除
                      </el-button>
                      <el-button type="info" plain size="small" @click="handleChangeStatus(scope.$index, scope.row)">
                        {{scope.row.status===false?'启用':'禁用'}}</el-button>
                    </template>
                  </el-table-column> -->
                </el-table>
              </el-tabs>
            </el-card>
          </el-col>
          <el-col :span="11" class="secondline">
            <el-card class="box-card">
              <h3 style="margin-top:0px">运行中的定时任务</h3>
              <!-- <div id="interface" style="width: 450px;height: 300px; margin-left: 10px;"></div> -->
              <el-tabs type="border-card">
                <el-table :data="tableTask" style="height:285px" > 
                <!-- :height="tableHeight" -->
                  <!-- <el-table-column type="selection" min-width="5%">
                  </el-table-column> -->
                  <el-table-column prop="type" label="序号" min-width="20%" >
                  </el-table-column>
                  <el-table-column prop="name" label="名称" min-width="20%" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-icon name="name"></el-icon>
                      <router-link v-if="scope.row.status" :to="{ name: '项目概况', params: {project_id: scope.row.id}}"
                        style='text-decoration: none;color: #000000;'>
                        {{ scope.row.name }}
                      </router-link>
                      {{ !scope.row.status?scope.row.name:""}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="type" label="任务类型" min-width="20%" >
                  </el-table-column>
                  <el-table-column prop="plan" label="状态计划" min-width="20%" >
                  </el-table-column>
                  <el-table-column prop="count" label="下次执行时间" min-width="20%" >
                  </el-table-column>
                  <!-- <div slot="empty">
					          <p><span>暂无数据</span></p>
				          </div> -->
                </el-table>
              </el-tabs>
            </el-card>
          </el-col>
        </el-row>
    </div>
</template>

<script>
  import { getProjectDetail } from '@/api/api'
  //import Nav_Bar from '@/components/Project'
  export default {
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
        columnData: ['用例名称','用例类型','所属计划','失败次数'],
        tableTask: [],
        tableCase: [
          {'name':'case1','type':'HTTP','plan':'test-plan1','count':'5'},
          {'name':'case1','type':'HTTP','plan':'test-plan1','count':'5'},
          {'name':'case1','type':'HTTP','plan':'test-plan1','count':'5'},
          {'name':'case1','type':'HTTP','plan':'test-plan1','count':'5'},
          {'name':'case1','type':'HTTP','plan':'test-plan1','count':'5'},
          // {'name':'case1','type':'HTTP','plan':'test-plan1','count':'5'},
        ],
        tableHeight: '',
      }
    },
    mounted() {
      this.drawProPie();
      this.drawInterfacePie();
      this.drawTestCasePie();
      
      //this.getProjectInfo()
      this.$nextTick(function () {
        // this.drawThree();
        
      });
    },
    methods: {
      // drawThree() {
      //   this.drawRing(document.getElementById('ring_x'), "小学", 34, 35);
      //   this.drawRing(document.getElementById('ring_c'), "中学", 34, 35);
      //   this.drawRing(document.getElementById('ring_g'), "高中", 34, 35);
      //   this.drawLeftBar(document.getElementById('lef_line'));
      //   this.drawBXGM();
      //   this.drawSSB();
      //   this.drawBXCC();
      //   this.drawLineXXDJ();
      //   this.drawMap();
      //   this.drawRightBar(document.getElementById('right_bar'));
      //   this.drawRightLine();
      //   this.drawPie();
      //   this.drawProPie();
      //   this.drawApiPie();
      // },
      drawProPie() {
        var myChart = this.$echarts.init(document.getElementById('project'));
        var option = {
          //标题
          title: {
            text: '(接口数量top5分布统计)',
            x: 'center' ,              //标题位置
            textStyle: { //标题内容的样式
              color: '#000',
              fontStyle: 'normal',
              fontWeight: 100,
              fontSize: 14 //主题文字字体大小，默认为18px
            },
          },
          // stillShowZeroSum: true,
          //鼠标划过时饼状图上显示的数据
          tooltip: {
            trigger: 'item',
            formatter: '{b}:{c} ({d}%)'
          },
          //图例
          legend: {//图例  标注各种颜色代表的模块
            // orient: 'vertical',//图例的显示方式  默认横向显示
            bottom: 10,//控制图例出现的距离  默认左上角
            left: 'center',//控制图例的位置
            // itemWidth: 16,//图例颜色块的宽度和高度
            // itemHeight: 12,
            textStyle: {//图例中文字的样式
              color: '#000',
              fontSize: 16
            },
            data: ['未领取', '处理中', '已完成']//图例上显示的饼图各模块上的名字
          },
          //饼图中各模块的颜色
          color: ['#32dadd', '#b6a2de', '#5ab1ef'],
          // 饼图数据
          series: {
            // name: 'bug分布',
            type: 'pie',             //echarts图的类型   pie代表饼图
            radius: '40%',           //饼图中饼状部分的大小所占整个父元素的百分比
            center: ['50%', '60%'],  //整个饼图在整个父元素中的位置
            // data:''               //饼图数据
            data: [                  //每个模块的名字和值
              { name: '物流系统', value: 1 },
              { name: '商城系统', value: 2 },
              { name: '后台系统', value: 3 }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,//饼图上是否出现标注文字 标注各模块代表什么  默认是true
                  // position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
                },
                labelLine: {
                  show: true//官网demo里外部标注上的小细线的显示隐藏    默认显示
                }
              }
            },
          }
        }
        myChart.setOption(option)
        //随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          this.myChart.resize();
        });
      }, 
      drawInterfacePie() {
        var myChart = this.$echarts.init(document.getElementById('interface'));
        var option = {
          //标题
          title: {
            text: '(接口类型top5分布统计)',
            x: 'center' ,              //标题位置
            textStyle: { //标题内容的样式
              color: '#000',
              fontStyle: 'normal',
              fontWeight: 100,
              fontSize: 14 //主题文字字体大小，默认为18px
            },
          },
          // stillShowZeroSum: true,
          //鼠标划过时饼状图上显示的数据
          tooltip: {
            trigger: 'item',
            formatter: '{b}:{c} ({d}%)'
          },
          //图例
          // legend: {//图例  标注各种颜色代表的模块
          //   // orient: 'vertical',//图例的显示方式  默认横向显示
          //   bottom: 10,//控制图例出现的距离  默认左上角
          //   left: 'center',//控制图例的位置
          //   // itemWidth: 16,//图例颜色块的宽度和高度
          //   // itemHeight: 12,
          //   textStyle: {//图例中文字的样式
          //     color: '#000',
          //     fontSize: 16
          //   },
          //   data: ['HTTP', 'RPC', 'TCP']//图例上显示的饼图各模块上的名字
          // },
          //饼图中各模块的颜色
          color: ['#32dadd', '#b6a2de', '#5ab1ef'],
          // 饼图数据
          series: {
            // name: 'bug分布',
            type: 'pie',             //echarts图的类型   pie代表饼图
            radius: '40%',           //饼图中饼状部分的大小所占整个父元素的百分比
            center: ['50%', '60%'],  //整个饼图在整个父元素中的位置
            // data:''               //饼图数据
            data: [                  //每个模块的名字和值
              { name: 'HTTP', value: 8 },
              { name: 'RPC', value: 2},
              { name: 'TCP', value: 3 }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,//饼图上是否出现标注文字 标注各模块代表什么  默认是true
                  // position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
                },
                labelLine: {
                  show: true//官网demo里外部标注上的小细线的显示隐藏    默认显示
                }
              }
            },
          }
        }
        myChart.setOption(option)
        //随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          this.myChart.resize();
        });
      }, 

      drawTestCasePie() {
        var myChart = this.$echarts.init(document.getElementById('testcase'));
        var option = {
          //标题
          title: {
            text: '(用例类型top5分布统计)',
            x: 'center' ,              //标题位置
            textStyle: { //标题内容的样式
              color: '#000',
              fontStyle: 'normal',
              fontWeight: 100,
              fontSize: 14 //主题文字字体大小，默认为18px
            },
          },
          // stillShowZeroSum: true,
          //鼠标划过时饼状图上显示的数据
          tooltip: {
            trigger: 'item',
            formatter: '{b}:{c} ({d}%)'
          },
          //图例
          // legend: {//图例  标注各种颜色代表的模块
          //   // orient: 'vertical',//图例的显示方式  默认横向显示
          //   bottom: 10,//控制图例出现的距离  默认左上角
          //   left: 'center',//控制图例的位置
          //   // itemWidth: 16,//图例颜色块的宽度和高度
          //   // itemHeight: 12,
          //   textStyle: {//图例中文字的样式
          //     color: '#000',
          //     fontSize: 16
          //   },
          //   data: ['HTTP', 'RPC', 'TCP']//图例上显示的饼图各模块上的名字
          // },
          //饼图中各模块的颜色
          color: ['#32dadd', '#b6a2de', '#5ab1ef'],
          // 饼图数据
          series: {
            // name: 'bug分布',
            type: 'pie',             //echarts图的类型   pie代表饼图
            radius: '40%',           //饼图中饼状部分的大小所占整个父元素的百分比
            center: ['50%', '60%'],  //整个饼图在整个父元素中的位置
            // data:''               //饼图数据
            data: [                  //每个模块的名字和值
              { name: 'HTTP', value: 15 },
              { name: 'RPC', value: 8},
              { name: 'TCP', value: 3 }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,//饼图上是否出现标注文字 标注各模块代表什么  默认是true
                  // position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
                },
                labelLine: {
                  show: true//官网demo里外部标注上的小细线的显示隐藏    默认显示
                }
              }
            },
          }
        }
        myChart.setOption(option)
        //随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          this.myChart.resize();
        });
      }, 
      // getProjectInfo() {
      //   var self = this;
      //   let params = { project_id: this.$route.params.project_id};            
      //   getProjectDetail(params).then(_data => {
      //     let { msg, code, data } = _data;
      //     self.listLoading = false;
      //     if (code === '999999') {
      //       self.type = data.type;
      //       self.version = data.version;
      //       self.updateDate = data.LastUpdateTime;
      //       self.apiCount = data.apiCount;
      //       self.dynamicCount = data.dynamicCount;
      //       self.memberCount = data.memberCount;
      //       self.createDate = data.createTime;
      //     }
      //     else {
      //       self.$message.error({
      //         message: msg,
      //         center: true,
      //       })
      //     }
      //   });
      // },
    },

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
        width: 32%; 
        margin: 5px;
        margin-left: 10px;
        margin-right: 5px;
    }
    .secondline {
      width: 48.5%;
      height: 49%;
      margin: 5px;
      margin-left: 10px;
      margin-right: 5px;
    }
    .bar {
        margin: 10px;
        margin-left: 0px;
        margin-bottom: 50px;
    }
</style>
