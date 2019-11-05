// pages/baogong/baogong.js


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
    beizhu:""
  },
  onLoad: function() {
    var pa = this
    wx.getStorage({
      key: 'userNumber',
      success: function(res) {
        console.log(res)
        pa.setData({
          userNumber: res.data
        })
      },
      fail: function (e) {
        wx.showModal({
          title: '请先登录',
          showCancel: false,
          success: function (e) {
            
              wx.switchTab({
                url: '../../pages/login/login'
              })
          }
        })
      }
    })
    wx.getStorage({
      key: 'merchantNumber',
      success: function(res) {
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
  scanCode1: function() {
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
  scanCode2: function() {
    // 只允许从相机扫码
    var pa = this
    wx.scanCode({
      success: (res) => {
        var str = res.result.split(";");
        if (str.length === 8) {
          console.log("数据长度为8")
          // wx.showLoading({
          //   title: '正在加载',
          // })
          pa.setData({
            shuliang: str[6],
            scanCode2: res.result
          })
        } else {
          wx.showToast({
            title: '数据参数格式错',
            icon: "none"
          })
        }
      }
    })
  },
  scanCode3 :function(){
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
  commitBtn: function(e) {
   var   pa =this
    console.log(this.data.scanCode1)
    if (this.data.scanCode1 === "" || this.data.scanCode2 === "") {
      wx.showToast({
        title: '请先扫描二维码',
        icon: "none"
      })
      return
    }
    console.log(e)
    var arr=this.data.scanCode2.split(";")
    var arr2 = this.data.scanCode2.split(";")
    arr[6] = e.detail.value.shuliangbaogong
    var  arrStr=arr.toString()
  
    console.log(arrStr)
    wx.showLoading({
      title: '正在上传数据',
    })
    console.log(pa.data.usernumber)
    console.log(arr2[6])
    wx.request({
      url: 'https://456.xinyun1688.com/wxpay/ind.php',
      method: "GET",
      data: {
        "t": "jh_11",
        "a0": "1",
        "a1": this.data.scanCode1,
        "a2": arrStr,
        "a3": util.formatTime(new Date()),
        "a4": "1",
        "a5": pa.data.areaNumber,
        "a6": pa.data.userNumber,
        "a7": arr[7],
        "a8": e.detail.value.remark,
        "a9": arr2[6],
        "a10": e.detail.value.shuliangbaogong,
        "a11": "1",

      },
      header: {
        'content-type': 'application/json',
      },
      success: function(res) {
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
            shuliang:"",
            beizhu:""
          })
        }
      },
      fail: function() {
        wx.hideLoading()
        wx.showToast({
          title: "请求数据失败",
          icon: "none"
        })

      }
    })
  },


})