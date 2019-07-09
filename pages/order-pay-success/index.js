// pages/order-pay-success/index.js
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
   * to 订单详情
   */
  goOrderDetail () {
    // oreder详情id
    wx.navigateTo({
      url: '/pages/order-detail/index'
    })
  },
  /**
   * 返回首页
   */
  goHome () {
    wx.navigateTo({
      url: '/pages/home/index'
    })
  }
})