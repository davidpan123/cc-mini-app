// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:'sdd111',
    scrollTop: 0,
    windowHeight: '',
    goodList:[
      {
        id:'sdd111',
        src: '/images/card1.png'
      },
      {
        id: 'dssdsd22',
        src: '/images/card2.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          windowHeight:  res.windowHeight
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

  },
  scroll: function(e) {
    console.log(e.dta)
    console.log(e.detail.deltaY)
    let isUpper = e.detail.deltaY > 0
    // this.scrollView(isUpper)
    if (e.detail.scrollTop <= 0 || e.detail.scrollTop >= (this.data.goodList.length-1)*this.data.windowHeight) {
      return 
    }

    console.log(this.data.scrollTop)
    //向下
    let index = Math.floor(e.detail.scrollTop/this.data.windowHeight)
    if (isUpper) {
      this.setData({
        scrollTop: this.data.scrollTop >= this.data.windowHeight ? this.data.scrollTop - this.data.windowHeight : 0
      })
    } else {
      this.setData({
        scrollTop: this.data.scrollTop + this.data.windowHeight
      })
    }

    // //向下
    // this.setData({
    //   scrollTop: this.data.scrollTop + this.data.windowHeight
    // })

    // //向上
    // this.setData({
    //   scrollTop: this.data.scrollTop >= this.data.windowHeight ? this.data.scrollTop - this.data.windowHeight : 0
    // })

  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scrollBottom: function() {
    if (this.data.scrollTop >= (this.data.goodList.length - 1)*this.data.windowHeight) {
      return
    }
    this.setData({
      scrollTop: this.data.scrollTop + this.data.windowHeight
    })

    console.log(this.data.scrollTop)
    // for (var i = 0; i < this.data.goodList.length; ++i) {
    //   if (this.data.goodList[i].id === this.data.toView) {
    //     let viewKey = isUpper ? i - 1 : i + 1
    //     if (this.data.goodList[viewKey]) {
    //       this.setData({
    //         toView: this.data.goodList[viewKey].id
    //       })
    //       break
    //     }
    //   }
    // }
  }
})