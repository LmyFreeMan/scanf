var dateTimePicker = require('../../utils/dateTimePicker.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eatstartime: null,
    eatendtime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    dates: '2018-08-12',
    times: '12:00',
    objectArray: ['早餐', '午餐', '晚餐', '宵夜'],
    index: 0,
    merchantNumber: wx.getStorageSync('merchantNumber'),
    userNumber: wx.getStorageSync('userNumber'),
    items: [
      { name: 'breakfast', value: '早餐' },
      { name: 'lanch', value: '午餐', checked: 'true' },
      { name: 'supper', value: '晚餐' },
      { name: 'midnight', value: '宵夜' }
    ]

  },
  onLoad:function()
  {
     var  eat=new Date();
    var month = eat.getMonth() + 1
    var date = eat.getDate() + 7
    var startime=eat.getFullYear()+"-"+month+"-"+eat.getDate()
    var endtime = eat.getFullYear() + "-" + month + "-" + date
    console.log(startime)
    console.log(endtime)
    this.setData({
      eatstartime:startime,
      eatendtime:endtime
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },

  formSubmit: function (e) {
    var myDate = new Date();
    
    var a0,a1,a2,a3;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var test=new Date(e.detail.value.date)
 /*   var localdate=e.detail.value.date.split("-")
    console.log(localdate[0])
    console.log(localdate[1])
     console.log(localdate[2])
    console.log(myDate.getDate())
    var test=new Date(e.detail.value.date)
    console.log(test)*/
    console.log(test)
    console.log(myDate)
    console.log(test.getTime())
    console.log(myDate.getTime())
    if(test.getTime()<myDate.getTime())
    {
      wx.showModal({
        title: '已过订餐时间',
        showCancel:false
      })
      return false
    }
   /*   if(localdate[0]>myDate.getFullYear())
      {
        wx.showModal({
          title: '已过订餐时间',
          showCancel:false
        })
        return false
      }
      else
      {
        console.log("else1")
        if (localdate[0]==myDate.getFullYear())
        {
          if(localdate[1]>myDate.getMonth()+1)
          {
            console.log(myDate.getMonth())
            wx.showModal({
              title: '已过订餐时间',
              showCancel:false
            })
            return false;
          }
          else
          {
            console.log("else")
            if(localdate[1]==myDate.getMonth()+1)
            {
              if(localdate[2]>=myDate.getDate())
               {
                console.log(myDate.getDay())
                 wx.showModal({
                   title: '已过订餐时间',
                   showCancel:false
                 })
                 return false;
               }
            }
          }
        }
      }*/
    console.log(e.detail.value.check)
    if (e.detail.value.check.indexOf('breakfast')!=-1)
      a0=1;
      else
      a0=0;
    if (e.detail.value.check.indexOf('lanch') != -1)
      a1 = 1;
    else
      a1 = 0;
    if (e.detail.value.check.indexOf('supper') != -1)
      a2 = 1;
    else
      a2 = 0;
    if (e.detail.value.check.indexOf('midnight') != -1)
      a3 = 1;
    else
      a3 = 0;
   
     var id=e.detail.value.id.split(":");      
     var zone=e.detail.value.zone.split(":");

    wx.request({
      url: 'https://456.xinyun1688.com/wxpay/ind.php?t=jh_15&a1='+id[1]+'&a2='+zone[1]+'&a3='+a0+'&a4='+a1+'&a5='+a2+'&a6='+a3+'&a7='+e.detail.value.date, //仅为示例，并非真实的接口地址
  
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res)
        {
          wx.showModal({
            title: '订餐成功',
            showCancel:false
          })
        }
      }
    })
  },

  //  点击城市组件确定事件  

})