const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    payId: '',
    all_money: 0
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    this.getOrderDetail()
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
    wx.navigateTo({
      url: '/pages/order-detail/index?orderId=' + this.data.orderId
    })
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
  getOrderDetail () {
    let params = { id: this.data.orderId }
    WXAPI.getOrderDetail(params).then(res => {
      if (res.status !== 0) return
      this.setData({
        all_money: res.data.all_money
      })
    })
  },
  /**
   * 确认支付
   */
  confirmPay () {
    // 支付接口
    //1. 申请pay_id 
    WXAPI.getPayId({ order_id: this.data.orderId }).then(res => {
      if (res.status !== 0) return
      this.setData({
        payId: res.data.pay_id
      })
      let payParam = { order_id: this.data.orderId, pay_id: res.data.pay_id}
      WXAPI.pay(payParam).then(payData => {
        wx.requestPayment({
          appId: payData.data.appId,
          timeStamp: payData.data.timeStamp,
          nonceStr: payData.data.nonceStr,
          package: payData.data.package,
          signType: payData.data.signType,
          paySign: payData.data.paySign,
          success(res) {},
          fail(err) {}
        })
      })
    })
    return 
    // 支付完成跳转
    wx.navigateTo({
      url: '/pages/order-pay-success/index'
    })
  }
})