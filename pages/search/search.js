// pages/inputsearch/inputsearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  commitBtn: function (e) {
    var value = e.detail.value.sousuo
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
  }
})