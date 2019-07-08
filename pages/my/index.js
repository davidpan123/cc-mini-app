const appData = getApp()
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    addInfo: null,
    address: null,
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
    this.getAddress()
  },
  /**
   * 获取地址
   */
  getAddress() {
    const self = this;
    WXAPI.getAddress().then(res => {
      if (res && res.data.length) {
        let address = res.data[0]
        self.setData({
          addInfo: address,
          address: address.province + address.city + address.district + address.street
        })
      }
    })
  },
  goAddress () {
    wx.navigateTo({
      url: '/pages/edit-address/index'
    })
  }
})