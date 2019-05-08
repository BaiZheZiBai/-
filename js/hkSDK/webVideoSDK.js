// 初始化视频控件对象
(function () {
    'use strict'

    function WebVideoObj(divName, num, isFull, width, height, szIP, szPort, szUsername, szPassword) {
        if (this.browserCheck()) {
            this.initVideo(divName, num, isFull, width, height) // 'divPlugin', 1,
            // true, 425, 390
        } else {
            return
        }
    };

    let g_bEnableDraw = false;
    let g_szRecordType = "";
    let g_iSearchTimes = 0;
    let g_iDownloadID = -1;
    let g_tDownloadProcess = 0;
    // let unlock = 0;
    WebVideoObj.prototype = {
        constructor: WebVideoObj,
        msg: null,
        szInfo: "",
        g_bEnableDraw: false,
        g_szRecordType: "",
        g_iSearchTimes: 0,
        g_iDownloadID: -1,
        g_tDownloadProcess: 0,
        browserCheck: function () {
            // 检查插件是否已经安装过
            let iRet = WebVideoCtrl.I_CheckPluginInstall()
            if (iRet === -2) {
                alert('您的Chrome浏览器版本过高，不支持NPAPI插件！')
                return false
            } else if (iRet === -1) {
                alert('您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！')
                return false
            } else {
                return true
            }
        },
        // 初始化视频控件
        initVideo: function (divName, num, isFull, width, height) {
            let _self = this;
            let g_iWndIndex = 0;
            // 初始化插件参数及插入插件
            WebVideoCtrl.I_InitPlugin(width, height, {
                //szContainerID: divName,
                szColorProperty: "plugin-background:061d39; sub-background:061d39; sub-border:061d39; sub-border-select:061d39",
                bWndFull: isFull,
                // 是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
                iPackageType: 11,
                //录像封装格式 2:PS 11:MP4
                iWndowType: num,
                // 控件初始化后屏幕的数量
                bNoPlugin: true,
                cbSelWnd: function (xmlDoc) {
                    g_iWndIndex = parseInt($(xmlDoc).find("SelectWnd").eq(0).text(), 10);
                    _self.msg = "当前选择的窗口编号：" + g_iWndIndex;
                },
                cbDoubleClickWnd: function (iWndIndex, bFullScreen) {
                    _self.msg = "当前放大的窗口编号：" + iWndIndex;
                    if (!bFullScreen) {
                        _self.msg = "当前还原的窗口编号：" + iWndIndex;
                    }
                    // _self.showInfo(szInfo);
                    // 此处可以处理单窗口的码流切换
                    /*if (bFullScreen) {
                        _self.startRealPlay(1);
                    } else {
                        _self.startRealPlay(2);
                    }*/
                },
                cbEvent: function (iEventType, iParam1, iParam2) {
                    if (2 == iEventType) { // 回放正常结束
                        _self.msg = "窗口" + iParam1 + "回放结束！";
                    } else if (-1 == iEventType) {
                        _self.msg = "设备" + iParam1 + "网络错误！";
                    } else if (3001 == iEventType) {
                        _self.stopRecord(g_szRecordType, iParam1);
                    }
                },
                cbRemoteConfig: function () {
                    // showCBInfo("关闭远程配置库！");
                },
                cbInitPluginComplete: function () {
                    WebVideoCtrl.I_InsertOBJECTPlugin(divName);
                    // 检查插件是否最新
                    if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
                        alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！");
                        return;
                    }
                }
            })
            // WebVideoCtrl.I_InsertOBJECTPlugin(divName) // 'divPlugin'
        },

        // 显示操作信息
        showOPInfo: function (szInfo, status, xmlDoc) {
            // 格式化时间
            // let szTip = "<li>" + this.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo;
            let szTip = this.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo;
            if (typeof status != "undefined" && status != 200) {
                let szStatusString = $(xmlDoc).find("statusString").eq(0).text();
                let szSubStatusCode = $(xmlDoc).find("subStatusCode").eq(0).text();
                if ("" === szSubStatusCode) {
                    szTip += "(" + status + ", " + szStatusString + ")";
                } else {
                    szTip += "(" + status + ", " + szSubStatusCode + ")";
                }
            }
            // szTip += "</li>";
            // $("#info").html(szTip + $("#info").html());
            console.log(szTip);
            return szTip;
        },

        // 显示回调信息
        // showCBInfo: function (szInfo) {
        //     szInfo = "<li>" + dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo + "</li>";
        //     // $("#cbinfo").html(szInfo + $("#cbinfo").html());
        //     return szInfo;
        // },

        // 登录
        clickLogin: function (szIP, szPort, szUsername, szPassword) {
            let _self = this;
            if (szIP === '' || szPort === '') {
                return
            }
            let szDeviceIdentify = szIP + "_" + szPort;
            let iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
                success: function (xmlDoc) {
                    _self.msg = szIP + ' 登录成功！'
                    alert(szIP + '登录成功！')
                },
                error: function (status, xmlDoc) {
                    _self.msg = szDeviceIdentify + ' 登录失败！'
                    alert(_self.msg);
                    _self.showOPInfo(szDeviceIdentify + " 登录失败！", status, xmlDoc);
                }
            })

            if (iRet === -1) {
                _self.msg = szDeviceIdentify + ' 已登录过！'
                alert(szIP + ' 已登录过！')
            }
        },

        defaultPlay: function (userObj, iWnd) {
            let _self = this;
            let msg = "";
            let iWndIndex = iWnd || 0;
            let szIP = userObj.ip,
                szPort = userObj.port,
                szUsername = userObj.username,
                szPassword = userObj.password;
            if (szIP === '' || szPort === '') {
                return
            }
            let iChannel = _self.getChannelInfo() || 1; 
            let szDeviceIdentify = szIP + "_" + szPort;
            let iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
                success: function (xmlDoc) {
                    msg = szIP + ' 登录成功！'
                    // alert(szIP + '登录成功！')
                    // 开始预览
                    WebVideoCtrl.I_StartRealPlay(szIP, {
                        iWndIndex: iWndIndex,
                        iStreamType: 1,
                        iChannelID: iChannel,
                        bZeroChannel: false
                    });
                },
                error: function (status, xmlDoc) {
                    msg = szDeviceIdentify + ' 登录失败！'
                    alert(szDeviceIdentify + ' 登录失败！');
                    _self.showOPInfo(szDeviceIdentify + " 登录失败！", status, xmlDoc);
                },
            })

            if (iRet === -1) {
                msg = szDeviceIdentify + ' 已登录过！'
                alert(szIP + ' 已登录过！')
            }
        },
        // 关闭视频窗口释放资源
        closeVideo: function () {
            let g_iWndIndex = 0;
            let _self = this;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
            if (oWndInfo != null) {
                WebVideoCtrl.I_Stop({
                    success: function () {},
                    error: function () {}
                });
            }
        },
        // 注销登录信息
        logOut: function (szIP) {
            let _self = this;
            let szDeviceIdentify = szIP,
                szInfo = "";

            if (null == szDeviceIdentify) {
                return;
            }
            let iRet = WebVideoCtrl.I_Logout(szDeviceIdentify);
            if (0 == iRet) {
                szInfo = "退出成功！";

                // $("#ip option[value='" + szIP + "']").remove();
                // getChannelInfo();
            } else {
                szInfo = "退出失败！";
            }
            _self.showOPInfo(szDeviceIdentify + " " + szInfo);
        },
        // 获取设备信息
        getDeviceInfo: function (szIP) {
            let _self = this;
            let szDeviceIdentify = szIP;

            if (null == szDeviceIdentify) {
                return;
            }

            WebVideoCtrl.I_GetDeviceInfo(szDeviceIdentify, {
                success: function (xmlDoc) {
                    let arrStr = [];
                    arrStr.push("设备名称：" + $(xmlDoc).find("deviceName").eq(0).text() + "\r\n");
                    arrStr.push("设备ID：" + $(xmlDoc).find("deviceID").eq(0).text() + "\r\n");
                    arrStr.push("型号：" + $(xmlDoc).find("model").eq(0).text() + "\r\n");
                    arrStr.push("设备序列号：" + $(xmlDoc).find("serialNumber").eq(0).text() + "\r\n");
                    arrStr.push("MAC地址：" + $(xmlDoc).find("macAddress").eq(0).text() + "\r\n");
                    arrStr.push("主控版本：" + $(xmlDoc).find("firmwareVersion").eq(0).text() + " " + $(xmlDoc).find("firmwareReleasedDate").eq(0).text() + "\r\n");
                    arrStr.push("编码版本：" + $(xmlDoc).find("encoderVersion").eq(0).text() + " " + $(xmlDoc).find("encoderReleasedDate").eq(0).text() + "\r\n");

                    // _self.showOPInfo(szDeviceIdentify + " 获取设备信息成功！");
                    alert(arrStr.join(""));
                },
                error: function (status, xmlDoc) {
                    _self.showOPInfo(szDeviceIdentify + " 获取设备信息失败！", status, xmlDoc);
                }
            });
        },
        // 获取通道
        getChannelInfo: function (selName, szIP) {
            let _self = this;
            let szDeviceIdentify = szIP;
            // let oSel = document.getElementById(selName);
            // let oSel = $('#' + selName).empty();
            // oSel.innerHTML = "";
            let iChannel = 1;
            if (null == szDeviceIdentify) {
                return;
            }

            // 模拟通道
            WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
                async: false,
                success: function (xmlDoc) {
                    let oChannels = $(xmlDoc).find("VideoInputChannel");

                    $.each(oChannels, function (i) {
                        let id = $(this).find("id").eq(0).text(),
                            name = $(this).find("name").eq(0).text();
                        if ("" == name) {
                            name = "Camera " + (i < 9 ? "0" + (i + 1) : (i + 1));
                        }
                        iChannel = id;
                        return iChannel;
                        // oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
                    });
                    // _self.showOPInfo(szDeviceIdentify + " 获取模拟通道成功！");
                },
                error: function (status, xmlDoc) {
                    _self.showOPInfo(szDeviceIdentify + " 获取模拟通道失败！", status, xmlDoc);
                }
            });
            // 数字通道
            WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
                async: false,
                success: function (xmlDoc) {
                    let oChannels = $(xmlDoc).find("InputProxyChannelStatus");

                    $.each(oChannels, function (i) {
                        let id = $(this).find("id").eq(0).text(),
                            name = $(this).find("name").eq(0).text(),
                            online = $(this).find("online").eq(0).text();
                        if ("false" == online) { // 过滤禁用的数字通道
                            return true;
                        }
                        if ("" == name) {
                            name = "IPCamera " + (i < 9 ? "0" + (i + 1) : (i + 1));
                        }
                        // oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
                        iChannel = id;
                        return iChannel;
                    });
                    // _self.showOPInfo(szDeviceIdentify + " 获取数字通道成功！");
                },
                error: function (status, xmlDoc) {
                    _self.showOPInfo(szDeviceIdentify + " 获取数字通道失败！", status, xmlDoc);
                }
            });
            // 零通道
            WebVideoCtrl.I_GetZeroChannelInfo(szDeviceIdentify, {
                async: false,
                success: function (xmlDoc) {
                    let oChannels = $(xmlDoc).find("ZeroVideoChannel");

                    $.each(oChannels, function (i) {
                        let id = $(this).find("id").eq(0).text(),
                            name = $(this).find("name").eq(0).text();
                        if ("" == name) {
                            name = "Zero Channel " + (i < 9 ? "0" + (i + 1) : (i + 1));
                        }
                        if ("true" == $(this).find("enabled").eq(0).text()) { // 过滤禁用的零通道
                            // oSel.append("<option value='" + id + "' bZero='true'>" + name + "</option>");
                            iChannel = id;
                        }
                    });
                    // _self.showOPInfo(szDeviceIdentify + " 获取零通道成功！");
                },
                error: function (status, xmlDoc) {
                    _self.showOPInfo(szDeviceIdentify + " 获取零通道失败！", status, xmlDoc);
                }
            });
            return iChannel;
        },
        // 开始预览
        clickStartRealPlay: function (szIP, szPort, iStreamType, iChannelID, bZeroChannel) {
            let szInfo = 0;
            let _self = this;
            let g_iWndIndex = 0;
            // bZeroChannel: boolean
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
            let szDeviceIdentify = szIP;
            let iRtspPort = parseInt(szPort, 10);

            if ("undefined" === typeof iStreamType) {
                iStreamType = parseInt(iStreamType, 10) || 1;
            }

            if (null == szDeviceIdentify) {
                return;
            }
            // 函数： I_StartRealPlay(szIP, options)
            // 功能： 开始预览
            // 参数： szIP 设备的 IP 地址或者普通域名(比如花生壳域名)
            // options 可选参数对象:
            // iWndIndex 播放窗口，如果不传，则默认使用当前选择窗口播放（默认选中窗口 0）
            // iStreamType 码流类型 1-主码流， 2-子码流，默认使用主码流预览
            // iChannelID 播放通道号， 默认通道 1
            // bZeroChannel 是否播放零通道， 默认为 false
            // iPort RTSP 端口号，可以选择传入，如果不传，开发包会自动判断
            // 设备的 RTSP 端口
            // 返回值：成功返回 0，失败返回-1
            // 说明： 登录设备完成后才可以调用该函数。
            let startRealPlay = function () {
                WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
                    iRtspPort: iRtspPort,
                    iStreamType: iStreamType,
                    iChannelID: iChannelID || 1,
                    bZeroChannel: bZeroChannel,
                    success: function () {
                        szInfo = "开始预览成功！";
                        // alert(szDeviceIdentify + " " + szInfo);
                    },
                    error: function (status, xmlDoc) {
                        if (403 === status) {
                            szInfo = "设备不支持Websocket取流！";
                        } else {
                            szInfo = "开始预览失败！";
                        }
                        alert(szDeviceIdentify + " " + szInfo);
                    }
                });
            };

            if (oWndInfo != null) { // 已经在播放了，先停止
                WebVideoCtrl.I_Stop({
                    success: function () {
                        startRealPlay();
                    }
                });
            } else {
                startRealPlay();
            }
        },

        stopRealPlay: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                WebVideoCtrl.I_Stop({
                    success: function () {
                        szInfo = "停止预览成功！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    },
                    error: function () {
                        szInfo = "停止预览失败！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    }
                });
            }
        },

        // 重连
        reconnect: function (szIP) {
            WebVideoCtrl.I_Reconnect(szIP, {
                success: function (xmlDoc) {
                    alert(szIP + ' 连接成功！')
                },
                error: function () {
                    setTimeout(function () {
                        reconnect(szIP);
                    }, 5000);
                }
            });
        },


        // 窗口分割数
        changeWndNum: function (num) {
            // let num = parseInt(num, 10);
            WebVideoCtrl.I_ChangeWndNum(num);
        },

        //--- 云台控制
        // 摄像头移动事件
        mouseDownPTZControl: function (iPTZIndex, iPTZSpeed) {
            WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
                iPTZSpeed: iPTZSpeed,
                // 1,2,3,4,5,6,7
                success: function (xmlDoc) {
                    if (iPTZIndex === 9) {
                        // g_bPTZAuto = !g_bPTZAuto
                    }
                    _self.showOPInfo(oWndInfo.szIP + ' 开启云台成功！')
                },
                error: function () {
                    _self.showOPInfo(oWndInfo.szIP + ' 开启云台失败！')
                }
            })
        },
        // 摄像头移动停止事件
        mouseUpPTZControl: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(1, true, {
                    success: function (xmlDoc) {
                        // _self.showOPInfo(oWndInfo.szIP + " 停止云台成功！");
                    },
                    error: function () {
                        _self.showOPInfo(oWndInfo.szIP + " 停止云台失败！");
                    }
                })
            }
        },
        // 增大倍数
        PTZZoomIn: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(10, false, {
                    iWndIndex: g_iWndIndex,
                    success: function (xmlDoc) {
                        // _self.showOPInfo(oWndInfo.szIP + ' 调焦+成功！');
                    },
                    error: function () {
                        _self.showOPInfo(oWndInfo.szIP + ' 调焦+失败！');
                    }
                })
            }
        },
        // 减小倍数
        PTZZoomOut: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(11, false, {
                    iWndIndex: g_iWndIndex,
                    success: function (xmlDoc) {
                        // _self.showOPInfo(oWndInfo.szIP + ' 调焦-成功！');
                    },
                    error: function () {
                        _self.showOPInfo(oWndInfo.szIP + ' 调焦-失败！');
                    }
                })
            }
        },
        // 停止调倍数
        PTZZoomStop: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(11, true, {
                    iWndIndex: g_iWndIndex,
                    success: function (xmlDoc) {
                        // _self.showOPInfo(oWndInfo.szDeviceIdentify + " 调焦停止成功！");
                    },
                    error: function (status, xmlDoc) {
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + "  调焦停止失败！", status, xmlDoc);
                    }
                });
            }
        },
        // 聚焦集中
        PTZFocusIn: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(12, false, {
                    iWndIndex: g_iWndIndex,
                    success: function (xmlDoc) {
                        // _self.showOPInfo(oWndInfo.szDeviceIdentify + " 聚焦+成功！");
                    },
                    error: function (status, xmlDoc) {
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + "  聚焦+失败！", status, xmlDoc);
                    }
                });
            }
        },
        // 聚焦扩散
        PTZFocusOut: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(13, false, {
                    iWndIndex: g_iWndIndex,
                    success: function (xmlDoc) {
                        _self.showOPInfo(oWndInfo.szIP + ' 聚焦-成功！')
                    },
                    error: function () {
                        _self.showOPInfo(oWndInfo.szIP + ' 聚焦-失败！')
                    }
                })
            }
        },
        // 停止聚焦
        PTZFocusStop: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(12, true, {
                    iWndIndex: g_iWndIndex,
                    success: function (xmlDoc) {
                        _self.showOPInfo(oWndInfo.szIP + ' 聚焦停止成功！')
                    },
                    error: function () {
                        _self.showOPInfo(oWndInfo.szIP + ' 聚焦停止失败！')
                    }
                })
            }
        },
        // 增大光圈
        PTZIrisIn: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(14, false, {
                    iWndIndex: g_iWndIndex,
                    success: function (xmlDoc) {
                        _self.showOPInfo(oWndInfo.szIP + ' 光圈+成功！')
                    },
                    error: function () {
                        _self.showOPInfo(oWndInfo.szIP + ' 光圈+失败！')
                    }
                })
            }
        },
        // 减小光圈
        PTZIrisOut: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(15, false, {
                    iWndIndex: g_iWndIndex,
                    success: function (xmlDoc) {
                        _self.showOPInfo(oWndInfo.szIP + ' 光圈-成功！')
                    },
                    error: function () {
                        _self.showOPInfo(oWndInfo.szIP + ' 光圈-失败！')
                    }
                })
            }
        },
        // 停止调整光圈
        PTZIrisStop: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(14, true, {
                    iWndIndex: g_iWndIndex,
                    success: function (xmlDoc) {
                        _self.showOPInfo(oWndInfo.szIP + ' 光圈停止成功！')
                    },
                    error: function () {
                        _self.showOPInfo(oWndInfo.szIP + ' 光圈停止失败！')
                    }
                })
            }
        },
        // 设置预置点
        setPreset: function (iPresetID) {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                presetID = parseInt(iPresetID, 10);

            if (oWndInfo != null) {
                WebVideoCtrl.I_SetPreset(presetID, {
                    success: function (xmlDoc) {
                        // _self.showOPInfo(oWndInfo.szIP + " 设置预置点成功！");
                    },
                    error: function () {
                        _self.showOPInfo(oWndInfo.szIP + " 设置预置点失败！");
                    }
                });
            }
        },

        // 调用预置点
        goPreset: function (iPresetID) {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                presetID = iPresetID;
            // presetID = parseInt(iPresetID, 10);
            if (oWndInfo != null) {
                WebVideoCtrl.I_GoPreset(presetID, {
                    success: function (xmlDoc) {
                        // _self.showOPInfo(oWndInfo.szIP + " 调用预置点成功！");
                    },
                    error: function () {
                        _self.showOPInfo(oWndInfo.szIP + " 调用预置点失败！");
                    }
                });
            }
        },
        presetLoop: function (iPresetID, iDelay, iSpeed) {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                presetID = parseInt(iPresetID, 10),
                nextID = presetID + 1;
            if (oWndInfo != null) {
                function goNext() {
                    WebVideoCtrl.I_GoPreset(nextID, {
                        iPTZSpeed: iSpeed,
                        success: function (xmlDoc) {
                            nextID++;
                            // setTimeout('_self.presetLoop(nextID,iDelay,iSpeed)',iDelay); 
                            setTimeout(goNext, iDelay);
                            // _self.showOPInfo(oWndInfo.szIP + " 调用预置点成功！");
                        },
                    });
                }
                WebVideoCtrl.I_GoPreset(iPresetID, {
                    iPTZSpeed: iSpeed,
                    success: function (xmlDoc) {
                        // setTimeout('_self.presetLoop(nextID,iDelay,iSpeed)',iDelay); 
                        setTimeout(goNext, iDelay);
                        // _self.showOPInfo(oWndInfo.szIP + " 调用预置点成功！");
                    },
                    error: function () {
                        _self.showOPInfo(oWndInfo.szIP + " 调用预置点失败！");
                    }
                });
            }
        },

        //---多边形绘制
        // 启用多边形绘制
        enableDraw: function () {
            let _self = this;
            let iRet = WebVideoCtrl.I_SetPlayModeType(6); // 多边形模式

            if (0 === iRet) {
                g_bEnableDraw = true;

                // _self.showOPInfo("启用绘制成功！");
            } else {
                // alert("启用绘制失败");
                _self.showOPInfo("启用绘制失败！");
            }
        },
        // 禁用多边形绘制
        disableDraw: function () {
            let _self = this;
            let iRet = WebVideoCtrl.I_SetPlayModeType(0); // 预览模式
            if (0 === iRet) {
                g_bEnableDraw = false;
                // _self.showOPInfo("禁用绘制成功！");
            } else {
                // alert("禁用绘制失败");
                _self.showOPInfo("禁用绘制失败！");
            }
        },
        // 添加图形
        addSnapPolygon: function (snapId, snapName) {
            let _self = this;
            let g_iWndIndex = 0;
            if (!g_bEnableDraw) {
                return;
            }
            let szId = snapId;
            let szName = snapName;
            // szName: string;
            let szInfo = "<?xml version='1.0' encoding='utf-8'?>";
            szInfo += "<SnapPolygonList>";
            szInfo += "<SnapPolygon>";
            szInfo += "<id>" + szId + "</id>"; // [1, 32]
            szInfo += "<polygonType>1</polygonType>";
            szInfo += "<PointNumMax>17</PointNumMax>"; // [MinClosed, 17]
            szInfo += "<MinClosed>4</MinClosed>"; // [4, 17]
            szInfo += "<tips>#" + szId + "#" + szName + "</tips>";
            szInfo += "<isClosed>false</isClosed>";
            szInfo += "<color><r>0</r><g>255</g><b>0</b></color>";
            szInfo += "<pointList/>";
            szInfo += "</SnapPolygon>";
            szInfo += "</SnapPolygonList>";
            let iRet = WebVideoCtrl.I_SetSnapPolygonInfo(g_iWndIndex, szInfo);
            if (0 === iRet) {
                // _self.showOPInfo("窗口" + g_iWndIndex + "添加图形成功！");
            } else if (-1 === iRet) {
                _self.showOPInfo("窗口" + g_iWndIndex + "添加图形失败！");
            } else if (-2 === iRet) {
                alert("参数错误！");
            } else if (-3 === iRet) {
                alert("图形个数达到上限！");
            } else if (-4 === iRet) {
                alert("图形ID已存在！");
            }
            WebVideoCtrl.I_SetSnapDrawMode(g_iWndIndex, 2);
        },

        // 删除图形
        delSnapPolygon: function (snapId) {
            let _self = this;
            let g_iWndIndex = 0;

            if (!g_bEnableDraw) {
                return;
            };
            let szId = snapId;
            let iIndex = _self.getSnapPolygon(szId);

            if (iIndex !== -1) {
                let oXML = _self.getSnapPolygon();
                $(oXML).find("SnapPolygon").eq(iIndex).remove();

                let szInfo = _self.toXMLStr(oXML);
                WebVideoCtrl.I_ClearSnapInfo(g_iWndIndex);
                WebVideoCtrl.I_SetSnapPolygonInfo(g_iWndIndex, szInfo);
                WebVideoCtrl.I_SetSnapDrawMode(g_iWndIndex, 3);
            } else {
                alert("图形ID不存在！");
            }
        },

        // 编辑图形
        editSnapPolygon: function () {
            let _self = this;
            let g_iWndIndex = 0;
            if (!g_bEnableDraw) {
                return;
            }

            let iRet = WebVideoCtrl.I_SetSnapDrawMode(g_iWndIndex, 3);
            if (0 === iRet) {
                // _self.showOPInfo("窗口" + g_iWndIndex + "编辑图形成功！");
            } else {
                _self.showOPInfo("窗口" + g_iWndIndex + "编辑图形失败！");
            }
        },

        // 停止编辑
        stopSnapPolygon: function () {
            let _self = this;
            let g_iWndIndex = 0;
            if (!g_bEnableDraw) {
                return;
            }
            let iRet = WebVideoCtrl.I_SetSnapDrawMode(g_iWndIndex, -1);
            if (0 === iRet) {
                // _self.showOPInfo("窗口" + g_iWndIndex + "停止编辑成功！");
            } else {
                _self.showOPInfo("窗口" + g_iWndIndex + "停止编辑失败！");
            }
        },
        // 获取图形信息
        getSnapPolygon: function (szId) {
            let _self = this;
            let g_iWndIndex = 0;
            let szInfo = WebVideoCtrl.I_GetSnapPolygonInfo(g_iWndIndex);
            let oXML = _self.loadXML(szInfo);
            if (typeof szId === "undefined") {
                return oXML;
            } else {
                let iIndex = -1;
                let aNodeList = $(oXML).find("SnapPolygon");
                if (aNodeList.length > 0) {
                    $.each(aNodeList, function (i) {
                        if ($(this).find("id").text() === szId) {
                            iIndex = i;
                            return false;
                        }
                    });
                }
                return iIndex;
            }
        },

        // 获取图形信息
        showSnapPolygon: function () {
            let _self = this;
            let g_iWndIndex = 0;
            if (!g_bEnableDraw) {
                return;
            }
            let snapInfo = WebVideoCtrl.I_GetSnapPolygonInfo(g_iWndIndex);
            console.log(snapInfo);
        },

        // 设置图形，页面打开时可以设置提前设置好的图形
        setSnapPolygon: function (snapInfo) {
            let _self = this;
            let g_iWndIndex = 0;
            let szInfo = snapInfo;
            if (!g_bEnableDraw) {
                return;
            }
            WebVideoCtrl.I_ClearSnapInfo(g_iWndIndex);
            let iRet = WebVideoCtrl.I_SetSnapPolygonInfo(g_iWndIndex, szInfo);
            if (0 === iRet) {
                // _self.showOPInfo("窗口" + g_iWndIndex + "设置图形成功！");
            } else if (-1 === iRet) {
                _self.showOPInfo("窗口" + g_iWndIndex + "设置图形失败！");
            } else if (-2 === iRet) {
                alert("参数错误！");
            } else if (-3 === iRet) {
                alert("图形个数达到上限！");
            } else if (-4 === iRet) {
                alert("图形ID已存在！");
            }
        },

        // 清空图形
        delAllSnapPolygon: function () {
            let _self = this;
            let g_iWndIndex = 0;
            if (!g_bEnableDraw) {
                return;
            }
            let iRet = WebVideoCtrl.I_ClearSnapInfo(g_iWndIndex);
            if (0 === iRet) {
                // _self.showOPInfo("窗口" + g_iWndIndex + "清空图形成功！");
            } else {
                _self.showOPInfo("窗口" + g_iWndIndex + "清空图形失败！");
            }
        },

        // 设备抓图,可以改变分辨率,需要设备支持
        deviceCapturePic: function (szIP, szPort, iChannelID, bZeroChannel, cWidth, cHeight, camera_id, fileType) {
            let _self = this;
            let szInfo = "";
            let szDeviceIdentify = szIP + "_" + szPort;
            let iResolutionWidth = parseInt(cWidth, 10);
            let iResolutionHeight = parseInt(cHeight, 10);
              // bZeroChannel :boolean;
            if (null == szDeviceIdentify) {
                return;
            }

            if (bZeroChannel) { // 零通道不支持设备抓图
                return;
            }
            let iTime = _self.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");

            // let szPicName = camera_id + "_" + _self.dateFormat(new Date(), "yyyyMMdd-hhmmss");
            let szPicName = szDeviceIdentify + "_" + _self.dateFormat(new Date(), "yyyyMMdd-hhmmss");

            let iRet = WebVideoCtrl.I_DeviceCapturePic(szDeviceIdentify, iChannelID, szPicName, {
                bDateDir: false, //是否生成日期文件
                iResolutionWidth: iResolutionWidth,
                iResolutionHeight: iResolutionHeight
            });

            _self.postPhoto(szPicName, fileType, camera_id);

            if (0 == iRet) {
                szInfo = "设备抓图成功！";
            } else {
                szInfo = "设备抓图失败！";
            }
            _self.showOPInfo(szDeviceIdentify + " " + szInfo);
        },

        // 提交图片信息到服务器
        postPhoto: function (fileName, fileType, id) {
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                // 获取本地配置
                let xmlDoc = WebVideoCtrl.I_GetLocalCfg();
                let filePath = "0";

                if (xmlDoc != null) {
                    // 按抓取文件类型确定保存地址
                    if (fileType == "deviceCapture") {
                        filePath = $(xmlDoc).find("DeviceCapturePath").eq(0).text();
                    } else if (fileType == "capture") {
                        filePath = $(xmlDoc).find("CapturePath").eq(0).text();
                    } else if (fileType == "playback") {
                        filePath = $(xmlDoc).find("PlaybackPicPath").eq(0).text();
                    }
                };

                $.ajax({
                    url: '/admin/file/saveCameraFile',
                    type: 'POST',
                    async: true,
                    timeout: 5000,
                    data: {
                        "name": fileName + '.jpg',
                        "path": filePath + '\\' + fileName + '.jpg',
                        "camera_id": id
                    },
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (xhr, textStatus) {
                        console.log('错误')
                        console.log(xhr)
                        console.log(textStatus)
                    }
                })
                // $.post("/admin/picture/saveCameraPicData", {
                //     "name": fileName,
                //     "path": filePath + '\\' + fileName + '.jpg',
                //     "camera_id": id
                // }, function (result) {
                //     console.log(result.result);
                // });
            }
        },




        // ---声音
        // 打开声音
        openSound: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                let allWndInfo = WebVideoCtrl.I_GetWindowStatus();
                // 循环遍历所有窗口，如果有窗口打开了声音，先关闭
                for (let i = 0, iLen = allWndInfo.length; i < iLen; i++) {
                    oWndInfo = allWndInfo[i];
                    if (oWndInfo.bSound) {
                        WebVideoCtrl.I_CloseSound(oWndInfo.iIndex);
                        break;
                    }
                }

                let iRet = WebVideoCtrl.I_OpenSound();

                if (0 == iRet) {
                    szInfo = "打开声音成功！";
                } else {
                    szInfo = "打开声音失败！";
                }
                _self.showOPInfo(oWndInfo.szIP + " " + szInfo);
            }
        },
        // 关闭声音
        closeSound: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                let iRet = WebVideoCtrl.I_CloseSound();
                if (0 == iRet) {
                    szInfo = "关闭声音成功！";
                } else {
                    szInfo = "关闭声音失败！";
                }
                _self.showOPInfo(oWndInfo.szIP + " " + szInfo);
            }
        },
        // 设置音量
        setVolume: function (szVolume) {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                iVolume = parseInt(szVolume, 10),
                szInfo = "";

            if (oWndInfo != null) {
                let iRet = WebVideoCtrl.I_SetVolume(iVolume);
                if (0 == iRet) {
                    szInfo = "音量设置成功！";
                } else {
                    szInfo = "音量设置失败！";
                }
                _self.showOPInfo(oWndInfo.szIP + " " + szInfo);
            }
        },

        // 获取对讲通道
        getAudioInfo: function (szIP) {
            let _self = this;
            if ("" == szIP) {
                return;
            }
            WebVideoCtrl.I_GetAudioInfo(szIP, {
                success: function (xmlDoc) {
                    let oAudioChannels = $(xmlDoc).find("TwoWayAudioChannel"),
                        idAudio = [];
                    $.each(oAudioChannels, function () {
                        let id = $(this).find("id").eq(0).text();
                        idAudio.push(id);
                    });

                    //let oAudioChannels = $(xmlDoc).find("TwoWayAudioChannel"),
                    //     oSel = $("#audiochannels").empty();
                    // $.each(oAudioChannels, function () {
                    //     let id = $(this).find("id").eq(0).text();

                    //     oSel.append("<option value='" + id + "'>" + id + "</option>");
                    // });
                    // _self.showOPInfo(szIP + " 获取对讲通道成功！");
                    return idAudio;
                },
                error: function () {
                    _self.showOPInfo(szIP + " 获取对讲通道失败！");
                }
            });
        },
        // 开始对讲
        startVoiceTalk: function (szIP, iAudioChannel) {
            let _self = this;
            let szInfo = "";
            // iAudioChannel =  idAudio[i];
            if ("" == szIP) {
                return;
            }

            if (isNaN(iAudioChannel)) {
                alert("请选择对讲通道！");
                return;
            }

            let iRet = WebVideoCtrl.I_StartVoiceTalk(szIP, iAudioChannel);

            if (0 == iRet) {
                szInfo = "开始对讲成功！";
            } else {
                szInfo = "开始对讲失败！";
            }
            _self.showOPInfo(szIP + " " + szInfo);
        },
        // 停止对讲
        stopVoiceTalk: function (szIP) {
            let _self = this;
            let iRet = WebVideoCtrl.I_StopVoiceTalk(),
                szInfo = "";

            if ("" == szIP) {
                return;
            }

            if (0 == iRet) {
                szInfo = "停止对讲成功！";
            } else {
                szInfo = "停止对讲失败！";
            }
            _self.showOPInfo(szIP + " " + szInfo);
        },
        // 抓图
        capturePic: function (iChannels) {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                let xmlDoc = WebVideoCtrl.I_GetLocalCfg();
                let szCaptureFileFormat = "0";
                if (xmlDoc != null) {
                    szCaptureFileFormat = $(xmlDoc).find("CaptureFileFormat").eq(0).text();
                }

                let szChannelID = iChannels;
                let szPicName = oWndInfo.szDeviceIdentify + "_" + _self.dateFormat(new Date(), "yyyyMMdd-hhmmss");

                szPicName += ("0" === szCaptureFileFormat) ? ".jpg" : ".bmp";

                let iRet = WebVideoCtrl.I_CapturePic(szPicName, {
                    bDateDir: false //是否生成日期文件
                });
                if (0 == iRet) {
                    szInfo = "抓图成功！";

                } else {
                    szInfo = "抓图失败！";
                }
                _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);

            }
        },

        // 开始录像
        startRecord: function (szType, iChannels,camera_id, szName) {
            let _self = this;
            let g_iWndIndex = 0;

            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            g_szRecordType = szType;

            if (oWndInfo != null) {
                let szChannelID = iChannels || 1,
                    // szFileName = szName + "_" + _self.dateFormat(new Date(), "yyyyMMdd-hhmmss");
                    szFileName = oWndInfo.szDeviceIdentify + "_" + _self.dateFormat(new Date(), "yyyyMMdd-hhmmss");

                WebVideoCtrl.I_StartRecord(szFileName, {
                    bDateDir: false, //是否生成日期文件
                    success: function () {
                        if ('realplay' === szType) {
                            szInfo = "开始录像成功！";
                        } else if ('playback' === szType) {
                            szInfo = "开始剪辑成功！";
                        }
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);

                        _self.postRecord(szFileName, szType, camera_id);
                    },

                    error: function () {
                        if ('realplay' === szType) {
                            szInfo = "开始录像失败！";
                        } else if ('playback' === szType) {
                            szInfo = "开始剪辑失败！";
                        }
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);

                    }
                });
            }
        },

        // 提交影像信息到服务器
        postRecord: function (fileName, fileType, id) {
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                // 获取本地配置
                let xmlDoc = WebVideoCtrl.I_GetLocalCfg();
                let filePath = "0";

                if (xmlDoc != null) {
                    // 按抓取文件类型确定保存地址
                    if (fileType == "realplay") {
                        filePath = $(xmlDoc).find("RecordPath").eq(0).text();
                    } else if (fileType == "playback") {
                        filePath = $(xmlDoc).find("PlaybackFilePath").eq(0).text();
                    } else if (fileType == "download") {
                        filePath = $(xmlDoc).find("DownloadPath").eq(0).text();
                    }
                };

                $.ajax({
                    url: '/admin/file/saveCameraFile',
                    type: 'POST',
                    async: true,
                    timeout: 5000,
                    data: {
                        "name": fileName + '.mp4',
                        "path": filePath + '\\' + fileName + '.mp4',
                        "camera_id": id
                    },
        
                    success: function (data) {
                        console.log(data);
                    },

                    error: function (xhr, textStatus) {
                        console.log('错误');
                        console.log(xhr);
                        console.log(textStatus);
                    }

                })
            }
        },

        // 停止录像
        stopRecord: function (szType, iWndIndex) {
            let _self = this;
            let g_iWndIndex = 0;
            if ("undefined" === typeof iWndIndex) {
                iWndIndex = g_iWndIndex;
            }
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                WebVideoCtrl.I_StopRecord({
                    success: function () {
                        if ('realplay' === szType) {
                            szInfo = "停止录像成功！";
                        } else if ('playback' === szType) {
                            szInfo = "停止剪辑成功！";
                        }
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);

                    },
                    error: function () {
                        if ('realplay' === szType) {
                            szInfo = "停止录像失败！";
                        } else if ('playback' === szType) {
                            szInfo = "停止剪辑失败！";
                        }
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);

                    }
                });
            }
        },


        // ---3d放大，电子放大
        // 启用电子放大
        enableEZoom: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                let iRet = WebVideoCtrl.I_EnableEZoom();
                if (0 == iRet) {
                    szInfo = "启用电子放大成功！";
                } else {
                    szInfo = "启用电子放大失败！";
                }
                _self.showOPInfo(oWndInfo.szIP + " " + szInfo);
            }
        },

        // 禁用电子放大
        disableEZoom: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                let iRet = WebVideoCtrl.I_DisableEZoom();
                if (0 == iRet) {
                    szInfo = "禁用电子放大成功！";
                } else {
                    szInfo = "禁用电子放大失败！";
                }
                _self.showOPInfo(oWndInfo.szIP + " " + szInfo);
            }
        },

        // 启用3DZoom
        enable3DZoom: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                let iRet = WebVideoCtrl.I_Enable3DZoom();
                if (0 == iRet) {
                    szInfo = "启用3DZoom！";
                } else {
                    szInfo = "启用3DZoom失败！";
                }
                _self.showOPInfo(oWndInfo.szIP + " " + szInfo);
            }
        },

        // 禁用3D放大
        disable3DZoom: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                let iRet = WebVideoCtrl.I_Disable3DZoom();
                if (0 == iRet) {
                    szInfo = "禁用3DZoom成功！";
                } else {
                    szInfo = "禁用3DZoom失败！";
                }
                _self.showOPInfo(oWndInfo.szIP + " " + szInfo);
            }
        },

        // 全屏
        fullScreen: function () {
            WebVideoCtrl.I_FullScreen(true);
        },

        //---回放
        // 开始回放
        clickStartPlayback: function (szIP, szPort, iStreamType, iChannelID, bZeroChannel, szStartTime, szEndTime, isTransStream) {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szDeviceIdentify = szIP,
                iRtspPort = szPort,
                szInfo = "",
                iRet = -1;
            //    bZeroChannel:boolean ;

            if (null == szDeviceIdentify) {
                return;
            }

            if (bZeroChannel) { // 零通道不支持回放
                return;
            }

            let startPlayback = function () {
                if (isTransStream) { // 启用转码回放
                    let oTransCodeParam = {
                        TransFrameRate: "14", // 0：全帧率，5：1，6：2，7：4，8：6，9：8，10：10，11：12，12：16，14：15，15：18，13：20，16：22
                        TransResolution: "1", // 255：Auto，3：4CIF，2：QCIF，1：CIF
                        TransBitrate: "19" // 2：32K，3：48K，4：64K，5：80K，6：96K，7：128K，8：160K，9：192K，10：224K，11：256K，12：320K，13：384K，14：448K，15：512K，16：640K，17：768K，18：896K，19：1024K，20：1280K，21：1536K，22：1792K，23：2048K，24：3072K，25：4096K，26：8192K
                    };
                    WebVideoCtrl.I_StartPlayback(szDeviceIdentify, {
                        iRtspPort: iRtspPort,
                        iStreamType: iStreamType,
                        iChannelID: iChannelID,
                        szStartTime: szStartTime,
                        szEndTime: szEndTime,
                        oTransCodeParam: oTransCodeParam,
                        success: function () {
                            szInfo = "开始回放成功！";
                            _self.showOPInfo(szDeviceIdentify + " " + szInfo);
                        },
                        error: function (status, xmlDoc) {
                            if (403 === status) {
                                szInfo = "设备不支持Websocket取流！";
                            } else {
                                szInfo = "开始回放失败！";
                            }
                            _self.showOPInfo(szDeviceIdentify + " " + szInfo);
                        }
                    });
                } else {
                    WebVideoCtrl.I_StartPlayback(szDeviceIdentify, {
                        iRtspPort: iRtspPort,
                        iStreamType: iStreamType,
                        iChannelID: iChannelID,
                        szStartTime: szStartTime,
                        szEndTime: szEndTime,
                        success: function () {
                            szInfo = "开始回放成功！";
                            _self.showOPInfo(szDeviceIdentify + " " + szInfo);
                        },
                        error: function (status, xmlDoc) {
                            if (403 === status) {
                                szInfo = "设备不支持Websocket取流！";
                            } else {
                                szInfo = "开始回放失败！";
                            }
                            _self.showOPInfo(szDeviceIdentify + " " + szInfo);
                        }
                    });
                }
            };

            if (oWndInfo != null) { // 已经在播放了，先停止
                WebVideoCtrl.I_Stop({
                    success: function () {
                        startPlayback();
                    }
                });
            } else {
                startPlayback();
            }
        },

        // 停止回放
        stopPlayback: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                WebVideoCtrl.I_Stop({
                    success: function () {
                        szInfo = "停止回放成功！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    },
                    error: function () {
                        szInfo = "停止回放失败！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    }
                });
            }
        },

        // 开始倒放
        clickReversePlayback: function (szIP, szPort, iStreamType, iChannelID, bZeroChannel, szStartTime, szEndTime) {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szDeviceIdentify = szIP,
                iRtspPort = szPort,
                szInfo = "";
            //    bZeroChannel:boolean ;
            if (null == szDeviceIdentify) {
                return;
            }

            if (bZeroChannel) { // 零通道不支持倒放
                return;
            };

            let reversePlayback = function () {
                let iRet = WebVideoCtrl.I_ReversePlayback(szDeviceIdentify, {
                    iRtspPort: iRtspPort,
                    iStreamType: iStreamType,
                    iChannelID: iChannelID,
                    szStartTime: szStartTime,
                    szEndTime: szEndTime
                });

                if (0 == iRet) {
                    szInfo = "开始倒放成功！";
                } else {
                    szInfo = "开始倒放失败！";
                }
                _self.showOPInfo(szDeviceIdentify + " " + szInfo);
            };

            if (oWndInfo != null) { // 已经在播放了，先停止
                WebVideoCtrl.I_Stop({
                    success: function () {
                        reversePlayback();
                    }
                });
            } else {
                reversePlayback();
            }
        },
        // 单帧
        singleFrame: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                WebVideoCtrl.I_Frame({
                    success: function () {
                        szInfo = "单帧播放成功！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    },
                    error: function () {
                        szInfo = "单帧播放失败！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    }
                });
            }
        },

        // 暂停
        pauseHk: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                WebVideoCtrl.I_Pause({
                    success: function () {
                        szInfo = "暂停成功！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    },
                    error: function () {
                        szInfo = "暂停失败！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    }
                });
            }
        },

        // 恢复
        resumeHK: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                WebVideoCtrl.I_Resume({
                    success: function () {
                        szInfo = "恢复成功！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    },
                    error: function () {
                        szInfo = "恢复失败！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    }
                });
            }
        },

        // 慢放
        playSlow: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                WebVideoCtrl.I_PlaySlow({
                    success: function () {
                        szInfo = "慢放成功！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    },
                    error: function () {
                        szInfo = "慢放失败！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    }
                });
            }
        },

        // 快放
        playFast: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                WebVideoCtrl.I_PlayFast({
                    success: function () {
                        szInfo = "快放成功！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    },
                    error: function () {
                        szInfo = "快放失败！";
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                    }
                });
            }
        },

        // OSD时间
        getOSDTime: function () {
            let _self = this;
            let g_iWndIndex = 0;
            let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

            if (oWndInfo != null) {
                let szTime = WebVideoCtrl.I_GetOSDTime({
                    success: function (szOSDTime) {
                        // _self.showOPInfo(oWndInfo.szDeviceIdentify + " 获取OSD时间成功！");
                        return szOSDTime;
                    },
                    error: function () {
                        _self.showOPInfo(oWndInfo.szDeviceIdentify + " 获取OSD时间失败！");
                    }
                });
            }
        },


        // ---搜索，下载录像
        // 搜索录像
        /*
                searchlist,searchdiv,dlFileName,
                三个id，两个node，一个文件存放地址要定义
                原结构：
                <div id="searchdiv" class="searchdiv">
                   <table id="searchlist" class="searchlist" cellpadding="0" cellspacing="0" border="0"></table>
                </div>
                
        */


        recordSearch: function (iType, tabName, szIP, iChannelID, bZeroChannel, iStreamType, szStartTime, szEndTime) {
            let _self = this;
            let szDeviceIdentify = szIP;
            let listDiv = document.getElementById(tabName);
            // bZeroChannel: boolean;
            if (null == szDeviceIdentify) {
                return;
            }

            if (bZeroChannel) { // 零通道不支持录像搜索
                return;
            }

            if (0 == iType) { // 首次搜索
                g_iSearchTimes = 0;
            }

            WebVideoCtrl.I_RecordSearch(szDeviceIdentify, iChannelID, szStartTime, szEndTime, {
                iStreamType: iStreamType,
                iSearchPos: g_iSearchTimes * 40,
                success: function (xmlDoc) {
                    if ("MORE" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {

                        for (let i = 0, nLen = $(xmlDoc).find("searchMatchItem").length; i < nLen; i++) {
                            let szPlaybackURI = $(xmlDoc).find("playbackURI").eq(i).text();
                            if (szPlaybackURI.indexOf("name=") < 0) {
                                break;
                            }
                            let szStartTime = $(xmlDoc).find("startTime").eq(i).text();
                            let szEndTime = $(xmlDoc).find("endTime").eq(i).text();
                            let szFileName = szPlaybackURI.substring(szPlaybackURI.indexOf("name=") + 5, szPlaybackURI.indexOf("&size="));

                            let objTr = listDiv.get(0).insertRow(-1);
                            let objTd = objTr.insertCell(0);
                            objTd.id = "downloadTd" + i;
                            objTd.innerHTML = g_iSearchTimes * 40 + (i + 1);
                            objTd = objTr.insertCell(1);
                            objTd.width = "30%";
                            objTd.innerHTML = szFileName;
                            objTd = objTr.insertCell(2);
                            objTd.width = "30%";
                            objTd.innerHTML = (szStartTime.replace("T", " ")).replace("Z", "");
                            objTd = objTr.insertCell(3);
                            objTd.width = "30%";
                            objTd.innerHTML = (szEndTime.replace("T", " ")).replace("Z", "");
                            objTd = objTr.insertCell(4);
                            objTd.width = "10%";
                            objTd.innerHTML = "<a href='javascript:;' onclick='hk.startDownloadRecord(" + (i + g_iSearchTimes * 40) + ");'>下载</a>";
                            $("#downloadTd" + (i + g_iSearchTimes * 40)).data("fileName", szFileName);
                            $("#downloadTd" + (i + g_iSearchTimes * 40)).data("playbackURI", szPlaybackURI);
                        }

                        g_iSearchTimes++;
                        recordSearch(1); // 继续搜索
                    } else if ("OK" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
                        let iLength = $(xmlDoc).find("searchMatchItem").length;
                        for (let i = 0; i < iLength; i++) {
                            let szPlaybackURI = $(xmlDoc).find("playbackURI").eq(i).text();
                            if (szPlaybackURI.indexOf("name=") < 0) {
                                break;
                            }
                            let szStartTime = $(xmlDoc).find("startTime").eq(i).text();
                            let szEndTime = $(xmlDoc).find("endTime").eq(i).text();
                            let szFileName = szPlaybackURI.substring(szPlaybackURI.indexOf("name=") + 5, szPlaybackURI.indexOf("&size="));

                            let objTr = listDiv.get(0).insertRow(-1);
                            let objTd = objTr.insertCell(0);
                            objTd.id = "downloadTd" + i;
                            objTd.innerHTML = g_iSearchTimes * 40 + (i + 1);
                            objTd = objTr.insertCell(1);
                            objTd.width = "30%";
                            objTd.innerHTML = szFileName;
                            objTd = objTr.insertCell(2);
                            objTd.width = "30%";
                            objTd.innerHTML = (szStartTime.replace("T", " ")).replace("Z", "");
                            objTd = objTr.insertCell(3);
                            objTd.width = "30%";
                            objTd.innerHTML = (szEndTime.replace("T", " ")).replace("Z", "");
                            objTd = objTr.insertCell(4);
                            objTd.width = "10%";
                            objTd.innerHTML = "<a href='javascript:;' onclick='hk.startDownloadRecord(" + (i + g_iSearchTimes * 40) + ");'>下载</a>";
                            $("#downloadTd" + (i + g_iSearchTimes * 40)).data("fileName", szFileName);
                            $("#downloadTd" + (i + g_iSearchTimes * 40)).data("playbackURI", szPlaybackURI);
                        }
                        // _self.showOPInfo(szDeviceIdentify + " 搜索录像文件成功！");
                    } else if ("NO MATCHES" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
                        setTimeout(function () {
                            _self.showOPInfo(szDeviceIdentify + " 没有录像文件！");
                        }, 50);
                    }
                },
                error: function (status, xmlDoc) {
                    _self.showOPInfo(szDeviceIdentify + " 搜索录像文件失败！", status, xmlDoc);
                }
            });
        },
        // 下载录像

        startDownloadRecord: function (i, szIP, iChannelID, dlFileName) {
            let _self = this;
            let szDeviceIdentify = szIP,
                szChannelID = iChannelID,
                szFileName = $("#downloadTd" + i).data("fileName"),
                szPlaybackURI = $("#downloadTd" + i).data("playbackURI");

            if (null == szDeviceIdentify) {
                return;
            }

            g_iDownloadID = WebVideoCtrl.I_StartDownloadRecord(szDeviceIdentify, szPlaybackURI, szFileName, {
                bDateDir: true //是否生成日期文件
            });

            if (g_iDownloadID < 0) {
                let iErrorValue = WebVideoCtrl.I_GetLastError();
                if (34 == iErrorValue) {
                    _self.showOPInfo(szDeviceIdentify + " 已下载！");
                } else if (33 == iErrorValue) {
                    _self.showOPInfo(szDeviceIdentify + " 空间不足！");
                } else {
                    _self.showOPInfo(szDeviceIdentify + " 下载失败！");
                }
            } else {
                $("<div id='downProcess' class='freeze'></div>").appendTo("body");
                g_tDownloadProcess = setInterval("_self.downProcess(" + i + ")", 1000);
            }
        },
        // 下载进度
        downProcess: function (tabName) {
            let _self = this;
            let listDiv = document.getElementById(tabName);
            let iStatus = WebVideoCtrl.I_GetDownloadStatus(g_iDownloadID);
            if (0 == iStatus) {
                $("#downProcess").css({
                    width: listDiv.width() + "px",
                    height: "10rem",
                    lineHeight: "10rem",
                    // left: $("#searchdiv").offset().left + "px",
                    // top: $("#searchdiv").offset().top + "px"
                });
                let iProcess = WebVideoCtrl.I_GetDownloadProgress(g_iDownloadID);
                if (iProcess < 0) {
                    clearInterval(g_tDownloadProcess);
                    g_tDownloadProcess = 0;
                    g_iDownloadID = -1;
                } else if (iProcess < 100) {
                    $("#downProcess").text(iProcess + "%");
                } else {
                    $("#downProcess").text("100%");
                    setTimeout(function () {
                        $("#downProcess").remove();
                    }, 1000);

                    WebVideoCtrl.I_StopDownloadRecord(g_iDownloadID);

                    _self.showOPInfo("录像下载完成！");
                    clearInterval(g_tDownloadProcess);
                    g_tDownloadProcess = 0;
                    g_iDownloadID = -1;
                }
            } else {
                WebVideoCtrl.I_StopDownloadRecord(g_iDownloadID);

                clearInterval(g_tDownloadProcess);
                g_tDownloadProcess = 0;
                g_iDownloadID = -1;
            }
        },
        // 检查插件版本
        checkPluginVersion: function () {
            let iRet = WebVideoCtrl.I_CheckPluginVersion();
            if (0 == iRet) {
                alert("您的插件版本已经是最新的！");
            } else {
                alert("检测到新的插件版本！");
            }
        },
        // 导出配置文件
        exportDeviceConfig: function (szIp) {
            let _self = this;
            let szDeviceIdentify = szIp,
                szInfo = "";

            if (null == szDeviceIdentify) {
                return;
            }

            let iRet = WebVideoCtrl.I_ExportDeviceConfig(szDeviceIdentify);

            if (0 == iRet) {
                szInfo = "导出配置文件成功！";
            } else {
                szInfo = "导出配置文件失败！";
            }
            _self.showOPInfo(szDeviceIdentify + " " + szInfo);
        },

        // 导入配置文件
        importDeviceConfig: function (szIp, szFileName) {
            let _self = this;
            let szDeviceIdentify = szIp;

            if (null == szDeviceIdentify) {
                return;
            }

            if ("" == szFileName) {
                alert("请选择配置文件！");
                return;
            }

            let iRet = WebVideoCtrl.I_ImportDeviceConfig(szDeviceIdentify, szFileName);

            if (0 == iRet) {
                WebVideoCtrl.I_Restart(szDeviceIdentify, {
                    success: function (xmlDoc) {
                        $("<div id='restartDiv' class='freeze'>重启中...</div>").appendTo("body");
                        let oSize = getWindowSize();
                        $("#restartDiv").css({
                            width: oSize.width + "px",
                            height: oSize.height + "px",
                            lineHeight: oSize.height + "px",
                            left: 0,
                            top: 0
                        });
                        setTimeout("reconnect('" + szDeviceIdentify + "')", 20000);
                    },
                    error: function (status, xmlDoc) {
                        _self.showOPInfo(szDeviceIdentify + " 重启失败！", status, xmlDoc);
                    }
                });
            } else {
                _self.showOPInfo(szDeviceIdentify + " 导入失败！");
            }
        },

        // 远程配置库
        remoteConfig: function (szIP, devicePort) {
            let _self = this;
            let szDeviceIdentify = szIP;
            let iDevicePort = parseInt(devicePort, 10) || "";


            if (null == szDeviceIdentify) {
                return;
            }

            let iRet = WebVideoCtrl.I_RemoteConfig(szDeviceIdentify, {
                iDevicePort: iDevicePort,
                iLan: 1
            });

            if (-1 == iRet) {
                szInfo = "调用远程配置库失败！";
            } else {
                szInfo = "调用远程配置库成功！";
            }
            _self.showOPInfo(szDeviceIdentify + " " + szInfo);
        },

        restoreDefault: function (szIP) {
            let _self = this;
            let szDeviceIdentify = szIP,
                szMode = "basic";
            WebVideoCtrl.I_RestoreDefault(szDeviceIdentify, szMode, {
                timeout: 30000,
                success: function (xmlDoc) {
                    $("#restartDiv").remove();
                    // _self.showOPInfo(szDeviceIdentify + " 恢复默认参数成功！");
                    //恢复完成后需要重启
                    WebVideoCtrl.I_Restart(szDeviceIdentify, {
                        success: function (xmlDoc) {
                            $("<div id='restartDiv' class='freeze'>重启中...</div>").appendTo("body");
                            let oSize = getWindowSize();
                            $("#restartDiv").css({
                                width: oSize.width + "px",
                                height: oSize.height + "px",
                                lineHeight: oSize.height + "px",
                                left: 0,
                                top: 0
                            });
                            setTimeout("reconnect('" + szDeviceIdentify + "')", 20000);
                        },
                        error: function (status, xmlDoc) {
                            _self.showOPInfo(szDeviceIdentify + " 重启失败！", status, xmlDoc);
                        }
                    });
                },
                error: function (status, xmlDoc) {
                    _self.showOPInfo(szDeviceIdentify + " 恢复默认参数失败！", status, xmlDoc);
                }
            });
        },

        // -----通用方法

        //解析,加载 XML 文本
        loadXML: function (szXml) {
            if (null == szXml || "" == szXml) {
                return null;
            }

            let oXmlDoc = null;

            if (window.DOMParser) {
                let oParser = new DOMParser();
                oXmlDoc = oParser.parseFromString(szXml, "text/xml");
            } else {
                oXmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                oXmlDoc.async = true;
                oXmlDoc.loadXML(szXml);
            }
            return oXmlDoc;
        },
        loadXMLDoc: function (url) {
            var xmlDoc;
            try {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            } catch (e) {
                try {
                    let oXmlHttp = new XMLHttpRequest();
                    oXmlHttp.open("GET", url, false);
                    oXmlHttp.send(null);
                    return oXmlHttp.responseXML;
                } catch (e) {
                    return;
                }
            }
            xmlDoc.async = false;
            xmlDoc.load(url);
            return xmlDoc;
        },
        // 把一个 XML 文档或节点转换为一个字符串
        toXMLStr: function (oXmlDoc) {
            let szXmlDoc = "";
            try {
                let oSerializer = new XMLSerializer();
                szXmlDoc = oSerializer.serializeToString(oXmlDoc);
            } catch (e) {
                try {
                    szXmlDoc = oXmlDoc.xml;
                } catch (e) {
                    return "";
                }
            }
            if (szXmlDoc.indexOf("<?xml") == -1) {
                szXmlDoc = "<?xml version='1.0' encoding='utf-8'?>" + szXmlDoc;
            }
            return szXmlDoc;
        },

        encodeString: function (str) {
            if (str) {
                return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            } else {
                return "";
            }
        },
        setTab: function (name, cursel, n) {
            for (let i = 1; i <= n; i++) {
                // let menu = document.getElementById(name + i);
                let con = document.getElementById("con_" + name + "_" + i);
                con.style.display = i == cursel ? "block" : "none";
            }
        },
        // 格式化时间
        dateFormat: function (oDate, fmt) {
            let o = {
                "M+": oDate.getMonth() + 1, //月份
                "d+": oDate.getDate(), //日
                "h+": oDate.getHours(), //小时
                "m+": oDate.getMinutes(), //分
                "s+": oDate.getSeconds(), //秒
                "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
                "S": oDate.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (let k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        },

        // showDialog: function (divName) {
        //     document.getElementById(divName).innerHTML()
        // },
        // 打开选择框(iType 0：文件夹  1：文件)
        openFileDlg: function (id, iType) {
            let szDirPath = WebVideoCtrl.I_OpenFileDlg(iType);

            if (szDirPath != -1 && szDirPath != "" && szDirPath != null) {
                // return szDirPath;
                let dir = document.getElementById(id);
                dir.value = szDirPath;
            }
        }
    }
    window.WebVideoObj = WebVideoObj;
})()