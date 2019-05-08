/**
 * Created by 30947 on 2018/7/18.
 */
// var baseUrl = "http://172.16.15.46:8080/";
lf_infoPath = "rest/prevent/secondMenu" //六防信息
    // wurenji="http://172.16.15.46:8080/planeInfo" 
$(function() {
    SixspanEchars();
    year_lf();
    type_lf();

})


//功率曲线
function SixspanEchars() {
    var myChart1 = echarts.init($("#Powerline1")[0]);
    var myChart2 = echarts.init($("#Powerline2")[0]);
    var myChart3 = echarts.init($("#Powerline3")[0]);
    var myChart4 = echarts.init($("#Powerline4")[0]);
    var myChart5 = echarts.init($("#Powerline5")[0]);
    var myChart6 = echarts.init($("#Powerline6")[0]);

    $.ajax({
        url: this.baseUrl + this.lf_infoPath,
        type: "get",
        success: function(res) {
            console.log(res);
            for (var i = 0; i < res.fl.length; i++) {
                switch (res.fl[i].NAME) {
                    case "4":
                        res.fl[i].NAME = "安装线路避雷器";
                        break;
                    case "5":
                        res.fl[i].NAME = "更换接地网";
                        break;
                    default:
                        break;
                }

            }
            option1 = {
                title: {
                    text: '单位：个',
                    textStyle: { //---主标题内容样式    
                        color: '#0FD5E7',
                        fontSize: '16'
                    },
                    padding: [0, 40, 0, 400] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
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
                xAxis: {
                    type: 'category',
                    data: [res.fl[0].NAME, res.fl[1].NAME],
                    splitLine: {
                        show: false
                    }, //去除网格线
                    axisLine: {
                        symbol: ['none', 'arrow'], //---是否显示轴线箭头
                        symbolSize: [8, 8], //---箭头大小
                        symbolOffset: [0, 7], //---箭头位置
                        lineStyle: {
                            type: 'solid',
                            color: '#00EAFF', //左边线的颜色
                            width: '2' //坐标线的宽度
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#90D1F2', //坐标值得具体的颜色
                            fontSize: '16',
                            padding: [-5, 0, 0, -5], //---坐标轴名称相对位置

                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        symbol: ['none', 'arrow'], //---是否显示轴线箭头
                        symbolSize: [8, 8], //---箭头大小
                        symbolOffset: [0, 7], //---箭头位置
                        lineStyle: {
                            type: 'solid',
                            color: '#00EAFF',
                            width: '2'
                        }
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

                },
                series: [{
                    data: [res.fl[0].VALUE, res.fl[1].VALUE],
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: "#68E6F9"
                        }
                    },
                    barWidth: 40, //柱图宽度
                }]
            }; //防雷击
            myChart1.setOption(option1)

            for (var i = 0; i < res.fsh.length; i++) {
                switch (res.fsh[i].NAME) {
                    case "9":
                        res.fsh[i].NAME = "特殊巡视";
                        break;
                    case "10":
                        res.fsh[i].NAME = "修剪树木";
                        break;

                    case "11":
                        res.fsh[i].NAME = "清理杂草或垃圾";
                        break;
                    default:
                        break;
                }

            }
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
                    data: [res.fsh[0].NAME, res.fsh[1].NAME, res.fsh[2].NAME],
                    axisLabel: {
                        textStyle: {
                            color: '#90D1F2', //坐标值得具体的颜色
                            fontSize: '16'
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
                    data: [res.fsh[0].VALUE, res.fsh[1].VALUE, res.fsh[2].VALUE],
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
            }; //防山火
            myChart2.setOption(option2)


            for (var i = 0; i < res.ff.length; i++) {
                switch (res.ff[i].NAME) {
                    case "6":
                        res.ff[i].NAME = "紧固全塔螺栓";
                        break;
                    case "7":
                        res.ff[i].NAME = "山体开方";
                        break;

                    case "8":
                        res.ff[i].NAME = "线路改造";
                        break;
                    default:
                        break;
                }

            }
            option3 = {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: "{a}{b} {c}<br/>({d}%)",
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '20'
                    }
                },
                legend: {
                    orient: 'vertical',
                    icon: "rect ",
                    x: "250",
                    y: "40",
                    textStyle: {
                        color: '#90D1F2',
                        fontSize: '18'
                    },
                    data: [res.ff[0].NAME, res.ff[1].NAME, res.ff[2].NAME]
                },
                series: [{
                    name: '',
                    type: 'pie',
                    radius: '50%',
                    center: ['30%', '50%'],

                    data: [{
                            value: res.ff[0].VALUE,
                            name: res.ff[0].NAME,
                            itemStyle: {
                                color: '#53C7FF'
                            }
                        },
                        {
                            value: res.ff[1].VALUE,
                            name: res.ff[1].NAME,
                            itemStyle: {
                                color: '#ED95E3'
                            }
                        },
                        {
                            value: res.ff[2].VALUE,
                            name: res.ff[2].NAME,
                            itemStyle: {
                                color: '#6876FF'
                            }
                        },

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
            }; //防风害
            myChart3.setOption(option3)



            for (var i = 0; i < res.fn.length; i++) {
                switch (res.fn[i].NAME) {
                    case "1":
                        res.fn[i].NAME = "更换或加装大盘径绝缘子";
                        break;
                    case "2":
                        res.fn[i].NAME = "安装防鸟刺";
                        break;

                    case "3":
                        res.fn[i].NAME = "拆除鸟窝";
                        break;
                    default:
                        break;
                }

            }
            option4 = {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: "{a}{b} {c}<br/>({d}%)",
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '20'
                    }
                },
                legend: {
                    orient: 'vertical',
                    icon: "rect ",
                    x: "260",
                    y: "40",
                    textStyle: {
                        color: '#90D1F2',
                        fontSize: '18'
                    },
                    data: [res.fn[0].NAME, res.fn[1].NAME, res.fn[2].NAME]
                },
                series: [{
                    name: '',
                    type: 'pie',
                    radius: '50%',
                    center: ['30%', '50%'],

                    data: [{
                            value: res.fn[0].VALUE,
                            name: res.fn[0].NAME,
                            itemStyle: {
                                color: '#53C7FF'
                            }
                        },
                        {
                            value: res.fn[1].VALUE,
                            name: res.fn[1].NAME,
                            itemStyle: {
                                color: '#ED95E3'
                            }
                        },
                        {
                            value: res.fn[2].VALUE,
                            name: res.fn[2].NAME,
                            itemStyle: {
                                color: '#6876FF'
                            }
                        },

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
            }; //防鸟害
            myChart4.setOption(option4)



            for (var i = 0; i < res.fwp.length; i++) {
                switch (res.fwp[i].NAME) {
                    case "12":
                        res.fwp[i].NAME = "送达隐患告知书";
                        break;
                    case "13":
                        res.fwp[i].NAME = "签订安全施工承诺";
                        break;

                    case "14":
                        res.fwp[i].NAME = "缴纳安全保证金";
                        break;
                    case "15":
                        res.fwp[i].NAME = "现场安装防护措施";
                        break;
                    case "16":
                        res.fwp[i].NAME = "人员动态巡视、现场监督检查";
                        break;

                    case "17":
                        res.fwp[i].NAME = "现场开展安全大讲堂";
                        break;
                    default:
                        break;
                }

            }

            option5 = {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: "{a}{b} {c}<br/>({d}%)",
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '20'
                    }
                },
                legend: {
                    orient: 'vertical',
                    icon: "rect ",
                    x: "240",
                    y: "20",
                    textStyle: {
                        color: '#90D1F2',
                        fontSize: '18'
                    },
                    data: [res.fwp[0].NAME, res.fwp[1].NAME, res.fwp[2].NAME, res.fwp[3].NAME, res.fwp[4].NAME, res.fwp[5].NAME]
                },
                series: [{
                    name: '',
                    type: 'pie',
                    radius: '50%',
                    center: ['30%', '50%'],

                    data: [{
                            value: res.fwp[0].VALUE,
                            name: res.fwp[0].NAME,
                            itemStyle: {
                                color: '#53C7FF'
                            }
                        },
                        {
                            value: res.fwp[1].VALUE,
                            name: res.fwp[1].NAME,
                            itemStyle: {
                                color: '#ED95E3'
                            }
                        },
                        {
                            value: res.fwp[2].VALUE,
                            name: res.fwp[2].NAME,
                            itemStyle: {
                                color: '#6876FF'
                            }
                        },
                        {
                            value: res.fwp[3].VALUE,
                            name: res.fwp[3].NAME,
                            itemStyle: {
                                color: '#B74AE5'
                            }
                        },
                        {
                            value: res.fwp[4].VALUE,
                            name: res.fwp[4].NAME,
                            itemStyle: {
                                color: '#29AAE3'
                            }
                        },
                        {
                            value: res.fwp[5].VALUE,
                            name: res.fwp[5].NAME,
                            itemStyle: {
                                color: '#64BD3D'
                            }
                        },

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
            }; //防外破
            myChart5.setOption(option5)



            for (var i = 0; i < res.fdz.length; i++) {
                switch (res.fdz[i].NAME) {
                    case "18":
                        res.fdz[i].NAME = "杆塔迁移";
                        break;
                    default:
                        break;
                }

            }
            option6 = {
                title: {
                    text: '单位：个',
                    textStyle: { //---主标题内容样式    
                        color: '#0FD5E7',
                        fontSize: '16'
                    },
                    padding: [0, 40, 0, 400] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
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
                xAxis: {
                    type: 'category',
                    data: [res.fdz[0].NAME],
                    splitLine: {
                        show: false
                    }, //去除网格线
                    axisLine: {
                        symbol: ['none', 'arrow'], //---是否显示轴线箭头
                        symbolSize: [8, 8], //---箭头大小
                        symbolOffset: [0, 7], //---箭头位置
                        lineStyle: {
                            type: 'solid',
                            color: '#00EAFF',
                            width: '2'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#90D1F2', //坐标值得具体的颜色
                            fontSize: '16',
                            padding: [-5, 0, 0, -5], //---坐标轴名称相对位置
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        symbol: ['none', 'arrow'], //---是否显示轴线箭头
                        symbolSize: [8, 8], //---箭头大小
                        symbolOffset: [0, 7], //---箭头位置
                        lineStyle: {
                            type: 'solid',
                            color: '#00EAFF',
                            width: '2'
                        }
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

                },
                series: [{
                    data: [res.fdz[0].VALUE],
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: "#5C4BFC"
                        }
                    },
                    barWidth: 40, //柱图宽度
                }]
            }; //防地灾
            myChart6.setOption(option6)

        }
    })

}

//功率曲线表格
function year_lf() {
    var myChart = echarts.init($("#year_lf")[0]);
    $.ajax({
        url: this.baseUrl + this.lf_infoPath,
        type: "get",
        success: function(res) {
            console.log(res.zxt);
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
                    data: ['已安装'],
                    textStyle: {
                        color: '#90D1F2',
                        fontSize: '18'
                    },
                    x: 'center',
                    y: '450',
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
                    data: res.zxt,
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
                }, ]
            };

            myChart.setOption(option)

        }
    })

}

// 设备工况数据
function type_lf() {
    var myChart = echarts.init($("#type_lf")[0]);
    $.ajax({
        url: this.baseUrl + this.lf_infoPath,
        type: "get",
        success: function(res) {
            console.log(res.zzt);
            option = {
                title: {
                    text: '设备数量/防害项目',
                    textStyle: { //---主标题内容样式    
                        color: '#90D1F2'
                    },
                    padding: [15, 40, 400, 915] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
                },
                xAxis: {
                    type: 'category',
                    data: [res.zzt[0].NAME, res.zzt[1].NAME, res.zzt[2].NAME, res.zzt[3].NAME, res.zzt[4].NAME, res.zzt[5].NAME],
                    splitLine: { show: false }, //去除网格线
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#00EAFF', //左边线的颜色
                            width: '2' //坐标线的宽度
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#90D1F2', //坐标值得具体的颜色
                            fontSize: '16'
                        }
                    }
                },
                grid: {
                    borderWidth: '0px'
                },
                yAxis: {
                    type: 'value',
                    // show : false,
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#00EAFF',
                            width: '0'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#90D1F2'
                        }
                    },
                    splitLine: { //---grid 区域中的分隔线
                        show: true, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                        lineStyle: {
                            color: '#00EAFF',
                            width: 1,
                            // type:'dashed',          //---类型
                        },
                    },

                },
                series: [{
                    data: [res.zzt[0].VALUE, res.zzt[1].VALUE, res.zzt[2].VALUE, res.zzt[3].VALUE, res.zzt[4].VALUE, res.zzt[5].VALUE],
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var colorList = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5'];
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    barWidth: 40, //柱图宽度

                }]
            };

            myChart.setOption(option)
        }
    })

}