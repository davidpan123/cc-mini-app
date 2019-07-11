// pages/authorize/index.js
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  login () {
    // 登录接口
    // 登录
    wx.login({
      success: res => {
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        WXAPI.wechat_login({code: res.code}).then(function (result) {
          // 微信验证成功后存下token
          if (res.status !== 0) return
          WXAPI.getUserInfo().then(function (res) {
            console.log(res)
            // 验证是否有填写了号码，填写了则跳首页，否则跳验证手机
            if (res.data && res.data.phone) {
              wx.navigateTo({
                url: '/pages/home/index'
              })
            } else {
              wx.navigateTo({
                url: '/pages/authorize/bindmobil'
              })
            }
          })
        })
      }
    });
  }
})