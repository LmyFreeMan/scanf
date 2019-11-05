var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanCode1: "",
    scanCode2: "",
    areaNumber: "",
    userNumber: "",
    systemTime: "",
    shuliang: "",
    beizhu: ""
  },
  onLoad: function () {
    var pa = this
    wx.getStorage({
      key: 'userNumber',
      success: function (res) {
        console.log(res)
        pa.setData({
          userNumber: res.data
        })
      }
    })
    wx.getStorage({
      key: 'merchantNumber',
      success: function (res) {
        console.log(res)
        pa.setData({
          areaNumber: res.data
        })
      },
    })
    var time = util.formatTime(new Date());
    pa.setData({
      systemTime: time
    })

  },
  scanCode1: function () {
    var pa = this;
    // 只允许从相机扫码
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
        this.setData({
          scanCode1: res.result
        });
      }
    })
  },
  scanCode2: function () {
    // 只允许从相机扫码
    var pa = this
    wx.scanCode({
      success: (res) => {
          pa.setData({
            scanCode2: res.result
          })
      }
    })
  },
  scanCode3: function () {
    var pa = this;
    // 只允许从相机扫码
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
        pa.setData({
          beizhu: res.result
        });
      }
    })
  },
  commitBtn: function (e) {
    var pa = this
    // console.log(this.data.scanCode1)
    // if (this.data.scanCode1 === "" || this.data.scanCode2 === "") {
    //   wx.showToast({
    //     title: '请先扫描二维码',
    //     icon: "none"
    //   })
    //   return
    // }
    console.log(e)
    wx.showLoading({
      title: '正在上传数据',
    })
   
    wx.request({
      url: 'https://456.xinyun1688.com/wxpay/ind.php',
      method: "GET",
      data: {
        "t": "jh_11",
        "a0": "0",
        "a1": e.detail.value.gongxu,
        "a2": "0",
        "a3": util.formatTime(new Date()),
        "a4": "0",
        "a5": pa.data.areaNumber,
        "a6": pa.data.userNumber,
        "a7": e.detail.value.kahao,
        "a8": e.detail.value.remark,
        "a9": '0',
        "a10": e.detail.value.shuliangbaogong,
        "a11": "0",

      },
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        console.log(res.data.data[0].result)
        if ("FAIL" === res.data.data[0].result) {
          wx.showToast({
            title: res.data.data[0].result_des,
            icon: "none"
          })
        } else if ("SUCCESS" === res.data.data[0].result) {
          wx.showToast({
            title: "数据存储成功"
          })
          pa.setData({
            scanCode1: "",
            scanCode2: "",
            shuliang: "",
            beizhu: ""
          })
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: "请求数据失败",
          icon: "none"
        })

      }
    })
  },
})