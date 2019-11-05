// pages/ma/last.js
var a=require('qrCode.js') ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  last:0,
  flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("eee");

       var that=this
        wx.request({
          url: 'https://456.xinyun1688.com/pdf/last.php', //仅为示例，并非真实的接口地址
          data: {
           x:getApp().globalData.openid
          },
          method:'POST',

          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
       
            that.setData({
            last:res.data
            })
          }
        })





      },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  Payment: function (e) {
    console.log(e.target.id)
    var that = this;
    // 微信支付
    wx.request({
      url: 'https://456.xinyun1688.com/pdf/pay2.php',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      data: {
        openid: getApp().globalData.openid,
        total_fee: 0.1
      },
      success: function (res) {
        console.log(res)
        that.setData({
          code_url:res.data,
          flag:true
        })
      }
        })

        //调用微信支付
        // wx.requestPayment({
        //   'timeStamp': res.timeStamp,
        //   'nonceStr': res.nonceStr,
        //   'package': res.package,
        //   'signType': 'MD5',
        //   'paySign': res.paySign,
        //   'success': function (res) {
        //     console.log(res)
        //     if (res.errMsg == "requestPayment:ok") {
        //       console.log('支付成功');

        //     }
        //   },
        //   'fail': function (res) {

        //     if (res.errMsg == "requestPayment:fail cancel") {
        //       console.log('提示', '用户取消支付')

        //     } else {
        //       console.log('提示', res)
        //     }
        //   },
        //   'complete': function () {
        //     console.log("交易完成")
        //   }
        // })
      },


  search: function () {
    wx.navigateTo({
      url: 'last',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})