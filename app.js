//app.js
const WXAPI = require('./wxapi/main')
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

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function() {
    // 临时联调
    wx.setStorageSync('token', '87463963-0971-425a-85c8-c2efcad81aac')
    // this.checkLoginStatus()
  },
  login: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // WXAPI.login(res.code).then(function (res) {
        //   if (res.code != 0) {
        //     // 登录错误
        //     wx.hideLoading();
        //     wx.showModal({
        //       title: '提示',
        //       content: '无法登录，请重试',
        //       showCancel: false
        //     })
        //     return;
        //   }
        //   console.log(res)
        //   wx.setStorageSync('token', res.token)
        //   wx.setStorageSync('uid', res.user_id)
          // wx.navigateBack();
        // })
      }
    });
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
    WXAPI.checkToken(token).then(function (res) {
      if (res.code != 0) {
        wx.removeStorageSync('token')
        _this.login()
        return
      }
    })
    wx.checkSession({
      fail() {
        _this.login()
        return
      }
    })
    // // 已经处于登录状态，检测是否强制需要手机号码
    // if (CONFIG.requireBindMobile) {
    //   WXAPI.userDetail(token).then(function (res) {
    //     if (res.code == 0) {
    //       if (!res.data.base.mobile) {
    //         wx.navigateTo({
    //           url: "/pages/authorize/bindmobile"
    //         })
    //       }
    //     }
    //   })
    // }
  },
  globalData: {
    exitFlag: false,
    isConnected: true,
    userInfo: null
  }
})