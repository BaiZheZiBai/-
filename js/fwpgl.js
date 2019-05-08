/**
 * Created by 30947 on 2018/7/18.
 */
var baseUrl = "http://172.16.15.46:8080/";
voltagelineinfo = "rest/eqLine/secondMenu" // 电压等级线路分布图
// wurenji="http://172.16.15.46:8080/planeInfo" 
$(function () {
    voltage();
    bteam();
})


function voltage() {
    var myChart = echarts.init($("#voltage")[0]);
    // $.ajax({
    //     url: this.baseUrl+this.voltagelineinfo,
    //     type: "get",
    // success: function (res) {
    //    var  Vdata="";
    //    var  Mdata="";
    //     for (var i = 0; i < res.bzt.length; i++) {
    //         Vdata+=`<li>${res.bzt[i].NAME}</li>` 
    //         Mdata+=`<li>${res.bzt[i].VALUE}</li>` 
    //     }
    //  $("#bzt_info ul:first-child").append(Vdata);
    //  $("#bzt_info ul:nth-child(2)").append(Mdata);

    // 指定图表的配置项和数据
    option = {

        //----------------   图例 legend  -----------------
        legend: {
            type: 'plain', //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
            right: '6%', //----图例相对容器位置,top\bottom\left\right            
            top:"15%",
            textStyle: { //----图例内容样式
                color: '#53C7FF', //---所有图例的字体颜色
                //backgroundColor:'black',  //---所有图例的字体背景色
            },
            tooltip: { //图例提示框，默认不显示
                show: true,
                color: 'red',
            },
            data: [ //----图例内容
                {
                    name: '杆塔数/电压等级',
                    icon: 'circle', //----图例的外框样式
                    textStyle: {
                        color: '#53C7FF', //----单独设置某一个图例的颜色
                        //backgroundColor:'black',//---单独设置某一个图例的字体背景色
                    }
                }
            ],
        },

        //--------------   提示框 -----------------
        tooltip: {
            show: true, //---是否显示提示框,默认为true
            trigger: 'item', //---数据项图形触发
            axisPointer: { //---指示样式
                type: 'shadow',
                axis: 'auto',

            },
            padding: 5,
            textStyle: { //---提示框内容样式
                color: "#fff",
            },
        },

        //-------------  grid区域  ----------------
        grid: {
            show: false, //---是否显示直角坐标系网格
            top:100, //---相对位置，top\bottom\left\right  
            containLabel: false, //---grid 区域是否包含坐标轴的刻度标签
            tooltip: { //---鼠标焦点放在图形上，产生的提示框
                show: true,
                trigger: 'item', //---触发类型
                textStyle: {
                    color: '#666',
                },
            }
        },

        //-------------   x轴   -------------------
        xAxis: {
            show: true, //---是否显示
            position: 'bottom', //---x轴位置
            offset: 0, //---x轴相对于默认位置的偏移
            axisLine: { //---坐标轴 轴线
                show: true, //---是否显示

                //------------------- 箭头 -------------------------
                symbol: ['none', 'arrow'], //---是否显示轴线箭头
                symbolSize: [8, 8], //---箭头大小
                symbolOffset: [0, 7], //---箭头位置

                //------------------- 线 -------------------------
                lineStyle: {
                    color: '#0E5A7D',
                    width: 1,
                    type: 'solid',
                },
            },
            axisTick: { //---坐标轴 刻度
                show: true, //---是否显示
                inside: true, //---是否朝内
                lengt: 3, //---长度
                lineStyle: {
                    //color:'red',          //---默认取轴线的颜色
                    width: 1,
                    type: 'solid',
                },
            },
            axisLabel: { //---坐标轴 标签
                show: true, //---是否显示
                inside: false, //---是否朝内
                rotate: 0, //---旋转角度   
                margin: 5, //---刻度标签与轴线之间的距离
                color: '#53C7FF', //---默认取轴线的颜色
            },
            splitLine: { //---grid 区域中的分隔线
                show: false, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
                lineStyle: {
                    //color:'red',
                    //width:1,
                    //type:'solid',
                },
            },
            splitArea: { //--网格区域
                show: false, //---是否显示，默认false
            },
            data: ["班组1","班组2", "班组3","班组4","班组5","班组6","班组7"], //内容
        },

        //----------------------  y轴  ------------------------
        yAxis: {
            show: true, //---是否显示
            position: 'left', //---y轴位置
            offset: 0, //---y轴相对于默认位置的偏移
            type: 'value', //---轴类型，默认'category'
            axisLine: { //---坐标轴 轴线
                show: true, //---是否显示

                //------------------- 箭头 -------------------------
                symbol: ['none', 'arrow'], //---是否显示轴线箭头
                symbolSize: [8, 8], //---箭头大小
                symbolOffset: [0, 7], //---箭头位置

                //------------------- 线 -------------------------
                lineStyle: {
                    color: '#0E5A7D',
                    width: 1,
                    type: 'solid',
                },
            },
            axisTick: { //---坐标轴 刻度
                show: true, //---是否显示
                inside: false, //---是否朝内
                lengt: 3, //---长度
                lineStyle: {
                    //color:'red',          //---默认取轴线的颜色
                    width: 1,
                    type: 'solid',
                },
            },
            axisLabel: { //---坐标轴 标签
                show: true, //---是否显示
                inside: false, //---是否朝内
                rotate: 0, //---旋转角度   
                margin: 8, //---刻度标签与轴线之间的距离
                color: '#53C7FF', //---默认取轴线的颜色
            },
            splitLine: { //---grid 区域中的分隔线
                show: false, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                lineStyle: {
                    color: '#666',
                    width: 1,
                    type: 'dashed', //---类型
                },
            },
            splitArea: { //--网格区域
                show: false, //---是否显示，默认false
            }
        },

        //------------ 内容数据  -----------------
        series: [{
            name: '杆塔数/电压等级', //---系列名称
            type: 'bar', //---类型
            legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
            label: { //---图形上的文本标签
                show: false,
                position: 'insideTop', //---相对位置
                rotate: 0, //---旋转角度
                color: '#53C7FF',
            },
            itemStyle: { //---图形形状
                normal: {
                    // 随机显示
                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                  
                    // 定制显示（按顺序）
                    color: function(params) { 
                        var colorList = ['#53c8fe','#419afe','#ed95e3','#366afb','#432ef2','#ec432d','#354adf']; 
                        return colorList[params.dataIndex] 
                    }
                },
            },
            barWidth: '40', //---柱形宽度
            barCategoryGap: '20%', //---柱形间距
            data: [110, 130, 115,150,132,122,141]
        }]
    }; //故障概况
    myChart.setOption(option);
    // }
    // })


}


