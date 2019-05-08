/**
 * Created by 30947 on 2018/7/18.
 */
wukuaPath = "rest/spanGovern/mainMenu";
ydPath = "rest/task/secondMenu";
lf_infoPath = "rest/prevent/secondMenu"
$(function() {
    newriqi()
    char1();
    char2();
    char3();
    char4();
    char5();
    // char6();
    // char7();
    char8();
    // char9();
    char10();
    // char11();

})

function char1() { //故障统计
    var myChart = echarts.init($("#char1")[0]);
    var option = {
        title: {
            text: '故障次数(次)',
            textStyle: { //---主标题内容样式    
                color: '#0FD5E7',
                fontSize: 16
            },
            padding: [0, 40, 100, 390] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
        },
        //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
        grid: {
            top: '40', // 等价于 y: '16%'
            left: '54',
            right: '32',
            bottom: '80',
            containLabel: false
        },

        // 提示框
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    // 设置x轴颜色
                    color: '#68E6F9'
                },
                symbol: ['none', 'arrow'],
                symbolSize: [8, 8], //---箭头大小
            },
            // 设置X轴数据旋转倾斜
            axisLabel: {
                rotate: "45",
                textStyle: {
                    color: '#90D1F2', //坐标值得具体的颜色
                    fontSize: '6',
                    padding: [0, 0, 0, 0], //---坐标轴名称相对位置

                }
            },
            splitLine: {
                show: false
            },
            // boundaryGap值为false的时候，折线第一个点在y轴上
            boundaryGap: true,
            data: ['开勇班', '盐海班', '兰州班', '西固班', '华运班', '新城班', '可视化班']
        },

        yAxis: {
            axisTick: {
                show: true,
                lineStyle: {
                    right: 5,
                    width: 1,
                }
            },
            // name: '数值',
            type: 'value',
            min: 0, // 设置y轴刻度的最小值
            max: 20, // 设置y轴刻度的最大值
            splitNumber: 2, // 设置y轴刻度间隔个数
            axisLine: {
                lineStyle: {
                    // 设置y轴颜色
                    color: '#68E6F9'
                },
                symbol: ['none', 'arrow'],
                symbolSize: [8, 8], //---箭头大小
            },
            splitLine: {
                show: false
            }
        },

        series: [{
            name: '故障次数',
            data: [3, 15, 5, 20, 1, 19, 8],
            type: 'line',
            // 设置小圆点消失
            // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
            symbol: 'none',
            symbolSize: 8,
            // 设置折线弧度，取值：0-1之间
            smooth: 0,
            itemStyle: {
                normal: {
                    // 拐点上显示数值
                    // areaStyle: {
                    //     type: 'default'
                    // },
                    label: {
                        show: true
                    },
                    borderColor: '#4B7EFC', // 拐点边框颜色
                    lineStyle: {
                        width: 1, // 设置线宽
                        type: 'solid', //'dotted'虚线 'solid'实线
                        color: '#D1F5FF'
                    }
                }
            }
        }],

        color: ['#00EE00', '#FF9F7F', '#FFD700']
    };
    myChart.setOption(option);
}

function char2() {
    var myChart = echarts.init($("#char2")[0]);
    option = {
        title: {
            text: '单位：架',
            textStyle: { //---主标题内容样式    
                color: '#0FD5E7',
                fontSize: 16
            },
            padding: [0, 40, 400, 440] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
        },
        xAxis: {
            type: 'category',
            data: ['大型无人机直升机', '中型无人机直升机', '固定翼无人机', '小型多旋翼无人机'],
            splitLine: { show: false }, //去除网格线
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#00EAFF', //左边线的颜色
                    width: '2' //坐标线的宽度
                }
            },
            // axisLabel: {
            //     textStyle: {
            //         color: '#90D1F2',//坐标值得具体的颜色

            //     }

            // }
            axisLabel: {
                interval: 0,
                //   rotate:45,
                margin: 2,
                textStyle: {
                    color: "#90D1F2"
                }
            },
        },
        grid: {
            borderWidth: '0px'
        },
        yAxis: {
            type: 'value',
            show: true,
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
                show: false, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                lineStyle: {
                    color: '#00EAFF',
                    width: 1,
                    // type:'dashed',          //---类型
                },
            },

        },
        series: [{
            data: [145, 133, 120, 50],
            type: 'bar',
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList = ['#419afe', '#ed95e3 ', '#366afb', '#6975fd'];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: '0FD5E7',
                            fontSize: 16
                        }
                    }
                }
            },
            barWidth: 40, //柱图宽度

        }]
    };
    myChart.setOption(option);


}

