// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://456.xinyun1688.com/jpg/1.jpg',
      'https://456.xinyun1688.com/jpg/2.jpg',
      'https://456.xinyun1688.com/jpg/3.jpg'
    ],
    indicatorDots: false,
    autoplay:true,
    interval: 3000,
    duration: 1000

  },
  onShow:function()
  {
     this.setData({
       merchantNumber:"",
       userNumber:"",
     })
  },
  correct:function()
  {
     wx.navigateTo({
       url: 'correct',
     })
  },
  submitButton: function(e) {
    var passWord = e.detail.value.passWord
    getApp().globalData. merchantNumber = e.detail.value.merchantNumber
    getApp().globalData.userNumber = e.detail.value.userNumber
    wx.showLoading({
      title: '正在登录',
    })
    wx.request({
      url: 'https://456.xinyun1688.com/wxpay/db.php',
      method: "GET",
      data: {
        t: "getPwdjh_04",
        a0: getApp().globalData.merchantNumber,
        a1: getApp().globalData.userNumber,
      },
      header: {
        'content-type': 'application/json',
      },
      success: function(res) {
        console.log(res)
        wx.hideLoading()
        console.log(res)
        if ("FAIL" === (res.data.data[0].result)) {
          wx.showModal({
            title: '操作提示',
            content: res.data.data[0].result_des,
          })
        } else if ("SUCCESS" === (res.data.data[0].result) && res.data.data[0].result_des === passWord) {
          wx.setStorage({

            key: 'userNumber',
            data: getApp().globalData. userNumber,
          })
          console.log("dsadsad")
          wx.setStorage({
            key: 'merchantNumber',
            data: getApp().globalData.merchantNumber,
          })
          wx.getStorage({
            key: 'merchantNumber',
            success: function(res) {
              console.log(res)

            },
          })
        
          wx.switchTab({
            url: '../../pages/ma/main'
          })

        } else {
          console.log("dad"),
            console.log(passWord)
            console.log(res.data.data[0].result);
          res.data.data[0].result_des
          wx.showToast({
            title: '用户名或密码错误',
            icon: "none",
        
          })

        }
      },
      fail(){
        wx.hideLoading()
      }
    })
  }
})