/**
 * Created by 30947 on 2018/7/18.
 */
var baseUrl = "http://172.16.15.46:8080/";
wk_infoPath = "rest/spanGovern/secondMenu" //六防信息
// wurenji="http://172.16.15.46:8080/planeInfo" 
$(function () {
    gztj();
    year_lf();
    month_lf();
    type_lf();
    newriqi()

})

function newriqi() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + "年" + month + "月" + strDate + "日";
    $("#riqi").html(currentdate)

} //日期时间
//故障统计
function gztj() {
    // var myChart1 = echarts.init($("#Lightningstroke")[0]);
    var myChart2 = echarts.init($("#flashover")[0]);
    var myChart3 = echarts.init($("#Winddamage")[0]);
    var myChart4 = echarts.init($("#Birdpest")[0]);
    var myChart5 = echarts.init($("#forcefailure")[0]);
    var myChart6 = echarts.init($("#Icing")[0]);
    var myChart7 = echarts.init($("#type_lf")[0]);
    // $.ajax({
    //     url: this.baseUrl + this.wk_infoPath,
    //     type: "get",
    //     success: function (res) {
    //         console.log(res);
    // option1 = {
    //     title: {
    //         text: '单位：个',
    //         textStyle: { //---主标题内容样式    
    //             color: '#0FD5E7',
    //             fontSize: '16'
    //         },
    //         padding: [0, 40, 0, 400] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
    //     },
    //     tooltip: {
    //         show: true, //---是否显示提示框,默认为true
    //         trigger: 'item', //---数据项图形触发
    //         axisPointer: { //---指示样式
    //             type: 'shadow',
    //             axis: 'auto',

    //         },
    //         padding: 5,
    //         textStyle: { //---提示框内容样式
    //             color: "#fff",
    //         },
    //     },
    //     xAxis: {
    //         type: 'category',
    //         data: ['计划安装数', '已完成', '储备数量'],
    //         splitLine: {
    //             show: false
    //         }, //去除网格线
    //         axisLine: {
    //             symbol: ['none', 'arrow'], //---是否显示轴线箭头
    //             symbolSize: [8, 8], //---箭头大小
    //             symbolOffset: [0, 7], //---箭头位置
    //             lineStyle: {
    //                 type: 'solid',
    //                 color: '#00EAFF', //左边线的颜色
    //                 width: '2' //坐标线的宽度
    //             }
    //         },
    //         axisLabel: {
    //             textStyle: {
    //                 color: '#90D1F2', //坐标值得具体的颜色
    //                 fontSize: '16',
    //                 padding: [-5, 0, 0, -5], //---坐标轴名称相对位置

    //             }
    //         }
    //     },
    //     yAxis: {
    //         type: 'value',
    //         axisLine: {
    //             symbol: ['none', 'arrow'], //---是否显示轴线箭头
    //             symbolSize: [8, 8], //---箭头大小
    //             symbolOffset: [0, 7], //---箭头位置
    //             lineStyle: {
    //                 type: 'solid',
    //                 color: '#00EAFF',
    //                 width: '2'
    //             }
    //         },
    //         axisLabel: {
    //             textStyle: {
    //                 color: '#90D1F2'
    //             }
    //         },
    //         splitLine: { //---grid 区域中的分隔线
    //             show: false, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
    //             lineStyle: {
    //                 color: '#00EAFF',
    //                 width: 1,
    //                 // type:'dashed',          //---类型
    //             },
    //         },

    //     },
    //     series: [{
    //         data: [1, 2, 3],
    //         type: 'bar',
    //         itemStyle: {
    //             normal: {
    //                 color: "#68E6F9"
    //             }
    //         },
    //         barWidth: 40, //柱图宽度
    //     }]
    // };  //防雷击

    option2 = {
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
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed'],
            axisLabel: {
                textStyle: {
                    color: '#90D1F2', //坐标值得具体的颜色

                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                textStyle: {
                    color: '#90D1F2', //坐标值得具体的颜色

                }
            },
            splitLine: { //---grid 区域中的分隔线
                show: false, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                lineStyle: {
                    color: '#00EAFF',
                    width: 1,
                    // type:'dashed',          //---类型
                },
            },
        },
        series: [{
            data: [820, 932, 901],
            type: 'line',
            areaStyle: {},
            itemStyle: {
                normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#fff' // 0% 处的颜色
                    }, {
                        offset: 0.4,
                        color: '#e4f2ff' // 100% 处的颜色
                    }, {
                        offset: 1,
                        color: '#81befd' // 100% 处的颜色
                    }]), //背景渐变色    
                    lineStyle: { // 系列级个性化折线样式  
                        width: 1,
                        type: 'solid',
                        color: "#0180ff" //折线的颜色
                    }
                },

            }, //线条样式

        }]
    }; //防污闪

    option3 = {

        //----------------   图例 legend  -----------------
        legend: {
            type: 'plain', //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
            right: '1%', //----图例相对容器位置,top\bottom\left\right            
            selected: {
                '故障数量': true, //----图例选择,图形加载出来会显示选择的图例，默认为true
            },
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
                    name: '故障数量',
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
            top: 80, //---相对位置，top\bottom\left\right  
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
            data: ["人工", "分布式", "其他"], //内容
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
            name: '故障数量', //---系列名称
            type: 'bar', //---类型
            legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
            label: { //---图形上的文本标签
                show: false,
                position: 'insideTop', //---相对位置
                rotate: 0, //---旋转角度
                color: '#53C7FF',
            },
            itemStyle: { //---图形形状
                color: '#53C7FF',
            },
            barWidth: '40', //---柱形宽度
            barCategoryGap: '20%', //---柱形间距
            data: [110, 130, 115]
        }]
    }; //故障概况
    option4 = {

        //----------------   图例 legend  -----------------
        legend: {
            type: 'plain', //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
            right: '1%', //----图例相对容器位置,top\bottom\left\right            
            selected: {
                '故障数量': true, //----图例选择,图形加载出来会显示选择的图例，默认为true
            },
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
                    name: '故障数量',
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
            right: "1%", //---相对位置，top\bottom\left\right  
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
            data: ["班组1", "班组2", "班组3", "班组4"], //内容
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
            name: '故障数量', //---系列名称
            type: 'bar', //---类型
            legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
            label: { //---图形上的文本标签
                show: false,
                position: 'insideTop', //---相对位置
                rotate: 0, //---旋转角度
                color: '#53C7FF',
            },
            itemStyle: { //---图形形状
                color: '#ED95E3',
            },
            barWidth: '40', //---柱形宽度
            barCategoryGap: '20%', //---柱形间距
            data: [110, 130, 115, 125]
        }]
    }; //故障概况

    option5 = {
        //图例名
        legend: {
            right: '1%', //----图例相对容器位置,top\bottom\left\right     
            data: ['设备在线率'],
            textStyle: { //----图例内容样式
                color: '#53C7FF', //---所有图例的字体颜色
                //backgroundColor:'black',  //---所有图例的字体背景色
            },
        },
        grid: {
            left: '3%', //图表距边框的距离
            right: '4%',
            containLabel: true
        },
        //x轴信息样式
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
            data: ['线路1', '线路2', '线路3', '线路4', '线路5', '线路6', '线路7'],
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
                interval: 'auto',
                formatter: '{value} %',
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
        series: [
            //实线
            {
                name: '设备在线率',
                type: 'line',
                symbol: 'circle',
                symbolSize: 4,
                areaStyle: {
                    normal: {
                        color: '#69CEFF' //改变区域颜色
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#69CEFF',
                        formatter: '{b}\n{c}%',
                        borderColor: '#69CEFF' //拐点边框颜色
                    }
                },
                data: [40, 45, 50, 35, 46, 42, 46]
            }

        ]
    }; //设备在线率
    option6 = {
        //图例名
        legend: {
            right: '1%', //----图例相对容器位置,top\bottom\left\right     
            data: ['设备覆盖率'],
            textStyle: { //----图例内容样式
                color: '#5C4BFC', //---所有图例的字体颜色
                //backgroundColor:'black',  //---所有图例的字体背景色
            },
        },
        grid: {
            left: '3%', //图表距边框的距离
            right: '4%',
            containLabel: true
        },
        //x轴信息样式
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
            data: ['人工', '视频', '无人机'],
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
                interval: 'auto',
                formatter: '{value} %',
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
        series: [
            //实线
            {
                name: '设备覆盖率',
                type: 'line',
                symbol: 'circle',
                symbolSize: 4,
                areaStyle: {
                    normal: {
                        color: '#5C4BFC' //改变区域颜色
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#5C4BFC',
                        formatter: '{b}\n{c}%',
                        borderColor: '#5C4BFC' //拐点边框颜色
                    }
                },
                data: [40, 50, 55]
            }

        ]
    } //线路覆盖率
    option7 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            // 图例排项 vertical-"竖向"; horizontal-"横向"
            orient: 'horizontal',
            // 图例组件离容器左侧的距离
            right:150,
            top: 0,
            //图例文字的样式
            textStyle: {
                color:['#6ab2ec',"#6cb3e2",'#3bde3c']
            },

            data: ['类别1', '类别2', '类别3']
        },
        grid: {
            left: '3%',
            right: '50%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            show: true, //---是否显示
            position: 'bottom', //---x轴位置
            offset: 0, //---x轴相对于默认位置的偏移
            name:'时间（us）',              //---轴名称
            nameLocation:'end',         //---轴名称相对位置
            nameTextStyle:{             //---坐标轴名称样式
                color:"#0E5A7D",
                padding:[5,0,0,-5], //---坐标轴名称相对位置
            },
            nameGap:15,                 //---坐标轴名称与轴线之间的距离
            //nameRotate:270,           //---坐标轴名字旋转
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
            data: ['200', '400', '600', '800', '1000', '1200', '1400',"1600","1800"]
        }],
        yAxis: [{
            show: true, //---是否显示
            position: 'left', //---y轴位置
            offset: 0, //---y轴相对于默认位置的偏移
            type: 'value', //---轴类型，默认'category'
            name:'电流（A）',              //---轴名称
            nameLocation:'end',         //---轴名称相对位置value
            nameTextStyle:{             //---坐标轴名称样式
                color:"#0E5A7D",
                padding:[5,0,0,5],  //---坐标轴名称相对位置
            },
            nameGap:15,                 //---坐标轴名称与轴线之间的距离
            //nameRotate:270,           //---坐标轴名字旋转
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
                interval: 'auto',
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
        }],
        series: [{
                name: '类别1',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210,200]
            },
            {
                name: '类别2',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310,300]
            },
            {
                name: '类别3',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [150, 232, 201, 154, 190, 330, 410,400]
            },
          
        ]
    };
    // myChart1.setOption(option1)
    myChart2.setOption(option2)
    myChart3.setOption(option3)
    myChart4.setOption(option4)
    myChart5.setOption(option5)
    myChart6.setOption(option6)
    myChart7.setOption(option7)
}
// })

