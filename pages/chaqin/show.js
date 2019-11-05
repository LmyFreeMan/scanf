// pages/chaqin/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    latitude: 23.03671,
    longitude: 113.43414,
    i:'',
 id:'',
 frist:'',
 dateall:'',
marks:'',
scale:5
  },

  /**
   * 生命周期函数--监听页面加载
   */
 onLoad: function (options) {
    var timedate=new Date();
    var month=timedate.getMonth()+1
    if(month<9)
     month='0'+month
    console.log(timedate.getFullYear())
    console.log(timedate.getMonth())
    console.log(timedate.getDate())
    
    this.setData({
      time:timedate.getFullYear()+"-"+month+"-"+timedate.getDate()
    })
   var rnd = "";
   for (var i = 0; i < 8; i++)
     rnd += Math.floor(Math.random() * 10);
  
   var test =timedate.getFullYear()+month+timedate.getDate()+'';
   console.log(typeof(test))
     console.log(test)
     console.log(test+rnd)
 /*   console.log("test")
    var that=this;
    wx.request({
      url: 'https://456.xinyun1688.com/wxpay/jh16_query.php?po=' + getApp().globalData.time, //仅为示例，并非真实的接口地址
  
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("9999")
        console.log(res)
        console.log(res.data.data[0].a6)
        console.log(res.data.data[1].a6)
        console.log(res.data.data[2].a6)
        console.log(res.data.data[3].a6)
        console.log(res.data.data.length)
        that.setData({
          id:res.data.data.length,
          dateall:res.data.data
        })
        var marks=[];
        for(var i=0;i<res.data.data.length;i++)
        {
          console.log("a6",res.data.data[i].a6)
          marks[marks.length]=new Object;
          marks[i].id=i;
        
          marks[i].latitude = res.data.data[i].a6;
          marks[i].longitude = res.data.data[i].a7;
          console.log(marks[i].longitude)
         
          width: 50;
            height: 50

        }
        that.setData({
          id: res.data.data.length,
          dateall: res.data.data,
          mark:marks
        })
        console.log(marks)
        console.log(marks[0].id)
      }
    })*/
 },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
detail:function(e)
{
  console.log("----")
  console.log(e.markerId)
  console.log(typeof(getApp().globalData.location[e.markerId].longitude))
  console.log(getApp().globalData.location[e.markerId].longitude)
  console.log(getApp().globalData.location[e.markerId].longitude)
  console.log(getApp().globalData.location.length)
  console.log("----")
  var EARTH_RADIUS = 6378137.0;    //单位M
  var PI = Math.PI;
  function getRad(d) {
    return d * PI / 180.0;
  }
  function getGreatCircleDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = getRad(lat1);
    var radLat2 = getRad(lat2);

    var a = radLat1 - radLat2;
    var b = getRad(lng1) - getRad(lng2);

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;

    return s;
  }
  var j=0;
  var newmarks = [];

  for (var i = 0; i < getApp().globalData.location.length; i++) { 
    {
     //  console.log(parseFloat(getApp().globalData.location[i].latitude))
      // console.log(parseFloat(getApp().globalData.location[e.markerId].latitude))
        //   console.log(parseFloat(getApp().globalData.location[i].longitude)),
       
           if(getGreatCircleDistance(parseFloat(getApp().globalData.location[i].latitude), parseFloat(getApp().globalData.location[i].longitude), parseFloat(getApp().globalData.location[e.markerId].latitude), parseFloat(getApp().globalData.location[e.markerId].longitude))<35000)
     
      {

        console.log(getApp().globalData.location[i].latitude)
        console.log(getApp().globalData.location[i].latitude)
        newmarks[newmarks.length] = new Object;
        newmarks[j].id = j;
             newmarks[j].latitude = parseFloat(getApp().globalData.location[i].latitude) ;
          newmarks[j].longitude = parseFloat(getApp().globalData.location[i].longitude) 
        // marks[i].iconPath ="../assets/image/mark.png"
       j++;

        width: 10;
        height: 10

      }
    }


  }
  console.log(newmarks)
   console.log(typeof(newmarks[0].latitude))
this.setData({
    mark: newmarks,
    all: newmarks.length,
  latitude: getApp().globalData.location[e.markerId].latitude,
  longitude: getApp().globalData.location[e.markerId].longitude,
  scale:16
  })
  // // wx.navigateTo({
  // //   url: 'chaqin',
  // // })
  // wx.openLocation({
  //   latitude: parseInt(getApp().globalData.location[e.markerId].latitude),
  //   longitude: parseInt(getApp().globalData.location[e.markerId].longitude),
  //   scale:10,
  //   success:function(e)
  //   {
  //     console.log(e )
  //   }
  // })



},
  formSubmit:function(e)
  {
      console.log(e)
    var that = this;

    wx.request({
      url: 'https://456.xinyun1688.com/wxpay/jh16_query.php?po=' + e.detail.value.pick, //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {
        console.log(res)
     console.log(res.data.length);
        var marks=[];
        for (var i = 0; i < res.data.length; i++) {
          console.log("a6", res.data[i].a6)
          marks[marks.length] = new Object;
          marks[i].id = i;
          marks[i].latitude = res.data[i].a6;
          marks[i].longitude = res.data[i].a7;
        // marks[i].iconPath ="../assets/image/mark.png"
          console.log(marks[i].longitude)

          width: 10;
          height: 10

        }
        getApp().globalData.location=marks;
        console.log("test", getApp().globalData.location)
                that.setData({
                 mark:marks,
                  all:marks.length
                })
        console.log(marks)
        console.log(marks[0].id)
      }
    })
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
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
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