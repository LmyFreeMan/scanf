// pages/login/correct.js
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
  this.setData({
    userNumber: getApp().globalData.userNumber,
    merchantNumber: getApp().globalData.merchantNumber
  })
  },
  submitButton:function(e)
  {
    console.log(e)
    wx.request({
      url: 'https://456.xinyun1688.com/pdf/correct.php', //仅为示例，并非真实的接口地址
      data: {
        userNumber: e.detail.value.userNumber,
        merchantNumber: e.detail.value.merchantNumber,
        password: e.detail.value.passWord,
        newpassword: e.detail.value.newpassword
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method:"POST",
      success: function (res) {
      if(res.data=="商户编号/用户名错误")
      {
        wx.showModal({
          title: '商户编号/用户名错误',
          showCancel:false
        })
      }
       else{
        wx.showModal({
          title: '修改成功',
          showCancel: false
        })
       }
      }
     
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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