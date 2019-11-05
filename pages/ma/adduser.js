// pages/ma/adduser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '女', value: '女' },
      { name: '男', value: '男', checked: 'true' },
    ]

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
    console.log("---")
     console.log(options)
    var str = options.data.split("!")
    getApp().globalData.temp1=str[3]
  console.log(str)
    this.setData({
      merchantNumber: str[1],
      userNumber: str[3],
     name:str[5],
     tel:str[7],
     address:str[10],
     major:str[4],
     idcard:str[9]
    })



  },
  submitButton:function(e)
  {
    console.log(e)
    if (e.detail.value.userNumber == '') {
      wx.showModal({
        title: '商户编号不能为空',
        showCancel: false
      })
      return false;
    }
    if (e.detail.value.userNumber == '') {
      wx.showModal({
        title: '用户编号不能为空',
        showCancel: false
      })
      return false;
    }
    if (e.detail.value.address == '') {
      wx.showModal({
        title: '地址不能为空',
        showCancel: false
      })
      return false;
    }
    if (e.detail.value.idcard == '') {
      wx.showModal({
        title: '身份证号不能为空',
        showCancel: false
      })
      return false;
    }
    if (e.detail.value.major == '') {
      wx.showModal({
        title: '部门不能为空',
        showCancel: false
      })
      return false;
    }
    if (e.detail.value.name == '') {
      wx.showModal({
        title: '姓名不能为空',
        showCancel: false
      })
      return false;
    }
    if (e.detail.value.sex == '') {
      wx.showModal({
        title: '性别不能为空',
        showCancel: false
      })
      return false;
    }
    console.log(getApp().globalData.userNumber)
    wx.request({
      url: 'https://456.xinyun1688.com/pdf/adduser.php', //仅为示例，并非真实的接口地址
      data: {
        register: getApp().globalData.userNumber,
        userNumber: e.detail.value.userNumber,
        merchantNumber: e.detail.value.merchantNumber,
       name: e.detail.value.name,
        idcard: e.detail.value.idcard,
        sex:e.detail.value.sex,
        tel:e.detail.value.tel,
        address:e.detail.value.address,
        age:e.detail.value.age,
        major:e.detail.value.major,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success: function (res) {
          console.log(res)
        if (res.data != "A") {
          wx.showModal({
            title: '权限不足',
            showCancel: false
          })
          return false;
        }
        else {

          wx.request({
            url: 'https://456.xinyun1688.com/pdf/userinfo.php?del=1', //仅为示例，并非真实的接口地址
            data: {
              userNumber: getApp().globalData.temp1,
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