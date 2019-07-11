const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoSrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    const app_show_pic_version = wx.getStorageSync('app_show_pic_version')
    if (app_show_pic_version && app_show_pic_version == CONFIG.version) {
      wx.navigateTo({
        url: '/pages/index/index'
      })
    } else {
      this.setData(
        { videoSrc: '/assets/start.mp4'}
      )
      // 展示视频
      // WXAPI.getVideo().then(function (res) {
      //   _this.setData({
      //     videoSrc: res.data
      //   })
      // }).catch(function (e) {
      //   wx.navigateTo({
      //     url: '/pages/index/index'
      //   })
      // })
    }
  },  
  /**
   * 视频播放完毕
   */
  videoEnd () {
    // this.goToIndex()
  },
  /**
   * 跳转首页
   */
  goToIndex: function (e) {
    if (app.globalData.isConnected) {
      wx.setStorage({
        key: 'app_show_pic_version',
        data: CONFIG.version
      })
      wx.navigateTo({
        url: '/pages/index/index'
      })
    } else {
      wx.showToast({
        title: '当前无网络',
        icon: 'none',
      })
    }
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