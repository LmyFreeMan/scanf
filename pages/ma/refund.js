// pages/ma/refund.js
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
  commitBtn: function (e) {
console.log(e)


    wx.request({
      url: 'https://456.xinyun1688.com/pdf/refund.php', //仅为示例，并非真实的接口地址
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data:{
        transaction_id: e.detail.value.transaction_id,
        out_refund_no: e.detail.value.out_refund_no,
        total_fee: e.detail.value.total_fee,
        refund_fee: e.detail.value.refund_fee,
        refund_desc: e.detail.value.refund_desc,
      },
      success: function (res) {
          if(res.data=='success')
          wx.showModal({
            title: '退款成功',
            showCancel:false
          })
          else
          wx.showModal({
            title: '退款失败,请仔细检查',
            showCancel:false
          })
      }
    })









    //  console.log(e)

    // wx.request({
    //   url: 'https://456.xinyun1688.com/pdf/pay.php',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   method: 'POST',
    //   data: {
    //     openid: getApp().globalData.openid,
    //     total_fee: 0.1
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     wx.request({
    //       url: 'https://api.mch.weixin.qq.com/secapi/pay/refund', //仅为示例，并非真实的接口地址
    //       data: {
    //         appid: res.data.appId,
    //         nonce_str: res.data.nonceStr,
    //         sign: res.data.paySign,
    //         mch_id: '1512000501',
    //         out_refund_no: e.detail.value.out_refund_no,
    //         total_fee: e.detail.value.total_fee,
    //         refund_fee: e.detail.value.refund_fee,
    //         out_trade_no: e.detail.value.out_trade_no,
    //         refund_desc: e.detail.value.refund_desc,
    //       },
    //       method:'POST',
    //       header: {
    //         'content-type': 'application/x-www-form-urlencoded' // 默认值
    //       },
    //       success: function (res) {
    //         console.log(res.data)
    //       }
    //     })
    //   }

    // })




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