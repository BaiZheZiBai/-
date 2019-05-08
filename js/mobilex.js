/**
 * Created by 30947 on 2018/7/18.
 */
// var baseUrl = "http://172.16.15.152:9096/";
ydPath = "/task/defect/listByDep"
$(function() {
    // task();
    bug();
    dpeople();
})

//统计分析图
function task() {
    var myChart = echarts.init($("#task")[0]);
    option = {
        grid: {
            x: 65,
            top: 50,
            bottom: 75,
            right: 45
        },
        legend: {
            itemHeight: 20,
            itemWidth: 20,
            data: [{
                name: '定期巡视',
                icon: 'rect',
                textStyle: {
                    color: '#9AF6FF' // 图例文字颜色
                }

            }, {
                name: '当前巡视',
                icon: 'rect',
                textStyle: {
                    color: '#3DD4FF' // 图例文字颜色
                }
            }, {
                name: '监督性巡视',
                icon: 'rect',
                textStyle: {
                    color: '#F6FFC2' // 图例文字颜色
                }
            }, {
                name: '事故巡视',
                icon: 'rect',
                textStyle: {
                    color: '#5C83FF' // 图例文字颜色
                }
            }],
            bottom: '1%',
            left: '35%'
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            data: ['开永班', '盐海班', '兰州班', '西固班', '和华班', '新盐班', '可视化班'],
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
                show: true,
                interval: 'auto',
                formatter: '{value} %',
                textStyle: {
                    color: '#90D1F2'
                }
            }
        }],
        series: [{
            name: '定期巡视',
            type: 'bar',
            data: ['10', '15', '40', '20', '10', '13', '11'],
            stack: 'value',
            barWidth: '30', //---柱形宽度
            itemStyle: {
                normal: { color: "#9AF6FF" },
                label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                        color: '0FD5E7',
                        fontSize: 14
                    }
                }
            }
        }, {
            name: '当前巡视',
            type: 'bar',
            data: ['5', '10', '10', '30', '38', '10', '15'],
            stack: 'value',
            barWidth: '30', //---柱形宽度
            itemStyle: {
                normal: { color: "#3DD4FF" },
                label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                        color: '0FD5E7',
                        fontSize: 14
                    }
                }
            }
        }, {
            name: '监督性巡视',
            type: 'bar',
            data: ['10', '14', '10', '30', '40', '8', '10'],
            stack: 'value',
            barWidth: '30', //---柱形宽度
            itemStyle: {
                normal: { color: "#F6FFC2" },
                label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                        color: '0FD5E7',
                        fontSize: 14
                    }
                }
            }
        }, {
            name: '事故巡视',
            type: 'bar',
            data: ['10', '20', '10', '30', '10', '2', '10'],
            stack: 'value',
            barWidth: '30', //---柱形宽度
            itemStyle: {
                normal: {
                    color: "#5C83FF",
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        formatter: '{c}%',
                        textStyle: { //数值样式
                            color: '0FD5E7',
                            fontSize: 14
                        }
                    }
                },

            }
        }]
    }
    myChart.setOption(option, true);




    // myChart.on('click', function(params) {
    //     console.log(params.name)
    //     switch (params.name) {
    //         case "班组1":
    //             params.name = "001";
    //             break;
    //         case "班组2":
    //             params.name = "002";
    //             break;
    //         case "班组3":
    //             params.name = "003";
    //             break;
    //         case "班组4":
    //             params.name = "004";
    //             break;
    //         case "班组5":
    //             params.name = "005";
    //             break;
    //         case "班组6":
    //             params.name = "006";
    //             break;
    //         case "班组7":
    //             params.name = "007";
    //             break;
    //         default:
    //             break;
    //     }
    //     $("#line_bottom_one").empty();
    //     Ban_infomation(params.name);
    // })
    //     }
    // })

    // $.ajax({
    //     url: this.baseUrl + this.ydPath + "?bzId=001",
    //     type: "get",
    //     success: function(res) {
    //         console.log(res.lb);
    //         var str = '';
    //         for (var i = 0; i < res.lb.length; i++) {
    //             str += " <div class='Banzu_box'>" +
    //                 "<div class='left_yuan_box'>" +
    //                 "<div style='width:18px;height:18px;background:rgba(26,225,232,1);border-radius:50%;margin-top:4px;'>" + "</div>" +
    //                 "</div>" +
    //                 "<div class='right_info_box'>" +
    //                 "<ul>" +
    //                 "<li>" +
    //                 "<span>" + res.lb[i].DAY + "</span>" +
    //                 "<span>" + res.lb[i].DEP_ID + "</span>" +
    //                 "<span>" + res.lb[i].USER_ID + "</span>" +
    //                 "</li>" +
    //                 "<li>" + "任务：" + res.lb[i].TASK_TYPE + "</li>" +
    //                 "</ul>" +
    //                 "</div>" +
    //                 "</div>"
    //         }
    //         $("#line_bottom_one").append(str);
    //     }
    // })


}

