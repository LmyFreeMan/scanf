// pages/chaqin/content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  ar:'',
location: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.loca)
   console.log(options.array)
    console.log(typeof (options.array))
    var arr = options.array.split(",")
    console.log(arr)
    for(var i=0;i<arr.length;i++)
      arr[i] = parseInt(arr[i]);
      console.log(arr)
    console.log(arr[0])
    this.setData({
      ar:arr,
      location: getApp().globalData.loca
    })
  },
  detail: function (e)
{
    console.log(e)
    wx.request({
      url: 'https://456.xinyun1688.com/wxpay/jh13_query.php?id=' + e.currentTarget.id, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        wx.navigateTo({
          url: 'detail?a1=' + res.data[0].a1 + '&a2=' + res.data[0].a2 + '&a3=' + res.data[0].a3,
        })
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