// }

//六防设备近四年建设状况
function year_lf() {
    var myChart = echarts.init($("#year_wk")[0]);
    $.ajax({
        url: this.baseUrl + this.wk_infoPath,
        type: "get",
        success: function (res) {
            console.log(res.zxt_jh);
            option = {
                title: {
                    text: '2019年设备建设状况',
                    textStyle: { //---主标题内容样式    
                        color: '#90D1F2',
                        fontSize: '16'
                    },
                    padding: [0, 40, 0, 900] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
                },
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
                legend: {
                    data: ['已安装', '未完成', '未储备'],
                    textStyle: {
                        color: '#90D1F2',
                        fontSize: '18'
                    },
                    x: 'center',
                    y: 'bottom',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['2016', '2017', '2018', '2019'],
                    lineStyle: {
                        type: 'solid',
                        color: '#0AA4D6', //左边线的颜色
                        width: '2' //坐标线的宽度
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#90D1F2', //坐标值得具体的颜色
                            fontSize: '14'
                        }
                    }
                }],
                yAxis: [{
                    type: 'value',
                    lineStyle: {
                        type: 'solid',
                        color: '#0AA4D6', //左边线的颜色
                        width: '2' //坐标线的宽度
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#90D1F2'
                        }
                    },
                    splitLine: { //---grid 区域中的分隔线
                        show: false, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                        lineStyle: {
                            color: '#00EAFF',
                            width: 1,
                            // type:'dashed',          //---类型
                        },
                    },
                }],
                series: [{
                        name: '已安装',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: res.zxt_jh,
                        symbolSize: 10, //折线点的大小
                        symbol: 'circle', //拐点样式
                        itemStyle: {
                            normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#4389BA' // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#69CEFF' // 100% 处的颜色
                                    }
                                ]), //背景渐变色    
                                lineStyle: { // 系列级个性化折线样式  
                                    width: 1,
                                    type: 'solid',
                                    color: "RGBA(7, 197, 231, 1)" //折线的颜色
                                }
                            },

                        }, //线条样式
                    },
                    {
                        name: '未完成',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: res.zxt_wc,
                        symbolSize: 10, //折线点的大小
                        symbol: 'circle', //拐点样式
                        itemStyle: {
                            normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#52bef0' // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#1E246E' // 100% 处的颜色
                                    }
                                ]), //背景渐变色    
                                lineStyle: { // 系列级个性化折线样式  
                                    width: 1,
                                    type: 'solid',
                                    color: "#353FAE" //折线的颜色
                                }
                            },

                        }, //线条样式
                    },
                    {
                        name: '未储备',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: res.zxt_cb,
                        symbolSize: 10, //折线点的大小
                        symbol: 'circle', //拐点样式
                        itemStyle: {
                            normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0.1,
                                        color: '#A94EC0' // 0% 处的颜色
                                    }, {

                                        offset: 0.5,
                                        color: '#7E3E9D' // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#3F256B' // 100% 处的颜色
                                    }
                                ]), //背景渐变色    
                                lineStyle: { // 系列级个性化折线样式  
                                    width: 1,
                                    type: 'solid',
                                    color: "#AE53C7" //折线的颜色
                                }
                            },

                        }, //线条样式
                    },
                ]
            };

            myChart.setOption(option)

        }
    })

}