function char3() {
    var myChart = echarts.init($("#char3")[0]);
    // $.ajax({
    //     url: this.baseUrl + this.ydPath,
    //     type: "get",
    //     success: function(res) {
    //         console.log(res);
    // for (var i = 0; i < res.zzt_0.length; i++) {
    //     switch (res.zzt_0[i].NAME) {
    //         case "001":
    //             res.zzt_0[i].NAME = "班组1";
    //             break;
    //         case "002":
    //             res.zzt_0[i].NAME = "班组2";
    //             break;
    //         case "003":
    //             res.zzt_0[i].NAME = "班组3";
    //             break;
    //         case "004":
    //             res.zzt_0[i].NAME = "班组4";
    //             break;
    //         case "005":
    //             res.zzt_0[i].NAME = "班组5";
    //             break;
    //         case "006":
    //             res.zzt_0[i].NAME = "班组6";
    //             break;
    //         case "007":
    //             res.zzt_0[i].NAME = "班组7";
    //             break;
    //         default:
    //             break;
    //     }

    // }
    option = {
        grid: {
            top: '20', // 等价于 y: '16%'
            left: '54',
            right: '32',
            bottom: '80',
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
            x: '400',
            y: '10',
            data: [{
                name: '已完成',
                icon: 'rect',
                textStyle: {
                    color: '#53c8fe' // 图例文字颜色
                }

            }, {
                name: '未完成',
                icon: 'rect',
                textStyle: {
                    color: '#F6FFC2' // 图例文字颜色
                }
            }]
        },
        xAxis: {
            data: ['开勇班', '盐海班', '兰州班', '西固班', '华运班', '新城班', '可视化班'],
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
                    width: '1' //坐标线的宽度
                }
            },
            axisLabel: {
                rotate: "45",
                textStyle: {
                    color: '#90D1F2', //坐标值得具体的颜色
                    fontSize: '6',
                    padding: [0, 0, 0, 0], //---坐标轴名称相对位置

                }
            }
        },
        yAxis: {
            axisLine: {
                symbol: ['none', 'arrow'], //---是否显示轴线箭头
                symbolSize: [8, 8], //---箭头大小
                symbolOffset: [0, 7], //---箭头位置
                lineStyle: {
                    type: 'solid',
                    color: '#00EAFF',
                    width: '1'
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
                    // width:1,
                    // type:'dashed',          //---类型
                },
            },
        },
        series: [{
            name: '已完成',
            type: 'bar',
            stack: '使用情况',
            data: [100, 130, 200, 80, 120, 65, 96],
            itemStyle: {
                normal: {
                    color: "#53c8fe"
                }
            },
            barWidth: 20, //柱图宽度
        }, {
            name: '未完成',
            type: 'bar',
            stack: '使用情况',
            data: [10, 130, 28, 85, 70, 10, 20],
            itemStyle: {
                normal: {
                    color: "#F6FFC2"
                },

            },
            barWidth: 40, //柱图宽度
        }]
    };
    myChart.setOption(option);
    //     }

    // })




}

