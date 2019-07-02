const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      status: 1,
      all_money: 344450.00,
      logistics_money: 10,
      rest_money: 344450.00,
      logistics: {
        info: {
          data: []
        }
      },
      goods: [
        {
          id: 1,
          goods_img: '/images/order/icon_shop.png',
          goods_name: 'CC卡美珠宝',
          skuLabel: '2edds;ddddddddddddddddddddddddddddd;dddddddddddddddddddd;dddddddddddddd;',
          goods_count: 2,
          goods_price: 29000.90
        }
      ]
    },
    isShowPay: false,
    statusName: ''
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
    //created_at下单时间； finish_at取消时间； pay_time支付时间
    // formatDate(this.data.order.created_at, 'yyyy-MM-dd hh:mm:ss')
    this.setData({
      statusName: this.getStatusName(this.data.order.status),
      isShowPay: this.getOrderStatus(this.data.order.status)
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

  },
  getStatusName (status) {
    const statusObjs = {
      0: '待付款',
      1: '待发货',
      2: '待收货',
      3: '已完成',
      4: '退款中',
      6: '已退款',
      8: '已取消',
    }
    return statusObjs[status] || ''
  },
  getOrderStatus (status) {
    if (status === 0) {
      return false;
    } else {
      if (status === 8) {
        return false;
      } else {
        return true;
      }
    }
  }
})