//六防设备近四年建设状况
function month_lf() {
    var myChart = echarts.init($("#year_wk")[0]);
    $.ajax({
        url: this.baseUrl + this.wk_infoPath,
        type: "get",
        success: function (res) {
            console.log(res.zxt_jh);
            option = {
                title: {
                    text: '2019年设备建设状况',
                    textStyle: { //---主标题内容样式    
                        color: '#90D1F2',
                        fontSize: '16'
                    },
                    padding: [0, 40, 0, 900] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
                },
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
                legend: {
                    data: ['已安装', '未完成', '未储备'],
                    textStyle: {
                        color: '#90D1F2',
                        fontSize: '18'
                    },
                    x: 'center',
                    y: 'bottom',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['2016', '2017', '2018', '2019'],
                    lineStyle: {
                        type: 'solid',
                        color: '#0AA4D6', //左边线的颜色
                        width: '2' //坐标线的宽度
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#90D1F2', //坐标值得具体的颜色
                            fontSize: '14'
                        }
                    }
                }],
                yAxis: [{
                    type: 'value',
                    lineStyle: {
                        type: 'solid',
                        color: '#0AA4D6', //左边线的颜色
                        width: '2' //坐标线的宽度
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#90D1F2'
                        }
                    },
                    splitLine: { //---grid 区域中的分隔线
                        show: false, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                        lineStyle: {
                            color: '#00EAFF',
                            width: 1,
                            // type:'dashed',          //---类型
                        },
                    },
                }],
                series: [{
                        name: '已安装',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: res.zxt_jh,
                        symbolSize: 10, //折线点的大小
                        symbol: 'circle', //拐点样式
                        itemStyle: {
                            normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#4389BA' // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#69CEFF' // 100% 处的颜色
                                    }
                                ]), //背景渐变色    
                                lineStyle: { // 系列级个性化折线样式  
                                    width: 1,
                                    type: 'solid',
                                    color: "RGBA(7, 197, 231, 1)" //折线的颜色
                                }
                            },

                        }, //线条样式
                    },
                    {
                        name: '未完成',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: res.zxt_wc,
                        symbolSize: 10, //折线点的大小
                        symbol: 'circle', //拐点样式
                        itemStyle: {
                            normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#52bef0' // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#1E246E' // 100% 处的颜色
                                    }
                                ]), //背景渐变色    
                                lineStyle: { // 系列级个性化折线样式  
                                    width: 1,
                                    type: 'solid',
                                    color: "#353FAE" //折线的颜色
                                }
                            },

                        }, //线条样式
                    },
                    {
                        name: '未储备',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: res.zxt_cb,
                        symbolSize: 10, //折线点的大小
                        symbol: 'circle', //拐点样式
                        itemStyle: {
                            normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0.1,
                                        color: '#A94EC0' // 0% 处的颜色
                                    }, {

                                        offset: 0.5,
                                        color: '#7E3E9D' // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#3F256B' // 100% 处的颜色
                                    }
                                ]), //背景渐变色    
                                lineStyle: { // 系列级个性化折线样式  
                                    width: 1,
                                    type: 'solid',
                                    color: "#AE53C7" //折线的颜色
                                }
                            },

                        }, //线条样式
                    },
                ]
            };

            myChart.setOption(option)

        }
    })

}