//统计分析图
function char4() {
    var myChart = echarts.init($("#char4")[0]);
    myChart.setOption({
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
            x: '360',
            y: '10', // 'center' | 'bottom' | {number}
            textStyle: {
                color: '#90D1F2',
                fontSize: '14'
            },
            // data: [res[0].NAME, res[1].NAME, res[2].NAME, res[3].NAME, res[4].NAME]
            data: ['跨公路', '跨高速', '跨高铁', '跨普铁', '跨重要输出']
        },
        calculable: true,
        series: [{
                name: '用户统计', //tooltip提示框中显示内容
                type: 'pie', //图形类型，如饼状图，柱状图等
                radius: ['0', '55%'], //饼图的半径，数组的第一项是内半径，第二项是外半径。支持百分比，本例设置成环形图。具体可以看文档或改变其值试一试
                center: ['35%', '45%'],
                // roseType: 'area',
                // 是否显示成南丁格尔图，默认false
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: "18"
                            },
                            // formatter: function(val) { //让series 中的文字进行换行
                            //     return val.name.split("-").join("\n");
                            // }
                            formatter: '{d}%'
                        }, //饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。可以与itemStyle属性同级，具体看文档
                        labelLine: {
                            show: true,
                            lineStyle: {
                                color: '#90D1F2'
                            }
                        } //线条颜色
                    }, //基本样式
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)', //鼠标放在区域边框颜色
                        textColor: '#000'
                    } //鼠标放在各个区域的样式
                },
                data: [{
                    value: 45,
                    name: '跨公路'
                }, {
                    value: 80,
                    name: '跨高速'
                }, {
                    value: 75,
                    name: '跨高铁'
                }, {
                    value: 100,
                    name: '跨普铁'
                }, {
                    value: 20,
                    name: '跨重要输出'
                }], //数据，数据中其他属性，查阅文档
                color: ['#53C7FF', '#419AFF', '#ED95E3', '#366AFF', '#6876FF', '#B0B7FB'], //各个区域颜色
            }, //数组中一个{}元素，一个图，以此可以做出环形图
        ], //

    });
}


function char5() {

    var myChart = echarts.init($("#char5")[0]);
    // $.ajax({
    //     url: this.baseUrl + this.lf_infoPath,
    //     type: "get",
    //     success: function(res) {
    // console.log(res.zzt);
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            /*formatter:function(val){   //让series 中的文字进行换行
                console.log(val);//查看val属性，可根据里边属性自定义内容
                var content = var['name'];
                return content;//返回可以含有html中标签
            },*/ //自定义鼠标悬浮交互信息提示，鼠标放在饼状图上时触发事件
        }, //提示框，鼠标悬浮交互时的信息提示
        legend: {
            // itemHeight: 20,
            // itemWidth: 30,
            textStyle: {
                color: '#90D1F2',
                fontSize: '14'
            },
            show: true,
            orient: 'vertical',
            x: '10',
            y: '-5',
            data: [{
                name: '防鸟',
                icon: 'rect'
            }, {
                name: '防风',
                icon: 'rect'
            }, {
                name: '防雷',
                icon: 'rect'
            }, {
                name: '防污闪',
                icon: 'rect'
            }, {
                name: '防山火',
                icon: 'rect'
            }, {
                name: '防外破',
                icon: 'rect'
            }, {
                name: '防地震',
                icon: 'rect'
            }, {
                name: '防覆冰',
                icon: 'rect'
            }]
        }, //图例属性，以饼状图为例，用来说明饼状图每个扇区，data与下边series中data相匹配
        // graphic: {
        //     type: 'text',
        //     left: '60%',
        //     top: '30%',
        //     style: {
        //         text: '用户统计\n' + '100', //使用“+”可以使每行文字居中
        //         textAlign: 'center',
        //         font: 'italic bolder 16px cursive',
        //         fill: '#000',
        //         width: 30,
        //         height: 30
        //     }
        // },
        //此例饼状图为圆环中心文字显示属性，这是一个原生图形元素组件，功能很多
        series: [{
                name: '用户统计', //tooltip提示框中显示内容
                type: 'pie', //图形类型，如饼状图，柱状图等
                radius: ['0', '55%'], //饼图的半径，数组的第一项是内半径，第二项是外半径。支持百分比，本例设置成环形图。具体可以看文档或改变其值试一试
                center: ['70%', '40%'],
                // roseType: 'area',
                // 是否显示成南丁格尔图，默认false
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: "18"
                            },
                            // formatter: function(val) { //让series 中的文字进行换行
                            //     return val.name.split("-").join("\n");
                            // }
                            formatter: '{d}%'
                        }, //饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。可以与itemStyle属性同级，具体看文档
                        labelLine: {
                            show: true,
                            lineStyle: {
                                color: '#90D1F2'
                            }
                        } //线条颜色
                    }, //基本样式
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)', //鼠标放在区域边框颜色
                        textColor: '#000'
                    } //鼠标放在各个区域的样式
                },
                data: [{
                    value: 45,
                    name: '防鸟'
                }, {
                    value: 80,
                    name: '防风'
                }, {
                    value: 75,
                    name: '防雷'
                }, {
                    value: 100,
                    name: '防污闪'
                }, {
                    value: 20,
                    name: '防外破'
                }, {
                    value: 45,
                    name: '防地震'
                }, {
                    value: 40,
                    name: '防雷'
                }, {
                    value: 75,
                    name: '防覆冰'
                }, ], //数据，数据中其他属性，查阅文档
                color: ['#53C7FF', '#419AFF', '#ED95E3', '#366AFF', '#6876FF', '#B0B7FB', '#C468FF', '#843CFB'], //各个区域颜色
            }, //数组中一个{}元素，一个图，以此可以做出环形图
        ], //系列列表
    };
    myChart.setOption(option)
        //     }
        // })

}

