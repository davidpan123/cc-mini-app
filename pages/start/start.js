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
      this.goLoginOrHome()
    } else {
      let params = { src_flag: 0 }
      WXAPI.start(params).then(res => {
        if (res.status !== 0) return
        if (res.data.list.length > 0) {
          this.setData(
            { videoSrc: res.data.list[0]['src_addr'] }
          )
        }
      }).catch(function (e) {
        wx.navigateTo({
          url: '/pages/home/index'
        })
      })
    }
  },  
  /**
   * 视频播放完毕
   */
  videoEnd () {
    this.goToIndex()
  },
  goLoginOrHome() {
    // 判断登录
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/authorize/index'
      })
    } else {
      wx.navigateTo({
        url: '/pages/home/index'
      })
    }
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
      this.goLoginOrHome()
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