function type_lf() {
    var myChart = echarts.init($("#type_wk")[0]);
    $.ajax({
        url: this.baseUrl + this.wk_infoPath,
        type: "get",
        success: function (res) {
            console.log(res.bzt);
            var arr = res.bzt;
            for (var i = 0; i < arr.length; i++) {
                switch (arr[i].WAY) {
                    case "1":
                        arr[i].WAY = "独立耐张段";
                        break;
                    case "2":
                        arr[i].WAY = "双串双挂";
                        break;
                    case "3":
                        arr[i].WAY = "安装附引流";
                        break;
                    case "4":
                        arr[i].WAY = "金属探伤";
                        break;
                    case "5":
                        arr[i].WAY = "视频监控";
                        break;
                    case "6":
                        arr[i].WAY = "ADSS治理";
                        break;
                    default:
                        break;
                }
            }
            option = {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: "{a}{b} {c}<br/>({d}%)",
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '22'
                    }
                },
                legend: {
                    orient: 'vertical',
                    x: "300",
                    y: "40",
                    textStyle: {
                        color: '#90D1F2',
                        fontSize: '18'
                    },
                    data: [arr[0].WAY, arr[1].WAY, arr[2].WAY, arr[3].WAY, arr[4].WAY, arr[5].WAY]
                },
                series: [{
                    name: '',
                    type: 'pie',
                    radius: '50%',
                    center: ['15%', '50%'],

                    data: [{
                            value: arr[0].VALUE,
                            name: arr[0].WAY,
                            itemStyle: {
                                color: '#53F9FF'
                            }
                        },
                        {
                            value: arr[1].VALUE,
                            name: arr[1].WAY,
                            itemStyle: {
                                color: '#5CA2FF'
                            }
                        },
                        {
                            value: arr[2].VALUE,
                            name: arr[2].WAY,
                            itemStyle: {
                                color: '#ED95E3'
                            }
                        },
                        {
                            value: arr[3].VALUE,
                            name: arr[3].WAY,
                            itemStyle: {
                                color: '#A288FE'
                            }
                        },
                        {
                            value: arr[4].VALUE,
                            name: arr[4].WAY,
                            itemStyle: {
                                color: '#53C7FF'
                            }
                        },
                        {
                            value: arr[5].VALUE,
                            name: arr[5].WAY,
                            itemStyle: {
                                color: '#FFD885'
                            }
                        }

                    ],
                    label: {
                        normal: {
                            show: false,
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            labelLine: {
                                show: true,
                            },
                            label: {

                                show: true,
                                // position:'inner', //标签的位置
                                formatter: "{b} {d}%",
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: '15'
                                },
                            },

                        }
                    }
                }]
            };

            myChart.setOption(option)
        }
    })

}