function char6() {

    var myChart = echarts.init($("#char6")[0]);

    myChart.setOption({
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            textStyle: {
                color: '#ffffff',

            },
            data: ['可视化巡检视频', '防外点破监控视频', '三跨点监控视频']
        },
        // color:["#EE2C2C","#9AFF9A","#BF3EFF"],
        calculable: false,
        series: [{
            name: '设备类型',
            type: 'pie',
            radius: ['30%', '60%'],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter: '{b} {d}%',
                    },
                    labelLine: {
                        show: true
                    }
                },
                emphasis: {
                    label: {
                        show: true,
                        position: 'center',
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },

            },

            data: [{
                    "name": "可视化巡检视频",
                    "value": 10
                },
                {
                    "name": "防外点破监控视频",
                    "value": 5
                },
                {
                    "name": "三跨点监控视频",
                    "value": 3
                }
            ]

        }]
    });


}

function char7() {

    var myChart = echarts.init($("#char7")[0]);

    option = {

        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'right',
            data: ['警告数'],
            textStyle: {
                //设置颜色
                color: '#ffffff'
            }
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        polar: [{
            indicator: [
                { text: '可视化巡检视频', max: 100 },
                { text: '防外点破监控视频', max: 100 },
                { text: '三跨点监控视频', max: 100 }
            ],
            radius: 80,
            name: {
                show: true,
                formatter: null,
                textStyle: {
                    //设置颜色
                    color: '#ffffff'
                }
            },
            center: ['50%', 140],
        }],
        series: [{
            name: '完全实况球员数据',
            type: 'radar',
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data: [{
                value: [97, 42, 88, 94, 90, 86],
                name: '警告数'
            }, ]
        }, ],
        radar: {
            splitArea: {
                show: false,
                areaStyle: {
                    color: "rgba(131,141,158,1)"
                }
            },
            name: {
                textStyle: {
                    color: '#ffffff'
                }
            }
        }
    };
    myChart.setOption(option)
}

