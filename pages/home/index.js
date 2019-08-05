// pages/home/index.js
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:'sdd111',
    scrollTop: 0,
    windowHeight: '',
    page: 1,
    size: 10,
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
        // 高度 单位为px
        that.setData({
          windowHeight:  res.windowHeight
        })
      }
    })
    this.getGoodList()
  },

  getGoodList () {
    
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
  /**
   *  点击跳转具体的商品
   */
  gotoGoodList: function (e) {
    let id = e && e.currentTarget.dataset.id || this.data.goodList[0].id
    wx.navigateTo({
      url: '/pages/good-list/index?id=' + id
    })
  },
  /**
   *  跳转个人中心
   */
  goUserCenter () {
    wx.navigateTo({
      url: '/pages/my/index'
    })
  },
  /**
   *  滚动事件
   */
  scroll: function(e) {
    let isUpper = e.detail.deltaY > 0
    if (e.detail.scrollTop <= 0 || e.detail.scrollTop >= (this.data.goodList.length-1)*this.data.windowHeight) {
      return 
    }

    // 滚动到具体位置
    let index = Math.floor(e.detail.scrollTop/this.data.windowHeight)
    if (isUpper) {
       //向上
      this.setData({
        scrollTop: this.data.scrollTop >= this.data.windowHeight ? this.data.scrollTop - this.data.windowHeight : 0
      })
    } else {
      //向下
      this.setData({
        scrollTop: this.data.scrollTop + this.data.windowHeight
      })
    }
  },
  /**
   *  点击底部滚动
   */
  scrollBottom: function() {
    if (this.data.scrollTop >= (this.data.goodList.length - 1)*this.data.windowHeight) {
      return
    }
    this.setData({
      scrollTop: this.data.scrollTop + this.data.windowHeight
    })
  }
})