// pages/my/index.js
const appData = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    myOrders: [
      { type: 0, src: '/images/my/icon_order_non_payment.png', desc: '待付款'},
      { type: 1, src: '/images/my/icon_order_shipped.png', desc: '待发货' },
      { type: 2, src: '/images/my/icon_order_dispatched.png', desc: '待收货' },
      { type: 3, src: '/images/my/icon_order_complete.png', desc: '已完成' },
      { type: 4, src: '/images/my/icon_order_refund.png', desc: '退款/取消' }
    ]
  },
  goOrder: function(e) {
    let type = e.currentTarget.dataset['type'];
    if (type === 4) {
      wx.navigateTo({
        url: '/pages/refund/index'
      })
    } else {
      wx.navigateTo({
        url: '/pages/order-list/index?type=' + type
      })
    }
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
    this.setData({
      userInfo: appData.globalData.userInfo
    })
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