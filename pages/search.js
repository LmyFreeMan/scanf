// pages/search.js
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
  commitBtn: function (e) {
  var  value=e.detail.value.sousuo
   this.openJPG(value)
  },
 openJPG: function (e) {
    console.log(e)
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: "https://456.xinyun1688.com/wxpay/ind.php?t=getjh_13&a1=" + e,
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