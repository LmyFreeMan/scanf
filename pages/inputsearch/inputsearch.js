// pages/inputsearch/inputsearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form_info:""
  },
  commitBtn: function (e) {
    console.log(e)
    console.log(e.detail.value.id)
    if(e.detail.value.id=="")
    {
      wx.showModal({
        title: '文件编号不能为空',
        content: '',
        showCancel: false
      })
      return false;
    }
    if (e.detail.value.describe == "") {
      wx.showModal({
        title: '文件说明不能为空',
        content: '',
        showCancel: false
      })
      return false;
    }
    var that = this;

    wx.chooseImage({
      success: function (res) {
        if(!res)
          wx.showModal({
            title: '请上传图片',
            content: '',
            showCancel: false
          })
        var tempFilePaths = res.tempFilePaths
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            console.log(res)
            console.log(res.height)
            getApp().globalData.type = res.type;
            wx.request({
              url: 'https://456.xinyun1688.com/wxpay/ind.php?t=jh_13&a1=' + e.detail.value.id + '&a2=' + e.detail.value.describe + '&a3=' + e.detail.value.pic + "." +res.type + '&a4=' + getApp().globalData.merchantNumber + '&a5=' + getApp().globalData.userNumber
              , //仅为示例，并非真实的接口地址
              data: {
                id: e.detail.value.id,
                describe: e.detail.value.describe,
                prc: e.detail.value.pic
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
            })
         
        const uploadTask = wx.uploadFile({
          url: 'https://456.xinyun1688.com/pdf/Img.php?prc=' + e.detail.value.pic + '.' + getApp().globalData.type, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
        
          that.setData({
            jindu:100
          })
          wx.showModal({
            title: '添加成功',
            showCancel:false,
           success:function(e)
           {
             if(e.confirm)
               that.setData({
                 jindu: 0,
                 form: ""
               })
           }
          })
            //do something
          }
        })
        uploadTask.onProgressUpdate((res) => {
           
        })


      }
    })
      }
    })
   
  }

})