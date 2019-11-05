// pages/baogong/dsa.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'one',
   items: [
      { name: '1', value: '流鼻涕、打喷嚏' },
      { name: '2', value: '头疼', checked: 'true' },
      { name: '3', value: '咳嗽' },
      { name: '4', value: '发烧' },
      { name: '5', value: '头疼' },
      { name: '6', value: '全身酸疼、乏力' },
    ],
   


  },
  test: function (e) {
    console.log(e)
  },
  touteng: function (e) {
    var name='one';
    console.log("test")
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    console.log(e.detail.value[0])
    console.log(e.detail.value.length)
    for (var i = 0; i < e.detail.value.length; i++) {
      console.log(name)
      console.log(e.detail.value[i])
      //  var that = this;
      switch (e.detail.value[i]) {
        case '1': this.setData({
          name: 'three'
        })
          break;
        case '2':
          console.log("das")

          this.setData({
            name: 'four',
            //items:items_two
          })
      }

    }
  },

  checkboxChange: function (e) {
    var that = this;
    var name="one"
    console.log("test")
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    console.log(e.detail.value[0])
    console.log(e.detail.value.length)
    for(var i=0;i<e.detail.value.length;i++)
    {
      console.log(name)
      console.log(e.detail.value[i])
    //  var that = this;
      switch(e.detail.value[i])
      {
      case '1':that.setData({
        name:'one'
      })
      break;
      case '2':
      console.log("das")

     that.setData({
        name:'two',
       //items:items_two
      })
      }

    }
  },

 
})