function char8() {

    var myChart = echarts.init($("#char8")[0]);
    option = {
        grid: {
            top: '40', // 等价于 y: '16%'
            left: '54',
            right: '32',
            bottom: '80',
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
        title: {
            text: '监测异常数/个',
            textStyle: { //---主标题内容样式    
                color: '#0FD5E7',
                fontSize: 16
            },
            padding: [0, 40, 100, 400] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
        },
        xAxis: {
            data: ['开勇班', '盐海班', '兰州班', '西固班', '华运班', '新城班', '可视化班'],
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
                    width: '1' //坐标线的宽度
                }
            },
            axisLabel: {
                rotate: "45",
                textStyle: {
                    color: '#90D1F2', //坐标值得具体的颜色
                    fontSize: '8',
                    padding: [-5, 0, 0, -5], //---坐标轴名称相对位置

                }
            }
        },
        yAxis: {
            axisLine: {
                symbol: ['none', 'arrow'], //---是否显示轴线箭头
                symbolSize: [8, 8], //---箭头大小
                symbolOffset: [0, 7], //---箭头位置
                lineStyle: {
                    type: 'solid',
                    color: '#00EAFF',
                    width: '1'
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
                    // width:1,
                    // type:'dashed',          //---类型
                },
            },
        },
        series: [{
            name: '已完成',
            symbolSize: 8,
            data: [110, 170, 140, 120, 115, 180, 200],
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
    myChart.setOption(option);
}

function char9() {

    var myChart = echarts.init($("#char9")[0]);
    option = {

        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'right',
            color: "blue",
            data: ['检测异常数/个'],
            textStyle: {
                color: '#90D1F2', // 单独设置某一个图列的颜色
                backgroundColor: 'transparent' // 单独设置某一个图列的字体背景色
            }
        },
        polar: [{
            indicator: [
                { text: '人工', max: 100 },
                { text: '视频', max: 100 },
                { text: '无人机', max: 100 },
            ],
            radius: 70
        }],
        series: [{
            name: '完全实况球员数据',
            type: 'radar',
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data: [{
                value: [97, 42, 88],
                name: '检测异常数/个',
                itemStyle: {
                    normal: {
                        color: 'rgba(105,206,255,.5)',
                        lineStyle: {
                            color: 'rgba(105,206,255,.5)',
                        },
                    },
                },
            }, ]
        }]
    };
    myChart.setOption(option);
}

function char10() {
    var myChart = echarts.init($("#char10")[0]);
    myChart.setOption({
        grid: {
            x: '55px',
            top: '20px',
            bottom: '75px',
            right: '15px'
        },
        legend: {
            itemHeight: 20,
            itemWidth: 20,
            data: [{
                name: '历史数值',
                icon: 'rect',
                textStyle: {
                    color: '#90D1F2' // 图例文字颜色
                }

            }, {
                name: '当前数值',
                icon: 'rect',
                textStyle: {
                    color: '#90D1F2' // 图例文字颜色
                }
            }],
            top: '1%',
            right: '3%'
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            data: ['地质灾害', '雷电监测', '覆冰预测', '火山监测', '舞动预测'],
            axisTick: { //---坐标轴 刻度
                show: false, //---是否显示
            },
            axisLine: { //---坐标轴 轴线
                lineStyle: {
                    type: 'solid',
                    color: '#fff', //左边线的颜色
                    width: '1' //坐标线的宽度
                },
                show: true, //---是否显示
                //------------------- 箭头 -------------------------
                symbol: ['none', 'arrow'], //---是否显示轴线箭头
                symbolSize: [8, 8], //---箭头大小
                symbolOffset: [0, 7], //---箭头位置
            },
            splitLine: {
                show: false
            }, //去除网格线
            axisLabel: {
                textStyle: {
                    color: '#90D1F2', //坐标值得具体的颜色

                }
            }
        }],
        yAxis: [{
            type: 'value',
            axisLine: { //---坐标轴 轴线
                lineStyle: {
                    type: 'solid',
                    color: '#fff', //左边线的颜色
                    width: '1' //坐标线的宽度
                },
                show: true, //---是否显示
                //------------------- 箭头 -------------------------
                symbol: ['none', 'arrow'], //---是否显示轴线箭头
                symbolSize: [8, 8], //---箭头大小
                symbolOffset: [0, 7], //---箭头位置


            },
            axisLabel: {
                textStyle: {
                    color: '#90D1F2'
                }
            }
        }],
        series: [{
            name: '历史数值',
            type: 'bar',
            data: [180, 250, 150, 100, 200],
            stack: 'value',
            barWidth: '30', //---柱形宽度
            itemStyle: {
                normal: { color: "#68E6F9" },
                label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                        color: '0FD5E7',
                        fontSize: 14
                    }
                }
            },
        }, {
            name: '当前数值',
            type: 'bar',
            data: [150, 200, 135, 98, 122],
            stack: 'value',
            barWidth: '30', //---柱形宽度
            itemStyle: {
                normal: { color: "#438AFC" },
                label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                        color: '0FD5E7',
                        fontSize: 14
                    }
                }
            }
        }]
    })
}

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
    $("#riqi").text(currentdate)

}