function bteam() {
    var myChart = echarts.init($("#bteam")[0]);
    // $.ajax({
        // url: this.baseUrl + this.voltagelineinfo,
        // type: "get",
        // success: function (reslut) {
            // console.log(reslut.lb);
            // var t_title = `<tr> <th>班组名字</th><th>线路数</th><th>总长度</th><th>人员数</th></tr>`;
            // var html = '';
            // var rescon = '';
            // for (let i = 0; i < reslut.lb.length; i++) {
            //     html += `<tr><td>${reslut.lb[i].NAME}</td><td>${reslut.lb[i].LINECOUNT}</td><td>${reslut.lb[i].LINESUM}</td><td>${reslut.lb[i].NUM}</td></tr>`
            // }
            // rescon = t_title + html;
            // $("#Btable").append(rescon);

            option = {

                //----------------   图例 legend  -----------------
                legend: {
                    type: 'plain', //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
                    right: '6%', //----图例相对容器位置,top\bottom\left\right            
                    top:"15%",
                    textStyle: { //----图例内容样式
                        color: '#53C7FF', //---所有图例的字体颜色
                        //backgroundColor:'black',  //---所有图例的字体背景色
                    },
                    tooltip: { //图例提示框，默认不显示
                        show: true,
                        color: 'red',
                    },
                    data: [ //----图例内容
                        {
                            name: '视频数量/**',
                            icon: 'circle', //----图例的外框样式
                            textStyle: {
                                color: '#53C7FF', //----单独设置某一个图例的颜色
                                //backgroundColor:'black',//---单独设置某一个图例的字体背景色
                            }
                        }
                    ],
                },
        
                //--------------   提示框 -----------------
                tooltip: {
                    show: true, //---是否显示提示框,默认为true
                    trigger: 'item', //---数据项图形触发
                    axisPointer: { //---指示样式
                        type: 'shadow',
                        axis: 'auto',
        
                    },
                    padding: 5,
                    textStyle: { //---提示框内容样式
                        color: "#fff",
                    },
                },
        
                //-------------  grid区域  ----------------
                grid: {
                    show: false, //---是否显示直角坐标系网格
                    top:100, //---相对位置，top\bottom\left\right  
                    containLabel: false, //---grid 区域是否包含坐标轴的刻度标签
                    tooltip: { //---鼠标焦点放在图形上，产生的提示框
                        show: true,
                        trigger: 'item', //---触发类型
                        textStyle: {
                            color: '#666',
                        },
                    }
                },
        
                //-------------   x轴   -------------------
                xAxis: {
                    show: true, //---是否显示
                    position: 'bottom', //---x轴位置
                    offset: 0, //---x轴相对于默认位置的偏移
                    axisLine: { //---坐标轴 轴线
                        show: true, //---是否显示
        
                        //------------------- 箭头 -------------------------
                        symbol: ['none', 'arrow'], //---是否显示轴线箭头
                        symbolSize: [8, 8], //---箭头大小
                        symbolOffset: [0, 7], //---箭头位置
        
                        //------------------- 线 -------------------------
                        lineStyle: {
                            color: '#0E5A7D',
                            width: 1,
                            type: 'solid',
                        },
                    },
                    axisTick: { //---坐标轴 刻度
                        show: true, //---是否显示
                        inside: true, //---是否朝内
                        lengt: 3, //---长度
                        lineStyle: {
                            //color:'red',          //---默认取轴线的颜色
                            width: 1,
                            type: 'solid',
                        },
                    },
                    axisLabel: { //---坐标轴 标签
                        show: true, //---是否显示
                        inside: false, //---是否朝内
                        rotate: 0, //---旋转角度   
                        margin: 5, //---刻度标签与轴线之间的距离
                        color: '#53C7FF', //---默认取轴线的颜色
                    },
                    splitLine: { //---grid 区域中的分隔线
                        show: false, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
                        lineStyle: {
                            //color:'red',
                            //width:1,
                            //type:'solid',
                        },
                    },
                    splitArea: { //--网格区域
                        show: false, //---是否显示，默认false
                    },
                    data: ["一", "二", "三","四","五",'六'], //内容
                },
        
                //----------------------  y轴  ------------------------
                yAxis: {
                    show: true, //---是否显示
                    position: 'left', //---y轴位置
                    offset: 0, //---y轴相对于默认位置的偏移
                    type: 'value', //---轴类型，默认'category'
                    axisLine: { //---坐标轴 轴线
                        show: true, //---是否显示
        
                        //------------------- 箭头 -------------------------
                        symbol: ['none', 'arrow'], //---是否显示轴线箭头
                        symbolSize: [8, 8], //---箭头大小
                        symbolOffset: [0, 7], //---箭头位置
        
                        //------------------- 线 -------------------------
                        lineStyle: {
                            color: '#0E5A7D',
                            width: 1,
                            type: 'solid',
                        },
                    },
                    axisTick: { //---坐标轴 刻度
                        show: true, //---是否显示
                        inside: false, //---是否朝内
                        lengt: 3, //---长度
                        lineStyle: {
                            //color:'red',          //---默认取轴线的颜色
                            width: 1,
                            type: 'solid',
                        },
                    },
                    axisLabel: { //---坐标轴 标签
                        show: true, //---是否显示
                        inside: false, //---是否朝内
                        rotate: 0, //---旋转角度   
                        margin: 8, //---刻度标签与轴线之间的距离
                        color: '#53C7FF', //---默认取轴线的颜色
                    },
                    splitLine: { //---grid 区域中的分隔线
                        show: false, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                        lineStyle: {
                            color: '#666',
                            width: 1,
                            type: 'dashed', //---类型
                        },
                    },
                    splitArea: { //--网格区域
                        show: false, //---是否显示，默认false
                    }
                },
        
                //------------ 内容数据  -----------------
                series: [{
                    name: '视频数量/**', //---系列名称
                    type: 'bar', //---类型
                    legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
                    label: { //---图形上的文本标签
                        show: false,
                        position: 'insideTop', //---相对位置
                        rotate: 0, //---旋转角度
                        color: '#53C7FF',
                    },
                    itemStyle: { //---图形形状
                        normal: {
                            // 随机显示
                            //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                          
                            // 定制显示（按顺序）
                            color: function(params) { 
                                var colorList = ['#53c8fe','#419afe','#ed95e3','#366afb','#6975fd','#6421d2']; 
                                return colorList[params.dataIndex] 
                            }
                        },
                    },
                    barWidth: '40', //---柱形宽度
                    barCategoryGap: '20%', //---柱形间距
                    data: [110, 130, 115,150,120,122]
                }]
            }; //故障概况
            myChart.setOption(option);
        // }
    // })



}