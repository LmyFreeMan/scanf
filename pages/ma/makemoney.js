// pages/ma/makemoney.js
Page({

  data: {
  
  },
onLoad:function()
{
  wx.login({
    //获取code
    success: function (res) {
      var code = res.code; //返回code
      console.log(code);
      var appId = 'wx01c675d8e1f68fc5';
      var secret = 'f9d421d0c91b8c238c1f0369b75326d0';
      wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
        data: {},
        header: {
          'content-type': 'json'
        },
        success: function (res) {
          getApp().globalData.openid = res.data.openid //返回openid
          console.log('openddd为' + getApp().globalData.openid);
        }
      })
    }
  })
},


  Payment: function (e) {
    console.log(e.target.id)
    var that = this;
    // 微信支付
    wx.request({
      url: 'https://456.xinyun1688.com/pdf/pay.php',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        openid: getApp().globalData.openid,
        total_fee: e.target.id
      },
      success: function (res) {
        console.log(res)
        var res = res.data
          //调用微信支付
          wx.requestPayment({
            'timeStamp': res.timeStamp,
            'nonceStr': res.nonceStr,
            'package': res.package,
            'signType': 'MD5',
            'paySign': res.paySign,
            'success': function (res) {
              console.log(res)
              if (res.errMsg == "requestPayment:ok") { 
                console.log('支付成功');
 
              }
            },
            'fail': function (res) {
            
              if (res.errMsg == "requestPayment:fail cancel") {
                console.log('提示', '用户取消支付')
   
              } else {
                console.log('提示', res)
              }
            },
            'complete': function () {
              console.log("交易完成")
            }
          })
      },
      fail: function (res) {
        console.log(res)
        console.log('提示', '网络错误')
      }
    })
  },

  search:function()
 {
   wx.navigateTo({
     url: 'last',
   })
 },

refund:function()
{
  wx.navigateTo({
    url: 'refund',
  })
}
})