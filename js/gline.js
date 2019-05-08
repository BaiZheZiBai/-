/**
 * Created by 30947 on 2018/7/18.
 */
// var baseUrl = "http://172.16.15.152:9096";
voltagelineinfo = "/plan/month/linesGET?year=2019"
jiekoudizhi1 = '/eq/line/lineLevelList?line_level=1'
jiekoudizhi2 = '/eq/line/lineLevelList?line_level=2'
jiekoudizhi3 = '/eq/line/lineLevelList?line_level=3'
jiekoudizhi4 = '/eq/line/lineLevelList?line_level=4'
jiekoudizhi5 = '/eq/line/lineLevelList?line_level=5'
var xlbztj = "/eq/line/zztList"
var xlbztj1 = "/eq/line/lbList"
var arr = []
$(function() {
    yjxlgk(jiekoudizhi1, "#xl1", arr)
        //一级线路概况
    yjxlgk(jiekoudizhi2, "#xl2", arr)
        //一级线路概况
    yjxlgk(jiekoudizhi3, "#xl3", arr)
        //一级线路概况
    yjxlgk(jiekoudizhi4, "#xl4", arr)
        //一级线路概况
    yjxlgk(jiekoudizhi5, "#xl5", arr)
        //一级线路概况
    setTimeout(function() {
        xldjfbt(arr) //线路等级分布图
    }, 1000)
    voltage();
    bteam(); //班组线路分布图
    bzxlfb() //班组线路分布图;
})

function yjxlgk(url, dom, arr) {
    $.ajax({
        url: this.baseUrl + url,
        type: "get",
        success: function(item) {
            // console.log(item)
            var shuju = item.result
                // console.log(shuju)
            arr.push(shuju.length)
                // console.log(arr)
            var html = $(dom).html()
                // var geshu = Math.ceil((shuju.length) / 5)
                // var index = 4
                // for (var i = index * 5; i < shuju.length; i++) {
                //     var item = shuju[i]
                //     console.log(item)
                // }
                // console.log(geshu)
            shuju.map(function(item, index) {
                index += 1
                    // console.log(item)
                    // console.log(index)

                html += '<ul><li>' + index + '</li><li>' + item.NAME + '</li><li>' + item.LINE_NO + '</li><li>' + item.USER_NAME + '</li><li>' + item.DEP_NAME + '</li> <li>' + item.JS + '</li><li>' + item.LINE_LENGTH + '</li> </ul>'
            })

            $(dom).html(html)
        }
    })

}

function xldjfbt(arr) {
    var myChart = echarts.init($("#xldjfb")[0]);
    // console.log(arr)
    // $.ajax({
    //     url: this.jiekoudizhi,
    //     type: "get",
    //     success: function (reslut) {
    //     console.log(reslut)   

    option1 = {
        title: {
            text: '路线个数/个',
            textStyle: { //---主标题内容样式    
                color: '#0FD5E7',
                fontSize: 16
            },
            padding: [10, 60, 290, 400] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
        },
        xAxis: {
            type: 'category',
            data: ['一级线路', '二级线路', '三级线路', '四级线路', '五级线路'],
            splitLine: {
                show: false
            }, //去除网格线
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
                    // type:'dashed',//---类型
                },
            },

        },
        series: [{
            data: arr,
            type: 'bar',
            itemStyle: {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: '0FD5E7',
                            fontSize: 16
                        }
                    },
                    color: function(params) {
                        var colorList = ['#419afe', '#ed95e3 ', '#366afb', '#6975fd', '#6073de'];
                        return colorList[params.dataIndex]
                    }
                }
            },
            barWidth: 40, //柱图宽度

        }]
    };
    myChart.setOption(option1);
    //     }
    // })



}

