//app.js
const WXAPI = require('./wxapi/main')
const CONFIG = require('./config.js')
App({
  onLaunch: function () {
    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        that.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function () {
            that.goStartIndexPage()
          }
        })
      } else {
        that.globalData.isConnected = true
        wx.hideToast()
      }
    });
  },
  onShow: function() {
    this.checkLoginStatus()
  },
  login: function () {
    wx.navigateTo({
      url: '/pages/authorize/index'
    })
  },
  goStartIndexPage: function () {
    setTimeout(function () {
      wx.redirectTo({
        url: "/pages/start/start"
      })
    }, 1000)
  },  
  checkLoginStatus() { // 检测登录状态
    const _this = this
    const token = wx.getStorageSync('token');
    if (!token) {
      _this.login()
      return
    }
    // 已经处于登录状态，检测是否强制需要手机号码
    if (CONFIG.requireBindMobile) {
      if (!wx.getStorageSync('user_id')) {
        wx.navigateTo({
          url: "/pages/authorize/bindmobile"
        })
      }
    }
  },
  globalData: {
    isConnected: true,
    userInfo: null
  }
})