// function Ban_infomation(paraname) {
//     $.ajax({
//         url: this.baseUrl + this.ydPath + "?bzId=" + paraname,
//         type: "get",
//         success: function(res) {
//             console.log(res.lb)
//             var str = '';
//             for (var i = 0; i < res.lb.length; i++) {
//                 str += " <div class='Banzu_box'>" +
//                     "<div class='left_yuan_box'>" +
//                     "<div style='width:18px;height:18px;background:rgba(26,225,232,1);border-radius:50%;margin-top:4px;'>" + "</div>" +
//                     "</div>" +
//                     "<div class='right_info_box'>" +
//                     "<ul>" +
//                     "<li>" +
//                     "<span>" + res.lb[i].DAY + "</span>" +
//                     "<span>" + res.lb[i].DEP_ID + "</span>" +
//                     "<span>" + res.lb[i].USER_ID + "</span>" +
//                     "</li>" +
//                     "<li>" + "任务：" + res.lb[i].TASK_TYPE + "</li>" +
//                     "</ul>" +
//                     "</div>" +
//                     "</div>"

//             }
//             $("#line_bottom_one").append(str);
//         }
//     })
// }

function bug() {
    var myChart = echarts.init($("#bug")[0]);
    $.ajax({
        url: this.baseUrl + this.ydPath,
        type: "get",
        success: function(res) {
            // console.log(res)
            for (var i = 0; i < (res.result).length; i++) {
                option = {
                    backgroundColor: 'transparent',
                    legend: {
                        orient: 'vertical',
                        x: "300",
                        y: "50",
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '14'
                        },
                        data: [(res.result)[0].NAME, (res.result)[1].NAME, (res.result)[2].NAME, (res.result)[3].NAME, (res.result)[4].NAME, (res.result)[5].NAME]
                    },
                    series: [{
                        name: '',
                        type: 'pie',
                        radius: '50%',
                        center: ['25%', '55%'],
                        data: [{
                                value: (res.result)[0].NUM,
                                name: (res.result)[0].NAME,
                                itemStyle: {
                                    color: '#acd2f7'
                                }
                            },
                            {
                                value: (res.result)[1].NUM,
                                name: (res.result)[1].NAME,
                                itemStyle: {
                                    color: '#4cbbf5'
                                }
                            },
                            {
                                value: (res.result)[2].NUM,
                                name: (res.result)[2].NAME,
                                itemStyle: {
                                    color: '#0084f3'
                                }
                            },
                            {
                                value: (res.result)[3].NUM,
                                name: (res.result)[3].NAME,
                                itemStyle: {
                                    color: '#0a53fa'
                                }
                            },
                            {
                                value: (res.result)[4].NUM,
                                name: (res.result)[4].NAME,
                                itemStyle: {
                                    color: '#29AAE3'
                                }
                            },
                            {
                                value: (res.result)[5].NUM0,
                                name: (res.result)[5].NAME,
                                itemStyle: {
                                    color: '#ab3df9'
                                }
                            }
                        ],
                        // label: {
                        //     normal: {
                        //         show: false,
                        //     },
                        //     emphasis: {
                        //         show: true
                        //     }
                        // },
                        // labelLine: {
                        //     normal: {
                        //         show: false,
                        //     },
                        //     emphasis: {
                        //         show: true
                        //     }
                        // },
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: "14"
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
                    }]
                };
            }
            myChart.setOption(option)
        }
    })

}


function dpeople() {
    var myChart = echarts.init($("#dpeople")[0]);

    option = {
        legend: {
            top: '15%',
            left: '70%',
            data: [{
                    name: '已到岗',
                    icon: 'circle',
                    textStyle: {
                        color: '#90D1F2', // 单独设置某一个图列的颜色
                        backgroundColor: 'transparent' // 单独设置某一个图列的字体背景色
                    }
                },
                {
                    name: '总人数',
                    icon: 'circle',
                    textStyle: {
                        color: '#90D1F2', // 单独设置某一个图列的颜色
                        backgroundColor: 'transparent' // 单独设置某一个图列的字体背景色
                    }
                }
            ]
        },
        grid: {
            x: 65,
            top: 80,
            bottom: 45,
            right: 45
        },
        xAxis: {
            position: 'bottom',
            type: 'category',
            data: ['班组1', '班组2', '班组3', '班组4', '班组5', '班组6', '班组7'],
            splitLine: {
                show: false
            }, //去除网格线
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#00EAFF', //左边线的颜色
                    width: '2' //坐标线的宽度
                },
                symbol: ['none', 'arrow'], //---是否显示轴线箭头
                symbolSize: [8, 8], //---箭头大小
                symbolOffset: [0, 7], //---箭头位置
            },
            axisLabel: {
                textStyle: {
                    color: '#90D1F2', //坐标值得具体的颜色

                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#00EAFF',
                    width: '2'
                },
                symbol: ['none', 'arrow'], //---是否显示轴线箭头
                symbolSize: [8, 8], //---箭头大小
                symbolOffset: [0, 7], //---箭头位置
            },
            axisLabel: {
                textStyle: {
                    color: '#90D1F2'
                }
            }

        },
        series: [{
                name: "已到岗",
                type: "bar",
                stack: "value", //折叠显示  
                data: ["87.54", "88.54", "90", "91", "92", '95', '100'],
                barWidth: 30,
                //显示颜色  
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
                label: { // 图形上的文本标签
                    show: false,
                    position: 'insideTop', // 相对位置
                    rotate: 0, // 旋转角度
                    color: '#eee'
                }
            },
            {
                name: "总人数",
                type: "bar",
                stack: "value",
                data: ["120", "140", "110", "150", "180", '190', '110'],
                barWidth: 30,
                label: { // 图形上的文本标签
                    show: false,
                    position: 'insideTop', // 相对位置
                    rotate: 0, // 旋转角度
                    color: '#eee'
                },
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
            }
        ]
    };
    myChart.setOption(option);
}