function voltage() {
    var myChart = echarts.init($("#voltage")[0]);
    var myChart1 = echarts.init($("#voltage1")[0]);
    $.ajax({
        url: this.baseUrl + this.voltagelineinfo,
        type: "get",
        success: function(res) {
            console.log(res)
            for (var i = 0; i < (res.result).length; i++) {
                option = {
                    grid: {
                        top: 0, //---相对位置，top\bottom\left\right
                        left: 0,
                        bottom: 5,
                        containLabel: true, //---grid 区域是否包含坐标轴的刻度标签
                        tooltip: { //---鼠标焦点放在图形上，产生的提示框
                            show: true,
                            trigger: 'item', //---触发类型
                            textStyle: {
                                color: '#fff',
                            },
                        }
                    },
                    title: {
                        text: '月度计划巡视线路(条)',
                        textStyle: { //---主标题内容样式    
                            color: '#0FD5E7',
                            fontSize: 14
                        },
                        padding: [10, 60, 350, 350] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
                    },
                    xAxis: {
                        type: 'category',
                        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], //内容
                        splitLine: {
                            show: false
                        }, //去除网格线
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color: '#00EAFF', //左边线的颜色
                                width: '2' //坐标线的宽度
                            }
                        },
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
                        data: [(res.result)[0].MONTH_LINES, (res.result)[1].MONTH_LINES, (res.result)[2].MONTH_LINES, (res.result)[3].MONTH_LINES, (res.result)[4].MONTH_LINES, (res.result)[5].MONTH_LINES, (res.result)[6].MONTH_LINES, (res.result)[7].MONTH_LINES, (res.result)[8].MONTH_LINES, (res.result)[9].MONTH_LINES, (res.result)[10].MONTH_LINES, (res.result)[11].MONTH_LINES],
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, //开启显示
                                    position: 'top', //在上方显示
                                    textStyle: { //数值样式
                                        color: '#0FD5E7',
                                        fontSize: 14
                                    }
                                },
                                color: function(params) {
                                    var colorList = [
                                        "#c23531",
                                        "#2f4554",
                                        "#61a0a8",
                                        "#d48265",
                                        "#91c7ae",
                                        "#749f83",
                                        "#ca8622",
                                        "#bda29a",
                                        "#6e7074",
                                        "#546570",
                                        "#c4ccd3",
                                        "#4BABDE"
                                    ]
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        barWidth: 20, //柱图宽度

                    }]
                }
            }

            option1 = {
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
                    x: '400',
                    y: '20', // 'center' | 'bottom' | {number}
                    textStyle: {
                        color: '#90D1F2',
                        fontSize: '14'
                    },
                    data: ["人工巡检故障", "分布式故障", "其他"]
                },

                calculable: false,
                series: [{
                    name: '设备类型',
                    type: 'pie',
                    // radius : ['50%', '70%'],
                    center: ['35%', '40%'],
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

                    data: [{
                            "name": "人工巡检故障",
                            "value": 40,
                            itemStyle: {
                                color: '#53c8fe'
                            }
                        },
                        {
                            "name": "分布式故障",
                            "value": 30,
                            itemStyle: {
                                color: '#419afe'
                            }
                        },
                        {
                            "name": "其他",
                            "value": 30,
                            itemStyle: {
                                color: '#ed95e3'
                            }
                        }
                    ]

                }]
            }
            myChart.setOption(option);
            myChart1.setOption(option1);
        }
    })


}


function bteam() {
    var myChart = echarts.init($("#bteam")[0]);
    $.ajax({
        url: this.baseUrl + this.xlbztj,
        type: "get",
        success: function(reslut) {
            console.log(reslut);
            var shuju = reslut.result
            console.log(shuju)
            for (var i = 0; i < shuju.length; i++) {
                option1 = {
                    title: {
                        text: '路线数（个）/班组',
                        textStyle: { //---主标题内容样式    
                            color: '#0FD5E7',
                            fontSize: 16
                        },
                        padding: [20, 60, 200, 900] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
                    },
                    xAxis: {
                        type: 'category',
                        data: [shuju[0].NAME, shuju[1].NAME, shuju[2].NAME, shuju[3].NAME, shuju[4].NAME, shuju[5].NAME],
                        splitLine: {
                            show: false
                        }, //去除网格线
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color: '#00EAFF', //左边线的颜色
                                width: '2' //坐标线的宽度
                            }
                        },
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
                        data: [shuju[0].NUM, shuju[1].NUM, shuju[2].NUM, shuju[3].NUM, shuju[4].NUM, shuju[5].NUM],
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, //开启显示
                                    position: 'top', //在上方显示
                                    textStyle: { //数值样式
                                        color: '#0FD5E7',
                                        fontSize: 16
                                    }
                                },
                                color: function(params) {
                                    var colorList = ['#419afe', '#ed95e3 ', '#366afb', '#6975fd', '#6073de', '#1343ce', '#2312ad'];
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        barWidth: 40, //柱图宽度

                    }]
                };
            }

            myChart.setOption(option1);
        }
    })



}

function bzxlfb() {
    $.ajax({
        url: this.baseUrl + this.xlbztj1,
        type: "get",
        success: function(reslut) {
            var html = $("#tb_xl").html()
            console.log(reslut);
            var shuju = reslut.result
            console.log(shuju)
            shuju.map(function(item) {
                html += '<ul><li>' + item.NAME + '</li><li>' + item.LINECOUNT + '</li><li>' + item.LINESUM + '</li><li>' + item.NUM + '</li></ul>'
            })
            $("#tb_xl").html(html)
        }
    })
}