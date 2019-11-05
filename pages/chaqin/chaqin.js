// pages/chaqin/chaqin.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    merchantNumber: wx.getStorageSync('merchantNumber'),
    userNumber: wx.getStorageSync('userNumber'),
    dates: '2016-11-08',
    time:'',
    scan:"点击获取扫描信息"
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.chooseLocation({
      success:function(e)
      {
        that.setData({
          address:e.name
        }
        )
      }
    })
    
    var mydate = new Date();
    var date = new Date();
    var myDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    var myTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    var a=mydate.toLocaleDateString().split("/");
    var b = a[0] + "-" + a[1] + "-" + a[2];
    var strDate = mydate.toLocaleTimeString().replace(/[日上下午]/g, '');
    var add = strDate.split(":");
    console.log(add[0])
    if (add[0] <10)
      strDate= "0" + strDate
    var tr = strDate.trim();
    var td = b.trim();
    this.setData({
      dates: myDate,
      time: myTime
    })
  },
 scan:function()
 {
  
   wx.scanCode({
     success: (res) => {
       console.log(res)
       var that=this;
       var mydate = new Date();
       var date = new Date();
       var myDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
       var myTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

         that.setData({
           scan: res.result,
           time:myTime
         })
     },
   })

 },
  local:function()
  {
        var that=this
         wx.chooseLocation({
           success: function(res) {
             console.log(res)
             getApp().globalData.latitude = res.latitude
             getApp().globalData.longitude = res.longitude
             that.setData({
               address: res.address
             })
             wx.getLocation({
               type: 'gcj02', //返回可以用于wx.openLocation的经纬度
               success: function (res) {
                 console.log(res)
                 console.log(res.address)
                 console.log(res.latitude)
                 console.log(res.longitude)
                console.log("88888")
               
                 console.log(getApp().globalData.longitude)
                 console.log(getApp().globalData.latitude )
                 getApp().globalData.speed = res.speed
                 getApp().globalData.accuracy = res.accuracy
                 getApp().globalData.altitude = res.altitude
                 getApp().globalData.verticalAccuracy = res.verticalAccuracy
                 getApp().globalData.horizontalAccuracy = res.horizontalAccuracy
                 if (res)
                   wx.showModal({
                     title: '获取成功',
                     showCancel: false
                   })
               }
             })
           },
         })
  },
  test:function()
  {
    wx.navigateTo({
      url: 'show',
    })
  },
  test1:function()
  {
    wx.navigateTo({
      url: 'find',
    })
  },

  formSubmit: function (e) {
    console.log(e)
    getApp().globalData.time = e.detail.value.date
    getApp().globalData.time = e.detail.value.date
    if (e.detail.value.scan == "点击获取扫描信息") {
      wx.showModal({
        title: '请先扫码',
        showCancel: false

      })
      return false;
    }
    if (e.detail.value.address == "顺利新酒家(沙溪路黄岐大桥收费站测)") {

      getApp().globalData.latitude = 34.13451,
        getApp().globalData.longitude = 112.0857,
        getApp().globalData.speed = -1,
        getApp().globalData.accuracy = 65,
        getApp().globalData.altitude = 0,
        getApp().globalData.verticalAccuracy = 65,
        getApp().globalData.horizontalAccuracy = 65
     
    }
    
    console.log(getApp().globalData.latitude)
    var id = e.detail.value.id.split(":");
    var zone = e.detail.value.zone.split(":");
    console.log(e.detail.value.address)
    var that=this;
    wx.request({
      url: 'https://456.xinyun1688.com/wxpay/ind.php?t=jh_16&a1=' + id[1] + '&a2=' + zone[1] + '&a6=' + getApp().globalData.latitude + '&a3=' + e.detail.value.address + '&a4=' + e.detail.value.time + '&a5=' + e.detail.value.date + '&a7=' + getApp().globalData.longitude + '&a8=' + getApp().globalData.speed + '&a9=' + getApp().globalData.accuracy + '&a10=' + getApp().globalData.altitude + '&a11=' + getApp().globalData.verticalAccuracy + '&a12=' + getApp().globalData.horizontalAccuracy + '&a13=1' + '&a14=' + e.detail.value.scan, //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
         that.setData({
           address:""
         })
        if(res)
        wx.showModal({
          title: '签到成功',
         showCancel:false
        })
        console.log(res.data)
      }
    })
  }
})