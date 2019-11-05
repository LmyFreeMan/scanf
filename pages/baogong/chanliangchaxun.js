// pages/baogong/chanliangchaxun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timedate = new Date();
    var month = timedate.getMonth() + 1
    if (month < 9)
      month = '0' + month
    console.log(timedate.getFullYear())
    console.log(timedate.getMonth())
    console.log(timedate.getDate())
    this.setData({
      time: timedate.getFullYear() + "-" + month + "-" + timedate.getDate()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  formSubmit :function(e)
  {
    var that=this;
    console.log(e)
    wx.request({
      url: 'https://456.xinyun1688.com/pdf/chanliangchaxun.php', //仅为示例，并非真实的接口地址
      data: {
        userNumber: getApp().globalData.userNumber,
        merchantNumber: getApp().globalData.merchantNumber,
        date: e.detail.value.pick
      },
      method:'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded" // 默认值
      },
      success: function (res) {
        console.log(res)
       that.setData({
         data:res.data
       })
       
      }
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
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