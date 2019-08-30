// pages/authorize/index.js
let app = getApp()
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo
            }
          })
        }
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
  /**
   * 登录
   */
  login (e) {
    app.globalData.userInfo = e.detail.userInfo
    wx.login({
      success: res => {
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        WXAPI.wechat_login({code: res.code}).then(function (result) {
          if (result.status !== 0) return
          if (result.data.open_id) {
            wx.setStorageSync('open_id', result.data.open_id)
          }
          // 微信验证成功后存下token
          if (result.data.token) {
            wx.setStorageSync('token', result.data.token)
          }

          // 没有用户信息跳转手机号验证
          if (!result.data.user_id) {
              wx.navigateTo({
                url: '/pages/authorize/bindmobil'
              })
          } else {
            wx.setStorageSync('user_id', result.data.user_id)
            wx.navigateTo({
              url: '/pages/home/index'
            })
          }
        })
      }
    });
  }
})