// pages/ma/usermanager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  submitButton: function (e)
  {
  if(e.detail.value.userNumber=="")
    {
      wx.showModal({
        title: '请输入用户编号',
        showCancel:false
      })
      return false;
    }


    console.log(e)
    if (e.detail.target.id==2)
    {
      wx.request({
        url: 'https://456.xinyun1688.com/pdf/accountmanage.php?del=1', //仅为示例，并非真实的接口地址
        data: {
         userNumber: e.detail.value.userNumber,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: "POST",
        success: function (res) {
          console.log(res)
           if(res.data=="success")
           {
             wx.showModal({
               title: '删除成功',
               showCancel:false
             })
           }
           else
           {
             wx.showModal({
               title: '删除失败',
               showCancel: false
             })
           }

        }
      })
    }
    if (e.detail.target.id == 4) {

      wx.request({
        url: 'https://456.xinyun1688.com/pdf/userinfo.php?del=1', //仅为示例，并非真实的接口地址
        data: {
          userNumber: e.detail.value.userNumber,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: "POST",
        success: function (res) {
          console.log(res)
          if (res.data == "success") {
            wx.showModal({
              title: '删除成功',
              showCancel: false
            })
          }
        }
      })

    }
    if (e.detail.target.id ==1) {
      wx.request({
        url: 'https://456.xinyun1688.com/pdf/accountmanage.php?del=0', //仅为示例，并非真实的接口地址
        data: {
          userNumber: e.detail.value.userNumber,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: "POST",
        success: function (res) {
          if(res.data=="用户不存在")
          {
              wx.showModal({
                title: '用户不存在',
                showCancel:false
              })
          }
          else{
            console.log(res.data)
              wx.navigateTo({
                url: 'addpassword?data='+res.data,
              })
          }
        }
      })
    }
    if (e.detail.target.id == 3) {
      wx.request({
        url: 'https://456.xinyun1688.com/pdf/userinfo.php?del=0', //仅为示例，并非真实的接口地址
        data: {
          userNumber: e.detail.value.userNumber,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: "POST",
        success: function (res) {
          console.log(res)
          if (res.data == "用户不存在") {
            wx.showModal({
              title: '用户不存在',
              showCancel: false
            })
          }
          else {
            console.log(res.data)
            wx.navigateTo({
              url: 'adduser?data=' + res.data,
            })
          }
        }
      })

    }

    

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

        if(res.data!='A')
        wx.showModal({
          title: '权限不足',
          showCancel:false,
          success:function(res)
          {
            if(res.confirm)
              wx.navigateTo({
                url: 'ownner',
              })
          }
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