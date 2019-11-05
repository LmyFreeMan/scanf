// pages/ma/addpassword.js
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

    wx.request({
      url: 'https://456.xinyun1688.com/pdf/root.php', //仅为示例，并非真实的接口地址
      data: {
        register: getApp().globalData.userNumber,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success: function (res) {

        console.log(res)

        if (res.data != 'A')
          wx.showModal({
            title: '权限不足',
            showCancel: false,
            success: function (res) {
              if (res.confirm)
                wx.navigateTo({
                  url: 'ownner',
                })
            }
          })


      }
    })

   console.log(options)
   var str=options.data.split("!")
   console.log(str)
    getApp().globalData.temp=str[2]



   this.setData({
     merchantNumbe:str[3],
     userNumber:str[2],
     password:str[1]
   })
  },
  submitButton:function(e)
  {
    if (e.detail.value.userNumber=='')
    {
      wx.showModal({
        title: '商户编号不能为空',
        showCancel: false
      })
      return  false;
    }
    if (e.detail.value.userNumber == '') {
      wx.showModal({
        title: '用户编号不能为空',
        showCancel: false
      })
      return false;
    }
    if (e.detail.value.passWord == '') {
      wx.showModal({
        title: '密码不能为空',
        showCancel: false
      })
      return false;
    }
    if (e.detail.value.passwordconfirm == '') {
      wx.showModal({
        title: '确认密码不能为空',
        showCancel: false
      })
      return false;
    }
    
    if (e.detail.value.passwordconfirm != e.detail.value.passWord ) {
      wx.showModal({
        title: '两次密码不一致',
        showCancel: false
      })
      return false;
    }

    console.log(e)
    console.log(getApp().globalData.userNumber)
    wx.request({
      url: 'https://456.xinyun1688.com/pdf/addpassword.php', //仅为示例，并非真实的接口地址
      data: {
        
        register: getApp().globalData.userNumber,
        userNumber: e.detail.value.userNumber,
        merchantNumber: e.detail.value.merchantNumber,
        password: e.detail.value.passWord,
        newpassword: e.detail.value.passwordconfirm
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success: function (res) {
       console.log(res)
       if(res.data!="A")
       {
         wx.showModal({
           title: '权限不足',
           showCancel:false
         })
         return false;
       }
       else
       {
         wx.request({
           url: 'https://456.xinyun1688.com/pdf/accountmanage.php?del=1', //仅为示例，并非真实的接口地址
           data: {
             userNumber: getApp().globalData.temp,
           },
           header: {
             'content-type': 'application/x-www-form-urlencoded' // 默认值
           },
           method: "POST",
           success: function (res) {
           

           }
         })











         wx.showModal({
           title: '添加成功',
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