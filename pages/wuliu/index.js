const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    orderDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderDetail()
  },
  getOrderDetail: function () {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let params = { id: this.data.orderId }
    WXAPI.getOrderDetail(params).then(res => {
      wx.hideLoading();
      if (!order.logistics.info) {
        order.logistics = {
          info: {
            data: []
          }
        };
      }

      that.setData({
        orderDetail: order
      })
    })
  }
})