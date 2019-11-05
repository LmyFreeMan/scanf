// pages/chaqin/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    {
    console.log("onload") 
      var that = this;
      var timedate = new Date();
      var month = timedate.getMonth() + 1
      if (month < 9)
        month = '0' + month
      console.log(timedate.getFullYear())
      console.log(timedate.getMonth())
      console.log(timedate.getDate())
 
        var time=timedate.getFullYear() + "-" + month + "-" + timedate.getDate()
  
      wx.request({
        url: 'https://456.xinyun1688.com/wxpay/jh16_query.php?po=' +time , //仅为示例，并非真实的接口地址

        header: {
          'content-type': 'application/x-www-form-urlencode' // 默认值
        },
        success: function (res) {
          console.log("????")
          console.log(res)
          console.log(res.data.length);
          getApp().globalData.loca=res.data
          var marks = [];
          for (var i = 0; i < res.data.length; i++) {
            console.log("a6", res.data[i].a6)
            marks[marks.length] = new Object;
            marks[i].id = i;
            marks[i].name =  res.data[i].a1 + "," + res.data[i].a2 + "," + res.data[i].a3 + "," + res.data[i].a4 + "," + res.data[i].a5
            marks[i].latitude = res.data[i].a6;
            marks[i].longitude = res.data[i].a7;
            // marks[i].iconPath ="../assets/image/mark.png"
            console.log(marks[i].longitude)

            width: 10;
            height: 10

          }
          getApp().globalData.location = marks;
          console.log("test", getApp().globalData.location)
         
          console.log(marks)
          console.log(marks[0].id)
        }
      }),
    
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
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
        var j = 0;
        var newmarks = [];
        getApp().globalData.arr=new Array();
        for (var i = 0; i < getApp().globalData.location.length; i++) {
          {
            //  console.log(parseFloat(getApp().globalData.location[i].latitude))
            // console.log(parseFloat(getApp().globalData.location[e.markerId].latitude))
            //   console.log(parseFloat(getApp().globalData.location[i].longitude)),

            if (getGreatCircleDistance(parseFloat(getApp().globalData.location[i].latitude), parseFloat(getApp().globalData.location[i].longitude), parseFloat(res.latitude), parseFloat(res.longitude)) < 25000) {
              getApp().globalData.arr[j]=i;
              console.log(getApp().globalData.location[i].latitude)
              console.log(getApp().globalData.location[i].latitude)
              newmarks[newmarks.length] = new Object;
              newmarks[j].id = j;
              newmarks[j].name = getApp().globalData.location[i].name;
              newmarks[j].latitude = parseFloat(getApp().globalData.location[i].latitude);
              
              // newmarks[j].label = new Object;
              // newmarks[j].label.content = "dasDSADdsatest"
              // newmarks[j].label.fontSize = 12;
              // newmarks[j].label.borderColor = "#FFFFFF";
              // newmarks[j].label.borderWidth = 3;
              // newmarks[j].label.borderRadius =1;
              // newmarks[j].label.borderColor = "red";
              newmarks[j].longitude = parseFloat(getApp().globalData.location[i].longitude)
              // marks[i].iconPath ="../assets/image/mark.png"
              j++;

              width: 10;
              height: 10

            }
            getApp().globalData.change = newmarks;
            console.log(getApp().globalData.change)
            console.log("ppp")
            console.log(getApp().globalData.arr)
          }


        }
        console.log("begin")
        console.log(newmarks)
        console.log(typeof (newmarks[0].latitude))
        that.setData({
          mark: newmarks,
          all: newmarks.length,
          latitude: parseFloat(res.latitude)+0.02,
          longitude: parseFloat(res.longitude) +0.02,
          scale: 15
        })
    
      }
    })
    }
    console.log("end")
    console.log("onload")
  },
  submit: function (e)
  {
    console.log(e)
    wx.navigateTo({
      url: 'content?array=' + getApp().globalData.arr,
    })
  },
  search:function(e)
  {
    console.log("search")
    var that=this
    wx.chooseLocation({
      success: function(res) {

        console.log(res)
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
        var j = 0;
        var newmarks = [];
        getApp().globalData.arr = new Array();

        for (var i = 0; i < getApp().globalData.location.length; i++) {
          {
            getApp().globalData.arr[j] = i;
            console.log("msater")
            //  console.log(parseFloat(getApp().globalData.location[i].latitude))
            // console.log(parseFloat(getApp().globalData.location[e.markerId].latitude))
              console.log(res.longitude)

            if (getGreatCircleDistance(parseFloat(getApp().globalData.location[i].latitude), parseFloat(getApp().globalData.location[i].longitude), parseFloat(res.latitude), parseFloat(res.longitude)) < 25000) {

              console.log(getApp().globalData.location[i].latitude)
              console.log(getApp().globalData.location[i].latitude)
              newmarks[newmarks.length] = new Object;
              newmarks[j].id = j;
              newmarks[j].latitude = parseFloat(getApp().globalData.location[i].latitude);
              newmarks[j].name = getApp().globalData.location[i].name;
              newmarks[j].longitude = parseFloat(getApp().globalData.location[i].longitude)
              // marks[i].iconPath ="../assets/image/mark.png"
              j++;

              width: 10;
              height: 10

            }
          }


        }
        getApp().globalData.change = newmarks;
        console.log(newmarks)
        console.log(newmarks.length)
      that.setData({
       place:res.name,
       mark:newmarks,
       all:newmarks.length,
       latitude:res.latitude,
        longitude:res.longitude,
        scale: 18
      })
      },
    })
  },
  detail:function(e)
  {
    console.log()
    console.log("detail+++++++")
    console.log(getApp().globalData.change[e.markerId].name)
    var name=getApp().globalData.change[e.markerId].name.split(",")
    console.log(name)
    this.setData({
      flag:true,
      userid:parseInt(name[0]),
      shopid:name[1],
      address:name[2],
      date:name[3],
      time:name[4]
    })
  },
  detail2: function (e) {
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
  hide:function(e)
  {
    console.log(e)
    this.setData({
      flag:false
    })
  }
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
 
})