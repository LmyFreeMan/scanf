// pages/main/main.js

var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jpgurl:"",
    areaNumber: "",
    userNumber: "",
    systemTime: "",
    nodes: "<a href='http://www.w3school.com.cn'>查询</a>",
    itemList: [
      
      
      {
        name: '全部地图查询',
        image: '../assets/image/a_13.png'
      },
        {
        name: '地图范围查询',
        image: '../assets/image/a_10.png'
      },
     
      {
        name: '考勤签到',
        image: '../assets/image/a_03.png'
      },
      {
        name: '在线订餐',
        image: '../assets/image/a_06.png'
      },
      {
        name: '扫码签到',
        image: '../assets/image/a_14.png'
      },
      {
        name: '退出',
        image: '../assets/image/a_14.png'
      },
    ]


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
      },
      fail:function(e)
      {
        wx.showModal({
          title: '请先登录',
          showCancel:false,
          success:function(e)
          {
            if(e.confirm)
              wx.switchTab({
                url: '../../pages/login/login'
              })
          }
        })
        return false;
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
  onShow:function()
  {
    wx.getStorage({
      key: 'userNumber',
      success: function (res) {
        console.log(res)
       
      },
      fail: function (e) {
        wx.showModal({
          title: '请先登录',
          showCancel: false,
          success: function (e) {
            if (e.confirm)
              wx.switchTab({
                url: '../../pages/login/login'
              })
          }
        })
      }
    })
    return false;
  },
  //发货扫描
  shipmentsBtn: function() {
    // 只允许从相机扫码
    wx.scanCode({
      success: (res) => {
        var e = res.result.split(";");
        if (e.length === 8) {
          console.log("数据长度为8")
          wx.showLoading({
            title: '正在加载',
          })
          var data = {
            "t": "jh_05",
            "a0": "0",
            "a1": e[0],
            "a2": e[1],
            "a3": e[7],
            "a4": e[4],
            "a5": e[2],
            "a6": e[3],
            "a7": e[6],
            "a8": e[5],
            "a9": util.formatTime(new Date()),

          }
          this.uploadQRCode('https://456.xinyun1688.com/wxpay/db.php', data)
        } else {
          wx.showToast({
            title: '数据参数格式错',
            icon: "none"
          })
        }
      }
    })
  },
  //收货扫描
  goodsReceiptBtn: function() {
    // 只允许从相机扫码
    wx.scanCode({
      success: (res) => {
        var e = res.result.split(";");
        if (e.length === 8) {
          console.log("数据长度为8")
          wx.showLoading({
            title: '正在加载',
          }) 
          var  data={
            "t": "jh_02",
            "a0": "0",
            "a1": e[0],
            "a2": e[1],
            "a3": e[6],
            "a4": e[2],
            "a5": e[3],
            "a6": util.formatTime(new Date()),
            "a7": e[7],
            "a8": "",
            "a9": e[5],
            "a10": e[4],
            "a11": "1",
            "a12": "1",
            "a13": "1",
            "a14": "1",
            "a15": "1",

          }
          this.uploadQRCode('https://456.xinyun1688.com/wxpay/db.php', data)
        } else {
          wx.showToast({
            title: '数据参数格式错',
            icon: "none"
          })
        }
      }
    })
  },
  //订货单扫描
  danhuodan: function () {
    // 只允许从相机扫码
    wx.scanCode({
      success: (res) => {
        var e = res.result.split(";");
        if (e.length === 8) {
          console.log("数据长度为8")
          wx.showLoading({
            title: '正在加载',
          })
          var data = {
            "t": "jh_02",
            "a0": "0",
            "a1": e[0],
            "a2": e[1],
            "a3": e[6],
            "a4": e[2],
            "a5": e[3],
            "a6": util.formatTime(new Date()),
            "a7": e[7],
            "a8": "",
            "a9": e[5],
            "a10": e[4],
            "a11": "1",
            "a12": "1",
            "a13": "1",
            "a14": "1",
            "a15": "1",

          }
          this.uploadQRCode('https://456.xinyun1688.com/wxpay/db.php', data)
        } else {
          wx.showToast({
            title: '数据参数格式错',
            icon: "none"
          })
        }
      }
    })
  },
  //签到扫描
  qiandao: function () {
    var  pa=this
    // 只允许从相机扫码
    wx.scanCode({
      success: (res) => {
        var e = res.result.split(";");
        if (e.length === 8) {
          console.log("数据长度为8")
          wx.showLoading({
            title: '正在加载',
          })
          var data = {
            "t": "jh_12",
            "a0": "0",
            "a1": pa.data.areaNumber,
            "a2": pa.data.userNumber,
            "a3": e[6],
            "a4": e[2],
            "a5": e[3],
            "a6": util.formatTime(new Date()),
            "a7": e[7],
            "a8": "",
            "a9": e[5],
            "a10": e[4],
            "a11": "1",
            "a12": "1",
            "a13": "1",
            "a14": "1",
            "a15": "1",

          }
          this.uploadQRCode('https://456.xinyun1688.com/wxpay/db.php', data)
        } else {
          wx.showToast({
            title: '数据参数格式错',
            icon: "none"
          })
        }
      }
    })
  },
  uploadQRCode: function(url, data) {
    console.log(util.formatTime(new Date()))
    wx.request({
      url: url,
      method: "GET",
      data: data,
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
  baogongBtn: function() {
    wx.navigateTo({
      url: '/pages/baogong/baogong',
    })
  },
  IDbaogong: function () {
    wx.navigateTo({
      url: '/pages/IDbaogong/IDbaogong',

    })
  },

  viewClick: function(e) {
    console.log(e.currentTarget.dataset.name)
    switch (e.currentTarget.dataset.name) {
      
      case this.data.itemList[0].name:
     // console.log("dsa")
        wx.navigateTo({
          url: 'show',
        })
        // this.baogongBtn()
        break;
      case this.data.itemList[1].name:
       wx.navigateTo({
         url: 'find',
       })
        break;
      case this.data.itemList[2].name:
        wx.navigateTo({
          url: 'test',
        })
        break;
      case this.data.itemList[3].name:
        wx.navigateTo({
          url: '/pages/EatOnline/EatOnline',
        })
        break;
      case this.data.itemList[4].name:
        wx.navigateTo({
          url: 'chaqin',
        })
        break;
      case this.data.itemList[5].name:
        wx.clearStorageSync();

        wx.navigateTo({
          url: '../login/login',
        })
        break;

    }
    // console.log()
  },
   searchHistorty:function(){
     var  pages=this
     // 只允许从相机扫码
     wx.scanCode({
       success: (res) => {
         var e = res.result.split(";");
         if (e.length === 8) {
           console.log("数据长度为8" + e[7])
           pages.openJPG(e[7])
          //  pages.openJPG(1)
          //  wx.showLoading({
          //    title: '正在加载',
          //  })
         } else {
           wx.showToast({
             title: '数据参数格式错',
             icon: "none"
           })
         }
       }
     })
   },
  openJPG : function(e){
    console.log(e)
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: "https://456.xinyun1688.com/wxpay/ind.php?t=getjh_13&a1="+e,
      method: "GET",
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        console.log(res.data.data[0].result)
        if ("FAIL" === res.data.data[0].result) {
          wx.showToast({
            title: res.data.data[0].result_desc,
            icon: "none"
          })
        } else if ("SUCCESS" === res.data.data[0].result) {
          wx.navigateTo({
            url: '/pages/showWebview/showWebview?url=' + res.data.data[0].a2,
            

          })
          // wx.showToast({
          //   title: "数据请求成功"
          // })
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
  }
})