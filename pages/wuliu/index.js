// miniprogram/pages/wuliu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logisticsTraces: [
      { AcceptTime: '2019-09-11 12:09:09', AcceptStation: '西安东郊京东物流仓库中心3'},
      { AcceptTime: '2019-09-10 20:09:09', AcceptStation: '西安东郊京东物流仓库中心2' },
      { AcceptTime: '2019-09-10 09:09:09', AcceptStation: '西安东郊京东物流仓库中心1' }
    ],
    orderDetail: {
      logistics: {
        trackingNumber: 'O193213u21321321',
        shipperName: '圆通快递',
        phone: '95554'
      }
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